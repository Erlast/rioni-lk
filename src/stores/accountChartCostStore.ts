import { useNotify } from '@/stores/notifyStore.ts';
import { defineStore } from 'pinia';
import { IAccountCostModel } from '@/api/types';
import {
  createIntervalUpdateActions,
  IIntervalUpdateActions,
  IIntervalUpdateState,
  intervalUpdateState
} from '@/stores/intervalUpdateStore';
import portfolioService from '@/api/portfolioService.ts';
import { usePortfolioStore } from '@/stores/portfolioStore.ts';

export type TimeframeType = 'week' | 'month' | 'sixMonths' | 'year' | 'fromYear' | 'allPeriod';

interface IState extends IIntervalUpdateState {
  data: IAccountCostModel[];
  loading: boolean;
  error?: Error;
  timeframe: TimeframeType;
}

interface IGetters {
  generateMockData(s: IState): IAccountCostModel[];
  [key: string]: any;
}

interface IActions extends IIntervalUpdateActions {
  load: () => Promise<void>;
  autoUpdate: () => Promise<void>;
  clearStore: () => void;
}

export const useAccountChartCostStore = defineStore<'accountChartCost', IState, IGetters, IActions>(
  'accountChartCost',
  {
    state: (): IState => ({
      ...intervalUpdateState(),
      data: [],
      loading: false,
      error: undefined,
      timeframe: 'week'
    }),
    persist: true,
    actions: {
      ...createIntervalUpdateActions<'accountChartCost'>(),
      async load() {
        this.loading = true;
        const portfolioStore = usePortfolioStore();
        try {
          this.data = portfolioStore.data.currentAccount
            ? await portfolioService.portfolioData(
                portfolioStore.data.currentAccount.id,
                this.timeframe
              )
            : [];
        } catch (error: any) {
          this.error = { name: error.code, message: error.message };
          const notify = useNotify();
          notify.showServiceError(error);
        } finally {
          this.loading = false;
        }
      },
      async autoUpdate() {
        const portfolioStore = usePortfolioStore();
        try {
          this.data = portfolioStore.data.currentAccount
            ? await portfolioService.portfolioData(
                portfolioStore.data.currentAccount.id,
                this.timeframe
              )
            : [];
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
      generateMockData(s: IState): IAccountCostModel[] {
        const data: IAccountCostModel[] = [];
        const today = new Date();
        const timeframe = s.timeframe;

        let daysToSubtract: number;
        let maxDays = 365 * 3; // 3 years max

        switch (timeframe) {
          case 'week':
            daysToSubtract = 7;
            break;
          case 'month':
            daysToSubtract = 30;
            break;
          case 'sixMonths':
            daysToSubtract = 180;
            break;
          case 'year':
            daysToSubtract = 365;
            break;
          case 'fromYear':
            const januaryFirst = new Date(today.getFullYear(), 0, 1);
            daysToSubtract = Math.floor(
              (today.getTime() - januaryFirst.getTime()) / (1000 * 60 * 60 * 24)
            );
            break;
          case 'allPeriod':
          default:
            daysToSubtract = maxDays;
            break;
        }

        daysToSubtract = Math.min(daysToSubtract, maxDays);

        for (let i = daysToSubtract; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          data.push({
            time: date.getTime(),
            value: Math.floor(Math.random() * 16000) - 5000
          });
        }
        return data;
      }
    }
  }
);
