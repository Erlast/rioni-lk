import { useAccountStore } from '@/stores/accountStore';

export default function clearStores() {
  const account = useAccountStore();

  account.clearStore();
}
