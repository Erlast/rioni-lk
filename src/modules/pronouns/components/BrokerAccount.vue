<script setup lang="ts">
  import { useAccountStore } from '@/stores/accountStore.ts';
  import { usePortfolioStore } from '@/stores/portfolioStore.ts';
  import { formatNumber } from '@/utils/number.extensions.ts';
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';

  const accountStore = useAccountStore();
  const portfolioStore = usePortfolioStore();
  const { mobile } = useDisplay();
  const { t } = useI18n();
</script>

<template>
  <v-sheet class="d-flex ga-4" :class="{ 'flex-column flex-column-reverse': mobile }">
    <v-sheet
      class="d-flex flex-column ga-2 border-md pa-6 border-color-element rounded-xxl"
      :width="mobile ? '100%' : 291"
    >
      <v-sheet class="d-flex ga-1" :class="{ 'flex-column': !mobile }">
        <v-sheet>{{ t('pronounce.brokerAccountTitle') }}</v-sheet>
        <v-sheet class="text-common">
          {{
            portfolioStore.data.currentAccount
              ? portfolioStore.data.currentAccount.accountNumber
              : ''
          }}
        </v-sheet>
      </v-sheet>
      <v-sheet
        class="d-flex ga-1"
        :class="{ 'flex-column': !mobile, 'justify-space-between': mobile }"
      >
        <v-sheet>
          <v-sheet>
            {{ t('pronounce.costTitle') }} {{ accountStore.getAccountCurrency?.title }}
          </v-sheet>
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
      </v-sheet>
    </v-sheet>
    <v-sheet>
      <v-img
        :src="mobile ? '/img/pronounce-bg.png' : '/img/broker-account-portfolio-bg.png'"
        :max-height="mobile ? 189 : 'auto'"
        width="auto"
        :cover="mobile"
        class="rounded-xxl"
      ></v-img>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
