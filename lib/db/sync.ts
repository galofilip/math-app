/**
 * Offline → Online sync + guest migration.
 * Only runs when network is available and user is signed in.
 */
import { supabase } from '@/lib/supabase/client';
import {
  getUnsyncedSessions, markSessionsSynced,
  getUnsyncedBadges, markBadgesSynced,
  getLevelCompletions, getProgress,
  getDb,
} from './queries';

export async function syncToCloud(userId: string): Promise<void> {
  // 1. Sync unsynced game sessions
  const sessions = getUnsyncedSessions(userId);
  if (sessions.length > 0) {
    const { error } = await supabase.from('game_sessions').upsert(
      sessions.map(s => ({
        id: s.id, user_id: userId, topic_slug: s.topicSlug,
        level_id: s.levelId, score: s.score, xp_earned: s.xpEarned,
        time_taken_ms: s.timeTakenMs, completed_at: s.completedAt,
      }))
    );
    if (!error) markSessionsSynced(sessions.map(s => s.id));
  }

  // 2. Sync unsynced badges
  const badges = getUnsyncedBadges(userId);
  if (badges.length > 0) {
    const { error } = await supabase.from('user_badges').upsert(
      badges.map(b => ({ user_id: userId, badge_id: b.badgeId, earned_at: b.earnedAt }))
    );
    if (!error) markBadgesSynced(badges.map(b => b.id));
  }

  // 3. Sync user progress (upsert)
  const progress = getProgress(userId);
  await supabase.from('user_progress').upsert({
    user_id: userId,
    total_xp: progress.totalXp,
    math_level: progress.mathLevel,
    current_streak: progress.currentStreak,
    longest_streak: progress.longestStreak,
    last_played_date: progress.lastPlayedDate,
  });

  // 4. Sync level completions (upsert with max stars/score)
  const completions = getLevelCompletions(userId);
  if (completions.length > 0) {
    await supabase.from('level_completions').upsert(
      completions.map(c => ({
        user_id: userId, topic_slug: c.topicSlug, level_id: c.levelId,
        stars_earned: c.starsEarned, best_score: c.bestScore,
        attempts: c.attempts, first_completed_at: c.firstCompletedAt,
        last_played_at: c.lastPlayedAt,
      })),
      { onConflict: 'user_id,level_id' }
    );
    // Mark all as synced
    const db = getDb();
    db.runSync('UPDATE level_completions SET synced = 1 WHERE user_id = ?', [userId]);
  }
}

/**
 * Called on first sign-in: migrates guest SQLite data to the new userId.
 * Updates local rows to use the real userId, then triggers a sync.
 */
export async function migrateGuestProgress(userId: string): Promise<void> {
  const db = getDb();
  db.withTransactionSync(() => {
    db.runSync('UPDATE user_progress     SET user_id = ? WHERE user_id = "guest"', [userId]);
    db.runSync('UPDATE level_completions SET user_id = ? WHERE user_id = "guest"', [userId]);
    db.runSync('UPDATE game_sessions     SET user_id = ? WHERE user_id = "guest"', [userId]);
    db.runSync('UPDATE earned_badges     SET user_id = ? WHERE user_id = "guest"', [userId]);
    // Re-insert a fresh guest row for future guest use
    db.runSync('INSERT OR IGNORE INTO user_progress (user_id) VALUES ("guest")');
  });
  await syncToCloud(userId);
}
