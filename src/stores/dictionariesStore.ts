import dictionaryService from '@/api/dictionariesService';
import { ICurrencyModel } from '@/api/types';
import { defineStore } from 'pinia';

interface IState {
  currencies: ICurrencyModel[];
  lastUpdated: null | number;
}
interface IGetter {
  isDataStale: (s: IState) => boolean;
  [key: string]: any;
}
interface IAction {
  fetchDictionaries: () => Promise<void>;
  clearStore: () => void;
  extractValue: (dictionary: string, value: number) => string | number;
}

const cacheDuration = 10 * 60 * 1000; // 10 минут

export const useDictionaryStore = defineStore<'dictionaries', IState, IGetter, IAction>(
  'dictionaries',
  {
    state: (): IState => ({
      currencies: [],
      lastUpdated: null // время последнего обновления
    }),
    getters: {
      isDataStale: state => {
        return !state.lastUpdated || Date.now() - state.lastUpdated > cacheDuration;
      }
    },
    persist: true,
    actions: {
      async fetchDictionaries() {
        if (!this.isDataStale && this.currencies.length > 0) {
          return; // Если данные свежие, не делаем запрос
        }

        try {
            const data = await dictionaryService.dictionaries();
        
          this.currencies = data.dictionaries.currencies;
          this.lastUpdated = Date.now(); // обновляем время кэширования
        } catch (error) {
          // сбрасываем состояние если ошибка пришла с сервера
          this.$reset();
          console.error('Ошибка при получении справочников:', error);
        }
      },
      clearStore() {
        this.$reset();
      },
      extractValue(dictionary: string, value: number) {
        const items = this[dictionary as keyof IState] as any[] | undefined;
        if (!Array.isArray(items)) {
          return value;
        }
        const search = items.find(item => item.id === value);

        return search ? search.name : value;
      }
    }
  }
);
