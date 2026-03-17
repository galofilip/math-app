/**
 * XP calculation — pure function, no side effects.
 */

export interface ScorerInput {
  score: number;          // 0-10 questions correct
  timeTakenMs: number;
  timeLimitMs: number;    // total time allowed for the session
  streak: number;         // current daily streak
  isFirstCompletion: boolean;
}

export interface ScorerOutput {
  baseXp: number;
  stars: number;
  speedBonus: number;
  streakBonus: number;
  firstCompletionMultiplier: number;
  totalXp: number;
}

export function calculateScore(input: ScorerInput): ScorerOutput {
  // Stars
  let stars = 0;
  if (input.score === 10) stars = 3;
  else if (input.score >= 8) stars = 2;
  else if (input.score >= 6) stars = 1;

  // Base XP
  let baseXp = 10;
  if (stars === 3) baseXp = 100;
  else if (stars === 2) baseXp = 70;
  else if (stars === 1) baseXp = 40;

  // Speed bonus: +20% if finished in under 60% of the time limit
  const speedBonus = input.timeTakenMs < input.timeLimitMs * 0.6 ? Math.round(baseXp * 0.2) : 0;

  // Streak multiplier: +5% per day, capped at +50%
  const streakMultiplier = Math.min(input.streak * 0.05, 0.5);
  const streakBonus = Math.round(baseXp * streakMultiplier);

  // First completion: 2× applied to base only
  const firstCompletionMultiplier = input.isFirstCompletion ? 2 : 1;
  const adjustedBase = baseXp * firstCompletionMultiplier;

  const totalXp = adjustedBase + speedBonus + streakBonus;

  return { baseXp, stars, speedBonus, streakBonus, firstCompletionMultiplier, totalXp };
}
