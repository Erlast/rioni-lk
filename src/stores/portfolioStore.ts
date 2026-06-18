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
  persist: true,
  getters: {},
  actions: {
    async load() {
      try {
        const { accounts } = await portfolioService.portfolios();
        this.data.accounts = accounts;
      } catch (error) {
        console.error('Ошибка при получении profile:', error);
      }
    },
    setCurrentAccount() {
      if (!this.data.currentAccount) {
        this.data.currentAccount = this.data.accounts[0];
      } else {
        const findAccount = this.data.accounts.find(
          item => item.id === this.data.currentAccount?.id
        );

        this.data.currentAccount = findAccount ?? null;
      }
    },
    clearStore() {
      this.$reset();
    }
  }
});
