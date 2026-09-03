import { InstrumentTypes } from './enum';

type gender = 'F' | 'M';
export interface IProfileModel {
  name: string;
  nickname: string;
  login: string;
  surname: string;
  patronymic: string;
  photoUrl: string;
  dateOfBirth: string;
  gender: gender;
  citizenship: string;
  placeOfBirth: string;
  documentType: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  nbs: string;
  ndu: string;
  countryOfBirth: string;
  cityOfBirth: string;
  issuedBy: string;
  companyName: string;
  companyIndustry: string;
  companyPhone: string;
  companyPosition: string;
  companyWebsite: string;
  isNgo: boolean;
  isNotWorking: boolean;
  isNpo: boolean;
  isSelfEmployed: boolean;
  hasBeneficiaries: boolean;
  isPep: boolean;
  noResidencePermit: boolean;
  contacts: IProfileContactModel[];
  addresses: IProfileAddressModel[];
  balance: number;
  tariffId: number | null;
  tariffStartDate: string | null;
}

export interface IDictionariesModel {
  dictionaries: { currencies: ICurrencyModel[] };
}
export interface ICurrencyModel {
  id: number;
  title: string;
  symbol: string;
}

export interface IAccountModel {
  id: number;
  accountType: string;
  accountNumber: string;
  accountCurrencyId: number;
  balance: number;
  tradingFunds: number;
  fundsInTransit: number;
  deposit: number;
}

export interface IPortfoliosModel {
  totalSum: number;
  accounts: IAccountModel[];
}

export interface IPortfolioModel {
  assets: IAssetModel[];
  profit: IProfitModel;
  paperSum: number;
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
}

export interface IAssetModel {
  assetId: number;
  baseTicker: string;
  baseMarket: string;
  assetName: string;
  logo: string;
  assetTypeCode: InstrumentTypes;
  currency: number;
  amount: number;
  profit: number;
  purchasePrice: number;
  balanceValue: number;
  bid: number;
  ask: number;
  investedValue: number;
  active: boolean;
}

export interface IPortfolioAssetsParams {
  page: number;
  perPage: number;
  search: string;
  types: string[] | null;
}

export interface IProfitModel {
  investedSum: number;
  totalDiff: number;
}

export type contactType = 'email' | 'phone';

export interface IProfileContactModel {
  id: number;
  contactType: contactType;
  isMain: boolean;
  value: string;
  isConfirmed: boolean;
}
export type addressType = 'registration' | 'actual';
export interface IProfileAddressModel {
  id: number;
  addressType: addressType;
  isMain: boolean;
  country: string | null;
  city: string;
  postcode: string;
  address: string;
  isConfirmed: boolean;
}

export interface ITaxResidenceModel {
  id: number;
  country: string | null;
  inn: string;
}

export interface IResidencePermit {
  id: number;
  country: string | null;
  issuedBy: string;
  documentNumber: string;
  stayPeriod: string;
}

export interface IBankAccountModel {
  id: number;
  country: string | null;
  bankName: string;
  iban: string;
  swift: string;
  isMain: boolean;
  isConfirmed: boolean;
  isBlocked: boolean;
}

export interface IAccountCostModel {
  time: number;
  value: number;
}

export interface IAccountYieldModel {
  accountYield: number;
  accountPercent: number;
}

export interface IAccountAttributes {
  is_iia: boolean;
  is_vip: boolean;
  account_kind: number;
  part_type: 'pers' | 'org' | string;
}

export interface ITokenModel {
  access_token?: string;
  token_type?: 'bearer' | string;
  sms_code_id?: number;
  phone_masked?: string;
}

export interface ICredentialModel {
  login: string;
  password: string;
}

export interface ICodeModel {
  sms_code_id: number | undefined;
  code: string;
}

export interface IOrdersModel {
  orders: IOrderModel[];
}

export interface IOrderModel {
  id: number;
  account_id: number;
  order_number: string;
  created_at: string;
  executed_at: string;
  operation: string;
  cb: string;
  quantity: number;
  amount: number;
  status: number;
}

export interface IContactModel {
  value: string;
  type: 'phone' | 'email' | 'login'
}

export interface IRegistrationModel {
  name: string;
  login?: string;
  phone: string;
  email: string;
  password?: string;
  confirm_password?: string;
  privacy_policy: boolean;
  confirm_adds: boolean;
}

export interface IRegistrationSendSmsModel {
  phone: string;
}

export type languageType = 'ru' | 'ge' | 'en';

export interface IGlossaryModel {
  id: number;
  source_no: number;
  language: languageType;
  letter: string;
  term: string;
  english: string;
  definition: string;
}

export interface INBGRatesModel {
  rates: IRateModel[];
  rss_date: string;
}

export interface IRateModel {
  code: string;
  rate: string;
  change: string;
  direction: string;
  icon: string;
}

export interface ITariffModel {
  id: number;
  name: string;
  description: string;
}
