<script setup lang="ts">
  import { VueDatePicker } from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import { computed, onMounted, ref } from 'vue';
  import dayjs, { type Dayjs } from 'dayjs';
  import { vMaska } from 'maska/vue';
  import { ru } from 'date-fns/locale';
  import IDatePickerProps from '@/components/types/DatePicker';
  import type { MaskaDetail } from 'maska';
  import customParseFormat from 'dayjs/plugin/customParseFormat';

  const date = ref<Date | null>(null);
  dayjs.extend(customParseFormat);

  const myDate = ref<string | null>(null);
  const datepicker = ref(null);
  const isHovered = ref(false);

  const {
    label = 'Выберите дату',
    errorMessages = [],
    density = 'comfortable',
    maxDate,
    disabled = false
  } = defineProps<IDatePickerProps>();

  const modelValue = defineModel<string | Date | Dayjs | null>();
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | null): void;
  }>();

  const format = (d: Date) => {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const optionsDefault = { mask: '##.##.####' };
  const mask = computed(() => optionsDefault);

  const onMaska = (event: CustomEvent<MaskaDetail>) => {
    if (event.detail.completed) {
      const dt = dayjs(event.detail.masked, 'DD.MM.YYYY', true);
      if (dt.isValid()) {
        date.value = dt.toDate();
        emit('update:modelValue', dt.toISOString());
        datepicker.value?.closeMenu();
      }
    }
  };

  const updateModelValue = () => {
    if (date.value) {
      const d = dayjs(date.value);
      myDate.value = d.format('DD.MM.YYYY');
      emit('update:modelValue', d.toISOString());
    } else {
      myDate.value = null;
      emit('update:modelValue', null);
    }
  };

  const updateDate = (dt: string) => {
    myDate.value = dt;
  };

  const clearDatePicker = () => {
    date.value = null;
    updateModelValue();
  };

  onMounted(() => {
    if (modelValue.value) {
      const d = dayjs(modelValue.value);
      if (d.isValid()) {
        date.value = d.toDate();
        myDate.value = d.format('DD.MM.YYYY');
      }
    }
  });
</script>

<template>
  <VueDatePicker
    ref="datepicker"
    v-model="date"
    :format="format"
    :max-date="maxDate"
    text-input
    auto-apply
    :locale="ru"
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
        width="100%"
        flat
        class="date-picker-v"
        bg-color="invert-black-white"
        inputmode="none"
        autocomplete="off"
        :disabled="disabled"
        :density="density"
        hide-details="auto"
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
          <div class="b3" data-testid="alert-message">{{ message }}</div>
        </template>
      </v-text-field>
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
