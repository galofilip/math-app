import { create } from 'zustand';

interface AppStore {
  /** IDs of badges to show in the unlock modal (consumed one by one) */
  pendingBadgeIds: string[];
  addPendingBadges: (ids: string[]) => void;
  shiftPendingBadge: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  pendingBadgeIds: [],
  addPendingBadges: (ids) =>
    set((s) => ({ pendingBadgeIds: [...s.pendingBadgeIds, ...ids] })),
  shiftPendingBadge: () =>
    set((s) => ({ pendingBadgeIds: s.pendingBadgeIds.slice(1) })),
}));
