import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useStorage } from '@vueuse/core';

export type TabDef = { name: string; titleKey: string };
export type Scope = 'portfolio';

const DEFAULTS: Record<Scope, TabDef[]> = {
  portfolio: [
    { name: 'action', titleKey: 'portfolio.table.tabs.action' },
    // { name: 'obligation', titleKey: 'portfolio.table.tabs.obligation' },
    { name: 'currency', titleKey: 'portfolio.table.tabs.currency' },
    // { name: 'option', titleKey: 'portfolio.table.tabs.option' },
    // { name: 'futuries', titleKey: 'portfolio.table.tabs.futuries' }
  ]
};

type OrderState = Record<Scope, string[]>;

export const useTabsStore = defineStore('tabs', () => {
  const state = useStorage<OrderState>('tabsOrder', {
    portfolio: DEFAULTS.portfolio.map(t => t.name),
  });

  function tabsFor(scope: Scope) {
    return computed<TabDef[]>({
      get() {
        const defs = DEFAULTS[scope];
        const order = state.value[scope] ?? defs.map(t => t.name);
        const byName = new Map(defs.map(d => [d.name, d]));
        const ordered = order.map(n => byName.get(n)).filter(Boolean) as TabDef[];
        for (const def of defs) {
          if (!order.includes(def.name)) {
            ordered.push(def);
          }
        }
        return ordered;
      },
      set(newTabs) {
        state.value[scope] = newTabs.map(t => t.name);
      }
    });
  }

  function orderFor(scope: Scope) {
    return computed<string[]>({
      get: () => state.value[scope],
      set: v => {
        state.value[scope] = v;
      }
    });
  }

  function resetToDefault(scope: Scope) {
    state.value[scope] = DEFAULTS[scope].map(t => t.name);
  }
  const legacy = useStorage<string[] | null>('portfolioTabsOrder', null);
  if (legacy.value && (!state.value.portfolio || state.value.portfolio.length === 0)) {
    state.value.portfolio = legacy.value;
    legacy.value = null;
  }

  return { tabsFor, orderFor, resetToDefault };
});
