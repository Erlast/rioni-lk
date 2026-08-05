import { defineStore } from 'pinia';
import dictionariesService from '@/api/dictionariesService.ts';
import { IGlossaryModel, languageType } from '@/api/types.ts';
import i18n from '@/utils/i18n.ts';

interface IState {
  terms: IGlossaryModel[];
  currentLanguage: languageType;
  lastUpdated: null | number;
  isLoading: boolean;
  searchQuery: string;
}

interface IGetter {
  isDataStale: (s: IState) => boolean;
  [key: string]: any;
}
interface IAction {
  loadTerms: () => Promise<void>;
  getTermByKey: (key: string) => IGlossaryModel | null;
  findTermsInText: (term: string) => IGlossaryModel[];
}

const cacheDuration = 7 * 24 * 60 * 60 * 1000;

const escapeRegExp = (str: string): string => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const useGlossaryStore = defineStore<'glossary', IState, IGetter, IAction>('glossary', {
  state: (): IState => ({
    terms: [],
    currentLanguage: 'ru',
    lastUpdated: null,
    isLoading: false,
    searchQuery: ''
  }),
  getters: {
    isDataStale: state => {
      return !state.lastUpdated || Date.now() - state.lastUpdated > cacheDuration;
    }
  },
  persist: {
    pick: ['terms', 'currentLanguage', 'lastUpdated']
  },
  actions: {
    async loadTerms() {
      const locale = i18n.global.locale.value as languageType;

      const isCacheValid =
        this.currentLanguage === locale && !this.isDataStale && this.terms.length > 0;

      if (isCacheValid) {
        return;
      }

      this.isLoading = true;

      try {
        this.terms = await dictionariesService.glossary(locale);
        this.currentLanguage = locale;
        this.lastUpdated = Date.now();
      } catch (error) {
        console.error('Ошибка при получении глоссария:', error);
      } finally {
        this.isLoading = false;
      }
    },
    getTermByKey(key: string): IGlossaryModel | null {
      const findingTerm = this.terms.find(t => t.term === key);
      if (!findingTerm) {
        return null;
      }
      return findingTerm;
    },
    findTermsInText(text: string): IGlossaryModel[] {
      const foundTerms: IGlossaryModel[] = [];
      const sortedTerms = [...this.terms].sort((a, b) => b.term.length - a.term.length);

      sortedTerms.forEach(term => {
        const regex = new RegExp(
          `(?<![\\p{L}\\p{N}_])${escapeRegExp(term.term)}(?![\\p{L}\\p{N}_])`,
          'giu'
        );
        if (regex.test(text)) {
          foundTerms.push(term);
        }
      });

      return foundTerms;
    }
  }
});
