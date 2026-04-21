import { createI18n } from 'vue-i18n';
import { messages } from '@/langs/main'

const i18n = createI18n({
  legacy: false,
  locale: 'ru', // Установите язык по умолчанию
  messages
});

export default i18n;
