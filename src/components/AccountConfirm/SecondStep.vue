<script setup lang="ts">
  import { useAccountStore } from '@/stores/accountStore.ts';
  import { useI18n } from 'vue-i18n';
  import { onMounted, ref } from 'vue';
  import { ITariffModel } from '@/api/types.ts';
  import dictionariesService from '@/api/dictionariesService.ts';
  import accountService from '@/api/accountService.ts';
  import TariffList from '@/components/BaseComponents/TariffList.vue';

  const accountStore = useAccountStore();
  const { t } = useI18n();

  const tariffId = ref<number | null>(null);

  const backToStart = () => {
    accountStore.accountConfirmStep = 0;
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
      <span class="text-additional-link cursor-pointer">Ознакомьтесь с официальным документом о тарифных планах брокера
        <v-icon icon="mdi-arrow-right" /></span>
    </v-sheet>
    <v-sheet class="d-flex flex-column ga-1">
     <tariff-list v-model:tariff-id="tariffId"/>
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

</style>
