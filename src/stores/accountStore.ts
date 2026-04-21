import accountsService from '@/api/accountService';
import { IPortfolioModel } from '@/api/types';
import { defineStore } from 'pinia';

interface AccountModel {
  id: number;
  info: IPortfolioModel;
}
interface IState {
  data: AccountModel;
}
interface IGetter {
  [key: string]: any;
}
interface IAction {
  load: () => Promise<void>;
  clearStore: () => void;
}
export const useAccountStore = defineStore<'account', IState, IGetter, IAction>('account', {
  state: (): IState => ({
    data: {
      id: 1,
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
        nbu: ''
      }
    }
  }),
  actions: {
    async load() {
      try {
        const data = await accountsService.portfolio(this.data.id);
        this.data = {
          id: 1,
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
