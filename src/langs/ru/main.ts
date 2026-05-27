import { header } from './header';
import { portfolio } from './portfolio';
import { profile } from './profile';
import { validations } from './validations';
import { footer } from './footer.ts';
import { pronounce } from './pronounce.ts';
import { reports } from './reports.ts';
import { notice } from './notice.ts';

export const ru = {
  header,
  footer,
  profile,
  portfolio,
  validations,
  pronounce,
  reports,
  notice,
  logout: 'Выйти',
  chooseDate: 'Выберите дату',
  title: {
    portfolio: 'Личный кабинет — Счета',
    market: 'Личный кабинет — Рынок',
    analitics: 'Личный кабинет — Аналитика',
    pronouns: 'Личный кабинет — Поручения',
    profile: 'Личный кабинет — Профиль',
    notifications: 'Личный кабинет — Уведомления',
    reports: 'Личный кабинет — Отчет',
    notfound: 'Личный кабинет — 404'
  }
};
