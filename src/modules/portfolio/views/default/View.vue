<script setup lang="ts">
  import Notice from '@/components/Notice.vue';
  import ActionCards from '@/components/ActionCards.vue';
  import { useI18n } from 'vue-i18n';
  import { useAccountStore } from '@/stores/accountStore';
  import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
  import { usePortfolioStore } from '@/stores/portfolioStore';
  import AssetsTable from '@/components/AssetsTable.vue';
  import { useAssetsStore } from '@/stores/assetsStore';
  import { formatNumber } from '@/utils/number.extensions';
  import SimpleChart from '@/components/SimpleChart.vue';
  import { IAccountYieldModel } from '@/api/types.ts';
  import portfolioService from '@/api/portfolioService.ts';
  import { useDisplay } from 'vuetify';
  import { useMediaQuery } from '@vueuse/core';
  import TopUpForm from '@/components/BaseComponents/TopUpForm.vue';
  import router from '@/router';

  const { t } = useI18n();

  const accountStore = useAccountStore();
  const portfolioStore = usePortfolioStore();
  const assetsStore = useAssetsStore();
  const accounts = ref();
  const { mobile } = useDisplay();
  const landscape = useMediaQuery('(orientation: landscape)');
  const accountYield = ref<IAccountYieldModel>({
    accountYield: 0,
    accountPercent: 0
  });
  const bgThirdCard = '/img/portfolio-card-bg.png';

  const clickCard = (id: number) => {
    switch (id) {
      case 1:
        router.push('/reports');
        break;
      case 2:
        router.push('/pronouns');
        break;
      default:
        break;
    }
  };

  const actionTitles = [
    'portfolio.reportsTitle',
    'portfolio.historyTitle',
    // 'portfolio.analyticTitle'
  ];

  const account = ref(portfolioStore.data.currentAccount);

  const updateAccount = (selectedAccount: any) => {
    portfolioStore.data.currentAccount = selectedAccount;
  };

  function itemProps(item: any) {
    return {
      title: `${item.accountNumber} (${formatNumber(item.balance)})`
    };
  }

  const loadAccountYield = async (accountId: number) => {
    try {
      accountYield.value = await portfolioService.portfolioAccountYield(accountId, 'day');
    } catch (error) {
      console.error('Failed to load account yield:', error);
    }
  };

  watch(
    () => portfolioStore.data.currentAccount,
    async newAccount => {
      account.value = newAccount;
      if (newAccount?.id) {
        await loadAccountYield(newAccount.id);
      }
    },
    { immediate: true } // сразу загрузить для текущего аккаунта
  );

  onMounted(async () => {
    await portfolioStore.load();
    await assetsStore.load();
    accounts.value = portfolioStore.data.accounts;

    portfolioStore.setCurrentAccount();

    assetsStore.startAutoUpdate(1500);
  });

  onUnmounted(() => {
    assetsStore.stopAutoUpdate();
  });
</script>

<template>
  <template v-if="mobile && landscape">
    <AssetsTable />
  </template>
  <template v-else>
    <v-sheet class="d-flex ga-5">
      <v-sheet width="180" v-if="!mobile">
        <Notice></Notice>
        <!-- <Calendar></Calendar>
        <MarketToday></MarketToday> -->
      </v-sheet>
      <v-sheet class="d-flex flex-column ga-4" width="100%">
        <v-sheet
          class="top-up-card d-flex flex-column ga-4 rounded-xxl pa-6"
          :class="{ 'top-up-card-mobile': mobile, 'top-up-card-desktop': !mobile }"
          :height="mobile ? 430 : 'auto'"
          min-height="164"
        >
          <v-sheet class="text-dark-blue">{{ t('portfolio.balanceTitle') }}</v-sheet>
          <v-sheet
            class="d-flex justify-space-between"
            :class="{ 'flex-column': mobile }"
            :height="mobile ? '100%' : 'auto'"
          >
            <v-sheet class="d-flex ga-2 align-center">
              <v-sheet width="36">
                <v-img src="/img/topUp-icon.png" alt="top-up-icon" />
              </v-sheet>
              <v-sheet class="font-big-semibold text-gradient">
                {{ account ? formatNumber(account.balance) : 0 }}
                {{ accountStore.getAccountCurrency?.title }}
              </v-sheet>
            </v-sheet>
            <top-up-form />
          </v-sheet>
        </v-sheet>
        <v-sheet class="d-flex rounded-xxl px-6" style="background-color: white !important">
          <v-select
            variant="solo"
            flat
            :item-props="itemProps"
            hide-details
            menu-icon="mdi-chevron-down"
            width="300"
            max-width="300"
            height="48"
            :items="accounts"
            label=""
            v-model="account"
            @update:model-value="updateAccount"
          />
        </v-sheet>
        <v-sheet class="d-flex ga-2" :class="{ 'flex-column': mobile }">
          <v-sheet
            class="d-flex flex-column pa-4 rounded-mr"
            :width="mobile ? '100%' : '33%'"
            height="98"
            style="
              background-image: url('/img/balance-2-bg.png') !important;
              background-repeat: no-repeat;
              background-size: cover;
              line-height: normal;
            "
          >
            <v-sheet class="d-flex ga-2 align-center">
              <v-sheet width="19">
                <v-img src="/img/wallet-icon.png" width="19" />
              </v-sheet>
              <v-sheet class="text-dark-blue font-default">
                {{ t('portfolio.freeMoneyTitle') }}
              </v-sheet>
            </v-sheet>
            <v-sheet class="font-m text-dark-blue">
              {{ account && account.tradingFunds ? formatNumber(account.tradingFunds) : 0 }}
              {{ accountStore.getAccountCurrency?.title }}
            </v-sheet>
            <v-sheet v-if="account && account.fundsInTransit > 0" class="text-element font-smaller">
              {{ t('portfolio.inAWay') }}
              {{ account && account.fundsInTransit ? formatNumber(account.fundsInTransit) : 0 }}
              {{ accountStore.getAccountCurrency?.symbol }}
            </v-sheet>
          </v-sheet>
          <v-sheet
            class="d-flex flex-column pa-4 rounded-mr"
            :width="mobile ? '100%' : '33%'"
            height="98"
            style="background-color: white !important; line-height: normal"
          >
            <v-sheet class="d-flex ga-2 align-center">
              <v-sheet width="19">
                <v-img src="/img/nickel-icon.png" width="19" />
              </v-sheet>
              <v-sheet class="text-dark-blue font-default">
                {{ t('portfolio.todayResultTitle') }}
              </v-sheet>
            </v-sheet>
            <v-sheet
              class="font-m"
              :class="{
                'text-element-check': accountYield.accountYield >= 0,
                'text-additional-error': accountYield.accountYield < 0
              }"
            >
              {{ formatNumber(accountYield.accountYield) }}
              {{ accountStore.getAccountCurrency?.title }}
            </v-sheet>
            <v-sheet class="d-flex ga-1 align-center">
              <v-sheet
                class="font-smaller"
                :class="{
                  'text-element-check': accountYield.accountPercent >= 0,
                  'text-additional-error': accountYield.accountPercent < 0
                }"
              >
                {{ t('portfolio.grow') }} {{ accountYield.accountPercent }}%
              </v-sheet>
              <v-sheet
                :class="{
                  'text-element-check triangle-up': accountYield.accountPercent >= 0,
                  'text-additional-error triangle-down': accountYield.accountPercent < 0
                }"
              ></v-sheet>
            </v-sheet>
          </v-sheet>
          <v-sheet
            v-if="account && account.deposit > 0"
            class="d-flex flex-column pa-4 rounded-mr"
            :width="mobile ? '100%' : '33%'"
            height="98"
            style="
              background-image: url('/img/deposit-bg.png') !important;
              background-size: cover;
              background-repeat: no-repeat;
              line-height: normal;
            "
          >
            <v-sheet class="d-flex ga-2 align-center">
              <v-sheet width="19">
                <v-img src="/img/coin-icon.png" width="19" />
              </v-sheet>
              <v-sheet class="text-dark-blue font-default">
                {{ t('portfolio.depositTitle') }}
              </v-sheet>
            </v-sheet>
            <v-sheet class="font-m text-dark-blue">
              {{ account && account.deposit ? formatNumber(account.deposit) : 0 }}
              {{ accountStore.getAccountCurrency?.title }}
            </v-sheet>
          </v-sheet>
        </v-sheet>
        <v-sheet
          class="d-flex flex-column ga-4 rounded-xxl pa-6"
          style="background-color: white !important"
        >
          <v-sheet class="text-dark-blue">{{ t('portfolio.dynamicTitle') }}</v-sheet>
          <simple-chart />
        </v-sheet>
        <v-sheet
          class="d-flex flex-column ga-4 rounded-xxl pa-6"
          style="background-color: white !important"
        >
          <v-sheet class="text-dark-blue">{{ t('portfolio.papersTitle') }}</v-sheet>
          <AssetsTable />
        </v-sheet>
        <v-sheet
          class="d-flex flex-column rounded-xxl pa-6"
          style="background-color: white !important"
        >
          <v-sheet class="mb-4">{{ t('portfolio.actionTitle') }}</v-sheet>
          <ActionCards
            @click-card="clickCard"
            :action-titles="actionTitles"
            :third-card-bg="bgThirdCard"
          />
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </template>
</template>

<style scoped lang="scss">
  .top-up-card {
    height: 164px;
    background-size: cover;
    background-repeat: no-repeat;

    &.top-up-card-desktop {
      background-image: url(/img/topUp-bg.png) !important;
    }

    &.top-up-card-mobile {
      background-image: url(/img/topUp-bg-mobile.png) !important;
    }
  }

  .triangle-up {
    &::before {
      content: '\25B2';
      font-size: 12px;
    }
  }

  .triangle-down {
    &::before {
      content: '\25BC';
      font-size: 12px;
    }
  }
</style>
