import { View, Text, Pressable, Modal } from 'react-native';
import { MotiView } from 'moti';
import { useAppStore } from '@/store/appStore';
import { ALL_BADGES } from '@/content/badges';

export default function BadgeUnlockModal() {
  const pendingBadgeIds = useAppStore(s => s.pendingBadgeIds);
  const shiftPendingBadge = useAppStore(s => s.shiftPendingBadge);

  const badgeId = pendingBadgeIds[0];
  const badge = ALL_BADGES.find(b => b.id === badgeId);

  if (!badge) return null;

  return (
    <Modal transparent animationType="fade" visible>
      <View className="flex-1 bg-black/60 items-center justify-center px-8">
        <MotiView
          from={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="bg-white rounded-3xl p-8 w-full items-center"
        >
          <Text className="text-6xl mb-3">{badge.emoji}</Text>
          <Text className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-1">
            Badge Unlocked!
          </Text>
          <Text className="text-2xl font-bold text-slate-800 text-center mb-2">{badge.name}</Text>
          <Text className="text-slate-500 text-center text-sm mb-2">{badge.description}</Text>
          {badge.xpBonus > 0 && (
            <Text className="text-xp font-bold">+{badge.xpBonus} XP bonus</Text>
          )}
          <Pressable
            className="mt-6 bg-primary-600 rounded-2xl py-3 px-8 active:opacity-80"
            onPress={shiftPendingBadge}
          >
            <Text className="text-white font-bold">Awesome!</Text>
          </Pressable>
        </MotiView>
      </View>
    </Modal>
  );
}
