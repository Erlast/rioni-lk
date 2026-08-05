import { useNotify } from '@/stores/notifyStore';
import { defineStore } from 'pinia';
import { INBGRatesModel, IRateModel } from '@/api/types';
import {
  createIntervalUpdateActions,
  IIntervalUpdateActions,
  IIntervalUpdateState,
  intervalUpdateState
} from '@/stores/intervalUpdateStore';
import currenciesService from '@/api/currenciesService.ts';

interface IState extends IIntervalUpdateState {
  data: INBGRatesModel;
  loading: boolean;
  error?: Error;
}

interface IGetters {
  getCurrencies: (state: IState) => IRateModel[];

  [key: string]: any;
}

interface IActions extends IIntervalUpdateActions {
  load: () => Promise<void>;
  autoUpdate: () => Promise<void>;
  clearStore: () => void;
}

export const useCurrenciesStore = defineStore<'currencies', IState, IGetters, IActions>(
  'currencies',
  {
    state: (): IState => ({
      ...intervalUpdateState(),
      data: {
        rates: [],
        rss_date: ''
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
          this.data = await currenciesService.currencies();
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
          this.data = await currenciesService.currencies();
        } catch (error: any) {
          this.error = { name: error.code, message: error.message };
          const notify = useNotify();
          notify.showServiceError(error);
        }
      },
      clearStore() {
        this.$reset();
      }
    },
    getters: {
      getCurrencies(state: IState) {
        return state.data.rates;
      }
    }
  }
);
