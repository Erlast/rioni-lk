<script setup lang="ts">
  import { useAccountStore } from '@/stores/accountStore.ts';
  import CopyFields from '@/components/BaseComponents/CopyFields.vue';
  import { useI18n } from 'vue-i18n';
  import { useDisplay } from 'vuetify';

  const accountStore = useAccountStore();
  const { t } = useI18n();
  const { mobile } = useDisplay();

  const backToStart = () => {
    accountStore.accountConfirmStep = 0;
  };
</script>

<template>
  <v-card-title
    class="d-flex flex-column justify-end align-center position-relative"
    style="min-height: 50px"
  >
    <v-sheet class="font-18 text-hard-blue">
      {{ t('accountConfirm.bankDataConfirmTitle') }}
    </v-sheet>
  </v-card-title>
  <v-card-text class="d-flex flex-column ga-2 px-0">
    <v-sheet
      v-if="!mobile"
      class="d-flex ga-1 font-smaller cursor-pointer text-additional-link"
      @click="backToStart()"
    >
      <v-icon icon="mdi-arrow-left" />
      <v-sheet>{{ t('accountConfirm.back') }}</v-sheet>
    </v-sheet>
    <v-sheet :class="{ 'text-center font-smaller': mobile }">
      {{ t('accountConfirm.bankDataConfirmDescription') }}
    </v-sheet>
    <v-sheet class="">
      <CopyFields />
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
