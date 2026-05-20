<script setup lang="ts">
  import { useAccountStore } from '@/stores/accountStore.ts';
  import { usePortfolioStore } from '@/stores/portfolioStore.ts';
  import { formatNumber } from '@/utils/number.extensions.ts';

  const accountStore = useAccountStore();
  const portfolioStore = usePortfolioStore();
</script>

<template>
  <v-sheet class="d-flex ga-4">
    <v-sheet
      class="d-flex flex-column ga-2 border-md pa-6 border-color-element rounded-xxl"
      width="291"
    >
      <v-sheet class="d-flex flex-column ga-1">
        <v-sheet>Брокерский счет</v-sheet>
        <v-sheet class="text-common">
          {{
            portfolioStore.data.currentAccount
              ? portfolioStore.data.currentAccount.accountNumber
              : ''
          }}
        </v-sheet>
      </v-sheet>
      <v-sheet>
        <v-sheet>Стоимость в {{ accountStore.getAccountCurrency?.title }}</v-sheet>
        <v-sheet class="text-dark-blue-2 font-20 font-semibold">
          {{
            portfolioStore.data.currentAccount
              ? formatNumber(portfolioStore.data.currentAccount.balance)
              : 0
          }}
          {{ accountStore.getAccountCurrency?.title }}
        </v-sheet>
      </v-sheet>
      <v-sheet>
        <v-sheet>Свободные деньги</v-sheet>
        <v-sheet class="text-element-check font-20 font-semibold">
          {{
            portfolioStore.data.currentAccount && portfolioStore.data.currentAccount.tradingFunds
              ? formatNumber(portfolioStore.data.currentAccount.tradingFunds)
              : 0
          }}
          {{ accountStore.getAccountCurrency?.title }}
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <v-sheet class="rounded-xxl">
      <v-img src="/img/broker-account-portfolio-bg.png" width="auto" class="rounded-xxl"></v-img>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
