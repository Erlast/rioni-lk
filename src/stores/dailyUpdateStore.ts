import type { PiniaCustomStateProperties, Store } from 'pinia';

export interface IDailyUpdateState {
  timer: ReturnType<typeof setTimeout> | null;
}

export interface IDailyUpdateActions {
  stopAutoUpdate: () => void;
  startAutoUpdate: (hours: number, minutes?: number) => void;
}

type StoreWithAutoUpdate<
  Id extends string = string,
  S extends IDailyUpdateState = IDailyUpdateState
> = Store<Id, S> & { autoUpdate: () => void } & IDailyUpdateActions &
  PiniaCustomStateProperties<S>;

export const dailyUpdateState = (): IDailyUpdateState => ({
  timer: null
});

function msUntilNextRun(hours: number, minutes: number): number {
  const now = new Date();
  const next = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0,
    0
  );
  if (next.getTime() <= now.getTime()) {
    next.setDate(next.getDate() + 1);
  }
  return next.getTime() - now.getTime();
}

export function createDailyUpdateActions<Id extends string = string>() {
  return {
    stopAutoUpdate(this: StoreWithAutoUpdate<Id>) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    startAutoUpdate(this: StoreWithAutoUpdate<Id>, hours: number, minutes: number = 0) {
      this.stopAutoUpdate();

      const schedule = () => {
        this.autoUpdate();
        this.timer = setTimeout(
          schedule,
          24 * 60 * 60 * 1000
        );
      };

      this.timer = setTimeout(schedule, msUntilNextRun(hours, minutes));
    }
  };
}
