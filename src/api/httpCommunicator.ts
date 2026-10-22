import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useNotify } from '@/stores/notifyStore.ts';
import clearStores from '@/utils/clearStores';
import i18n from '@/utils/i18n';
import router from '@/router';
import { handleError } from '@/utils/errorHandler';
import { keycloak } from '@/utils/keycloak.ts';

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
let isHandlingAuthFailure = false;
async function handleAuthFailure() {
  if (isHandlingAuthFailure) return;
  isHandlingAuthFailure = true;
  clearStores();
  const notify = useNotify();
  notify.show(
    i18n.global.t('errors.session.lost.message'),
    i18n.global.t('errors.session.lost.description') +
      '<br />' +
      i18n.global.t('errors.session.lost.ps'),
    'warn',
    'session'
  );

  await keycloak.login({
    redirectUri: window.location.origin + router.currentRoute.value.path
  });
}

httpCommunicator.interceptors.request.use(
  config => {
    if (config.url !== '/auth/refresh') {
      if (keycloak.authenticated && keycloak.token) {
        config.headers.Authorization = `Bearer ${keycloak.token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

httpCommunicator.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalConfig = error.config as RetriableConfig | undefined;
    const url = originalConfig?.url || '';

    if (status && typeof (error as unknown as { status?: number }).status === 'undefined') {
      Object.defineProperty(error, 'status', {
        value: status,
        writable: true,
        configurable: true,
        enumerable: false
      });
    }

    if (status !== 401) {
      return Promise.reject(error);
    }
    if (isAuthEndpoint(url)) {
      return Promise.reject(error);
    }
    if (originalConfig?._retry) {
      return Promise.reject(error);
    }

    if (!keycloak.authenticated) {
      return Promise.reject(error);
    }

    if (!isRefreshing) {
      isRefreshing = true;
      if (originalConfig) {
        originalConfig._retry = true;
      }
      try {
        const refreshed = await keycloak.updateToken(30);
        isRefreshing = false;
        if (refreshed && keycloak.token) {
          if (originalConfig?.headers) {
            originalConfig.headers.Authorization = `Bearer ${keycloak.token}`;
          }
          resolvePendingRequests(keycloak.token);
          return httpCommunicator.request(originalConfig!);
        }

        rejectPendingRequests(new Error('Keycloak token refresh failed'));
        handleError(new Error('Refresh token did not return access_token'), {
          category: 'auth',
          context: { source: 'httpCommunicator.refresh' }
        });
        await handleAuthFailure();
        return Promise.reject(new Error('Keycloak token refresh failed'));
      } catch (refreshError) {
        isRefreshing = false;
        rejectPendingRequests(refreshError);
        handleError(refreshError, {
          category: 'auth',
          context: { source: 'httpCommunicator.refresh' }
        });
        await handleAuthFailure();
        return Promise.reject(refreshError);
      }
    }

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