<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { computed } from 'vue';
  import AssetLogo from '@/components/BaseComponents/AssetLogo.vue';
  import IAssetsTabProps from '@/components/types/AssetsTable';
  import { useAssetsStore } from '@/stores/assetsStore';
  import { useDictionaryStore } from '@/stores/dictionariesStore';
  import { formatNumber } from '@/utils/number.extensions';
  import { ICurrencyModel } from '@/api/types.ts';

  const props = withDefaults(defineProps<IAssetsTabProps>(), {
    currentAsset: 'action'
  });

  const assetsStore = useAssetsStore();
  const { t } = useI18n();

  const currencyCode = (currencyId: number): ICurrencyModel => {
    if (!currencyId) {
      return { id: 0, title: 'USD', symbol: '$' };
    }
    const dictionaryStore = useDictionaryStore();
    const finding = dictionaryStore.currencies.find(item => item.id === currencyId);
    if (!finding) {
      return { id: 0, title: 'USD', symbol: '$' };
    }
    return finding;
  };

  const rawItems = computed(() => props.items ?? assetsStore.getPositions ?? []);

  const loading = computed(() => {
    return assetsStore.loading;
  });
</script>

<template>
  <div class="papers-table font-default">
    <div class="papers-header">
      <v-row class="papers-row" v-if="props.currentAsset !== 'currency'">
        <v-col class="d-flex table-cell align-center justify-center" style="max-width: 70px">
          <v-icon icon="mdi-menu" color="type-text" />
        </v-col>
        <v-col class="table-cell">
          <v-sheet class="d-flex flex-column">
            <v-sheet>
              {{ t('portfolio.table.columns.columnNameTitle') }}
            </v-sheet>
            <v-sheet class="font-smaller text-type-text">
              {{ t('portfolio.table.columns.columnNameSubtitle') }}
            </v-sheet>
          </v-sheet>
        </v-col>
        <v-col class="d-flex flex-column table-cell">
          <v-sheet>
            {{ t('portfolio.table.columns.averagePriceTitleMobile') }}
          </v-sheet>
        </v-col>
        <v-col class="table-cell">
          <v-sheet class="d-flex flex-column">
            <v-sheet>
              {{ t('portfolio.table.columns.profitLossTitle') }}
            </v-sheet>
            <v-sheet class="font-smaller text-type-text">
              {{ t('portfolio.table.columns.totalTimeTitle') }}
            </v-sheet>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row class="papers-row currency-row" v-else>
        <v-col class="d-flex table-cell align-center" style="max-width: 700px">
          {{ t('portfolio.table.columns.currencyTitle') }}
        </v-col>
        <v-col class="d-flex table-cell">
          {{ t('portfolio.table.columns.amountTitle') }}
        </v-col>
        <v-col class="d-flex flex-column table-cell align-end">
          <v-sheet>{{ t('portfolio.table.columns.totalCurrencyPriceTitle') }}</v-sheet>
        </v-col>
      </v-row>
    </div>
    <v-sheet v-if="loading">
      <v-skeleton-loader
        v-if="loading"
        class="mx-auto elevation-0"
        max-width="100%"
        type="chip@6, ossein, table-thead, table-row@4, table-row-divider, table-tfoot, divider,text"
      ></v-skeleton-loader>
    </v-sheet>

    <div v-else class="papers-body">
      <v-sheet v-if="props.currentAsset !== 'currency'">
        <v-row
          v-for="item in rawItems"
          :key="item.assetId"
          class="cursor-pointer paper-row"
          :data-id="item.assetId"
        >
          <v-col class="d-flex justify-center align-center table-cell pa-0" style="max-width: 70px">
            <v-sheet class="logo-stack" width="36">
              <AssetLogo
                :logo="`/img/logos/${item.logo}`"
                class="logo-stack__logo"
                :paper-id="item.assetId"
                :ticker="item.baseTicker"
              />
            </v-sheet>
          </v-col>
          <v-col class="d-flex table-cell">
            <v-sheet class="d-flex flex-column">
              <v-sheet class="font-semibold">
                {{ item.assetName }}
              </v-sheet>
              <v-sheet class="font-smaller text-type-text">{{ item.baseTicker }}</v-sheet>
            </v-sheet>
          </v-col>
          <v-col class="d-flex table-cell align-center justify-start">
            {{ formatNumber(item.investedValue) }} {{ currencyCode(item.currency).symbol }}
          </v-col>
          <v-col class="d-flex table-cell align-center justify-end">
            <v-sheet
              :class="{
                'text-element-check': item.profit >= 0,
                'text-additional-error': item.profit < 0
              }"
            >
              {{ formatNumber(item.profit) }}
            </v-sheet>
          </v-col>
        </v-row>
      </v-sheet>
      <v-sheet v-else>
        <v-row
          v-for="item in rawItems"
          :key="item.assetId"
          class="cursor-pointer currency-row paper-row"
          :data-id="item.assetId"
        >
          <v-col class="d-flex align-center table-cell ga-2" style="max-width: 700px">
            <v-sheet class="logo-stack" width="36">
              <AssetLogo
                :logo="`/img/logos/${item.logo}`"
                class="logo-stack__logo"
                :paper-id="item.assetId"
                :ticker="item.baseTicker"
              />
            </v-sheet>
            <v-sheet class="d-flex flex-column">
              <v-sheet class="font-semibold">
                {{ item.assetName }}
              </v-sheet>
              <v-sheet class="font-smaller text-type-text">{{ item.baseTicker }}</v-sheet>
            </v-sheet>
          </v-col>
          <v-col class="d-flex table-cell align-center">
            <v-sheet>
              {{ item.amount }}
            </v-sheet>
          </v-col>
          <v-col class="d-flex table-cell align-center justify-end">
            {{ formatNumber(item.investedValue) }}
          </v-col>
        </v-row>
      </v-sheet>
    </div>
    <v-row v-if="props.currentAsset !== 'currency' && rawItems && rawItems.length" class="summary">
      <v-col class="d-flex align-center table-cell font-semibold" style="max-width: 70px">
        {{ t('portfolio.table.summary') }}
      </v-col>
      <v-col class="table-cell d-flex">&nbsp;</v-col>
      <v-col class="table-cell d-flex align-center font-semibold">
        {{ formatNumber(assetsStore.data.profit.investedSum) }}
      </v-col>
      <v-col class="table-cell d-flex align-center justify-end">
        <v-sheet class="font-semibold" style="padding-left: 8px">
          {{ formatNumber(assetsStore.data.profit.totalDiff) }}
        </v-sheet>
      </v-col>
    </v-row>
    <v-row v-if="props.currentAsset === 'currency' && rawItems && rawItems.length" class="summary">
      <v-col class="d-flex align-center table-cell font-semibold" style="max-width: 700px">
        {{ t('portfolio.table.summary') }}
      </v-col>
      <v-col class="table-cell d-flex">&nbsp;</v-col>
      <v-col class="table-cell d-flex align-center justify-end">
        <v-sheet class="font-semibold" style="padding-left: 18px">
          {{ formatNumber(assetsStore.data.profit.investedSum) }}
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss">
  .fixed-block {
    position: fixed;
    top: 80px;
    height: 90px;
    left: 0;
    width: 100%;
    z-index: 201;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;

    .papers-row,
    .gradient-row {
      width: 1280px;
      padding: 0 12px;
    }
  }

  .table-cell {
    flex-basis: 0;
    min-width: 50px;
    flex-grow: 1;
    padding: 8px;
    display: flex;

    &.w-42 {
      max-width: 42px !important;
    }
  }

  .currency-row {
    .table-cell {
      padding: 12px;
    }
  }

  .summary {
    height: 60px;
    margin: -8px;

    .v-col {
      flex-basis: 0;
      min-width: 50px;

      &.w-42 {
        max-width: 42px !important;
      }
    }
  }

  .papers-header {
    .papers-row {
      margin-bottom: 10px;
      align-items: center;
    }
  }

  .paper-row {
    height: 72px;
    align-items: center;

    .table-cell {
      &:last-child > div {
        padding-right: 8px;
      }
    }
  }

  .logo-stack {
    position: relative;
    width: 36px;
    height: 36px;
  }

  .logo-stack__logo {
    display: block;
  }

  .papers-body {
    .paper-row {
      border-top: 1px solid var(--color-TypeText);
    }
  }

  @media (hover: none) {
    .logo-stack__drag {
      opacity: 1;
      transform: none;
      pointer-events: auto;
    }
  }
</style>
