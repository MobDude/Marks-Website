
import sqlite3


DB_FILE = "music_cache.db"


def get_connection():
    """Create a connection to the music database."""
    conn = sqlite3.connect(DB_FILE)

    # Enable foreign key enforcement.
    conn.execute("PRAGMA foreign_keys = ON")

    # Allow accessing rows using column names.
    conn.row_factory = sqlite3.Row

    return conn


def init_db():
    """Create all database tables if they do not already exist."""

    conn = get_connection()
    cursor = conn.cursor()

    # --------------------------------------------------
    # ARTISTS
    # --------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS artists (
            artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
            artist_mbid TEXT UNIQUE,
            name TEXT NOT NULL,
            sort_name TEXT,
            disambiguation TEXT,
            artist_type TEXT,
            gender TEXT,
            area TEXT,
            begin_area TEXT,
            begin_date TEXT,
            end_date TEXT
        )
    """)

    # --------------------------------------------------
    # RECORDINGS
    # --------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS recordings (
            recording_id INTEGER PRIMARY KEY AUTOINCREMENT,
            recording_mbid TEXT UNIQUE,
            title TEXT NOT NULL,
            length_ms INTEGER,
            disambiguation TEXT
        )
    """)

    # --------------------------------------------------
    # RELEASES (ALBUMS)
    # --------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS releases (
            release_id INTEGER PRIMARY KEY AUTOINCREMENT,
            release_mbid TEXT UNIQUE,
            release_group_mbid TEXT,
            title TEXT NOT NULL,
            release_date TEXT,
            country TEXT,
            status TEXT,
            packaging TEXT,
            barcode TEXT,
            cover_art_url TEXT
        )
    """)

    # --------------------------------------------------
    # ARTISTS ASSOCIATED WITH RECORDINGS
    # --------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS recording_artists (
            recording_id INTEGER NOT NULL,
            artist_id INTEGER NOT NULL,
            artist_order INTEGER NOT NULL DEFAULT 0,
            role TEXT DEFAULT 'primary',

            PRIMARY KEY (recording_id, artist_id, role),

            FOREIGN KEY (recording_id)
                REFERENCES recordings(recording_id)
                ON DELETE CASCADE,

            FOREIGN KEY (artist_id)
                REFERENCES artists(artist_id)
                ON DELETE CASCADE
        )
    """)

    # --------------------------------------------------
    # ARTISTS ASSOCIATED WITH RELEASES
    # --------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS release_artists (
            release_id INTEGER NOT NULL,
            artist_id INTEGER NOT NULL,
            artist_order INTEGER NOT NULL DEFAULT 0,
            role TEXT DEFAULT 'primary',

            PRIMARY KEY (release_id, artist_id, role),

            FOREIGN KEY (release_id)
                REFERENCES releases(release_id)
                ON DELETE CASCADE,

            FOREIGN KEY (artist_id)
                REFERENCES artists(artist_id)
                ON DELETE CASCADE
        )
    """)

    # --------------------------------------------------
    # TRACKS ON RELEASES
    # --------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS release_tracks (
            release_track_id INTEGER PRIMARY KEY AUTOINCREMENT,
            release_id INTEGER NOT NULL,
            recording_id INTEGER NOT NULL,
            medium_number INTEGER NOT NULL DEFAULT 1,
            track_number INTEGER NOT NULL,
            track_title TEXT,
            track_length_ms INTEGER,

            FOREIGN KEY (release_id)
                REFERENCES releases(release_id)
                ON DELETE CASCADE,

            FOREIGN KEY (recording_id)
                REFERENCES recordings(recording_id),

            UNIQUE (release_id, medium_number, track_number)
        )
    """)

    # --------------------------------------------------
    # ARTIST ALIASES
    # --------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS artist_aliases (
            alias_id INTEGER PRIMARY KEY AUTOINCREMENT,
            artist_id INTEGER NOT NULL,
            alias TEXT NOT NULL,
            alias_type TEXT,

            FOREIGN KEY (artist_id)
                REFERENCES artists(artist_id)
                ON DELETE CASCADE,

            UNIQUE (artist_id, alias)
        )
    """)

    # --------------------------------------------------
    # TAGS
    # --------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tags (
            tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            tag_type TEXT DEFAULT 'genre'
        )
    """)

    # --------------------------------------------------
    # TAGS ASSOCIATED WITH ARTISTS
    # --------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS artist_tags (
            artist_id INTEGER NOT NULL,
            tag_id INTEGER NOT NULL,

            PRIMARY KEY (artist_id, tag_id),

            FOREIGN KEY (artist_id)
                REFERENCES artists(artist_id)
                ON DELETE CASCADE,

            FOREIGN KEY (tag_id)
                REFERENCES tags(tag_id)
                ON DELETE CASCADE
        )
    """)

    # --------------------------------------------------
    # TAGS ASSOCIATED WITH RECORDINGS
    # --------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS recording_tags (
            recording_id INTEGER NOT NULL,
            tag_id INTEGER NOT NULL,

            PRIMARY KEY (recording_id, tag_id),

            FOREIGN KEY (recording_id)
                REFERENCES recordings(recording_id)
                ON DELETE CASCADE,

            FOREIGN KEY (tag_id)
                REFERENCES tags(tag_id)
                ON DELETE CASCADE
        )
    """)

    # --------------------------------------------------
    # TAGS ASSOCIATED WITH RELEASES
    # --------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS release_tags (
            release_id INTEGER NOT NULL,
            tag_id INTEGER NOT NULL,

            PRIMARY KEY (release_id, tag_id),

            FOREIGN KEY (release_id)
                REFERENCES releases(release_id)
                ON DELETE CASCADE,

            FOREIGN KEY (tag_id)
                REFERENCES tags(tag_id)
                ON DELETE CASCADE
        )
    """)

    # --------------------------------------------------
    # LISTENING HISTORY
    # --------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS listens (
            listen_id INTEGER PRIMARY KEY AUTOINCREMENT,

            listened_at INTEGER NOT NULL,

            recording_id INTEGER,
            release_id INTEGER,

            recording_msid TEXT,

            track_name TEXT NOT NULL,
            artist_credit TEXT NOT NULL,
            release_name TEXT,

            raw_metadata TEXT,

            FOREIGN KEY (recording_id)
                REFERENCES recordings(recording_id),

            FOREIGN KEY (release_id)
                REFERENCES releases(release_id)
        )
    """)

    # --------------------------------------------------
    # CALCULATED STATISTICS
    # --------------------------------------------------

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS artist_stats (
            artist_id INTEGER NOT NULL,
            period TEXT NOT NULL,

            listen_count INTEGER NOT NULL DEFAULT 0,
            first_listen INTEGER,
            last_listen INTEGER,
            listening_time_ms INTEGER NOT NULL DEFAULT 0,

            calculated_at INTEGER NOT NULL,

            PRIMARY KEY (artist_id, period),

            FOREIGN KEY (artist_id)
                REFERENCES artists(artist_id)
                ON DELETE CASCADE
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS recording_stats (
            recording_id INTEGER NOT NULL,
            period TEXT NOT NULL,

            listen_count INTEGER NOT NULL DEFAULT 0,
            first_listen INTEGER,
            last_listen INTEGER,
            listening_time_ms INTEGER NOT NULL DEFAULT 0,

            calculated_at INTEGER NOT NULL,

            PRIMARY KEY (recording_id, period),

            FOREIGN KEY (recording_id)
                REFERENCES recordings(recording_id)
                ON DELETE CASCADE
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS release_stats (
            release_id INTEGER NOT NULL,
            period TEXT NOT NULL,

            listen_count INTEGER NOT NULL DEFAULT 0,
            first_listen INTEGER,
            last_listen INTEGER,
            listening_time_ms INTEGER NOT NULL DEFAULT 0,

            calculated_at INTEGER NOT NULL,

            PRIMARY KEY (release_id, period),

            FOREIGN KEY (release_id)
                REFERENCES releases(release_id)
                ON DELETE CASCADE
        )
    """)

    # --------------------------------------------------
    # INDEXES
    # --------------------------------------------------

    cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_listens_timestamp
        ON listens(listened_at)
    """)

    cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_listens_recording
        ON listens(recording_id)
    """)

    cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_listens_release
        ON listens(release_id)
    """)

    cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_recording_artists_artist
        ON recording_artists(artist_id)
    """)

    cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_release_artists_artist
        ON release_artists(artist_id)
    """)

    conn.commit()
    conn.close()


if __name__ == "__main__":
    init_db()
    print("Music database initialized.")
