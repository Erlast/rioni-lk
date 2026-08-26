<script setup lang="ts">
  import { useAccountStore } from '@/stores/accountStore.ts';
  import { useI18n } from 'vue-i18n';
  import { onMounted, ref } from 'vue';
  import { ITariffModel } from '@/api/types.ts';
  import dictionariesService from '@/api/dictionariesService.ts';
  import accountService from '@/api/accountService.ts';

  const accountStore = useAccountStore();
  const { t } = useI18n();
  const tariffs = ref<ITariffModel[]>([]);
  const tariffId = ref<number | null>(null);

  const backToStart = () => {
    accountStore.accountConfirmStep = 0;
  };

  const setTariff = (id: number) => {
    tariffId.value = id;
  };

  const chooseTariff = async () => {
    const request = { tariffId: tariffId.value };
    try {
      await accountService.profileTariffSave(request);
      accountStore.data.tariffId = tariffId.value;
      accountStore.accountConfirmStep = 0;
    } catch (error) {
      console.log(error);
    }
  };

  onMounted(async () => {
    tariffs.value = await dictionariesService.tariffs();
  });
</script>

<template>
  <v-card-title
    class="d-flex flex-column justify-end align-center position-relative"
    style="min-height: 50px"
  >
    <v-sheet class="font-18 text-hard-blue">Выберите тариф</v-sheet>
  </v-card-title>
  <v-card-text class="d-flex flex-column ga-2 py-0 px-2">
    <v-sheet
      class="d-flex ga-1 font-smaller cursor-pointer text-additional-link mt-4"
      @click="backToStart()"
    >
      <v-icon icon="mdi-arrow-left" />
      <v-sheet>{{ t('auth.back') }}</v-sheet>
    </v-sheet>
    <v-sheet class="">
      Выберите тарифный план, который соответствует вашим задачам и желаемым условиям облсуживания.
      Ознакомьтесь с официальным документом о тарифных планах брокера
      <v-icon icon="mdi-arrow-right" />
    </v-sheet>
    <v-sheet class="d-flex flex-column ga-1">
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
    </v-sheet>
    <v-sheet class="mt-4">
      <v-btn
        variant="flat"
        rounded="mr"
        color="ocean-blue"
        :disabled="!tariffId"
        @click="chooseTariff"
      >
        <v-sheet class="text-white">Выбрать тариф</v-sheet>
      </v-btn>
    </v-sheet>
  </v-card-text>
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
