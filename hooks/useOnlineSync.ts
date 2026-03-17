import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useUser } from '@clerk/clerk-expo';
import { syncToCloud } from '@/lib/db/sync';

/**
 * Triggers a cloud sync whenever the device comes online and the user is signed in.
 */
export function useOnlineSync() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable) {
        syncToCloud(user.id).catch(console.error);
      }
    });
    return () => unsubscribe();
  }, [user?.id]);
}
