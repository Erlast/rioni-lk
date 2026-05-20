<script setup lang="ts">
  import { ref } from 'vue';

  const headers = ref([
    { title: '№ Поручения', key: 'numberOperation', align: 'start', sortable: false },
    { title: 'Дата создания', key: 'created_date', align: 'center', sortable: false },
    { title: 'Дата исполнения', key: 'operation_date', align: 'center', sortable: false },
    { title: 'Операция', key: 'operation_type', align: 'center', sortable: false },
    { title: 'ЦБ', key: 'cb', align: 'center', sortable: false },
    { title: 'Кол-во', key: 'amount', align: 'center', sortable: false },
    { title: 'Сумма', key: 'sum', align: 'center', sortable: false },
    { title: 'Статус', key: 'status', align: 'center', sortable: false }
  ]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'В обработке':
        return 'text-common';
      case 'Исполнено':
        return 'text-element-check';
      case 'Отказано':
        return 'text-additional-error';
      default:
        return '';
    }
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
      <v-sheet class="d-flex ga-2">
        <v-btn variant="flat" rounded="mr" class="btn-custom">Пополнение счета</v-btn>
        <v-btn variant="flat" rounded="mr" class="btn-custom">Торговые поручения</v-btn>
        <v-btn variant="flat" rounded="mr" class="btn-custom">Вывод денежных средств</v-btn>
      </v-sheet>
      <v-sheet class="d-flex ga-2">
        <v-btn variant="flat" rounded="mr" class="btn-custom-2">Зачисление бумаг</v-btn>
        <v-btn variant="flat" rounded="mr" class="btn-custom-2">Перевод бумаг</v-btn>
      </v-sheet>
    </v-sheet>
    <v-sheet class="d-flex flex-column ga-4 mt-12">
      <v-sheet class="text-dark-blue font-20">История операций</v-sheet>
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
    width: 33%;
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
