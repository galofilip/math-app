import { View, Text } from 'react-native';
import { Badge } from '@/types/rewards';

interface Props {
  badge: Badge;
  earned: boolean;
}

export default function BadgeCard({ badge, earned }: Props) {
  return (
    <View className={`w-20 items-center p-2 rounded-xl ${earned ? 'bg-amber-50' : 'bg-slate-100'}`}>
      <Text className={`text-3xl ${earned ? '' : 'opacity-30'}`}>{badge.emoji}</Text>
      <Text
        className={`text-center text-xs mt-1 font-medium leading-tight ${earned ? 'text-slate-700' : 'text-slate-400'}`}
        numberOfLines={2}
      >
        {badge.name}
      </Text>
    </View>
  );
}
