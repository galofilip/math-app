import { useUser } from '@clerk/clerk-expo';
import { useMemo } from 'react';
import { getEarnedBadgeIds } from '@/lib/db/queries';

export function useBadges() {
  const { user } = useUser();
  const userId = user?.id ?? 'guest';
  const earnedBadgeIds = useMemo(() => getEarnedBadgeIds(userId), [userId]);
  return { earnedBadgeIds };
}
