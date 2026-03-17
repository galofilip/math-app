export interface UserProgress {
  userId: string;
  totalXp: number;
  mathLevel: number;
  currentStreak: number;
  longestStreak: number;
  lastPlayedDate: string | null;  // ISO date 'YYYY-MM-DD'
}

export interface LevelCompletion {
  id: string;
  userId: string;
  topicSlug: string;
  levelId: string;
  starsEarned: number;    // 0-3
  bestScore: number;      // 0-10
  attempts: number;
  firstCompletedAt: string | null;
  lastPlayedAt: string;
  synced: boolean;
}

export interface GameSessionRecord {
  id: string;
  userId: string;
  topicSlug: string;
  levelId: string;
  score: number;
  xpEarned: number;
  timeTakenMs: number | null;
  completedAt: string;
  synced: boolean;
}

export interface SessionResult {
  score: number;          // 0-10 questions correct
  starsEarned: number;    // 0-3
  xpEarned: number;
  timeTakenMs: number;
  newBadgeIds: string[];
}
