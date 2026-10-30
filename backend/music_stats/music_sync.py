"""ListenBrainz history sync for database.py.

Usage:
  python music_sync.py --full       # initial import, all available history
  python music_sync.py --limit 200 # import up to 200 recent listens (test)
  python music_sync.py             # incremental sync after a prior import
"""
import argparse
import json
import time
import requests
from database import get_connection, init_db

API = "https://api.listenbrainz.org/1"
DEFAULT_USERNAME = "markbow"
PAGE_SIZE = 1000
USER_AGENT = "PersonalMusicStats/1.0"


def fetch_page(username, count=PAGE_SIZE, min_ts=None, max_ts=None):
    params = {"count": count}
    if min_ts is not None:
        params["min_ts"] = min_ts
    if max_ts is not None:
        params["max_ts"] = max_ts
    response = requests.get(
        f"{API}/user/{username}/listens", params=params,
        headers={"User-Agent": USER_AGENT}, timeout=30
    )
    response.raise_for_status()
    return response.json().get("payload", {}).get("listens", [])



def artist_pairs(metadata):
    additional = metadata.get("additional_info") or {}
    mapping = metadata.get("mbid_mapping") or {}

    # Prefer ListenBrainz's artist-credit mapping.
    mapped_artists = mapping.get("artists") or []

    if mapped_artists:
        pairs = []

        for artist in mapped_artists:
            name = (
                artist.get("artist_credit_name")
                or artist.get("artist_name")
                or artist.get("name")
            )
            mbid = artist.get("artist_mbid")

            if name:
                pairs.append((mbid, name))

        if pairs:
            return pairs

    # Fall back to the additional_info fields.
    names = (
        additional.get("artist_names")
        or [metadata.get("artist_name") or "Unknown Artist"]
    )
    mbids = additional.get("artist_mbids") or []

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
        row = conn.execute("SELECT artist_id FROM artists WHERE artist_mbid = ?", (mbid,)).fetchone()
        if row:
            conn.execute("UPDATE artists SET name = ? WHERE artist_id = ?", (name, row["artist_id"]))
            return row["artist_id"]
    row = conn.execute(
        "SELECT artist_id FROM artists WHERE artist_mbid IS NULL AND name = ? LIMIT 1", (name,)
    ).fetchone()
    if row:
        return row["artist_id"]
    cur = conn.execute("INSERT INTO artists (artist_mbid, name) VALUES (?, ?)", (mbid, name))
    return cur.lastrowid


def get_or_create_recording(conn, metadata):
    additional = metadata.get("additional_info") or {}
    mapping = metadata.get("mbid_mapping") or {}

    mbid = (
        additional.get("recording_mbid")
        or metadata.get("recording_mbid")
        or mapping.get("recording_mbid")
    )

    if not mbid:
        return None

    row = conn.execute(
        "SELECT recording_id FROM recordings WHERE recording_mbid = ?",
        (mbid,)
    ).fetchone()

    if row:
        recording_id = row["recording_id"]
        conn.execute(
            """
            UPDATE recordings
            SET length_ms = COALESCE(length_ms, ?)
            WHERE recording_id = ?
            """,
            (additional.get("duration_ms"), row["recording_id"])
        )

        return recording_id

    cur = conn.execute(
    """
    INSERT INTO recordings (recording_mbid, title, length_ms)
    VALUES (?, ?, ?)
    """,
    (
        mbid,
        metadata.get("track_name") or "Unknown Track",
        additional.get("duration_ms")
    )
    )
    
    return cur.lastrowid


def get_or_create_release(conn, metadata):
    additional = metadata.get("additional_info") or {}
    mapping = metadata.get("mbid_mapping") or {}

    mbid = (
        additional.get("release_mbid")
        or metadata.get("release_mbid")
        or mapping.get("release_mbid")
    )

    if not mbid:
        return None

    row = conn.execute(
        "SELECT release_id FROM releases WHERE release_mbid = ?",
        (mbid,)
    ).fetchone()

    if row:
        return row["release_id"]

    cur = conn.execute(
        "INSERT INTO releases (release_mbid, title) VALUES (?, ?)",
        (mbid, metadata.get("release_name") or "Unknown Release")
    )

    return cur.lastrowid


def already_imported(conn, timestamp, msid, track, artist, release):
    return conn.execute(
        """SELECT 1 FROM listens WHERE listened_at = ?
        AND COALESCE(recording_msid, '') = COALESCE(?, '')
        AND track_name = ? AND artist_credit = ?
        AND COALESCE(release_name, '') = COALESCE(?, '') LIMIT 1""",
        (timestamp, msid, track, artist, release)
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
    if already_imported(conn, timestamp, msid, track, artist_credit, release_name):
        return False

    recording_id = get_or_create_recording(conn, metadata)
    release_id = get_or_create_release(conn, metadata)
    if recording_id:
        for order, (mbid, name) in enumerate(pairs):
            artist_id = get_or_create_artist(conn, mbid, name)
            conn.execute(
                """INSERT OR IGNORE INTO recording_artists
                (recording_id, artist_id, artist_order, role)
                VALUES (?, ?, ?, 'primary')""", (recording_id, artist_id, order)
            )
    if release_id:
        for order, (mbid, name) in enumerate(pairs):
            artist_id = get_or_create_artist(conn, mbid, name)
            conn.execute(
                """INSERT OR IGNORE INTO release_artists
                (release_id, artist_id, artist_order, role)
                VALUES (?, ?, ?, 'primary')""", (release_id, artist_id, order)
            )
    conn.execute(
        """INSERT INTO listens (listened_at, recording_id, release_id,
        recording_msid, track_name, artist_credit, release_name, raw_metadata)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
        (timestamp, recording_id, release_id, msid, track, artist_credit,
         release_name, json.dumps(listen, ensure_ascii=False))
    )
    return True



def get_latest_timestamp(conn):
    row = conn.execute("SELECT MAX(listened_at) AS latest FROM listens").fetchone()
    return row["latest"] if row and row["latest"] is not None else None



def sync_full(username):
    """Import all history, paging backward from the newest listen."""
    max_ts = None
    fetched = inserted = pages = 0
    while True:
        listens = fetch_page(username, max_ts=max_ts)
        if not listens:
            break
        pages += 1
        fetched += len(listens)
        listens.sort(key=lambda x: x.get("listened_at", 0))
        with get_connection() as conn:
            for listen in listens:
                inserted += int(save_listen(conn, listen))
        timestamps = [x["listened_at"] for x in listens if x.get("listened_at") is not None]
        if len(listens) < PAGE_SIZE or not timestamps:
            break
        max_ts = min(timestamps) - 1
        time.sleep(1.1)
    print(f"Full sync complete. Fetched {fetched}; inserted {inserted}; pages {pages}.")


def sync_incremental(username):
    """Fetch only listens newer than the latest timestamp in the local DB."""
    with get_connection() as conn:
        latest = get_latest_timestamp(conn)
    if latest is None:
        print("Database has no listens yet. Use --full or --limit for the first import.")
        return

    # Overlap by one second to catch same-timestamp records; deduplication filters repeats.
    min_ts = max(0, latest - 1)
    max_ts = int(time.time())
    fetched = inserted = pages = 0
    while max_ts >= min_ts:
        listens = fetch_page(username, count=PAGE_SIZE, min_ts=min_ts, max_ts=max_ts)
        if not listens:
            break
        pages += 1
        fetched += len(listens)
        listens.sort(key=lambda x: x.get("listened_at", 0))
        with get_connection() as conn:
            for listen in listens:
                if listen.get("listened_at", 0) < latest:
                    continue
                inserted += int(save_listen(conn, listen))
        timestamps = [x["listened_at"] for x in listens if x.get("listened_at") is not None]
        if len(listens) < PAGE_SIZE or not timestamps:
            break
        oldest = min(timestamps)
        if oldest <= latest:
            break
        max_ts = oldest - 1
        time.sleep(1.1)
    print(f"Incremental sync complete. Fetched {fetched}; inserted {inserted}; pages {pages}.")


def sync_recent(username, limit):
    """Fetch up to limit of the most recent listens (for testing)."""
    if limit < 1:
        raise ValueError("--limit must be at least 1")
    listens = fetch_page(username, count=min(limit, PAGE_SIZE))
    listens.sort(key=lambda x: x.get("listened_at", 0))
    inserted = 0
    with get_connection() as conn:
        for listen in listens:
            inserted += int(save_listen(conn, listen))
    print(f"Partial sync complete. Fetched {len(listens)}; inserted {inserted}.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sync ListenBrainz listens into SQLite.")
    parser.add_argument("--username", default=DEFAULT_USERNAME)
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--full", action="store_true", help="Fetch all available history.")
    group.add_argument("--limit", type=int, help="Fetch up to N recent listens (max 1000).")
    args = parser.parse_args()
    init_db()
    if args.full:
        sync_full(args.username)
    elif args.limit is not None:
        sync_recent(args.username, args.limit)
    else:
        sync_incremental(args.username)
