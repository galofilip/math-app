import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.replace('/(tabs)/topics');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign in failed';
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

        <Text className="text-3xl font-bold text-slate-800 mb-2">Welcome back</Text>
        <Text className="text-slate-500 mb-8">Sign in to sync your progress</Text>

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
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text className="text-white font-bold text-base">
            {loading ? 'Signing in…' : 'Sign In'}
          </Text>
        </Pressable>

        <Pressable className="mt-4 items-center" onPress={() => router.push('/(auth)/sign-up')}>
          <Text className="text-slate-500">
            No account? <Text className="text-primary-600 font-medium">Sign up</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
