<script setup lang="ts">
  import { nextTick, onMounted, ref } from 'vue';
  import { type FlagItem, itemsFlags, phoneCountriesSorted } from '@/utils/data.ts';
  import { useI18n } from 'vue-i18n';

  const localeToFlag: Record<string, string> = {
    ru: 'ru',
    en: 'gb',
    ge: 'ge'
  };

  interface IProps {
    idx?: number;
    isMain?: boolean;
    error?: boolean;
    loading?: boolean;
  }

  const props = withDefaults(defineProps<IProps>(), {
    loading: false
  });

  const modelValue = defineModel<string>();
  const { t } = useI18n();

  const emits = defineEmits(['keyup']);

  const findCountryByPhoneCode = (phoneValue: string) => {
    if (!phoneValue) return null;
    const cleaned = phoneValue.replace(/[^\d+]/g, '');
    if (!cleaned.startsWith('+')) return null;
    const digits = cleaned.slice(1);
    for (const country of phoneCountriesSorted) {
      if (country.code && digits.startsWith(country.code)) {
        return country;
      }
    }
    return null;
  };

  const detectCountryCode = (rawDigits: string): string | null => {
    if (!rawDigits) return null;
    const phone = '+' + rawDigits;
    const found = findCountryByPhoneCode(phone);
    return found?.code || null;
  };

  const formatPhoneNumber = (countryCode: string, rawDigits: string): string => {
    const localDigits = rawDigits.slice(countryCode.length).slice(0, 10);
    let formatted = `+${countryCode}`;

    if (localDigits.length === 0) return formatted;

    formatted += ' (';
    formatted += localDigits.slice(0, 3);

    if (localDigits.length > 3) {
      formatted += ') ';
      formatted += localDigits.slice(3, 6);
    }

    if (localDigits.length > 6) {
      formatted += '-';
      formatted += localDigits.slice(6, 8);
    }

    if (localDigits.length > 8) {
      formatted += '-';
      formatted += localDigits.slice(8, 10);
    }

    return formatted;
  };

  const setCursorToEnd = (input: HTMLInputElement) => {
    requestAnimationFrame(() => {
      const pos = input.value.length;
      input.setSelectionRange(pos, pos);
    });
  };

  const phoneItems = ref<Record<number, any>>({});

  onMounted(() => {
    let defaultCountry: FlagItem | undefined;

    if (modelValue.value) {
      const rawDigits = modelValue.value.replace(/[^\d]/g, '');
      const countryCode = detectCountryCode(rawDigits);
      if (countryCode) {
        const found = findCountryByPhoneCode('+' + rawDigits);
        if (found) {
          defaultCountry = found;

          modelValue.value = formatPhoneNumber(countryCode, rawDigits);
        }
      }
    }

    if (!defaultCountry) {
      const userLocale = localStorage.getItem('user-locale') || 'ru';
      const flagImage = localeToFlag[userLocale] || 'ru';
      defaultCountry = itemsFlags.find(item => item.image === flagImage);
    }

    if (defaultCountry) {
      phoneItems.value[props.idx] = defaultCountry;
      if (!modelValue.value && defaultCountry.code) {
        modelValue.value = '+' + defaultCountry.code;
      }
    }
  });

  const getMaxLocalDigits = (countryCode: string): number => {
    if (countryCode === '7' || countryCode === '1') return 10;
    return 12;
  };

  const onPhoneKeydown = (event: KeyboardEvent) => {
    if (event.key.length !== 1 || event.key < '0' || event.key > '9') return;

    const input = event.target as HTMLInputElement;
    const rawDigits = input.value.replace(/[^\d]/g, '');
    const countryCode = detectCountryCode(rawDigits);

    let maxDigits = 11;
    if (countryCode) {
      const maxLocal = getMaxLocalDigits(countryCode);
      maxDigits = countryCode.length + maxLocal;
    }

    const selectionLen = input.selectionEnd - input.selectionStart;
    const newDigitCount = rawDigits.length - selectionLen + 1;

    if (newDigitCount > maxDigits) {
      event.preventDefault();
    }
  };

  const onPhoneInput = (event: Event) => {
    const input = event.target as HTMLInputElement;

    let rawDigits = input.value.replace(/[^\d]/g, '');

    if (rawDigits.length === 0) {
      modelValue.value = '';
      return;
    }
    const countryCode = detectCountryCode(rawDigits);

    if (countryCode) {
      const maxLocalDigits = getMaxLocalDigits(countryCode);
      const maxTotalDigits = countryCode.length + maxLocalDigits;
      rawDigits = rawDigits.slice(0, maxTotalDigits);

      const formatted = formatPhoneNumber(countryCode, rawDigits);

      if (modelValue.value !== formatted) {
        modelValue.value = formatted;
      }
      if (input.value !== formatted) {
        input.value = formatted;
      }

      const found = findCountryByPhoneCode('+' + rawDigits);
      if (found) {
        phoneItems.value[props.idx] = found;
      }
    } else {
      rawDigits = rawDigits.slice(0, 4);
      const raw = '+' + rawDigits;
      if (modelValue.value !== raw) {
        modelValue.value = raw;
      }
      if (input.value !== raw) {
        input.value = raw;
      }
    }

    nextTick(() => {
      const formatted = modelValue.value;
      if (formatted && input.value !== formatted) {
        input.value = formatted;
        setCursorToEnd(input);
      }
    });

    setCursorToEnd(input);
  };

  const onPhoneCountryChange = (val: any) => {
    phoneItems.value[props.idx] = val;
    if (val?.code) {
      const digits = val.code;
      modelValue.value = '+' + digits;
    }
  };
</script>

<template>
  <v-sheet class="d-flex justify-space-between" width="100%">
    <v-col cols="2" class="pa-0">
      <v-select
        :disabled="isMain"
        class="flag"
        variant="solo"
        flat
        density="compact"
        readonly
        :items="itemsFlags"
        hide-details="auto"
        return-object
        :error="error"
        :model-value="phoneItems[idx]"
        @update:model-value="onPhoneCountryChange"
      >
        <template v-slot:item="{ props: itemProps, item }">
          <v-list-item v-bind="itemProps" title="">
            <span :class="`fi fi-${item.raw.image}`" />
          </v-list-item>
        </template>
        <template v-slot:selection="{ item }">
          <span :class="`fi fi-${item.raw.image}`" />
        </template>
      </v-select>
    </v-col>

    <v-col cols="9" class="pa-0">
      <v-text-field
        :model-value="modelValue"
        class="phone-number"
        :disabled="isMain"
        variant="solo"
        :label="t('phoneNumber')"
        flat
        :loading="loading"
        hide-details="auto"
        :error="error"
        @input="onPhoneInput"
        @keydown="onPhoneKeydown"
        @keyup="emits('keyup', modelValue)"
      ></v-text-field>
    </v-col>
  </v-sheet>
</template>

<style scoped lang="scss">
  .v-input.phone-number {
    &.v-input--error {
      :deep(.v-field__overlay) {
        border-radius: 0 8px 8px 0;
        border-left: 0;
      }
    }
  }
</style>
