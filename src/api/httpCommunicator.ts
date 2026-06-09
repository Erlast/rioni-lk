import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/stores/authStore.ts';
import authService from '@/api/authService.ts';
import { useNotify } from '@/stores/notifyStore.ts';
import clearStores from '@/utils/clearStores';
import i18n from '@/utils/i18n';
import { useRoute } from 'vue-router';
import router from '@/router';

const httpCommunicator = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : `${import.meta.env.VITE_API_BASE_URL}`,
  timeout: 50000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Перехватчик запросов для добавления токена авторизации
httpCommunicator.interceptors.request.use(
  config => {
    if (config.url !== '/auth/refresh') {
      const authStore = useAuthStore(); // Получаем доступ к хранилищу Pinia
      const token = authStore.token; // Извлекаем токен
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Перехватчик ответов для обработки ошибок авторизации
httpCommunicator.interceptors.response.use(
  response => {
    //todo:  204 может быть не только для instrument info
    return response;
  },
  async (error: AxiosError) => {
    const status = error.response?.status;
    const url = error.config?.url || '';

    const anyError: any = error;
    if (typeof anyError.status === 'undefined') {
      anyError.status = status;
    }

    if (status === 401 && url !== '/auth/refresh') {
      const authStore = useAuthStore();
      const hasToken = !!authStore.token;

      if (!hasToken) {
        return Promise.reject(anyError);
      }

      try {
        const response = await authService.refreshToken();
        if (error.config?.headers) {
          error.config.headers.Authorization = `Bearer ${response.access_token}`;
        }
        return httpCommunicator.request(error.config!);
      } catch (refreshError) {
        console.error('refreshTokenError', refreshError);

        await Promise.resolve(clearStores(true));
        const notify = useNotify();
        notify.show(
          i18n.global.t('errorSessionLost.message'),
          i18n.global.t('errorSessionLost.description') +
            '<br />' +
            i18n.global.t('errorSessionLost.ps'),
          'warn',
          'session'
        );
        window.location.href = '/auth';
      }
    }

    if (status === 403) {
      const authStore = useAuthStore();
      const hasToken = !!authStore.token;
      const isAuthFlow = url.startsWith('/auth/');

      if (!hasToken || isAuthFlow) {
        return Promise.reject(anyError);
      }

      clearStores(true);
      await router.push({ name: 'auth' });
    }

    return Promise.reject(anyError);
  }
);

export default httpCommunicator;
