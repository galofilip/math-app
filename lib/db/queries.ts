/**
 * All SQLite read/write helpers.
 * No raw SQL should appear outside this file.
 */
import { getDb } from './migrations';
import { UserProgress, LevelCompletion, GameSessionRecord } from '@/types/progress';
import { EarnedBadge } from '@/types/rewards';

function isoDate(d = new Date()): string {
  return d.toISOString().split('T')[0];
}

// ─── User Progress ─────────────────────────────────────────────────────────

export function getProgress(userId: string): UserProgress {
  const db = getDb();
  const row = db.getFirstSync<{
    user_id: string;
    total_xp: number;
    math_level: number;
    current_streak: number;
    longest_streak: number;
    last_played_date: string | null;
  }>('SELECT * FROM user_progress WHERE user_id = ?', [userId]);

  if (!row) {
    db.runSync('INSERT OR IGNORE INTO user_progress (user_id) VALUES (?)', [userId]);
    return { userId, totalXp: 0, mathLevel: 1, currentStreak: 0, longestStreak: 0, lastPlayedDate: null };
  }

  return {
    userId: row.user_id,
    totalXp: row.total_xp,
    mathLevel: row.math_level,
    currentStreak: row.current_streak,
    longestStreak: row.longest_streak,
    lastPlayedDate: row.last_played_date,
  };
}

export function updateProgressXp(userId: string, xpToAdd: number): void {
  const db = getDb();
  const today = isoDate();

  const prev = getProgress(userId);

  // Streak logic
  let newStreak = prev.currentStreak;
  if (prev.lastPlayedDate === null) {
    newStreak = 1;
  } else {
    const lastDate = new Date(prev.lastPlayedDate);
    const todayDate = new Date(today);
    const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / 86400000);
    if (diffDays === 1) newStreak += 1;
    else if (diffDays > 1) newStreak = 1;
    // diffDays === 0: same day, no change
  }

  const newXp = prev.totalXp + xpToAdd;
  const newLevel = xpToMathLevel(newXp);
  const newLongest = Math.max(prev.longestStreak, newStreak);

  db.runSync(
    `UPDATE user_progress SET
       total_xp = ?, math_level = ?,
       current_streak = ?, longest_streak = ?,
       last_played_date = ?, synced_at = NULL
     WHERE user_id = ?`,
    [newXp, newLevel, newStreak, newLongest, today, userId]
  );
}

function xpToMathLevel(xp: number): number {
  const thresholds = [0, 200, 500, 1000, 2000];
  let level = 1;
  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) level = i + 1;
  }
  if (xp >= 2000) level = 5 + Math.floor((xp - 2000) / 1000);
  return level;
}

// ─── Level Completions ────────────────────────────────────────────────────

export function getLevelCompletions(userId: string): LevelCompletion[] {
  const db = getDb();
  const rows = db.getAllSync<{
    id: string; user_id: string; topic_slug: string; level_id: string;
    stars_earned: number; best_score: number; attempts: number;
    first_completed_at: string | null; last_played_at: string; synced: number;
  }>('SELECT * FROM level_completions WHERE user_id = ?', [userId]);

  return rows.map(r => ({
    id: r.id, userId: r.user_id, topicSlug: r.topic_slug, levelId: r.level_id,
    starsEarned: r.stars_earned, bestScore: r.best_score, attempts: r.attempts,
    firstCompletedAt: r.first_completed_at, lastPlayedAt: r.last_played_at,
    synced: r.synced === 1,
  }));
}

export function upsertLevelCompletion(
  userId: string, topicSlug: string, levelId: string,
  score: number, stars: number
): void {
  const db = getDb();
  const now = new Date().toISOString();
  const existing = db.getFirstSync<{ stars_earned: number; best_score: number; attempts: number; first_completed_at: string | null }>(
    'SELECT stars_earned, best_score, attempts, first_completed_at FROM level_completions WHERE user_id = ? AND level_id = ?',
    [userId, levelId]
  );

  if (!existing) {
    const id = `${userId}-${levelId}-${Date.now()}`;
    db.runSync(
      `INSERT INTO level_completions
         (id, user_id, topic_slug, level_id, stars_earned, best_score, attempts, first_completed_at, last_played_at, synced)
       VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, 0)`,
      [id, userId, topicSlug, levelId, stars, score, now, now]
    );
  } else {
    db.runSync(
      `UPDATE level_completions SET
         stars_earned = MAX(stars_earned, ?),
         best_score = MAX(best_score, ?),
         attempts = attempts + 1,
         last_played_at = ?,
         synced = 0
       WHERE user_id = ? AND level_id = ?`,
      [stars, score, now, userId, levelId]
    );
  }
}

// ─── Game Sessions ────────────────────────────────────────────────────────

export function insertGameSession(session: Omit<GameSessionRecord, 'synced'>): void {
  const db = getDb();
  db.runSync(
    `INSERT INTO game_sessions (id, user_id, topic_slug, level_id, score, xp_earned, time_taken_ms, completed_at, synced)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
    [session.id, session.userId, session.topicSlug, session.levelId,
     session.score, session.xpEarned, session.timeTakenMs ?? null, session.completedAt]
  );
}

// ─── Badges ───────────────────────────────────────────────────────────────

export function getEarnedBadgeIds(userId: string): string[] {
  const db = getDb();
  const rows = db.getAllSync<{ badge_id: string }>(
    'SELECT badge_id FROM earned_badges WHERE user_id = ?', [userId]
  );
  return rows.map(r => r.badge_id);
}

export function insertBadge(userId: string, badgeId: string): void {
  const db = getDb();
  const id = `${userId}-${badgeId}`;
  db.runSync(
    `INSERT OR IGNORE INTO earned_badges (id, user_id, badge_id, earned_at, synced)
     VALUES (?, ?, ?, ?, 0)`,
    [id, userId, badgeId, new Date().toISOString()]
  );
}

// ─── Unsynced rows (for sync.ts) ──────────────────────────────────────────

export function getUnsyncedSessions(userId: string): GameSessionRecord[] {
  const db = getDb();
  return db.getAllSync<GameSessionRecord>(
    'SELECT * FROM game_sessions WHERE user_id = ? AND synced = 0', [userId]
  );
}

export function markSessionsSynced(ids: string[]): void {
  if (ids.length === 0) return;
  const db = getDb();
  const placeholders = ids.map(() => '?').join(',');
  db.runSync(`UPDATE game_sessions SET synced = 1 WHERE id IN (${placeholders})`, ids);
}

export function getUnsyncedBadges(userId: string): EarnedBadge[] {
  const db = getDb();
  const rows = db.getAllSync<{
    id: string; user_id: string; badge_id: string; earned_at: string; synced: number;
  }>('SELECT * FROM earned_badges WHERE user_id = ? AND synced = 0', [userId]);
  return rows.map(r => ({
    id: r.id, userId: r.user_id, badgeId: r.badge_id, earnedAt: r.earned_at, synced: false
  }));
}

export function markBadgesSynced(ids: string[]): void {
  if (ids.length === 0) return;
  const db = getDb();
  const placeholders = ids.map(() => '?').join(',');
  db.runSync(`UPDATE earned_badges SET synced = 1 WHERE id IN (${placeholders})`, ids);
}
