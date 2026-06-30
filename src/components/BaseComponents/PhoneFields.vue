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

  const phoneItems = ref<Record<number, any>>({});

  onMounted(() => {
    let defaultCountry: FlagItem | undefined;

    if (modelValue.value) {
      const found = findCountryByPhoneCode(modelValue.value);
      if (found) {
        defaultCountry = found;
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
    let value = input.value;

    value = value.replace(/[^\d+]/g, '');

    if (value.length > 0 && !value.startsWith('+')) {
      value = '+' + value;
    }

    input.value = value;

    modelValue.value = value;

    const found = findCountryByPhoneCode(value);
    if (found) {
      phoneItems.value[props.idx] = found;
    }
  };

  const onPhoneCountryChange = (val: any) => {
    phoneItems.value[props.idx] = val;
    if (val?.code) {
      modelValue.value = '+' + val.code;
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
