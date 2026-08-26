<script setup lang="ts">
  import { useAccountStore } from '@/stores/accountStore.ts';
  import StartStep from '@/components/AccountConfirm/StartStep.vue';
  import FirstStep from '@/components/AccountConfirm/FirstStep.vue';
  import SecondStep from '@/components/AccountConfirm/SecondStep.vue';
  import ThirdStep from '@/components/AccountConfirm/ThirdStep.vue';

  const accountStore = useAccountStore();
</script>

<template>
  <v-dialog v-model="accountStore.isNewAccount" max-width="800" height="535">
    <v-card class="pa-6 position-relative">
      <v-sheet class="position-absolute" style="top: 20px; left: 20px">
        <v-img src="/img/min-logo.png" width="90" />
      </v-sheet>
      <StartStep v-if="accountStore.accountConfirmStep === 0" />
      <FirstStep v-if="accountStore.accountConfirmStep === 1" />
      <SecondStep v-if="accountStore.accountConfirmStep === 2" />
      <ThirdStep v-if="accountStore.accountConfirmStep === 3" />
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
  .v-dialog {
    :deep(.v-overlay__scrim) {
      opacity: 1;
      background: var(--color-BlackDisabled);
      backdrop-filter: blur(24px);
    }
  }
</style>
