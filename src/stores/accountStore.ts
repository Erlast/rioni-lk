import accountsService from '@/api/accountService';
import { ICurrencyModel, IProfileModel } from '@/api/types';
import { defineStore } from 'pinia';
import { useDictionaryStore } from './dictionariesStore';
import { usePortfolioStore } from './portfolioStore';

interface IState {
  data: IProfileModel;
  accountConfirmStep: number;
}
interface IGetter {
  getAccountCurrency: (s: IState) => ICurrencyModel | undefined;
  getPhone: (s: IState) => string;
  getEmail: (s: IState) => string;
  isNewAccount: (s: IState) => boolean;
  addressingByFIO: (s: IState) => string;

  [key: string]: any;
}
interface IAction {
  load: () => Promise<void>;
  clearStore: () => void;
}
export const useAccountStore = defineStore<'account', IState, IGetter, IAction>('account', {
  state: (): IState => ({
    data: {
      name: 'Test',
      nickname: '',
      login: '',
      surname: 'User',
      patronymic: '',
      photoUrl: '',
      dateOfBirth: '',
      gender: 'M',
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
      addresses: [],
      balance: 0,
      tariffId: null
    },
    accountConfirmStep: 0
  }),
  persist: true,
  getters: {
    getAccountCurrency: state => {
      const dictionaryStore = useDictionaryStore();
      const portfolioStore = usePortfolioStore();
      const firstAccount = portfolioStore.data.currentAccount;
      if (!firstAccount) return undefined;
      return dictionaryStore.currencies.find(item => item.id === firstAccount.accountCurrencyId);
    },
    getPhone: state => {
      if (state.data.contacts.length) {
        const findItem = state.data.contacts.find(
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
      if (state.data.contacts.length) {
        const findItem = state.data.contacts.find(
          item => item.isMain && item.contactType === 'email'
        );
        if (!findItem) {
          return '';
        }
        return findItem.value;
      }
      return '';
    },
    isNewAccount: state => {
      return (
        state.data.addresses.filter(item => item.isConfirmed).length === 0 ||
        state.data.balance === 0 ||
        state.data.tariffId === null
      );
    },
    addressingByFIO: state => {
      return state.data.patronymic
        ? `${state.data.name} ${state.data.patronymic}`
        : state.data.name;
    }
  },
  actions: {
    async load() {
      try {
        this.data = await accountsService.profile();
      } catch (error) {
        console.error('Ошибка при получении profile:', error);
      }
    },
    clearStore() {
      this.$reset();
    }
  }
});
