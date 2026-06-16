<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';
  import TopUpForm from '@/components/BaseComponents/TopUpForm.vue';
  import WithdrawalForm from '@/components/BaseComponents/WithdrawalForm.vue';
  import { usePortfolioStore } from '@/stores/portfolioStore.ts';
  import ordersService from '@/api/ordersService.ts';
  import { IOrderModel } from '@/api/types.ts';
  import dayjs from 'dayjs';

  const { mobile } = useDisplay();
  const { t } = useI18n();
  const portfolioStore = usePortfolioStore();
  const operations = ref<IOrderModel[]>([]);
  const totalCount = ref(0);

  const headers = ref([
    {
      title: t('pronounce.operationTable.numberOperationTitle'),
      key: 'orderNumber',
      align: 'start',
      sortable: false
    },
    {
      title: t('pronounce.operationTable.createdDateTitle'),
      key: 'createdAt',
      align: 'center',
      sortable: false
    },
    {
      title: t('pronounce.operationTable.operationDateTitle'),
      key: 'executedAt',
      align: 'center',
      sortable: false
    },
    {
      title: t('pronounce.operationTable.operationTypeTitle'),
      key: 'operation',
      align: 'center',
      sortable: false
    },
    { title: t('pronounce.operationTable.cbTitle'), key: 'cb', align: 'center', sortable: false },
    {
      title: t('pronounce.operationTable.amountTitle'),
      key: 'quantity',
      align: 'center',
      sortable: false
    },
    {
      title: t('pronounce.operationTable.sumTitle'),
      key: 'amount',
      align: 'center',
      sortable: false
    },
    {
      title: t('pronounce.operationTable.statusTitle'),
      key: 'status',
      align: 'center',
      sortable: false
    }
  ]);

  const getStatusClass = (status: number) => {
    switch (status) {
      case 1:
        return 'text-common';
      case 2:
        return 'text-element-check';
      case 3:
        return 'text-additional-error';
      default:
        return '';
    }
  };

  const topUpFormRef = ref<any>(null);

  const getStatus = (status: number) => {
    switch (status) {
      case 1:
        return t('pronounce.operationTable.statuses.inProcess');
      case 2:
        return t('pronounce.operationTable.statuses.completed');
      case 3:
        return t('pronounce.operationTable.statuses.canceled');
      default:
        return '-';
    }
  };

  const topUp = () => {
    topUpFormRef.value?.openTopUp();
  };

  onMounted(async () => {
    if (portfolioStore.data.currentAccount && portfolioStore.data.currentAccount.id) {
      const { data, total } = await ordersService.orders(portfolioStore.data.currentAccount.id);

      operations.value = data;
      totalCount.value = total;
    }
  });
</script>

<template>
  <v-sheet class="mt-12">
    <v-sheet class="d-flex flex-column ga-4">
      <v-sheet class="d-flex ga-2" :class="{ 'flex-column': mobile }">
        <top-up-form ref="topUpFormRef">
          <template #button>
            <v-btn
              variant="flat"
              rounded="mr"
              class="btn-custom"
              :width="mobile ? '100%' : '33%'"
              @click="topUp"
            >
              {{ t('pronounce.topUpBtn') }}
            </v-btn>
          </template>
        </top-up-form>

        <withdrawal-form />
      </v-sheet>
    </v-sheet>
    <v-sheet v-if="!mobile" class="d-flex flex-column ga-4 mt-12">
      <v-sheet class="text-dark-blue font-20">{{ t('pronounce.historyOrdersTitle') }}</v-sheet>
      <v-sheet class="operation-table">
        <v-data-table-server
          :headers="headers"
          :items="operations"
          :items-length="operations.length"
          hide-default-footer
        >
          <template #[`item.createdAt`]="{ item }">
            <v-sheet>
              {{ item.createdAt ? dayjs(item.createdAt).format('DD.MM.YYYY') : '-' }}
            </v-sheet>
          </template>
          <template #[`item.executedAt`]="{ item }">
            <v-sheet>
              {{ item.executedAt ? dayjs(item.executedAt).format('DD.MM.YYYY') : '-' }}
            </v-sheet>
          </template>
          <template #[`item.status`]="{ item }">
            <v-sheet class="font-semibold" :class="getStatusClass(item.status)">
              {{ getStatus(item.status) }}
            </v-sheet>
          </template>
          <template #[`item.cb`]="{ item }">
            <v-sheet>
              {{ item.cb ?? '-' }}
            </v-sheet>
          </template>
          <template #[`item.quantity`]="{ item }">
            <v-sheet>
              {{ item.quantity ?? '-' }}
            </v-sheet>
          </template>
        </v-data-table-server>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  .btn-custom {
    padding: 0 30px;
    font-size: 16px;
    color: white;
    height: 72px;
    background: var(--color-MiddleBlue) !important;
  }

  .btn-custom-2 {
    padding: 0 30px;
    font-size: 16px;
    color: white;
    height: 72px;
    width: 33%;
    background: var(--color-Element) !important;
  }
  .v-table {
    background-color: #fafafa;
    border-radius: 16px;
    :deep(thead) {
      color: var(--color-ElementCheck);
    }
    :deep(.v-data-table__th) {
      background-color: var(--color-LightGreen);
      border-width: 0;
    }

    :deep(tbody) {
      background-color: #fafafa;
    }

    :deep(.v-data-table__th:first-child) {
      border-radius: 16px 0 0 16px;
    }

    :deep(.v-data-table__th:last-child) {
      border-radius: 0 16px 16px 0;
    }

    :deep(.v-data-table__tr:last-child .v-data-table__td:first-child) {
      border-radius: 16px 0 0 16px;
    }

    :deep(.v-data-table__tr:last-child .v-data-table__td:last-child) {
      border-radius: 0 16px 16px 0;
    }

    :deep(.v-data-table__td) {
      border-bottom: 0 !important;
    }
  }
</style>
