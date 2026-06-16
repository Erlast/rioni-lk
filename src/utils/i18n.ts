import { createI18n } from 'vue-i18n';
import { messages } from '@/langs/main';

const savedLocale = localStorage.getItem('user-locale') || 'ru';

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages
});

export default i18n;
