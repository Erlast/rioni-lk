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
  logout: 'გასვლა',
  chooseDate: 'აირჩიეთ თარიღი',
  back: 'უკან',
  next: 'გაგზავნა',
  phoneNumber: 'ტელეფონის ნომერი',
  title: {
    auth: 'პირადი კაბინეტი - შესვლა',
    portfolio: 'პირადი კაბინეტი — პორტფელი',
    market: 'პირადი კაბინეტი — ბირჟა',
    analytics: 'პირადი კაბინეტი — ანალიტიკა',
    pronouns: 'პირადი კაბინეტი — დავალებები',
    profile: 'პირადი კაბინეტი — პროფილი',
    notifications: 'პირადი კაბინეტი — შეტყობინებები',
    reports: 'პირადი კაბინეტი — ანგარიშგებები',
    notfound: 'პირადი კაბინეტი — 404'
  },
  errorTemporaryUnavailable: {
    message: 'რაღაც შეფერხდა',
    description: 'დროებით მიუწვდომელია'
  },
  errors: {
    pdfGenerateError: 'შეცდომა PDF-ის გენერაციის დროს',
    pdfNotAvailableForDownload: 'ფაილის გაზიარება შეუძლებელია. PDF გადმოიწერება.',
    downloadError: 'ფაილის გაზიარება ვერ მოხერხდა'
  }
};
