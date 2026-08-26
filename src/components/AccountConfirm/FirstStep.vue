<script setup lang="ts">
  import { useAccountStore } from '@/stores/accountStore.ts';
  import CopyFields from '@/components/BaseComponents/CopyFields.vue';
  import { useI18n } from 'vue-i18n';

  const accountStore = useAccountStore();
  const { t } = useI18n();

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
      {{ accountStore.addressingByFIO }}, добро пожаловать в личный кабинет!
    </v-sheet>
  </v-card-title>
  <v-card-text class="d-flex flex-column ga-2">
    <v-sheet
      class="d-flex ga-1 font-smaller cursor-pointer text-additional-link mt-4"
      @click="backToStart()"
    >
      <v-icon icon="mdi-arrow-left" />
      <v-sheet>{{ t('auth.back') }}</v-sheet>
    </v-sheet>
    <v-sheet>
      Для доступа к торговой системе личного кабинета, вам необходимо
      <span class="text-element-check">подтвердить свой банковский счёт</span>
      . Совершите перевод с банковского счёта, оформленного на ваше имя, используя реквизиты ниже.
       После поступления средств мы проверим данные банка отправителя и подтвердим ваш счёт для
      дальнейших пополнений.
    </v-sheet>
    <v-sheet class="">
      <CopyFields />
    </v-sheet>
    <v-sheet class="font-smaller text-additional-link">*Минимальная сумма пополнения $10</v-sheet>
  </v-card-text>
</template>

<style scoped lang="scss"></style>
