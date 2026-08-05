import authService from '@/api/authService';
import { useAuthStore } from '@/stores/authStore';
import { useNotify } from '@/stores/notifyStore.ts';
import { ICredentialModel, type ITokenModel } from '@/api/types';

export async function loginStoreData(credential: ICredentialModel) {
  const response = await authService.login(credential);

  await proceedStores(response, credential);
}

export async function proceedStores(data: ITokenModel, credential?: ICredentialModel) {
  const authStore = useAuthStore();
  if (data.access_token) {
    const token = data.access_token;
    const notifyStore = useNotify();
    authStore.setToken(token); // Сохраняем токен в Pinia
    notifyStore.clear();
  } else {
    if (credential) {
      authStore.setDataSms(credential);
    }
    authStore.setIdAuth(data.sms_code_id);
    authStore.setMaskedPhoneNumber(data.phone_masked);
    authStore.setTimerSms(300);
    authStore.setSmsSend(true);
    authStore.setBlockedTimeLeft(0);
  }
}

export const clearTempData = () => {
  const authStore = useAuthStore();
  authStore.setTimerSms(0);
  authStore.setSmsSend(false);
  authStore.setDataSms(undefined);
  authStore.setIdAuth(0);
  authStore.setMaskedPhoneNumber('');
  authStore.setBlockedTimeLeft(0);
};

export const setBlocked = (timeLeft: number) => {
  const authStore = useAuthStore();
  authStore.setBlockedTimeLeft(timeLeft);
  authStore.setSmsSend(true);
  if (timeLeft === 0) {
    clearTempData();
  }
};
