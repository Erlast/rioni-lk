import { defineStore } from 'pinia';
import { handleError } from '@/utils/errorHandler';
import { INBGRatesModel, IRateModel } from '@/api/types';
import {
  createDailyUpdateActions,
  dailyUpdateState,
  IDailyUpdateActions,
  IDailyUpdateState
} from '@/stores/dailyUpdateStore';
import currenciesService from '@/api/currenciesService.ts';

interface IState extends IDailyUpdateState {
  data: INBGRatesModel;
  loading: boolean;
  error?: Error;
}

interface IGetters {
  getCurrencies: (state: IState) => IRateModel[];

  [key: string]: any;
}

interface IActions extends IDailyUpdateActions {
  load: () => Promise<void>;
  autoUpdate: () => Promise<void>;
  clearStore: () => void;
}

export const useCurrenciesStore = defineStore<'currencies', IState, IGetters, IActions>(
  'currencies',
  {
    state: (): IState => ({
      ...dailyUpdateState(),
      data: {
        rates: [],
        rss_date: ''
      },
      loading: false,
      error: undefined
    }),
    persist: true,
    actions: {
      ...createDailyUpdateActions<'currencies'>(),
      async load() {
        this.loading = true;
        try {
          this.data = await currenciesService.currencies();
        } catch (error: any) {
          this.error = { name: error.code, message: error.message };
          handleError(error);
        } finally {
          this.loading = false;
        }
      },
      async autoUpdate() {
        try {
          this.data = await currenciesService.currencies();
        } catch (error: any) {
          this.error = { name: error.code, message: error.message };
          handleError(error);
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
