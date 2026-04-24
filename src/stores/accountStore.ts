import accountsService from '@/api/accountService';
import { ICurrencyModel, IProfileModel } from '@/api/types';
import { defineStore } from 'pinia';
import { useDictionaryStore } from './dictionariesStore';

interface AccountModel {
  id: number;
  info: IProfileModel;
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
        accounts: [
          {
            accountType: '',
            accountNumber: '',
            accountCurrencyId: 1
          }
        ]
      }
    }
  }),
  getters: {
    getAccountCurrency: state => {
      const dictionaryStore = useDictionaryStore();
      const firstAccount = state.data.info.accounts[0];
      if (!firstAccount) return undefined;
      return dictionaryStore.currencies.find(item => item.id === firstAccount.accountCurrencyId);
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
