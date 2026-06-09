<script setup lang="ts">
  import { ref } from 'vue';
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';
  import TopUpForm from '@/components/BaseComponents/TopUpForm.vue';
  import WithdrawalForm from '@/components/BaseComponents/WithdrawalForm.vue';

  const { mobile } = useDisplay();
  const { t } = useI18n();

  const headers = ref([
    {
      title: t('pronounce.operationTable.numberOperationTitle'),
      key: 'numberOperation',
      align: 'start',
      sortable: false
    },
    {
      title: t('pronounce.operationTable.createdDateTitle'),
      key: 'created_date',
      align: 'center',
      sortable: false
    },
    {
      title: t('pronounce.operationTable.operationDateTitle'),
      key: 'operation_date',
      align: 'center',
      sortable: false
    },
    {
      title: t('pronounce.operationTable.operationTypeTitle'),
      key: 'operation_type',
      align: 'center',
      sortable: false
    },
    { title: t('pronounce.operationTable.cbTitle'), key: 'cb', align: 'center', sortable: false },
    {
      title: t('pronounce.operationTable.amountTitle'),
      key: 'amount',
      align: 'center',
      sortable: false
    },
    { title: t('pronounce.operationTable.sumTitle'), key: 'sum', align: 'center', sortable: false },
    {
      title: t('pronounce.operationTable.statusTitle'),
      key: 'status',
      align: 'center',
      sortable: false
    }
  ]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case t('pronounce.operationTable.statuses.inProcess'):
        return 'text-common';
      case t('pronounce.operationTable.statuses.completed'):
        return 'text-element-check';
      case t('pronounce.operationTable.statuses.canceled'):
        return 'text-additional-error';
      default:
        return '';
    }
  };

  const topUpFormRef = ref<any>(null);

  const topUp = () => {
    topUpFormRef.value?.openTopUp();
  };

  const operationHistory = ref([
    {
      numberOperation: 3934920,
      created_date: '18.05.2025',
      operation_date: '18.05.2025',
      operation_type: 'Перевод ДС',
      cb: '-',
      amount: '-',
      sum: '450,04',
      status: 'В обработке'
    },
    {
      numberOperation: 3058334,
      created_date: '17.05.2025',
      operation_date: '17.05.2025',
      operation_type: 'Зачисление ДС',
      cb: '-',
      amount: '-',
      sum: '334,51',
      status: 'Исполнено'
    },
    {
      numberOperation: 4553505,
      created_date: '17.05.2025',
      operation_date: '17.05.2025',
      operation_type: 'Списание ДС',
      cb: '-',
      amount: '-',
      sum: '752,90',
      status: 'Отказано'
    },
    {
      numberOperation: 2927095,
      created_date: '15.05.2025',
      operation_date: '15.05.2025',
      operation_type: 'Зачисление ДС',
      cb: '-',
      amount: '-',
      sum: '656,12',
      status: 'Исполнено'
    },
    {
      numberOperation: 2758040,
      created_date: '13.05.2025',
      operation_date: '13.05.2025',
      operation_type: 'Зачисление ДС',
      cb: '-',
      amount: '-',
      sum: '118,59',
      status: 'Исполнено'
    }
  ]);
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

        <v-btn variant="flat" rounded="mr" class="btn-custom" :width="mobile ? '100%' : '33%'">
          {{ t('pronounce.tradeOrdersBtn') }}
        </v-btn>

        <withdrawal-form />
      </v-sheet>
      <v-sheet class="d-flex ga-2" :class="{ 'flex-column': mobile }">
        <v-btn variant="flat" rounded="mr" class="btn-custom-2" :width="mobile ? '100%' : '33%'">
          {{ t('pronounce.entryPapersBtn') }}
        </v-btn>
        <v-btn variant="flat" rounded="mr" class="btn-custom-2" :width="mobile ? '100%' : '33%'">
          {{ t('pronounce.transferBtn') }}
        </v-btn>
      </v-sheet>
    </v-sheet>
    <v-sheet v-if="!mobile" class="d-flex flex-column ga-4 mt-12">
      <v-sheet class="text-dark-blue font-20">{{ t('pronounce.historyOrdersTitle') }}</v-sheet>
      <v-sheet class="operation-table">
        <v-data-table-server
          :headers="headers"
          :items="operationHistory"
          :items-length="operationHistory.length"
          hide-default-footer
        >
          <template #[`item.status`]="{ item }">
            <v-sheet class="font-semibold" :class="getStatusClass(item.status)">
              {{ item.status }}
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
    :deep(thead) {
      background-color: var(--color-LightGreen);
      color: var(--color-ElementCheck);
    }
    :deep(.v-data-table__th) {
      border-width: 0;
    }

    :deep(.v-data-table__td) {
      border-bottom: 0 !important;
    }
  }
</style>
