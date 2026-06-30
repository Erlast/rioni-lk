<script setup lang="ts">
  import { computed, reactive, ref } from 'vue';
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';
  import DatePickerRange from '@/components/BaseComponents/DatePickerRange.vue';
  import { FilterOrdersRequestModel } from '@/components/types/OperationHistory.ts';
  import dayjs from 'dayjs';

  const tag = ref('full');
  const { mobile } = useDisplay();
  const { t } = useI18n();
  const tags = [
    {
      value: 'full',
      name: t('reports.tags.full')
    },
    {
      value: 'full',
      name: t('reports.tags.short')
    }
  ];

  const filterData = reactive<Partial<FilterOrdersRequestModel>>({
    periodStart: undefined,
    periodEnd: undefined
  });

  const period = computed({
    get: () => {
      return [filterData.periodStart, filterData.periodEnd];
    },
    set: value => {
      filterData.periodStart = value[0];
      filterData.periodEnd = value[1];
    }
  });

  const startDate = computed(() => {
    return dayjs().subtract(1, 'month').toDate();
  });
</script>

<template>
  <v-sheet class="d-flex flex-column ga-4 mt-6">
    <v-sheet
      class="d-flex ga-2 align-center pa-2 rounded-mr"
      style="background-color: white !important"
    >
      <v-sheet>{{ t('reports.reportTypes.broker') }}</v-sheet>
      <v-icon icon="mdi-chevron-up"></v-icon>
    </v-sheet>
    <v-sheet class="d-flex ga-2 flex-column">
      <v-sheet class="d-flex align-center justify-space-between">
        <v-sheet class="d-flex ga-2 align-center" width="400">
          <DatePickerRange
            v-model="period"
            :label="t('chooseDate')"
            :max-date="new Date()"
            :start-date="mobile ? new Date() : startDate"
            :multi-calendars="mobile ? false : 2"
          />
        </v-sheet>

        <v-sheet class="d-flex ga-2 align-center"></v-sheet>
      </v-sheet>

      <v-sheet
        class="d-flex"
        :class="{ 'flex-column ga-2': mobile, 'justify-space-between': !mobile }"
      >
        <v-sheet class="d-flex ga-2 align-center">
          <v-chip-group
            v-model="tag"
            variant="flat"
            selected-class="timeframe-selected bg-element text-white"
            class="pa-0"
            mandatory
          >
            <v-chip
              v-for="(item, idx) in tags"
              :key="idx"
              :value="item.value"
              size="compact"
              variant="flat"
              class="px-4 py-1 font-smaller bg-transparent ma-0"
            >
              {{ item.name }}
            </v-chip>
          </v-chip-group>
        </v-sheet>

        <v-sheet>
          <v-btn variant="flat" rounded="mr" :block="mobile" class="btn-custom-2">
            {{ t('reports.reportBtn') }}
          </v-btn>
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="d-flex align-center flex-column rounded-mg"
      style="background-color: white !important"
      height="244"
    >
      <v-sheet height="135" style="padding-top: 75px">
        <v-icon icon="mdi-folder-open-outline" class="opacity-10" color="dark-blue" />
      </v-sheet>
      <v-sheet class="color-dark-blue opacity-10">{{ t('reports.noReportText') }}</v-sheet>
    </v-sheet>
  </v-sheet>
</template>
<style scoped lang="scss">
  .btn-custom {
    background: var(--color-LightGreen);
  }

  .btn-custom-2 {
    background: var(--color-MiddleBlue);
    color: white;
  }

  .mdi-folder-open-outline:before {
    font-size: 135px;
  }
</style>
