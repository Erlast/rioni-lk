import 'vuetify/styles';
import '@/styles/global.scss';
import '@/assets/fonts/webfonts/fonts.scss';

import { createApp } from 'vue';

import router from './router';
import App from './App.vue';

import { createVuetify } from 'vuetify';

import './styles/global.scss';
import './assets/fonts/webfonts/fonts.scss';
import '@mdi/font/css/materialdesignicons.css';
import { rioniIcons } from './assets/icons/rioniIcons.ts';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import i18n from './utils/i18n.ts';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import arraySupport from 'dayjs/plugin/arraySupport';
import 'dayjs/locale/ru';
import { VFileUpload, VFileUploadItem } from 'vuetify/lib/labs/components.js';
import VueApexCharts from 'vue3-apexcharts';
import { registerSentry, type SentryLike } from '@/utils/errorHandler';

// Опциональная интеграция с Sentry. Если @sentry/* ещё не установлен,
// модуль резолвится динамически и приложение продолжает работу
// (ошибки пишутся в console.error как fallback).
async function initSentry(): Promise<void> {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) {
    return;
  }
  try {
    const sentryModule = '@sentry/browser';
    // @ts-ignore — динамический опциональный импорт
    const mod = await import(/* @vite-ignore */ sentryModule).catch(() => null);
    if (!mod || typeof mod.init !== 'function') {
      return;
    }
    mod.init({ dsn });
    const api: SentryLike = {
      captureException: (error, context) => mod.captureException(error, context),
      captureMessage: (message, level) => mod.captureMessage(message, level)
    };
    registerSentry(api);
  } catch {
    // Sentry недоступен — errorHandler использует console fallback.
  }
}

void initSentry();

const savedLocale = localStorage.getItem('user-locale') || 'ru';

const allComponents = {
  ...components,
  VFileUpload,
  VFileUploadItem
};

const vuetify = createVuetify({
  components: allComponents,
  directives,
  theme: {
    defaultTheme: 'light' // 'light' | 'dark' | 'system'
  },
  icons: {
    sets: {
      rioni: rioniIcons
    }
  },
  defaults: {
    global: {
      ripple: false
    },
    VSheet: {
      class: 'bg-transparent'
    },
    VTextField: {
      autocomplete: 'off'
    },
    VSelect: {
      autocomplete: 'off'
    }
  },
  display: {
    mobileBreakpoint: 960
  }
});

dayjs.extend(updateLocale);
dayjs.extend(arraySupport);
dayjs.locale(savedLocale);
dayjs.updateLocale(savedLocale, {
  weekStart: savedLocale === 'ru' ? 1 : 0
});

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(i18n);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(VueApexCharts);
app.mount('#app');
