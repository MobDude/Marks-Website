"""
Calculate cached statistics from listens in music_cache.db.

Run:
    python compute_stats.py
    python compute_stats.py --period this_year

Periods: all_time, this_year, this_month, this_week
Requires the database.py schema provided with this project.
"""
import argparse
import time
from datetime import datetime, timezone, timedelta

from backend.music_stats.database import get_connection, init_db


PERIODS = ("all_time", "this_year", "this_month", "this_week")


def start_timestamp(period):
    now = datetime.now(timezone.utc)
    if period == "all_time":
        return None
    if period == "this_year":
        start = datetime(now.year, 1, 1, tzinfo=timezone.utc)
    elif period == "this_month":
        start = datetime(now.year, now.month, 1, tzinfo=timezone.utc)
    elif period == "this_week":
        today = datetime(now.year, now.month, now.day, tzinfo=timezone.utc)
        start = today - timedelta(days=today.weekday())
    else:
        raise ValueError(f"Unsupported period: {period}")
    return int(start.timestamp())


def calculate_stats(period="all_time"):
    init_db()
    conn = get_connection()
    since = start_timestamp(period)
    calculated_at = int(time.time())

    try:
        # Remove prior cached values for this period before rebuilding.
        for table in ("artist_stats", "recording_stats", "release_stats"):
            conn.execute(f"DELETE FROM {table} WHERE period = ?", (period,))

        time_filter = "AND l.listened_at >= ?" if since is not None else ""
        params = [period, calculated_at]
        if since is not None:
            params.append(since)

        # A listen of a collaboration counts toward each linked artist.
        conn.execute(
            f"""
            INSERT INTO artist_stats (
                artist_id, period, listen_count, first_listen,
                last_listen, listening_time_ms, calculated_at
            )
            SELECT ra.artist_id, ?, COUNT(l.listen_id),
                   MIN(l.listened_at), MAX(l.listened_at),
                   COALESCE(SUM(r.length_ms), 0), ?
            FROM recording_artists ra
            JOIN listens l ON l.recording_id = ra.recording_id
            LEFT JOIN recordings r ON r.recording_id = l.recording_id
            WHERE 1=1 {time_filter}
            GROUP BY ra.artist_id
            """,
            params,
        )

        conn.execute(
            f"""
            INSERT INTO recording_stats (
                recording_id, period, listen_count, first_listen,
                last_listen, listening_time_ms, calculated_at
            )
            SELECT l.recording_id, ?, COUNT(l.listen_id),
                   MIN(l.listened_at), MAX(l.listened_at),
                   COALESCE(SUM(r.length_ms), 0), ?
            FROM listens l
            LEFT JOIN recordings r ON r.recording_id = l.recording_id
            WHERE l.recording_id IS NOT NULL {time_filter}
            GROUP BY l.recording_id
            """,
            params,
        )

        conn.execute(
            f"""
            INSERT INTO release_stats (
                release_id, period, listen_count, first_listen,
                last_listen, listening_time_ms, calculated_at
            )
            SELECT l.release_id, ?, COUNT(l.listen_id),
                   MIN(l.listened_at), MAX(l.listened_at),
                   COALESCE(SUM(rt.track_length_ms), 0), ?
            FROM listens l
            LEFT JOIN release_tracks rt
              ON rt.release_id = l.release_id
             AND rt.recording_id = l.recording_id
            WHERE l.release_id IS NOT NULL {time_filter}
            GROUP BY l.release_id
            """,
            params,
        )

        conn.commit()
        print(f"Statistics calculated for period '{period}'.")
    finally:
        conn.close()


def top_artists(period="all_time", limit=10):
    conn = get_connection()
    try:
        return conn.execute(
            """
            SELECT a.name, s.listen_count, s.listening_time_ms
            FROM artist_stats s
            JOIN artists a ON a.artist_id = s.artist_id
            WHERE s.period = ?
            ORDER BY s.listen_count DESC, a.name COLLATE NOCASE
            LIMIT ?
            """,
            (period, limit),
        ).fetchall()
    finally:
        conn.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Compute cached music stats.")
    parser.add_argument("--period", choices=PERIODS, default="all_time")
    parser.add_argument("--top", type=int, default=10)
    args = parser.parse_args()

    calculate_stats(args.period)

    print(f"\nTop artists ({args.period}):")
    for i, artist in enumerate(top_artists(args.period, args.top), start=1):
        hours = artist["listening_time_ms"] / 3_600_000
        print(f"{i:2}. {artist['name']} | {artist['listen_count']} listens "
              f"| {hours:.1f} hours")
