import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopicCard from '@/components/topics/TopicCard';
import { TOPICS } from '@/content/topics';

export default function TopicsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerClassName="px-6 pb-10">
        <Text className="text-2xl font-bold text-slate-800 mt-6 mb-1">Topics</Text>
        <Text className="text-slate-500 mb-6">Choose a subject to practice</Text>
        <View className="gap-4">
          {TOPICS.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
