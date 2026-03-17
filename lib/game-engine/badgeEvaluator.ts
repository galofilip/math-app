/**
 * Badge evaluator — pure function, no side effects.
 * Takes the current user state and returns an array of newly earned badge IDs.
 */

import { LevelCompletion } from '@/types/progress';

export interface BadgeEvalInput {
  earnedBadgeIds: string[];
  totalXp: number;
  currentStreak: number;
  levelCompletions: LevelCompletion[];
  /** XP earned in the latest session */
  sessionXp: number;
  /** Whether any question in the session was answered in under 10s */
  fastAnswerCount: number;
}

export function evaluateBadges(input: BadgeEvalInput): string[] {
  const { earnedBadgeIds: earned, totalXp, currentStreak, levelCompletions, sessionXp, fastAnswerCount } = input;
  const newBadges: string[] = [];

  function check(id: string, condition: boolean) {
    if (condition && !earned.includes(id)) newBadges.push(id);
  }

  const completedLevelIds = new Set(levelCompletions.filter(c => c.starsEarned > 0).map(c => c.levelId));
  const perfectLevels = levelCompletions.filter(c => c.bestScore === 10);
  const threeStarLevels = levelCompletions.filter(c => c.starsEarned === 3);

  const byTopic = (slug: string) => levelCompletions.filter(c => c.topicSlug === slug);
  const tier1Complete = (slug: string) =>
    byTopic(slug).filter(c => c.levelId.includes('-t1-') && c.starsEarned > 0).length >= 5;
  const allThreeStar = (slug: string) =>
    byTopic(slug).filter(c => c.starsEarned === 3).length >= 20;
  const tier2Complete = (slug: string) =>
    byTopic(slug).filter(c => c.levelId.includes('-t2-') && c.starsEarned > 0).length >= 5;

  check('first-step',          completedLevelIds.size >= 1);
  check('perfect-10',          perfectLevels.length >= 1);
  check('speed-demon',         fastAnswerCount >= 5);
  check('algebra-apprentice',  tier1Complete('algebra'));
  check('algebra-master',      allThreeStar('algebra'));
  check('geometry-apprentice', tier1Complete('geometry'));
  check('geometry-master',     allThreeStar('geometry'));
  check('stats-apprentice',    tier1Complete('statistics'));
  check('stats-master',        allThreeStar('statistics'));
  check('trig-apprentice',     tier1Complete('trigonometry'));
  check('trig-master',         allThreeStar('trigonometry'));
  check('all-rounder',
    tier2Complete('algebra') && tier2Complete('geometry') &&
    tier2Complete('statistics') && tier2Complete('trigonometry')
  );
  check('on-fire',       currentStreak >= 7);
  check('unstoppable',   currentStreak >= 30);
  check('centurion',     sessionXp >= 100);

  return newBadges;
}
