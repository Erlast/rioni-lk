import portfolioService from '@/api/portfolioService';
import { useNotify } from '@/stores/notifyStore';
import { defineStore } from 'pinia';
import { IAssetModel, IPortfolioAssetsParams, IPortfolioModel } from '@/api/types';
import { InstrumentTypes as IT } from '@/api/enum';
import {
  createIntervalUpdateActions,
  IIntervalUpdateActions,
  IIntervalUpdateState,
  intervalUpdateState
} from '@/stores/intervalUpdateStore';
import { usePortfolioStore } from '@/stores/portfolioStore.ts';

interface IState extends IIntervalUpdateState {
  data: IPortfolioModel;
  loading: boolean;
  params: IPortfolioAssetsParams;
  error?: Error;
}

interface IGetters {
  getAssets: (state: IState) => IAssetModel[];

  [key: string]: any;
}

interface IActions extends IIntervalUpdateActions {
  load: () => Promise<void>;
  autoUpdate: () => Promise<void>;
  clearStore: () => void;
  portfolioAssetsAction: () => void;
  portfolioAssetsObligation: () => void;
  portfolioAssetsOption: () => void;
  portfolioAssetsFuturies: () => void;
  portfolioAssetsCurrency: () => void;
}

export const useAssetsStore = defineStore<'assets', IState, IGetters, IActions>('assets', {
  state: (): IState => ({
    ...intervalUpdateState(),
    params: {
      page: 1,
      perPage: 10,
      search: '',
      types: null
    },
    data: {
      assets: [],
      profit: { investedSum: 0, totalDiff: 0 },
      paperSum: 0,
      total: 0,
      totalPages: 1,
      page: 1,
      perPage: 10
    },
    loading: false,
    error: undefined
  }),
  persist: true,
  actions: {
    ...createIntervalUpdateActions<'positions'>(),
    async load() {
      this.loading = true;
      try {
        const portfolioStore = usePortfolioStore();
        const accountId = portfolioStore.data.currentAccount
          ? portfolioStore.data.currentAccount.id
          : null;
        if (!accountId) {
          this.data.assets = [];
          this.data.profit = { investedSum: 0, totalDiff: 0 };
        } else {
          const data = await portfolioService.assets(accountId, this.params);
          if (data) {
            this.data = data;
          } else {
            this.data.assets = [];
            this.data.profit = { investedSum: 0, totalDiff: 0 };
          }
        }
      } catch (error: any) {
        this.error = { name: error.code, message: error.message };
        const notify = useNotify();
        notify.showServiceError(error);
      } finally {
        this.loading = false;
      }
    },
    async autoUpdate() {
      try {
        const portfolioStore = usePortfolioStore();
        const accountId = portfolioStore.data.currentAccount
          ? portfolioStore.data.currentAccount.id
          : null;
        if (!accountId) {
          this.data.assets = [];
          this.data.profit = { investedSum: 0, totalDiff: 0 };
        } else {
          const data = await portfolioService.assets(accountId, this.params);
          if (data) {
            this.data = data;
          } else {
            this.data.assets = [];
            this.data.profit = { investedSum: 0, totalDiff: 0 };
          }
        }
      } catch (error: any) {
        this.error = { name: error.code, message: error.message };
        const notify = useNotify();
        notify.showServiceError(error);
      }
    },
    clearStore() {
      this.$reset();
    },
    async portfolioAssetsAction() {
      this.params.types = [IT.Action];
    },
    async portfolioAssetsObligation() {
      this.params.types = [IT.Obligation];
    },
    async portfolioAssetsCurrency() {
      this.params.types = [IT.Currency];
    },
    async portfolioAssetsOption() {
      this.params.types = [IT.Option];
    },
    async portfolioAssetsFuturies() {
      this.params.types = [IT.Futuries];
    }
  },
  getters: {
    getAssets(state: IState) {
      return state.data.assets.sort((a, b) => {
        return a.active === b.active ? 0 : a.active ? -1 : 1;
      });
    }
  }
});
