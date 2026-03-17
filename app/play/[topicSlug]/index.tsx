import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import LevelMap from '@/components/topics/LevelMap';
import { TOPICS } from '@/content/topics';
import { useProgress } from '@/hooks/useProgress';

export default function LevelSelectScreen() {
  const { topicSlug } = useLocalSearchParams<{ topicSlug: string }>();
  const topic = TOPICS.find((t) => t.slug === topicSlug);
  const { levelCompletions } = useProgress();

  if (!topic) return null;

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerClassName="px-6 pb-10">
        <View className="flex-row items-center gap-3 mt-6 mb-2">
          <Text className="text-4xl">{topic.emoji}</Text>
          <View>
            <Text className="text-2xl font-bold text-slate-800">{topic.label}</Text>
            <Text className="text-slate-500 text-sm">{topic.description}</Text>
          </View>
        </View>
        <LevelMap
          topicSlug={topic.slug}
          levels={topic.levels}
          completions={levelCompletions}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
