<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import dictionariesService from '@/api/dictionariesService.ts';
  import { ITariffModel } from '@/api/types.ts';

  const tariffs = ref<ITariffModel[]>([]);

  const tariffId = defineModel<number | null>('tariff-id', { default: null });

  const setTariff = (id: number) => {
    tariffId.value = id;
  };

  onMounted(async () => {
    tariffs.value = await dictionariesService.tariffs();
  });
</script>

<template>
  <v-sheet
    v-for="tariff in tariffs"
    :key="tariff.id"
    class="tariff-bar d-flex align-center justify-space-between px-4 py-3 font-14 text-middle-blue rounded-ml text-common"
    :class="{ active: tariffId === tariff.id }"
    @click="setTariff(tariff.id)"
  >
    <v-sheet class="tariff-name">{{ tariff.name }}</v-sheet>
    <v-icon
      class="tariff-option text-element"
      :icon="tariffId === tariff.id ? 'mdi-circle' : `mdi-circle-outline`"
    />
  </v-sheet>
</template>

<style scoped lang="scss">
  .tariff-bar {
    cursor: pointer;
    background-color: var(--color-MainBackground) !important;
    .tariff-name,
    .tariff-option {
      opacity: 0.3;
    }
    &.active {
      cursor: default;
      background-color: var(--color-Choosen) !important;
      .tariff-name,
      .tariff-option {
        opacity: 1 !important;
      }
    }
  }
</style>
