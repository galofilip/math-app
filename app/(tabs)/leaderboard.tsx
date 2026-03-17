import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LeaderboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerClassName="px-6 pb-10">
        <Text className="text-2xl font-bold text-slate-800 mt-6 mb-1">Leaderboard</Text>
        <Text className="text-slate-500 mb-6">Weekly XP rankings</Text>
        <View className="bg-white rounded-2xl p-8 items-center shadow-sm">
          <Text className="text-4xl mb-3">🏆</Text>
          <Text className="text-slate-700 font-semibold text-center">
            Sign in to appear on the leaderboard and compete with others!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
