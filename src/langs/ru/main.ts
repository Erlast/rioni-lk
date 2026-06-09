import { header } from './header';
import { portfolio } from './portfolio';
import { profile } from './profile';
import { validations } from './validations';
import { footer } from './footer.ts';
import { pronounce } from './pronounce.ts';
import { reports } from './reports.ts';
import { notice } from './notice.ts';
import { topUpAccount } from './topUpAccount.ts';
import { withdrawal } from './withdrawal.ts';
import { auth } from './auth.ts';

export const ru = {
  header,
  footer,
  profile,
  portfolio,
  validations,
  pronounce,
  reports,
  notice,
  topUpAccount,
  withdrawal,
  auth,
  logout: 'Выйти',
  chooseDate: 'Выберите дату',
  back: 'Назад',
  next: 'Отправить',
  title: {
    auth: 'Личный какбинет - Вход',
    portfolio: 'Личный кабинет — Счета',
    market: 'Личный кабинет — Рынок',
    analitics: 'Личный кабинет — Аналитика',
    pronouns: 'Личный кабинет — Поручения',
    profile: 'Личный кабинет — Профиль',
    notifications: 'Личный кабинет — Уведомления',
    reports: 'Личный кабинет — Отчет',
    notfound: 'Личный кабинет — 404'
  },
  errorTemporaryUnavailable: {
    message: 'Что-то пошло не так',
    description: 'Временно недоступно'
  },
  errors: {
    pdfGenerateError: 'Ошибка при генерации PDF',
    pdfNotAvailableForDownload: 'Поделиться файлом невозможно. PDF будет скачан.',
    downloadError: 'Не удалось поделиться файлом'
  }
};
