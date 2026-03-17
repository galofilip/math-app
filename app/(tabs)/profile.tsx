import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import BadgeCard from '@/components/rewards/BadgeCard';
import { useBadges } from '@/hooks/useBadges';
import { ALL_BADGES } from '@/content/badges';

export default function ProfileScreen() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  const { earnedBadgeIds } = useBadges();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView contentContainerClassName="px-6 pb-10">
        {/* Header */}
        <View className="items-center mt-8 mb-6">
          <View className="w-20 h-20 rounded-full bg-primary-100 items-center justify-center mb-3">
            <Text className="text-3xl">{isSignedIn ? '🧑‍🎓' : '👤'}</Text>
          </View>
          <Text className="text-xl font-bold text-slate-800">
            {isSignedIn ? (user?.fullName ?? user?.emailAddresses[0].emailAddress) : 'Guest Player'}
          </Text>
          {!isSignedIn && (
            <Pressable
              className="mt-2"
              onPress={() => router.push('/(auth)/sign-in')}
            >
              <Text className="text-primary-600 text-sm">Sign in to save progress →</Text>
            </Pressable>
          )}
        </View>

        {/* Badges */}
        <Text className="text-slate-700 font-semibold text-lg mb-3">Badges</Text>
        <View className="flex-row flex-wrap gap-3 mb-6">
          {ALL_BADGES.map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              earned={earnedBadgeIds.includes(badge.id)}
            />
          ))}
        </View>

        {/* Sign out */}
        {isSignedIn && (
          <Pressable
            className="border border-red-200 rounded-xl py-3 items-center active:opacity-70"
            onPress={() => signOut()}
          >
            <Text className="text-red-500 font-medium">Sign Out</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
