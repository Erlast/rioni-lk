import { defineStore } from 'pinia';
import i18n from '@/utils/i18n';
import {
  handleError,
  type ErrorCategory,
  type NotifyGroup
} from '@/utils/errorHandler';

type INotifyType = 'info' | 'success' | 'warn' | 'error';

interface NotificationItem {
  id: number;
  message: string;
  description: string;
  type: INotifyType;
  duration?: number;
  group: NotifyGroup;
}

interface IState {
  notifications: NotificationItem[];
}

interface IGetters {
  [key: string]: any;
}

interface IAction {
  addNotification: (item: Omit<NotificationItem, 'id'>) => void;
  removeNotification: (id: number) => void;
  show: (
    message: string,
    description: string,
    type?: INotifyType,
    group?: NotifyGroup,
    duration?: number
  ) => void;
  handleError: (error: unknown, category?: ErrorCategory) => void;
  showServiceError: (error: unknown) => void;
  focusTesting: () => void;
  clear: () => void;
}

let nextId = 1;

export const useNotify = defineStore<'notify', IState, IGetters, IAction>('notify', {
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
      group?: NotifyGroup,
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
    handleError(error: unknown, category?: ErrorCategory) {
      handleError(error, category ? { category } : {});
    },
    showServiceError(error: unknown) {
      // Сохраняем обратную совместимость со старыми вызовами — все ошибки
      // теперь проходят через централизованный errorHandler.
      handleError(error);
    },
    focusTesting() {
      this.addNotification({
        message: i18n.global.t('errors.focusTesting.message'),
        description: i18n.global.t('errors.focusTesting.description'),
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
