<script setup lang="ts">
  import { onMounted, onUnmounted } from 'vue';
  import { currencyFlags } from '@/utils/data.ts';
  import { useCurrenciesStore } from '@/stores/currenciesStore.ts';

  interface IProps {
    bordered?: boolean;
  }

  withDefaults(defineProps<IProps>(), {
    bordered: false
  });

  const sourceUrl = 'https://nbg.gov.ge/en';
  const sourceTitle = 'National Bank of Georgia';
  const currenciesStore = useCurrenciesStore();

  onMounted(async () => {
    await currenciesStore.load();

    currenciesStore.startAutoUpdate(1500);
  });

  onUnmounted(() => {
    currenciesStore.stopAutoUpdate();
  });
</script>

<template>
  <v-sheet
    class="d-flex flex-column mt-6 rounded-lg"
    :class="{ 'border-sm': bordered }"
    style="background-color: white !important"
    :style="bordered ? 'border-color:var(--color-Choosen) !important' : ''"
  >
    <v-sheet class="pt-2">
      <v-sheet
        class="scroll-box d-flex flex-column ga-2 overflow-x-hidden overflow-y-auto"
        max-height="520"
      >
        <v-sheet
          class="rate-box d-flex align-center justify-space-between pr-2 pb-2 border-b-sm ml-2"
          style="border-color: var(--color-Choosen) !important"
          v-for="currency in currenciesStore.data.rates"
          :key="currency.code"
        >
          <v-sheet class="d-flex ga-1 font-14">
            <span class="">{{ currencyFlags[currency.code] }}</span>
            <span class="">{{ currency.code }}/GEL</span>
          </v-sheet>

          <v-sheet class="d-flex flex-column justify-end align-end">
            <v-sheet class="font-smaller">{{ currency.rate }}</v-sheet>
            <v-sheet
              class="d-flex ga-1 font-smaller"
              :class="`rioni-currency-widget-full__change--${currency.direction}`"
            >
              <span class="rioni-currency-widget-full__change-icon">{{ currency.icon }}</span>
              <span class="rioni-currency-widget-full__change-value">{{ currency.change }}</span>
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="px-2 border-t-sm rounded-b-lg"
      style="border-color: var(--color-Choosen) !important; background-color: white !important"
    >
      <a
        class="font-smaller text-additional-link"
        :href="sourceUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ sourceTitle }}
      </a>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  .rioni-currency-widget-full__scroll {
    max-height: 520px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .scroll-box::-webkit-scrollbar {
    width: 6px;
  }

  .scroll-box::-webkit-scrollbar-thumb {
    background: rgba(17, 17, 17, 0.18);
    border-radius: 999px;
  }

  .scroll-box::-webkit-scrollbar-track {
    background: transparent;
  }

  .rate-box:last-child {
    border-bottom: none !important;
  }

  .rioni-currency-widget-full__left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
    max-width: 180px;
  }

  .rioni-currency-widget-full__flag {
    font-size: 12px;
    line-height: 1;
    flex-shrink: 0;
  }

  .rioni-currency-widget-full__ticker {
    font-size: 12px;
    line-height: 1.2;
    font-weight: 500;
    color: #111111;
    white-space: nowrap;
  }

  .rioni-currency-widget-full__right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    flex-shrink: 0;
  }

  .rioni-currency-widget-full__rate {
    min-width: 74px;
    font-size: 12px;
    line-height: 1.2;
    font-weight: 500;
    color: #111111;
    text-align: right;
    white-space: nowrap;
  }

  .rioni-currency-widget-full__change {
    min-width: 62px;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    font-size: 12px;
    line-height: 1;
    font-weight: 600;
    white-space: nowrap;
  }

  .rioni-currency-widget-full__change--up {
    color: #0b8f55 !important;
  }

  .rioni-currency-widget-full__change--down {
    color: #d33945 !important;
  }

  .rioni-currency-widget-full__change--neutral {
    color: #777777 !important;
  }

  .rioni-currency-widget-full__change-icon {
    font-size: 10px;
    line-height: 1;
  }

  .rioni-currency-widget-full__change-value {
    line-height: 1;
  }

  .rioni-currency-widget-full__footer {
    padding: 12px 18px 14px;
    border-top: 1px solid #d9d9d9;
    background: #f8f8f8;
    font-size: 12px;
    line-height: 1.3;
    color: #777777;
  }

  .rioni-currency-widget-full__footer a {
    color: #777777;
    text-decoration: none;
    border-bottom: 1px solid rgba(119, 119, 119, 0.35);
    transition:
      color 0.2s ease,
      border-color 0.2s ease;
  }

  .rioni-currency-widget-full__footer a:hover {
    color: #111111;
    border-bottom-color: #111111;
  }

  @media (max-width: 540px) {
    .rioni-currency-widget-full {
      max-width: 100%;
    }

    .rioni-currency-widget-full__scroll {
      max-height: 470px;
    }

    .rioni-currency-widget-full__row {
      padding: 13px 14px;
    }

    .rioni-currency-widget-full__left {
      gap: 10px;
      max-width: 150px;
    }

    .rioni-currency-widget-full__flag {
      font-size: 16px;
    }

    .rioni-currency-widget-full__ticker,
    .rioni-currency-widget-full__rate {
      font-size: 16px;
    }

    .rioni-currency-widget-full__rate {
      min-width: 66px;
    }

    .rioni-currency-widget-full__change {
      min-width: 56px;
      font-size: 11px;
    }

    .rioni-currency-widget-full__footer {
      padding: 11px 14px 13px;
    }
  }
</style>
