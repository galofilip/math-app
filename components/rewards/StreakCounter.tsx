import { View, Text } from 'react-native';

interface Props {
  streak: number;
  lastPlayedDate: string | null;
}

export default function StreakCounter({ streak, lastPlayedDate }: Props) {
  const today = new Date().toISOString().split('T')[0];
  const playedToday = lastPlayedDate === today;
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const atRisk = lastPlayedDate === yesterday;

  return (
    <View className="flex-row items-center gap-3">
      <Text className="text-4xl">{streak > 0 ? '🔥' : '💤'}</Text>
      <View>
        <Text className="text-2xl font-bold text-orange-500">{streak} {streak === 1 ? 'day' : 'days'}</Text>
        {playedToday && <Text className="text-green-600 text-xs">You played today!</Text>}
        {atRisk && !playedToday && <Text className="text-amber-600 text-xs">Play today to keep your streak!</Text>}
        {!playedToday && !atRisk && streak === 0 && <Text className="text-slate-400 text-xs">Play to start a streak</Text>}
      </View>
    </View>
  );
}
