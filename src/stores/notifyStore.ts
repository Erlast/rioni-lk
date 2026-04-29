import { defineStore } from 'pinia';
import i18n from '@/utils/i18n';
import axios, { AxiosError } from 'axios';

type INotifyType = 'info' | 'success' | 'warn' | 'error';
type Groups = 'system' | 'app' | 'session' | 'promote' | 'copy';

interface NotificationItem {
  id: number;
  message: string;
  description: string;
  type: INotifyType;
  duration?: number;
  group: Groups;
}

interface IState {
  notifications: NotificationItem[];
}

interface IGetter {
  [key: string]: any;
}

interface IAction {
  addNotification: (item: Omit<NotificationItem, 'id'>) => void;
  removeNotification: (id: number) => void;
  show: (
    message: string,
    description: string,
    type?: INotifyType,
    group?: Groups,
    duration?: number
  ) => void;
  showServiceError: (error: unknown) => void;
  focusTesting: () => void;
  clear: () => void;
}

let nextId = 1;

export const useNotify = defineStore<'notify', IState, IGetter, IAction>('notify', {
  state: (): IState => ({
    notifications: []
  }),
  actions: {
    addNotification(item: Omit<NotificationItem, 'id'>) {
      const newNotification: NotificationItem = {
        id: nextId++,
        ...item
      };
      this.notifications.push(newNotification);
    },
    removeNotification(id: number) {
      this.notifications = this.notifications.filter(n => n.id !== id);
    },
    show(
      message: string,
      description: string,
      type?: INotifyType,
      group?: Groups,
      duration?: number
    ) {
      this.addNotification({
        message,
        description,
        type: type ?? 'info',
        group: group ?? 'app',
        duration: duration ?? -1
      });
    },
    showServiceError(error: unknown) {
      if (!axios.isAxiosError(error) || error.code !== AxiosError.ERR_NETWORK) {
        return;
      }
      this.addNotification({
        message: i18n.global.t('errorTemporaryUnavailable.message'),
        description: i18n.global.t('errorTemporaryUnavailable.description'),
        group: 'system',
        type: 'error',
        duration: -1
      });
    },
    focusTesting() {
      this.addNotification({
        message: i18n.global.t('focusTesting.message'),
        description: i18n.global.t('focusTesting.description'),
        type: 'error',
        group: 'system',
        duration: -1
      });
    },
    clear() {
      this.notifications = [];
    }
  },
  getters: {}
});
