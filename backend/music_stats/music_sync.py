"""
Sync ListenBrainz listening history into the SQLite schema from database.py.

Install dependency: python -m pip install requests
Run: python music_sync.py [--username markbow] [--full]
"""
import argparse
import json
import time
import requests

from backend.music_stats.database import get_connection, init_db

API = "https://api.listenbrainz.org/1"
DEFAULT_USERNAME = "markbow"
PAGE_SIZE = 1000
USER_AGENT = "PersonalMusicStats/1.0"


def fetch_page(username, count=PAGE_SIZE, max_ts=None):
    params = {"count": count}
    if max_ts is not None:
        params["max_ts"] = max_ts
    response = requests.get(
        f"{API}/user/{username}/listens",
        params=params,
        headers={"User-Agent": USER_AGENT},
        timeout=30,
    )
    response.raise_for_status()
    return response.json().get("payload", {}).get("listens", [])


def artist_pairs(metadata):
    artists = metadata.get("artists")
    if isinstance(artists, list) and artists:
        result = []
        for item in artists:
            if isinstance(item, dict):
                name = item.get("artist_name") or item.get("name")
                mbid = item.get("artist_mbid")
                if name:
                    result.append((mbid, name))
        if result:
            return result

    names = metadata.get("artist_name") or "Unknown Artist"
    mbids = metadata.get("artist_mbids") or []
    if isinstance(names, str):
        names = [names]
    if not isinstance(mbids, list):
        mbids = []
    return [
        (mbids[i] if i < len(mbids) else None, name)
        for i, name in enumerate(names)
        if name
    ]


def get_or_create_artist(conn, mbid, name):
    if mbid:
        row = conn.execute(
            "SELECT artist_id FROM artists WHERE artist_mbid = ?", (mbid,)
        ).fetchone()
        if row:
            conn.execute(
                "UPDATE artists SET name = ? WHERE artist_id = ?",
                (name, row["artist_id"]),
            )
            return row["artist_id"]

    row = conn.execute(
        "SELECT artist_id FROM artists WHERE artist_mbid IS NULL AND name = ? LIMIT 1",
        (name,),
    ).fetchone()
    if row:
        return row["artist_id"]

    cur = conn.execute(
        "INSERT INTO artists (artist_mbid, name) VALUES (?, ?)", (mbid, name)
    )
    return cur.lastrowid


def get_or_create_recording(conn, metadata):
    mbid = metadata.get("recording_mbid")
    if not mbid:
        return None
    row = conn.execute(
        "SELECT recording_id FROM recordings WHERE recording_mbid = ?", (mbid,)
    ).fetchone()
    if row:
        return row["recording_id"]
    cur = conn.execute(
        "INSERT INTO recordings (recording_mbid, title) VALUES (?, ?)",
        (mbid, metadata.get("track_name") or "Unknown Track"),
    )
    return cur.lastrowid


def get_or_create_release(conn, metadata):
    mbid = metadata.get("release_mbid")
    if not mbid:
        return None
    row = conn.execute(
        "SELECT release_id FROM releases WHERE release_mbid = ?", (mbid,)
    ).fetchone()
    if row:
        return row["release_id"]
    cur = conn.execute(
        "INSERT INTO releases (release_mbid, title) VALUES (?, ?)",
        (mbid, metadata.get("release_name") or "Unknown Release"),
    )
    return cur.lastrowid


def deduplicated(conn, timestamp, msid, track, artist, release):
    return conn.execute(
        """
        SELECT 1 FROM listens
        WHERE listened_at = ?
          AND COALESCE(recording_msid, '') = COALESCE(?, '')
          AND track_name = ?
          AND artist_credit = ?
          AND COALESCE(release_name, '') = COALESCE(?, '')
        LIMIT 1
        """,
        (timestamp, msid, track, artist, release),
    ).fetchone() is not None


def save_listen(conn, listen):
    timestamp = listen.get("listened_at")
    metadata = listen.get("track_metadata") or {}
    if timestamp is None:
        return False

    track = metadata.get("track_name") or "Unknown Track"
    release_name = metadata.get("release_name")
    pairs = artist_pairs(metadata)
    artist_credit = " & ".join(name for _, name in pairs) or "Unknown Artist"
    msid = listen.get("recording_msid")

    if deduplicated(conn, timestamp, msid, track, artist_credit, release_name):
        return False

    recording_id = get_or_create_recording(conn, metadata)
    release_id = get_or_create_release(conn, metadata)

    if recording_id:
        for order, (mbid, name) in enumerate(pairs):
            artist_id = get_or_create_artist(conn, mbid, name)
            conn.execute(
                """
                INSERT OR IGNORE INTO recording_artists
                    (recording_id, artist_id, artist_order, role)
                VALUES (?, ?, ?, 'primary')
                """,
                (recording_id, artist_id, order),
            )

    if release_id:
        for order, (mbid, name) in enumerate(pairs):
            artist_id = get_or_create_artist(conn, mbid, name)
            conn.execute(
                """
                INSERT OR IGNORE INTO release_artists
                    (release_id, artist_id, artist_order, role)
                VALUES (?, ?, ?, 'primary')
                """,
                (release_id, artist_id, order),
            )

    conn.execute(
        """
        INSERT INTO listens (
            listened_at, recording_id, release_id, recording_msid,
            track_name, artist_credit, release_name, raw_metadata
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            timestamp, recording_id, release_id, msid, track,
            artist_credit, release_name,
            json.dumps(listen, ensure_ascii=False),
        ),
    )
    return True


def sync(username=DEFAULT_USERNAME, full=False):
    init_db()
    conn = get_connection()
    latest = conn.execute(
        "SELECT MAX(listened_at) AS latest FROM listens"
    ).fetchone()["latest"]

    # A one-second overlap catches same-timestamp listens; dedup avoids repeats.
    max_ts = None if full or latest is None else latest + 1
    fetched = inserted = pages = 0

    try:
        while True:
            listens = fetch_page(username, max_ts=max_ts)
            if not listens:
                break
            pages += 1
            fetched += len(listens)
            listens.sort(key=lambda item: item.get("listened_at", 0))

            for listen in listens:
                if save_listen(conn, listen):
                    inserted += 1
            conn.commit()

            valid_times = [
                item["listened_at"] for item in listens
                if item.get("listened_at") is not None
            ]
            if len(listens) < PAGE_SIZE or not valid_times:
                break

            max_ts = min(valid_times) - 1
            time.sleep(1.1)

        print(f"Sync complete for {username}: {inserted} new listens "
              f"(fetched {fetched} across {pages} page(s)).")
    finally:
        conn.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sync ListenBrainz listens to SQLite.")
    parser.add_argument("--username", default=DEFAULT_USERNAME)
    parser.add_argument("--full", action="store_true",
                        help="Fetch all history; existing listens are deduplicated.")
    args = parser.parse_args()
    sync(args.username, args.full)
