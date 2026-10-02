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
import { countries } from './countries.ts';
import { calendar } from './calendar.ts';
import { errors } from './errors.ts';
import { tariffs } from './tariffs.ts';
import { registration } from './registration.ts';
import { accountConfirm } from './accountConfirm.ts';
import notification from '@/modules/notification/components/Notification.vue';

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
  countries,
  calendar,
  errors,
  tariffs,
  registration,
  accountConfirm,
  logout: 'Выйти',
  chooseDate: 'Выберите дату',
  back: 'Назад',
  next: 'Отправить',
  phoneNumber: 'Номер телефона',
  suffix: 'тыс.',
  title: {
    auth: 'Личный кабинет - Вход',
    portfolio: 'Личный кабинет — Счета',
    market: 'Личный кабинет — Рынок',
    analytics: 'Личный кабинет — Аналитика',
    pronouns: 'Личный кабинет — Поручения',
    profile: 'Личный кабинет — Профиль',
    notifications: 'Личный кабинет — Уведомления',
    reports: 'Личный кабинет — Отчет',
    notfound: 'Личный кабинет — 404',
    auth_reset_password: 'Личный кабинет - Восстановление пароля',
    under_construct: 'Личный кабинет - Страница в разработке',
    auth_registration: 'Регистрация'
  },
  notification: {
    sessionEnd: {
      description: 'Ваша сессия истекла. Повторите вход.',
      mobileDescription: 'Ваша сессия истекла. Повторите вход.'
    }
  }
};
