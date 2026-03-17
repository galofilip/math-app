import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { migrateGuestProgress } from '@/lib/db/sync';

export default function SignUpScreen() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const result = await signUp.create({ emailAddress: email, password });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        // Migrate any guest progress to the new account
        if (result.createdUserId) {
          await migrateGuestProgress(result.createdUserId);
        }
        router.replace('/(tabs)/topics');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign up failed';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 px-6 justify-center">
        <Pressable className="mb-8" onPress={() => router.back()}>
          <Text className="text-primary-600">← Back</Text>
        </Pressable>

        <Text className="text-3xl font-bold text-slate-800 mb-2">Create account</Text>
        <Text className="text-slate-500 mb-8">Your guest progress will be saved</Text>

        <Text className="text-slate-600 font-medium mb-1">Email</Text>
        <TextInput
          className="bg-white border border-slate-200 rounded-xl px-4 py-3 mb-4 text-slate-800"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text className="text-slate-600 font-medium mb-1">Password</Text>
        <TextInput
          className="bg-white border border-slate-200 rounded-xl px-4 py-3 mb-6 text-slate-800"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          className="bg-primary-600 rounded-2xl py-4 items-center active:opacity-80 disabled:opacity-50"
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text className="text-white font-bold text-base">
            {loading ? 'Creating account…' : 'Sign Up'}
          </Text>
        </Pressable>

        <Pressable className="mt-4 items-center" onPress={() => router.push('/(auth)/sign-in')}>
          <Text className="text-slate-500">
            Have an account? <Text className="text-primary-600 font-medium">Sign in</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
