import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const TOPICS = [
  { slug: 'algebra',      label: 'Algebra',       emoji: '📐', color: 'bg-blue-500' },
  { slug: 'geometry',     label: 'Geometry',       emoji: '📏', color: 'bg-green-500' },
  { slug: 'statistics',   label: 'Statistics',     emoji: '📊', color: 'bg-orange-500' },
  { slug: 'trigonometry', label: 'Trigonometry',   emoji: '🔺', color: 'bg-purple-500' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerClassName="px-6 pb-10">
        {/* Hero */}
        <View className="items-center mt-10 mb-8">
          <Text className="text-5xl">🧮</Text>
          <Text className="text-3xl font-bold text-slate-800 mt-3">MathQuest</Text>
          <Text className="text-slate-500 text-base mt-1 text-center">
            Master math through interactive challenges.{'\n'}No WiFi needed.
          </Text>
        </View>

        {/* CTA */}
        <Pressable
          className="bg-primary-600 rounded-2xl py-4 items-center mb-8 active:opacity-80"
          onPress={() => router.push('/(tabs)/topics')}
        >
          <Text className="text-white font-bold text-lg">Start Learning</Text>
        </Pressable>

        {/* Topic preview cards */}
        <Text className="text-slate-700 font-semibold text-lg mb-3">Topics</Text>
        <View className="flex-row flex-wrap gap-3">
          {TOPICS.map((t) => (
            <Pressable
              key={t.slug}
              className={`${t.color} rounded-2xl p-5 flex-1 min-w-[45%] active:opacity-80`}
              onPress={() => router.push(`/play/${t.slug}` as never)}
            >
              <Text className="text-3xl">{t.emoji}</Text>
              <Text className="text-white font-bold text-base mt-2">{t.label}</Text>
              <Text className="text-white/80 text-xs mt-1">20 levels</Text>
            </Pressable>
          ))}
        </View>

        {/* Sign-in nudge for guests */}
        <Pressable
          className="mt-8 items-center"
          onPress={() => router.push('/(auth)/sign-in')}
        >
          <Text className="text-primary-600 text-sm">
            Sign in to sync your progress across devices →
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
