import accountsService from '@/api/accountService';
import { ICurrencyModel, IProfileModel } from '@/api/types';
import { defineStore } from 'pinia';
import { useDictionaryStore } from './dictionariesStore';
import { usePortfolioStore } from './portfolioStore';

interface AccountModel {
  id: number;
  info: IProfileModel;
}
interface IState {
  data: AccountModel;
}
interface IGetter {
  getAccountCurrency: (s: IState) => ICurrencyModel | undefined;
  getPhone: (s: IState) => string;
  getEmail: (s: IState) => string;
  [key: string]: any;
}
interface IAction {
  load: () => Promise<void>;
  clearStore: () => void;
}
export const useAccountStore = defineStore<'account', IState, IGetter, IAction>('account', {
  state: (): IState => ({
    data: {
      id: 2,
      info: {
        name: 'Test',
        nickname: '',
        login: '',
        surname: 'User',
        patronymic: '',
        photoUrl: '',
        dateOfBirth: '',
        gender: '',
        citizenship: '',
        placeOfBirth: '',
        countryOfBirth: '',
        cityOfBirth: '',
        documentType: '',
        passportNumber: '',
        passportIssueDate: '',
        passportExpiryDate: '',
        nbs: '',
        ndu: '',
        issuedBy: '',
        companyName: '',
        companyIndustry: '',
        companyPhone: '',
        companyPosition: '',
        companyWebsite: '',
        isNgo: false,
        isNotWorking: false,
        isNpo: false,
        isSelfEmployed: false,
        hasBeneficiaries: false,
        isPep: false,
        noResidencePermit: false,
        contacts: [],
        addresses: []
      }
    }
  }),
  getters: {
    getAccountCurrency: state => {
      const dictionaryStore = useDictionaryStore();
      const portfolioStore = usePortfolioStore();
      const firstAccount = portfolioStore.data.currentAccount;
      if (!firstAccount) return undefined;
      return dictionaryStore.currencies.find(item => item.id === firstAccount.accountCurrencyId);
    },
    getPhone: state => {
      if (state.data.info.contacts.length) {
        const findItem = state.data.info.contacts.find(
          item => item.isMain && item.contactType === 'phone'
        );
        if (!findItem) {
          return '';
        }
        return findItem.value;
      }
      return '';
    },
    getEmail: state => {
      if (state.data.info.contacts.length) {
        const findItem = state.data.info.contacts.find(
          item => item.isMain && item.contactType === 'email'
        );
        if (!findItem) {
          return '';
        }
        return findItem.value;
      }
      return '';
    }
  },
  actions: {
    async load() {
      try {
        const data = await accountsService.profile(this.data.id);
        this.data = {
          id: 2,
          info: data
        };
      } catch (error) {
        console.error('Ошибка при получении profile:', error);
      }
    },
    clearStore() {
      this.$reset();
    }
  }
});
