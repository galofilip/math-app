import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Level } from '@/types/game';
import { LevelCompletion } from '@/types/progress';

interface Props {
  topicSlug: string;
  levels: Level[];
  completions: LevelCompletion[];
}

const TIER_LABELS: Record<number, string> = {
  1: 'Tier 1 — Foundations',
  2: 'Tier 2 — Application',
  3: 'Tier 3 — Challenge',
  4: 'Tier 4 — Mastery',
};

function Stars({ count }: { count: number }) {
  return (
    <View className="flex-row">
      {[1, 2, 3].map(n => (
        <Text key={n} className={`text-xs ${n <= count ? 'text-amber-400' : 'text-slate-200'}`}>★</Text>
      ))}
    </View>
  );
}

export default function LevelMap({ topicSlug, levels, completions }: Props) {
  const router = useRouter();
  const completionMap = new Map(completions.map(c => [c.levelId, c]));

  const tiers = [1, 2, 3, 4] as const;

  return (
    <View className="mt-4">
      {tiers.map(tier => {
        const tierLevels = levels.filter(l => l.tier === tier);
        return (
          <View key={tier} className="mb-6">
            <Text className="text-slate-500 font-semibold text-xs uppercase tracking-wider mb-3">
              {TIER_LABELS[tier]}
            </Text>
            <View className="gap-2">
              {tierLevels.map((level, i) => {
                const completion = completionMap.get(level.id);
                const stars = completion?.starsEarned ?? 0;
                const attempted = (completion?.attempts ?? 0) > 0;

                // Level is locked if previous level in same topic not yet attempted
                // Tier 1 levels are always unlocked; others unlock after tier 1 complete
                const tierOneDone = levels
                  .filter(l => l.tier === 1)
                  .every(l => (completionMap.get(l.id)?.starsEarned ?? 0) > 0);
                const isLocked = tier > 1 && !tierOneDone;

                return (
                  <Pressable
                    key={level.id}
                    className={`flex-row items-center gap-4 rounded-2xl p-4 border ${
                      isLocked
                        ? 'bg-slate-50 border-slate-100 opacity-50'
                        : stars > 0
                        ? 'bg-green-50 border-green-200'
                        : attempted
                        ? 'bg-orange-50 border-orange-200'
                        : 'bg-white border-slate-200'
                    } active:opacity-70`}
                    disabled={isLocked}
                    onPress={() => router.push(`/play/${topicSlug}/${level.id}` as never)}
                  >
                    {/* Level number bubble */}
                    <View className={`w-10 h-10 rounded-full items-center justify-center ${
                      stars === 3 ? 'bg-amber-400' : stars > 0 ? 'bg-green-400' : 'bg-slate-200'
                    }`}>
                      <Text className="font-bold text-white text-sm">{tier}.{level.tierIndex}</Text>
                    </View>

                    <View className="flex-1">
                      <Text className="text-slate-800 font-semibold">{level.title}</Text>
                      <Text className="text-slate-400 text-xs">{level.description}</Text>
                    </View>

                    <View className="items-end gap-1">
                      <Stars count={stars} />
                      {isLocked && <Text className="text-xs">🔒</Text>}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
}
