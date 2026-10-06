import { defineStore } from 'pinia';
import { handleError } from '@/utils/errorHandler';
import infoService from '@/api/infoService.ts';
import { FooterMenuItem, languageType } from '@/api/types.ts';

interface FooterPostAddressModel {
  name: string;
  subtitle: string;
}

interface FooterMenuItemModel {
  title: string;
  url: string;
}

interface IState {
  email: string;
  phone_number: string;
  post_address: FooterPostAddressModel | undefined;
  footer_text: string;
  locale: 'en' | 'ru' | 'ka-GE' | string;
  footer_menu: FooterMenuItemModel[] | undefined;
  lastUpdated: null | number;
}
interface IGetter {
  isDataStale: (s: IState) => boolean;
  [key: string]: any;
}
interface IAction {
  fetchFooter: () => Promise<void>;
  clearStore: () => void;
}

const cacheDuration = 24 * 3600 * 1000; // сутки

export const useFooterStore = defineStore<'footer', IState, IGetter, IAction>('footer', {
  state: (): IState => ({
    email: '',
    phone_number: '',
    post_address: undefined,
    footer_text: '',
    locale: 'en',
    footer_menu: undefined,
    lastUpdated: null // время последнего обновления
  }),
  getters: {
    isDataStale: state => {
      return !state.lastUpdated || Date.now() - state.lastUpdated > cacheDuration;
    }
  },
  persist: true,
  actions: {
    async fetchFooter() {
      if (!this.isDataStale) {
        return; // Если данные свежие, не делаем запрос
      }

      try {
        const data = await infoService.footer(this.locale);

        this.email = data.email.name;
        this.phone_number = data.phoneNumber.name;
        this.post_address = {
          name: data.postAddress.name,
          subtitle: data.postAddress.subtitle
        };
        this.footer_text = data.footerText.text;
        this.footer_menu = data.footerMenu.map((item: FooterMenuItem) => {
          return {
            title: item.title,
            url: item.url
          };
        });
        this.lastUpdated = Date.now(); // обновляем время кэширования
      } catch (error) {
        // сбрасываем состояние если ошибка пришла с сервера
        this.$reset();
        handleError(error, {
          silent: true,
          context: { source: 'footerStore.fetchFooter' }
        });
      }
    },
    clearStore() {
      this.$reset();
    }
  }
});
