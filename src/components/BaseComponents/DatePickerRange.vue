<script setup lang="ts">
  import { VueDatePicker } from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import { computed, onMounted, ref, useTemplateRef } from 'vue';
  import dayjs from 'dayjs';
  import { vMaska } from 'maska/vue';
  import { ru, enGB, ka } from 'date-fns/locale';

  import IDatePickerProps from '@/components/types/DatePicker';
  import { MaskaDetail } from 'maska';
  import { useI18n } from 'vue-i18n';
  import i18n from '@/utils/i18n.ts';

  const { t } = useI18n();
  const date = ref();
  const presetDates = computed(() => {
    return [
      {
        label: t('calendar.presets.week'),
        value: [dayjs().subtract(1, 'week').toDate(), dayjs().toDate()]
      },
      {
        label: t('calendar.presets.month'),
        value: [dayjs().subtract(1, 'month').toDate(), dayjs().toDate()]
      },
      {
        label: t('calendar.presets.threeMonth'),
        value: [dayjs().subtract(3, 'months').toDate(), dayjs().toDate()]
      },
      {
        label: t('calendar.presets.halfYear'),
        value: [dayjs().subtract(6, 'months').toDate(), dayjs().toDate()]
      },
      {
        label: t('calendar.presets.year'),
        value: [dayjs().subtract(1, 'year').toDate(), dayjs().toDate()]
      }
    ];
  });

  const format = (date: Date) => {
    if (date && Array.isArray(date)) {
      if (date[0] && date[1]) {
        const dayStart = date[0].getDate();
        const monthStart = date[0].getMonth() + 1;
        const yearStart = date[0].getFullYear();

        const dayEnd = date[1].getDate();
        const monthEnd = date[1].getMonth() + 1;
        const yearEnd = date[1].getFullYear();

        return `${dayStart}.${monthStart}.${yearStart} - ${dayEnd}.${monthEnd}.${yearEnd}`;
      }
    }
  };

  const locale = computed(() => {
    if (i18n.global.locale.value === 'ru') {
      return ru;
    }
    if (i18n.global.locale.value === 'ge') {
      return ka;
    }
    return enGB;
  });

  const { label = 'Choose date', errorMessages = [] } = defineProps<IDatePickerProps>();

  const modelValue = defineModel<(string | undefined)[]>();

  const isHovered = ref(false);
  const myDate = ref();
  const datepicker = ref(null);
  const optionsDefault = {
    mask: '##.##.#### - ##.##.####'
  };

  const dp = useTemplateRef('datepicker');

  const selectDate = () => {
    dp.value?.selectDate();
  };

  const onMaska = (event: CustomEvent<MaskaDetail>) => {
    if (event.detail.completed) {
      const splits = event.detail.masked.split('-');
      const date1 = splits[0].trim().split('.');
      const date2 = splits[1].trim().split('.');

      emit('update:modelValue', [
        dayjs([parseInt(date1[2]), parseInt(date1[1]) - 1, parseInt(date1[0])]).format(
          'YYYY-MM-DDTHH:mm:ssZ'
        ),
        dayjs([parseInt(date2[2]), parseInt(date2[1]) - 1, parseInt(date2[0])]).format(
          'YYYY-MM-DDTHH:mm:ssZ'
        )
      ]);
      if (datepicker.value) {
        datepicker.value.closeMenu();
      }
    }
  };
  const emit = defineEmits(['update:modelValue', 'change']);
  const updateModelValue = () => {
    if (date.value) {
      myDate.value =
        (date.value && date.value[0] ? dayjs(date.value[0]).format('DD.MM.YYYY') : null) +
        '-' +
        (date.value && date.value[1] ? dayjs(date.value[1]).format('DD.MM.YYYY') : null);
    } else {
      myDate.value = null;
    }

    emit('update:modelValue', [
      date.value[0] ? dayjs(date.value[0]).format('YYYY-MM-DDTHH:mm:ssZ') : null,
      date.value[1] ? dayjs(date.value[1]).format('YYYY-MM-DDTHH:mm:ssZ') : null
    ]);
  };

  const updateDate = (dt: string) => {
    date.value = dt;
  };

  const clearDatePicker = () => {
    date.value = [null, null];
    updateModelValue();
  };

  const mask = computed(() => {
    return optionsDefault;
  });

  onMounted(() => {
    if (modelValue.value) {
      date.value = modelValue.value;
      if (date.value) {
        const tmpDate: [string | null, string | null] = [null, null];
        if (date.value[0]) {
          tmpDate.push(dayjs(date.value[0]).format('DD.MM.YYYY'));
        }

        if (date.value[1]) {
          tmpDate.push(dayjs(date.value[1]).format('DD.MM.YYYY'));
        }

        if (tmpDate[0] && tmpDate[1]) {
          myDate.value = tmpDate.join(' - ');
        }
      }
    }
  });
</script>

<template>
  <VueDatePicker
    ref="datepicker"
    v-model="date"
    :preset-dates="presetDates"
    :multi-calendars="{ solo: true }"
    :max-date="new Date()"
    range
    :format="format"
    text-input
    :locale="locale"
    teleport
    :time-config="{ enableTimePicker: false }"
    @update:model-value="updateModelValue"
  >
    <template #trigger>
      <v-text-field
        v-model="myDate"
        v-maska="mask"
        :label="label"
        variant="solo"
        flat
        class="date-picker-v"
        density="compact"
        inputmode="none"
        autocomplete="off"
        hide-details
        :error-messages="
          errorMessages.map(e =>
            typeof e.$message === 'string' ? e.$message : e.$message?.value || ''
          )
        "
        @update:model-value="updateDate"
        @maska="onMaska"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <template #append-inner>
          <v-icon
            v-if="isHovered && myDate"
            class="append-inner-icon"
            icon="mdi-close-circle-outline"
            color="type-text"
            @click="clearDatePicker"
          />
          <v-icon v-else icon="mdi-calendar-month" color="type-text" class="append-inner-icon" />
        </template>
        <template #message="{ message }">
          <div class="b3">{{ message }}</div>
        </template>
      </v-text-field>
    </template>
    <template #action-buttons>
      <v-btn density="compact" flat @click="selectDate">{{ t('calendar.applyBtn') }}</v-btn>
    </template>
  </VueDatePicker>
</template>

<style scoped lang="scss">
  .date-picker-v {
    --v-input-control-height: 40px;

    .append-inner-icon {
      cursor: pointer;
    }
  }
</style>
