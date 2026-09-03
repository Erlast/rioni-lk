<script setup lang="ts">
  import { useAccountStore } from '@/stores/accountStore.ts';
  import { useDisplay } from 'vuetify';

  const accountStore = useAccountStore();
  const { mobile } = useDisplay();

  const goToStep = (step: number, disabled: boolean): void => {
    if (disabled) {
      return;
    }
    accountStore.accountConfirmStep = step;
  };
</script>

<template>
  <v-card-title
    class="d-flex flex-column justify-end align-center position-relative"
    style="min-height: 50px"
  >
    <v-sheet
      class="font-18 text-hard-blue"
      :style="mobile ? 'word-break:break-all; white-space: wrap;' : ''"
    >
      {{ accountStore.addressingByFIO }}, добро пожаловать в личный кабинет!
    </v-sheet>
  </v-card-title>
  <v-card-text class="d-flex flex-column ga-4" :class="{ 'pa-0': mobile }">
    <v-sheet :class="{ 'mt-2': mobile }">
      Для доступа к торговой системе личного кабинета, вам необходимо завершить верифакацию
      аккаунта. Для этого выполните следующие шаги:
    </v-sheet>
    <v-sheet class="d-flex flex-column ga-1">
      <v-sheet
        class="d-flex justify-space-between px-4 py-4 rounded-ml account-confirm"
        :class="{
          'bg-choice text-middle-blue': accountStore.data.balance > 0,
          'bg-main text-element active': accountStore.data.balance === 0
        }"
        @click="goToStep(1, accountStore.data.balance > 0)"
      >
        <v-sheet>Подтвердите банковские реквизиты</v-sheet>
        <v-icon v-if="accountStore.data.balance === 0" icon="mdi-arrow-right" />
        <v-icon v-else icon="mdi-check-circle-outline" />
      </v-sheet>
      <v-sheet
        class="d-flex justify-space-between px-4 py-4 rounded-ml account-confirm"
        :class="{
          'bg-choice text-middle-blue': accountStore.data.tariffId,
          'bg-main text-element': accountStore.data.tariffId === null,
          active: accountStore.data.balance > 0 && accountStore.data.tariffId === null,
          disabled: accountStore.data.balance === 0
        }"
        @click="goToStep(2, accountStore.data.tariffId !== null)"
      >
        <v-sheet>Выберите тариф</v-sheet>
        <v-icon v-if="accountStore.data.tariffId === null" icon="mdi-arrow-right" />
        <v-icon v-else icon="mdi-check-circle-outline" />
      </v-sheet>
      <v-sheet
        class="d-flex justify-space-between px-4 py-4 rounded-ml account-confirm"
        :class="{
          'bg-choice text-middle-blue':
            accountStore.data.addresses.filter(item => item.isConfirmed).length > 0,
          'bg-main text-element':
            accountStore.data.addresses.filter(item => item.isConfirmed).length === 0,
          active:
            accountStore.data.tariffId &&
            accountStore.data.addresses.filter(item => item.isConfirmed).length === 0,
          disabled: accountStore.data.tariffId === null
        }"
        @click="
          goToStep(3, accountStore.data.addresses.filter(item => item.isConfirmed).length > 0)
        "
      >
        <v-sheet>Подтвердите адрес</v-sheet>
        <v-icon icon="mdi-arrow-right" />
      </v-sheet>
    </v-sheet>
  </v-card-text>
</template>

<style scoped lang="scss">
  .account-confirm {
    &.active {
      cursor: pointer;
      &:hover {
        background-color: var(--color-Choosen) !important;
        color: var(--color-MiddleBlue) !important;
      }
    }
    &.disabled {
      opacity: 0.5 !important;
    }
  }
</style>
