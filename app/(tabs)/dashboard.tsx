import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@clerk/clerk-expo';
import XPBar from '@/components/rewards/XPBar';
import StreakCounter from '@/components/rewards/StreakCounter';
import { useProgress } from '@/hooks/useProgress';

export default function DashboardScreen() {
  const { user, isSignedIn } = useUser();
  const { progress } = useProgress();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerClassName="px-6 pb-10">
        <Text className="text-2xl font-bold text-slate-800 mt-6 mb-1">
          {isSignedIn ? `Welcome back, ${user?.firstName ?? 'Mathlete'}!` : 'Your Progress'}
        </Text>
        <Text className="text-slate-500 mb-6">
          {isSignedIn ? 'Your progress is synced across devices.' : 'Sign in to sync your progress.'}
        </Text>

        {/* XP and Level */}
        <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
          <Text className="text-slate-500 text-xs font-semibold uppercase mb-3">Math Level</Text>
          <XPBar xp={progress.totalXp} level={progress.mathLevel} />
        </View>

        {/* Streak */}
        <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
          <Text className="text-slate-500 text-xs font-semibold uppercase mb-3">Daily Streak</Text>
          <StreakCounter streak={progress.currentStreak} lastPlayedDate={progress.lastPlayedDate} />
        </View>

        {/* Stats summary */}
        <View className="flex-row gap-3">
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm items-center">
            <Text className="text-2xl font-bold text-primary-600">{progress.totalXp}</Text>
            <Text className="text-slate-500 text-xs mt-1">Total XP</Text>
          </View>
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm items-center">
            <Text className="text-2xl font-bold text-orange-500">{progress.currentStreak}</Text>
            <Text className="text-slate-500 text-xs mt-1">Day Streak</Text>
          </View>
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm items-center">
            <Text className="text-2xl font-bold text-green-500">{progress.mathLevel}</Text>
            <Text className="text-slate-500 text-xs mt-1">Level</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
