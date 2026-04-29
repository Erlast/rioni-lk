import portfolioService from '@/api/portfolioService';
import { useNotify } from '@/stores/notifyStore';
import { defineStore } from 'pinia';
import { IAssetModel, IPortfolioModel } from '@/api/types';
import { InstrumentTypes as IT } from '@/api/enum';
import {
  createIntervalUpdateActions,
  IIntervalUpdateActions,
  IIntervalUpdateState,
  intervalUpdateState
} from '@/stores/intervalUpdateStore';
import { useAccountStore } from './accountStore';

interface IState extends IIntervalUpdateState {
  data: IPortfolioModel;
  types: string[] | null;
  loading: boolean;
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
    types: null,
    data: {
      assets: [],
      profit: { investedSum:0,totalDiff: 0},
      paperSum: 0
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
        const accountStore = useAccountStore();
        const data = await portfolioService.assets(accountStore.data.id, this.types);
        if (data) {
          this.data = data;
        } else {
          this.data.assets = [];
          this.data.profit = { investedSum: 0, totalDiff: 0 };
        }
        console.log(this.data)
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
        const accountStore = useAccountStore();
        const data = await portfolioService.assets(accountStore.data.id, this.types);
        if (data) {
          this.data = data;
        } else {
          this.data.assets = [];
          this.data.profit = { investedSum: 0, totalDiff: 0 };
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
      this.types = [IT.Action];
    },
    async portfolioAssetsObligation() {
      this.types = [IT.Obligation];
    },
    async portfolioAssetsCurrency() {
      this.types = [IT.Currency];
    },
    async portfolioAssetsOption() {
      this.types = [IT.Option];
    },
    async portfolioAssetsFuturies() {
      this.types = [IT.Futuries];
    }
  },
  getters: {
    getAssets(state: IState) {
      console.log(state.data.assets)
      return state.data.assets.sort((a, b) => {
        return a.active === b.active ? 0 : a.active ? -1 : 1;
      })
    }
  }
});
