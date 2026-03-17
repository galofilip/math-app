import { View, Text } from 'react-native';

const XP_THRESHOLDS = [0, 200, 500, 1000, 2000];

function xpForLevel(level: number): number {
  if (level <= 5) return XP_THRESHOLDS[level - 1] ?? 0;
  return 2000 + (level - 5) * 1000;
}

interface Props {
  xp: number;
  level: number;
}

export default function XPBar({ xp, level }: Props) {
  const current = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const progress = Math.min((xp - current) / (next - current), 1);

  return (
    <View>
      <View className="flex-row justify-between mb-1">
        <Text className="text-slate-600 font-semibold">Level {level}</Text>
        <Text className="text-slate-400 text-xs">{xp} / {next} XP</Text>
      </View>
      <View className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <View
          className="h-full bg-xp rounded-full"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </View>
    </View>
  );
}
