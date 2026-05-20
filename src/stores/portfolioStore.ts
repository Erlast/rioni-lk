import { IAccountModel } from '@/api/types';
import { defineStore } from 'pinia';
import portfolioService from '@/api/portfolioService';
import { useAccountStore } from './accountStore';

interface PorfolioStoreModel {
  totalSum: number;
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
      totalSum: 0,
      accounts: [],
      currentAccount: null
    }
  }),
  persist: true,
  getters: {},
  actions: {
    async load() {
      try {
        const accountStore = useAccountStore();
        const { totalSum, accounts } = await portfolioService.portfolios(accountStore.data.id);
        this.data.totalSum = totalSum;
        this.data.accounts = accounts;
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
