import { useAccountStore } from '@/stores/accountStore';
import { useAuthStore } from '@/stores/authStore';

export default function clearStores(flushToken: boolean = false) {
  const account = useAccountStore();
  const authStore = useAuthStore();

  //account.stopAutoUpdate();

  account.clearStore();
  if (flushToken) {
    authStore.clearToken();
  }
  authStore.setDataSms(undefined);
}
