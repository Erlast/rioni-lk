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
        max-height="320"
      >
        <v-sheet
          class="rate-box d-flex align-center justify-space-between pr-2 pb-2 border-b-sm ml-2"
          style="border-color: var(--color-Choosen) !important"
          v-for="currency in currenciesStore.data.rates"
          :key="currency.code"
        >
          <v-sheet class="d-flex ga-1 font-small">
            <span class="">{{ currencyFlags[currency.code] }}</span>
            <span class="">{{ currency.code }}/GEL</span>
          </v-sheet>

          <v-sheet class="d-flex ga-1 justify-end align-center">
            <v-sheet class="font-small">{{ currency.rate }}</v-sheet>
            <v-sheet
              class="d-flex ga-1 font-8"
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
      class="px-2 pb-2 border-t-sm rounded-b-lg"
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
    font-size: 8px;
    line-height: 1;
  }

  .rioni-currency-widget-full__change-value {
    line-height: 1;
  }
</style>
