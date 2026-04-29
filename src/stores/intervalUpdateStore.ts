import type { PiniaCustomStateProperties, Store } from 'pinia';

export interface IIntervalUpdateState {
  timer: ReturnType<typeof setInterval> | null;
}

export interface IIntervalUpdateActions {
  stopAutoUpdate: () => void;
  startAutoUpdate: (interval: number) => void;
}

// Тип для store, содержащего метод autoUpdate
type StoreWithAutoUpdate<
  Id extends string = string,
  S extends IIntervalUpdateState = IIntervalUpdateState
> = Store<Id, S> & { autoUpdate: () => void } & IIntervalUpdateActions &
  PiniaCustomStateProperties<S>;

export const intervalUpdateState = (): IIntervalUpdateState => ({
  timer: null
});

export function createIntervalUpdateActions<Id extends string = string>() {
  return {
    stopAutoUpdate(this: StoreWithAutoUpdate<Id>) {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    startAutoUpdate(this: StoreWithAutoUpdate<Id>, interval: number) {
      this.stopAutoUpdate();
      this.timer = setInterval(() => {
        this.autoUpdate();
      }, interval);
    }
  };
}
