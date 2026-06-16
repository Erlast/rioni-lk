<script setup lang="ts">
  import { useAccountStore } from '@/stores/accountStore.ts';
  import { usePortfolioStore } from '@/stores/portfolioStore.ts';
  import { useDisplay } from 'vuetify/framework';
  import { useI18n } from 'vue-i18n';
  import { formatNumber } from '@/utils/number.extensions.ts';

  const accountStore = useAccountStore();
  const portfolioStore = usePortfolioStore();
  const { mobile } = useDisplay();
  const { t } = useI18n();
</script>

<template>
  <v-sheet class="d-flex ga-1 flex-column" :class="{ 'justify-space-between': mobile }">
    <v-sheet>{{ t('pronounce.costTitle') }} {{ accountStore.getAccountCurrency?.title }}</v-sheet>
    <v-sheet class="text-dark-blue-2 font-20 font-semibold">
      {{
        portfolioStore.data.currentAccount
          ? formatNumber(portfolioStore.data.currentAccount.balance)
          : 0
      }}
      {{ accountStore.getAccountCurrency?.title }}
    </v-sheet>
  </v-sheet>

  <v-sheet
    class="d-flex ga-1 flex-column"
    :class="{ 'justify-space-between': mobile }"
  >
    <v-sheet>{{ t('pronounce.freeMoneyTitle') }}</v-sheet>
    <v-sheet class="text-element-check font-20 font-semibold">
      {{
        portfolioStore.data.currentAccount && portfolioStore.data.currentAccount.tradingFunds
          ? formatNumber(portfolioStore.data.currentAccount.tradingFunds)
          : 0
      }}
      {{ accountStore.getAccountCurrency?.title }}
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
