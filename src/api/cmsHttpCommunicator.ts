import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const cmsHttpCommunicator = axios.create({
  baseURL: import.meta.env.DEV ? '/cms' : import.meta.env.VITE_API_CMS_URL,
  timeout: 50000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let pendingRequests: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

// Перехватчик запросов для добавления токена авторизации
cmsHttpCommunicator.interceptors.request.use(
  config => {
    const token = import.meta.env.VITE_API_CMS_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

// Перехватчик ответов для централизованной обработки 401/403 и обновления токена
cmsHttpCommunicator.interceptors.response.use(
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

    // Refresh уже выполняется — ждём его результат и ретраем исходный запрос.
    return new Promise((resolve, reject) => {
      pendingRequests.push({
        resolve: token => {
          if (originalConfig?.headers) {
            originalConfig.headers.Authorization = `Bearer ${token}`;
          }
          resolve(cmsHttpCommunicator.request(originalConfig!));
        },
        reject
      });
    });
  }
);

export default cmsHttpCommunicator;
