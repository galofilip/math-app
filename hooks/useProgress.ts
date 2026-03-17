/**
 * Abstracts progress reads. Callers don't need to know if user is guest or signed-in.
 */
import { useUser } from '@clerk/clerk-expo';
import { useMemo } from 'react';
import { getProgress, getLevelCompletions } from '@/lib/db/queries';
import { UserProgress, LevelCompletion } from '@/types/progress';

interface UseProgressResult {
  userId: string;
  progress: UserProgress;
  levelCompletions: LevelCompletion[];
}

export function useProgress(): UseProgressResult {
  const { user } = useUser();
  const userId = user?.id ?? 'guest';

  // Synchronous SQLite reads — safe on the JS thread with expo-sqlite sync API
  const progress = useMemo(() => getProgress(userId), [userId]);
  const levelCompletions = useMemo(() => getLevelCompletions(userId), [userId]);

  return { userId, progress, levelCompletions };
}
