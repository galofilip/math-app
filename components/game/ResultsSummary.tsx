import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { SessionResult } from '@/types/progress';

interface Props {
  result: SessionResult;
  topicSlug: string;
  levelId: string;
}

function Stars({ count }: { count: number }) {
  return (
    <View className="flex-row gap-1 justify-center my-3">
      {[1, 2, 3].map((n) => (
        <MotiView
          key={n}
          from={{ scale: 0 }}
          animate={{ scale: n <= count ? 1 : 0.4 }}
          transition={{ type: 'spring', delay: n * 200 }}
        >
          <Text className={`text-4xl ${n <= count ? '' : 'opacity-20'}`}>⭐</Text>
        </MotiView>
      ))}
    </View>
  );
}

export default function ResultsSummary({ result, topicSlug, levelId }: Props) {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-50 items-center justify-center px-6">
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 w-full items-center shadow-sm"
      >
        <Text className="text-2xl font-bold text-slate-800 mb-1">
          {result.score}/10
        </Text>
        <Text className="text-slate-500 mb-2">Questions correct</Text>

        <Stars count={result.starsEarned} />

        <View className="flex-row gap-4 my-4">
          <View className="items-center">
            <Text className="text-2xl font-bold text-xp">+{result.xpEarned}</Text>
            <Text className="text-slate-500 text-xs">XP earned</Text>
          </View>
          {result.newBadgeIds.length > 0 && (
            <View className="items-center">
              <Text className="text-2xl font-bold text-amber-500">{result.newBadgeIds.length}</Text>
              <Text className="text-slate-500 text-xs">New badges</Text>
            </View>
          )}
        </View>

        <View className="w-full gap-3 mt-2">
          <Pressable
            className="bg-primary-600 rounded-2xl py-3 items-center active:opacity-80"
            onPress={() => router.replace(`/play/${topicSlug}/${levelId}` as never)}
          >
            <Text className="text-white font-bold">Play Again</Text>
          </Pressable>
          <Pressable
            className="border border-slate-200 rounded-2xl py-3 items-center active:opacity-70"
            onPress={() => router.replace(`/play/${topicSlug}` as never)}
          >
            <Text className="text-slate-700 font-medium">Back to Levels</Text>
          </Pressable>
        </View>
      </MotiView>
    </View>
  );
}
