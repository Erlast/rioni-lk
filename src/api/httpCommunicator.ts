import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/authStore.ts';
import authService from '@/api/authService.ts';
import { useNotify } from '@/stores/notifyStore.ts';
import clearStores from '@/utils/clearStores';
import i18n from '@/utils/i18n';
import router from '@/router';
import { handleError } from '@/utils/errorHandler';

const httpCommunicator = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : `${import.meta.env.VITE_API_BASE_URL}`,
  timeout: 50000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let isRefreshing = false;
let pendingRequests: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function resolvePendingRequests(token: string) {
  pendingRequests.forEach(({ resolve }) => resolve(token));
  pendingRequests = [];
}

function rejectPendingRequests(error: unknown) {
  pendingRequests.forEach(({ reject }) => reject(error));
  pendingRequests = [];
}

function isAuthEndpoint(url: string): boolean {
  return url === '/auth/refresh' || url.startsWith('/auth/');
}

function redirectToAuth() {
  if (router.currentRoute.value.name !== 'auth') {
    router.push({ name: 'auth' });
  }
}

async function handleAuthFailure() {
  await Promise.resolve(clearStores(true));
  const notify = useNotify();
  notify.show(
    i18n.global.t('errors.session.lost.message'),
    i18n.global.t('errors.session.lost.description') +
      '<br />' +
      i18n.global.t('errors.session.lost.ps'),
    'warn',
    'session'
  );
  redirectToAuth();
}

// Перехватчик запросов для добавления токена авторизации
httpCommunicator.interceptors.request.use(
  config => {
    if (config.url !== '/auth/refresh') {
      const authStore = useAuthStore();
      const token = authStore.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

// Перехватчик ответов для централизованной обработки 401/403 и обновления токена
httpCommunicator.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalConfig = error.config as RetriableConfig | undefined;
    const url = originalConfig?.url || '';

    // Сохраняем status в виде non-enumerable свойства — не мутируем публичный API
    // исходного объекта и не нарушаем перечисление enumerable-свойств AxiosError.
    if (status && typeof (error as unknown as { status?: number }).status === 'undefined') {
      Object.defineProperty(error, 'status', {
        value: status,
        writable: true,
        configurable: true,
        enumerable: false
      });
    }

    // Реакция только на 401/403 для не-auth эндпоинтов и только при наличии токена.
    if (status !== 401 && status !== 403) {
      return Promise.reject(error);
    }
    if (isAuthEndpoint(url)) {
      return Promise.reject(error);
    }
    if (originalConfig?._retry) {
      return Promise.reject(error);
    }

    const authStore = useAuthStore();
    if (!authStore.token) {
      return Promise.reject(error);
    }

    // Если refresh ещё не запущен — запускаем его, ретраем текущий запрос,
    // а все остальные запросы ставим в очередь до результата.
    if (!isRefreshing) {
      isRefreshing = true;
      if (originalConfig) {
        originalConfig._retry = true;
      }
      try {
        const response = await authService.refreshToken();
        isRefreshing = false;
        const newToken = response.access_token;

        if (newToken) {
          if (originalConfig?.headers) {
            originalConfig.headers.Authorization = `Bearer ${newToken}`;
          }
          resolvePendingRequests(newToken);
          return httpCommunicator.request(originalConfig!);
        }

        rejectPendingRequests(new Error('Refresh token did not return access_token'));
        handleError(new Error('Refresh token did not return access_token'), {
          category: 'auth',
          context: { source: 'httpCommunicator.refresh' }
        });
        await handleAuthFailure();
        return Promise.reject(new Error('Refresh token did not return access_token'));
      } catch (refreshError) {
        isRefreshing = false;
        rejectPendingRequests(refreshError);
        handleError(refreshError, { category: 'auth', context: { source: 'httpCommunicator.refresh' } });
        await handleAuthFailure();
        return Promise.reject(refreshError);
      }
    }

    // Refresh уже выполняется — ждём его результат и ретраем исходный запрос.
    return new Promise((resolve, reject) => {
      pendingRequests.push({
        resolve: token => {
          if (originalConfig?.headers) {
            originalConfig.headers.Authorization = `Bearer ${token}`;
          }
          resolve(httpCommunicator.request(originalConfig!));
        },
        reject
      });
    });
  }
);

export default httpCommunicator;