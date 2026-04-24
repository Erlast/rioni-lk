import { IAccountModel } from '@/api/types';
import { defineStore } from 'pinia';
import portfolioService from '@/api/portfolioService';
import { useAccountStore } from './accountStore';

interface PorfolioStoreModel {
  accounts: IAccountModel[];
  currentAccount: IAccountModel | null;
}
interface IState {
  data: PorfolioStoreModel;
}
interface IGetter {
  [key: string]: any;
}
interface IAction {
  load: () => Promise<void>;
  setCurrentAccount: () => void;
  clearStore: () => void;
}
export const usePortfolioStore = defineStore<'portfolio', IState, IGetter, IAction>('portfolio', {
  state: (): IState => ({
    data: {
      accounts: [],
      currentAccount: null
    }
  }),
  getters: {},
  actions: {
    async load() {
      try {
        const accountStore = useAccountStore();
        const data = await portfolioService.portfolios(accountStore.data.id);
        this.data.accounts = data;
      } catch (error) {
        console.error('Ошибка при получении profile:', error);
      }
    },
    setCurrentAccount() {
      this.data.currentAccount = this.data.accounts[0];
    },
    clearStore() {
      this.$reset();
    }
  }
});
