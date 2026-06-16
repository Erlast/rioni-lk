<script setup lang="ts">
  import { usePortfolioStore } from '@/stores/portfolioStore.ts';
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';
  import BrokerAccountInfo from '@/components/BaseComponents/BrokerAccountInfo.vue';

  const portfolioStore = usePortfolioStore();
  const { mobile } = useDisplay();
  const { t } = useI18n();
</script>

<template>
  <v-sheet class="d-flex ga-4" :class="{ 'flex-column flex-column-reverse': mobile }">
    <v-sheet
      class="d-flex flex-column ga-2 border-md pa-6 border-color-element rounded-xxl justify-space-between"
      :width="mobile ? '100%' : '33%'"
    >
      <v-sheet class="d-flex ga-1">
        <v-sheet>{{ t('pronounce.brokerAccountTitle') }}</v-sheet>
        <v-sheet class="text-common">
          {{
            portfolioStore.data.currentAccount
              ? portfolioStore.data.currentAccount.accountNumber
              : ''
          }}
        </v-sheet>
      </v-sheet>
      <v-sheet v-if="mobile" class="d-flex justify-space-between">
        <broker-account-info />
      </v-sheet>
      <broker-account-info v-else />
    </v-sheet>
    <v-sheet :width="mobile ? '100%' : '66%'">
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
