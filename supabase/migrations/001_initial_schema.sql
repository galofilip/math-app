-- MathQuest — Supabase Cloud Schema
-- Run this in the Supabase SQL editor to initialize the cloud database.

-- User aggregate progress (one row per signed-in user)
CREATE TABLE IF NOT EXISTS user_progress (
  user_id          TEXT PRIMARY KEY,   -- Clerk user_id
  total_xp         INTEGER NOT NULL DEFAULT 0,
  math_level       INTEGER NOT NULL DEFAULT 1,
  current_streak   INTEGER NOT NULL DEFAULT 0,
  longest_streak   INTEGER NOT NULL DEFAULT 0,
  last_played_date DATE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Per-level completion records
CREATE TABLE IF NOT EXISTS level_completions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             TEXT NOT NULL,
  topic_slug          TEXT NOT NULL,
  level_id            TEXT NOT NULL,
  stars_earned        SMALLINT NOT NULL DEFAULT 0,
  best_score          SMALLINT NOT NULL DEFAULT 0,
  attempts            INTEGER NOT NULL DEFAULT 0,
  first_completed_at  TIMESTAMPTZ,
  last_played_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, level_id)
);

-- Append-only session log
CREATE TABLE IF NOT EXISTS game_sessions (
  id              TEXT PRIMARY KEY,
  user_id         TEXT NOT NULL,
  topic_slug      TEXT NOT NULL,
  level_id        TEXT NOT NULL,
  score           SMALLINT NOT NULL,
  xp_earned       INTEGER NOT NULL,
  time_taken_ms   INTEGER,
  completed_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Badge definitions (seed with INSERT below)
CREATE TABLE IF NOT EXISTS badges (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT NOT NULL,
  emoji       TEXT NOT NULL,
  xp_bonus    INTEGER NOT NULL DEFAULT 0
);

-- Which users have which badges
CREATE TABLE IF NOT EXISTS user_badges (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    TEXT NOT NULL,
  badge_id   TEXT NOT NULL REFERENCES badges(id),
  earned_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- Weekly leaderboard cache
CREATE TABLE IF NOT EXISTS leaderboard_weekly (
  user_id       TEXT PRIMARY KEY,
  display_name  TEXT NOT NULL,
  xp_this_week  INTEGER NOT NULL DEFAULT 0,
  week_start    DATE NOT NULL
);

-- ── Row Level Security ──────────────────────────────────────────────────────
ALTER TABLE user_progress    ENABLE ROW LEVEL SECURITY;
ALTER TABLE level_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions    ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges      ENABLE ROW LEVEL SECURITY;

-- Policies: users can only read/write their own rows
-- Note: auth.uid() resolves to Clerk user_id via JWT integration
CREATE POLICY "user_progress_self" ON user_progress    FOR ALL USING (user_id = auth.uid()::text);
CREATE POLICY "level_completions_self" ON level_completions FOR ALL USING (user_id = auth.uid()::text);
CREATE POLICY "game_sessions_self" ON game_sessions    FOR ALL USING (user_id = auth.uid()::text);
CREATE POLICY "user_badges_self" ON user_badges        FOR ALL USING (user_id = auth.uid()::text);

-- Badges and leaderboard are public reads
CREATE POLICY "badges_public_read"      ON badges              FOR SELECT USING (true);
CREATE POLICY "leaderboard_public_read" ON leaderboard_weekly  FOR SELECT USING (true);

-- ── Seed Badges ─────────────────────────────────────────────────────────────
INSERT INTO badges (id, name, description, emoji, xp_bonus) VALUES
  ('first-step',          'First Step',            'Complete any level for the first time.',          '👶', 25),
  ('perfect-10',          'Perfect 10',            'Score 10/10 on any level.',                       '💯', 50),
  ('speed-demon',         'Speed Demon',           'Answer 5 questions in a row in under 10s each.',  '⚡', 50),
  ('algebra-apprentice',  'Algebra Apprentice',    'Complete all Tier 1 Algebra levels.',             '📐', 75),
  ('algebra-master',      'Algebra Master',        '3-star all Algebra levels.',                      '🥇', 200),
  ('geometry-apprentice', 'Geometry Apprentice',   'Complete all Tier 1 Geometry levels.',            '📏', 75),
  ('geometry-master',     'Geometry Master',       '3-star all Geometry levels.',                     '🥇', 200),
  ('stats-apprentice',    'Statistics Apprentice', 'Complete all Tier 1 Statistics levels.',          '📊', 75),
  ('stats-master',        'Statistics Master',     '3-star all Statistics levels.',                   '🥇', 200),
  ('trig-apprentice',     'Trig Apprentice',       'Complete all Tier 1 Trigonometry levels.',        '🔺', 75),
  ('trig-master',         'Trig Master',           '3-star all Trigonometry levels.',                 '🥇', 200),
  ('all-rounder',         'All-Rounder',           'Complete at least Tier 2 in every topic.',        '🌟', 150),
  ('on-fire',             'On Fire',               'Maintain a 7-day daily streak.',                  '🔥', 100),
  ('unstoppable',         'Unstoppable',           'Maintain a 30-day daily streak.',                 '💪', 300),
  ('centurion',           'Centurion',             'Earn 100 XP in a single session.',                '🏛️', 50)
ON CONFLICT (id) DO NOTHING;
