<script setup lang="ts">
  import { useAccountStore } from '@/stores/accountStore.ts';
  import { useI18n } from 'vue-i18n';
  import { ref } from 'vue';
  import accountService from '@/api/accountService.ts';
  import TariffList from '@/components/BaseComponents/TariffList.vue';
  import { handleError } from '@/utils/errorHandler.ts';
  import { useDisplay } from 'vuetify';

  const accountStore = useAccountStore();
  const { t } = useI18n();
  const { mobile } = useDisplay();

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
      handleError(error);
    }
  };
</script>

<template>
  <v-card-title
    class="d-flex flex-column justify-end align-center position-relative"
    style="min-height: 50px"
  >
    <v-sheet class="font-18 text-hard-blue">{{ t('accountConfirm.chooseTariffTitle') }}</v-sheet>
  </v-card-title>
  <v-card-text class="d-flex flex-column ga-2 px-0 pb-0">
    <v-sheet
      v-if="!mobile"
      class="d-flex ga-1 font-smaller cursor-pointer text-additional-link"
      @click="backToStart()"
    >
      <v-icon icon="mdi-arrow-left" />
      <v-sheet>{{ t('accountConfirm.back') }}</v-sheet>
    </v-sheet>
    <v-sheet :class="{ 'text-center font-smaller': mobile }">
      {{ t('accountConfirm.chooseTariffDescription') }}
      <br />
      <a
        class="text-additional-link cursor-pointer"
        target="_blank"
        rel="noreferrer"
        href="https://rioni-capital.ge/upload/iblock/df5/dv3kqkivpfirnuaol1niunnw3wfl2d72.pdf?from=hub"
      >
        {{ t('accountConfirm.chooseTariffDocumentName') }}
        <v-icon icon="mdi-arrow-right" />
      </a>
    </v-sheet>
    <v-sheet class="d-flex flex-column ga-1">
      <tariff-list v-model:tariff-id="tariffId" />
    </v-sheet>
    <v-sheet class="mt-4">
      <v-btn
        variant="flat"
        rounded="mr"
        color="ocean-blue"
        :disabled="!tariffId"
        @click="chooseTariff"
        :block="mobile"
      >
        <v-sheet class="text-white">{{ t('accountConfirm.chooseTariffBtn') }}</v-sheet>
      </v-btn>
    </v-sheet>

    <v-sheet
      v-if="mobile"
      class="d-flex ga-1 font-smaller justify-center cursor-pointer text-additional-link mt-6"
      @click="backToStart()"
    >
      <v-icon icon="mdi-arrow-left" />
      <v-sheet>{{ t('accountConfirm.back') }}</v-sheet>
    </v-sheet>
  </v-card-text>
</template>

<style scoped lang="scss"></style>
