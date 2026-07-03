<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { itemsFlags, phoneCountriesSorted, type FlagItem } from '@/utils/data.ts';
  import { useI18n } from 'vue-i18n';

  const localeToFlag: Record<string, string> = {
    ru: 'ru',
    en: 'gb',
    ge: 'ge'
  };

  const props = defineProps<{
    idx?: number;
    isMain?: boolean;
  }>();

  const modelValue = defineModel<string>();
  const { t } = useI18n();

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

  /**
   * Extract country code from raw digit string (e.g., '71234567890' -> '7').
   * Returns null if no country code can be matched.
   */
  const detectCountryCode = (rawDigits: string): string | null => {
    if (!rawDigits) return null;
    const phone = '+' + rawDigits;
    const found = findCountryByPhoneCode(phone);
    return found?.code || null;
  };

  /**
   * Format raw digits into a phone mask: +<code> (###) ###-##-##
   * Example: formatPhoneNumber('7', '71234567890') -> '+7 (123) 456-78-90'
   * The mask supports up to 10 local digits.
   */
  const formatPhoneNumber = (countryCode: string, rawDigits: string): string => {
    const localDigits = rawDigits.slice(countryCode.length).slice(0, 10);
    let formatted = `+${countryCode}`;

    if (localDigits.length === 0) return formatted;

    // Opening bracket + first 3 digits
    formatted += ' (';
    formatted += localDigits.slice(0, 3);

    if (localDigits.length > 3) {
      // Close bracket, then next 3 digits
      formatted += ') ';
      formatted += localDigits.slice(3, 6);
    }

    if (localDigits.length > 6) {
      // Dash + next 2 digits
      formatted += '-';
      formatted += localDigits.slice(6, 8);
    }

    if (localDigits.length > 8) {
      // Dash + last 2 digits
      formatted += '-';
      formatted += localDigits.slice(8, 10);
    }

    return formatted;
  };

  /**
   * Calculate cursor position after reformatting based on where the user was typing.
   * We find the position of the last typed digit in the formatted string.
   */
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
      // Format the initial value if it has a valid country code
      const rawDigits = modelValue.value.replace(/[^\d]/g, '');
      const countryCode = detectCountryCode(rawDigits);
      if (countryCode) {
        const found = findCountryByPhoneCode('+' + rawDigits);
        if (found) {
          defaultCountry = found;
          const formatted = formatPhoneNumber(countryCode, rawDigits);
          modelValue.value = formatted;
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
    }
  });

  const onPhoneInput = (event: Event) => {
    const input = event.target as HTMLInputElement;

    // Extract only digits from the input
    const rawDigits = input.value.replace(/[^\d]/g, '');

    if (rawDigits.length === 0) {
      input.value = '';
      modelValue.value = '';
      return;
    }

    // Try to detect country code from the digits
    const countryCode = detectCountryCode(rawDigits);

    if (countryCode) {
      // Country code detected — apply phone mask formatting
      const formatted = formatPhoneNumber(countryCode, rawDigits);
      input.value = formatted;
      modelValue.value = formatted;

      // Update the selected flag if it matches a country
      const found = findCountryByPhoneCode('+' + rawDigits);
      if (found) {
        phoneItems.value[props.idx] = found;
      }
    } else {
      // Country code not yet fully entered — show raw digits with + prefix
      const raw = '+' + rawDigits;
      input.value = raw;
      modelValue.value = raw;
    }

    // Restore cursor to end after reformatting
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
        variant="solo"
        flat
        density="compact"
        readonly
        :items="itemsFlags"
        hide-details="auto"
        return-object
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
        :disabled="isMain"
        variant="solo"
        :label="t('phoneNumber')"
        flat
        hide-details="auto"
        @input="onPhoneInput"
      ></v-text-field>
    </v-col>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
