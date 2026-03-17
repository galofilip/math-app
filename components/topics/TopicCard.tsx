import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { TopicMeta } from '@/content/topics';
import { useProgress } from '@/hooks/useProgress';

interface Props {
  topic: TopicMeta;
}

export default function TopicCard({ topic }: Props) {
  const router = useRouter();
  const { levelCompletions } = useProgress();

  const topicCompletions = levelCompletions.filter(c => c.topicSlug === topic.slug && c.starsEarned > 0);
  const totalLevels = topic.levels.length;
  const completedCount = topicCompletions.length;
  const pct = totalLevels > 0 ? Math.round((completedCount / totalLevels) * 100) : 0;

  return (
    <Pressable
      className="bg-white rounded-2xl overflow-hidden shadow-sm active:opacity-80"
      onPress={() => router.push(`/play/${topic.slug}` as never)}
    >
      <View className={`${topic.color} px-5 py-4 flex-row items-center gap-4`}>
        <Text className="text-4xl">{topic.emoji}</Text>
        <View className="flex-1">
          <Text className="text-white font-bold text-xl">{topic.label}</Text>
          <Text className="text-white/80 text-sm">{topic.description}</Text>
        </View>
        <Text className="text-white font-bold text-2xl">{pct}%</Text>
      </View>

      <View className="px-5 py-3">
        <View className="flex-row justify-between mb-2">
          <Text className="text-slate-500 text-xs">{completedCount}/{totalLevels} levels</Text>
          <Text className="text-slate-400 text-xs">{pct}% complete</Text>
        </View>
        <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <View className={`h-full ${topic.color} rounded-full`} style={{ width: `${pct}%` }} />
        </View>
      </View>
    </Pressable>
  );
}
