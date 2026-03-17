/**
 * SQLite table definitions.
 * All SQL changes should start here, then be applied via migrations.ts.
 */

export const CREATE_USER_PROGRESS = `
  CREATE TABLE IF NOT EXISTS user_progress (
    user_id         TEXT PRIMARY KEY,
    total_xp        INTEGER NOT NULL DEFAULT 0,
    math_level      INTEGER NOT NULL DEFAULT 1,
    current_streak  INTEGER NOT NULL DEFAULT 0,
    longest_streak  INTEGER NOT NULL DEFAULT 0,
    last_played_date TEXT,
    synced_at       TEXT
  );
`;

export const CREATE_LEVEL_COMPLETIONS = `
  CREATE TABLE IF NOT EXISTS level_completions (
    id                  TEXT PRIMARY KEY,
    user_id             TEXT NOT NULL,
    topic_slug          TEXT NOT NULL,
    level_id            TEXT NOT NULL,
    stars_earned        INTEGER NOT NULL DEFAULT 0,
    best_score          INTEGER NOT NULL DEFAULT 0,
    attempts            INTEGER NOT NULL DEFAULT 0,
    first_completed_at  TEXT,
    last_played_at      TEXT NOT NULL,
    synced              INTEGER NOT NULL DEFAULT 0,
    UNIQUE(user_id, level_id)
  );
`;

export const CREATE_GAME_SESSIONS = `
  CREATE TABLE IF NOT EXISTS game_sessions (
    id              TEXT PRIMARY KEY,
    user_id         TEXT NOT NULL,
    topic_slug      TEXT NOT NULL,
    level_id        TEXT NOT NULL,
    score           INTEGER NOT NULL,
    xp_earned       INTEGER NOT NULL,
    time_taken_ms   INTEGER,
    completed_at    TEXT NOT NULL,
    synced          INTEGER NOT NULL DEFAULT 0
  );
`;

export const CREATE_EARNED_BADGES = `
  CREATE TABLE IF NOT EXISTS earned_badges (
    id          TEXT PRIMARY KEY,
    user_id     TEXT NOT NULL,
    badge_id    TEXT NOT NULL,
    earned_at   TEXT NOT NULL,
    synced      INTEGER NOT NULL DEFAULT 0,
    UNIQUE(user_id, badge_id)
  );
`;

export const ALL_CREATE_STATEMENTS = [
  CREATE_USER_PROGRESS,
  CREATE_LEVEL_COMPLETIONS,
  CREATE_GAME_SESSIONS,
  CREATE_EARNED_BADGES,
];
