<script setup lang="ts">
  import { computed } from 'vue';
  import { countries } from '@/utils/data';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const modelValue = defineModel<string | null>();

  defineProps<{
    errorMessages?: string;
  }>();

  const countryItems = computed(() =>
    countries.map((code: string) => ({
      title: t('countries.' + code),
      value: code
    }))
  );
</script>

<template>
  <v-autocomplete
    :model-value="modelValue"
    class="country-autocomplete"
    variant="solo"
    flat
    hide-details="auto"
    density="compact"
    :placeholder="t('profile.country')"
    clearable
    :items="countryItems"
    item-title="title"
    item-value="value"
    :error-messages="errorMessages"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template v-slot:item="{ props: itemProps, item }">
      <v-list-item v-bind="itemProps" :title="item.raw.title"></v-list-item>
    </template>
    <template v-slot:selection="{ item }">
      {{ item.raw.title }}
    </template>
  </v-autocomplete>
</template>

<style scoped lang="scss">
  .country-autocomplete {
    :deep(input::placeholder) {
      color: rgba(0,0,0,1);
      opacity: 0.6;
    }
  }
</style>
