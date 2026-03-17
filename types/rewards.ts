export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  xpBonus: number;
}

export interface EarnedBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: string;
  synced: boolean;
}
