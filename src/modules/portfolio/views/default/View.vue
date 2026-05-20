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
  import { bgThirdCard } from '@/utils/data.ts';
  import SimpleChart from '@/components/SimpleChart.vue';
  import { IAccountYieldModel } from '@/api/types.ts';
  import portfolioService from '@/api/portfolioService.ts';

  const { t } = useI18n();

  const accountStore = useAccountStore();
  const portfolioStore = usePortfolioStore();
  const assetsStore = useAssetsStore();
  const accounts = ref();
  const accountYield = ref<IAccountYieldModel>({
    accountYield: 0,
    accountPercent: 0
  });

  const clickCard = (id: number) => {
    switch (id) {
      case 1:
        //click modal 1
        break;
      case 2:
        //click modal 2
        break;
      default:
        break;
    }
  };

  const openTopUp = () => {
    console.log('opent top up');
  };

  const actionTitles = [
    'portfolio.reportsTitle',
    'portfolio.historyTitle',
    'portfolio.analyticTitle'
  ];

  const account = computed(() => {
    if (!portfolioStore.data.currentAccount) {
      portfolioStore.setCurrentAccount();
    }
    return portfolioStore.data.currentAccount;
  });

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

    assetsStore.startAutoUpdate(1500);
  });

  onUnmounted(() => {
    assetsStore.stopAutoUpdate();
  });
</script>

<template>
  <v-sheet class="d-flex ga-5">
    <v-sheet width="180">
      <Notice></Notice>
      <!-- <Calendar></Calendar>
      <MarketToday></MarketToday> -->
    </v-sheet>
    <v-sheet class="d-flex flex-column ga-4" width="100%">
      <v-sheet class="top-up-card d-flex flex-column ga-4 rounded-xxl pa-6">
        <v-sheet class="text-dark-blue">{{ t('portfolio.balanceTitle') }}</v-sheet>
        <v-sheet class="d-flex justify-space-between">
          <v-sheet class="d-flex ga-2 align-center">
            <v-sheet width="36">
              <v-img src="/img/topUp-icon.png" alt="top-up-icon" />
            </v-sheet>
            <v-sheet class="font-big-semibold text-gradient">
              {{ account ? formatNumber(account.balance) : 0 }}
              {{ accountStore.getAccountCurrency?.title }}
            </v-sheet>
          </v-sheet>
          <v-btn variant="flat" rounded="mr" @click="openTopUp" height="50" class="btn-top-up">
            <template #prepend>
              <v-img width="26" src="/img/topUp-btn-icon.png" />
            </template>
            {{ t('portfolio.topUpBtn') }}
          </v-btn>
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
        />
      </v-sheet>
      <v-sheet class="d-flex ga-2">
        <v-sheet
          class="d-flex flex-column liner-gradient-common pa-4 rounded-mr text-white"
          :width="account && account.deposit > 0 ? '25%' : '33%'"
          height="98"
          style="line-height: normal"
        >
          <v-sheet class="d-flex ga-2 align-center">
            <v-sheet width="19">
              <v-img src="/img/balance-icon.png" width="19" />
            </v-sheet>
            <v-sheet class="font-default">{{ t('portfolio.balanceAccountTitle') }}</v-sheet>
          </v-sheet>
          <v-sheet class="font-m text-gradient-light">
            {{ account && account.balance ? formatNumber(account.balance) : 0 }}
            {{ accountStore.getAccountCurrency?.title }}
          </v-sheet>
        </v-sheet>
        <v-sheet
          class="d-flex flex-column pa-4 rounded-mr"
          :width="account && account.deposit > 0 ? '25%' : '33%'"
          height="98"
          style="background: url('/img/balance-2-bg.png') no-repeat !important; line-height: normal"
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
          :width="account && account.deposit > 0 ? '25%' : '33%'"
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
          :width="account && account.deposit > 0 ? '25%' : '33%'"
          height="98"
          style="background: url('/img/deposit-bg.png') no-repeat !important; line-height: normal"
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

<style scoped lang="scss">
  .top-up-card {
    height: 164px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(/img/topUp-bg.png);

    .btn-top-up {
      padding: 0 30px;
      font-size: 16px;
      color: white;
      background: linear-gradient(67deg, #103673 40.45%, #4a77c1 81.54%) !important;
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
