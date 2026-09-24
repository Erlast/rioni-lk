import { header } from './header';
import { portfolio } from './portfolio';
import { profile } from './profile';
import { validations } from './validations';
import { footer } from './footer.ts';
import { pronounce } from './pronounce.ts';
import { reports } from './reports.ts';
import { notice } from './notice.ts';
import { auth } from './auth.ts';
import { topUpAccount } from './topUpAccount.ts';
import { withdrawal } from './withdrawal.ts';
import { countries } from './countries.ts';
import { calendar } from './calendar.ts';
import { errors } from './errors.ts';
import { tariffs } from './tariffs.ts';
import { registration } from './registration.ts';
import { accountConfirm } from './accountConfirm.ts';

export const en = {
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
  logout: 'Logout',
  chooseDate: 'Choose Date',
  back: 'Back',
  next: 'Send',
  phoneNumber: 'Phone Number',
  suffix: 'k',
  title: {
    auth: 'Personal account - Login',
    portfolio: 'Personal account — Portfolio',
    market: 'Personal account — Market',
    analytics: 'Personal account — Analytics',
    pronouns: 'Personal account — Assignments',
    profile: 'Personal account — Profile',
    notifications: 'Personal account — Notifications',
    reports: 'Personal account — Reports',
    notfound: 'Personal account — 404',
    auth_reset_password: 'Personal account - Password recovery',
    under_construct: 'Personal account - Page under construction',
    auth_registration: 'Registration'
  }
};
