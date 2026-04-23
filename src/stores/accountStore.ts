import accountsService from '@/api/accountService';
import { ICurrencyModel, IPortfolioModel } from '@/api/types';
import { defineStore } from 'pinia';
import { useDictionaryStore } from './dictionariesStore';

interface AccountModel {
  id: number;
  info: IPortfolioModel;
}
interface IState {
  data: AccountModel;
}
interface IGetter {
  getAccountCurrency: (s: IState) => ICurrencyModel | undefined;
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
        surname: 'User',
        patronymic: '',
        photoUrl: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        citizenship: '',
        placeOfBirth: '',
        documentType: '',
        passportNumber: '',
        passportIssueDate: '',
        passportExpiryDate: '',
        nbs: '',
        ndu: '',
        account: {
          accountType: '',
          accountNumber: '',
          accountCurrencyId: 1
        }
      }
    }
  }),
  getters: {
    getAccountCurrency: state => {
      const dictionaryStore = useDictionaryStore();
      return dictionaryStore.currencies.find(
        item => item.id === state.data.info.account.accountCurrencyId
      );
    }
  },
  actions: {
    async load() {
      try {
        const data = await accountsService.portfolio(this.data.id);
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
