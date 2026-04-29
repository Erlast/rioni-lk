import { InstrumentTypes } from './enum';

export interface IProfileModel {
  name: string;
  surname: string;
  patronymic: string;
  photoUrl: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  citizenship: string;
  placeOfBirth: string;
  documentType: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  nbs: string;
  ndu: string;
  accounts: IAccountModel[];
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
}

export interface IPortfolioModel {
  assets: IAssetModel[];
  profit: IProfitModel;
  paperSum: number;
}

export interface IAssetModel {
  assetId: number;
  baseTicker: string;
  baseMarket: string;
  assetName: string;
  logo: string;
  assetTypeCode: InstrumentTypes;
  currnecy: number;
  amount: number;
  profit: number;
  purchasePrice: number;
  balanceValue: number;
  bid: number;
  ask: number;
  investedValue: number;
  active: boolean
}

export interface IProfitModel {
  investedSum: number;
  totalDiff: number;
}
