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

export const ge = {
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
  logout: 'გასვლა',
  chooseDate: 'აირჩიეთ თარიღი',
  back: 'უკან',
  next: 'გაგზავნა',
  phoneNumber: 'ტელეფონის ნომერი',
  suffix: 'ათასი',
  title: {
    auth: 'პირადი კაბინეტი - შესვლა',
    portfolio: 'პირადი კაბინეტი — პორტფელი',
    market: 'პირადი კაბინეტი — ბირჟა',
    analytics: 'პირადი კაბინეტი — ანალიტიკა',
    pronouns: 'პირადი კაბინეტი — დავალებები',
    profile: 'პირადი კაბინეტი — პროფილი',
    notifications: 'პირადი კაბინეტი — შეტყობინებები',
    reports: 'პირადი კაბინეტი — ანგარიშგებები',
    notfound: 'პირადი კაბინეტი — 404',
    auth_reset_password: 'პირადი კაბინეტი - პაროლის აღდგენა',
    under_construct: 'პირადი კაბინეტი - გვერდი მუშავდება',
    auth_registration: 'რეგისტრაცია'
  }
};
