<script setup lang="ts">
  import RecoverPassword from '@/components/AuthComponents/RecoverPassword.vue';
  import RioniLogo from '@/components/RioniLogo.vue';
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/authStore.ts';
  import OTPForm from '@/components/AuthComponents/OTPForm.vue';

  const { mobile } = useDisplay();
  const { t } = useI18n();
  const router = useRouter();
  const authStore = useAuthStore();

  const backToAuth = () => {
    authStore.setRecoverSmsId(0);
    authStore.setDataRecover({
      value: '',
      type: 'phone'
    });
    authStore.setTimerSms(0);
    router.push('/');
  };
</script>

<template>
  <v-sheet
    class="d-flex flex-column h-100 pa-6"
    :class="{ 'justify-center': mobile }"
    style="background-color: white !important"
  >
    <v-sheet v-if="!mobile"><RioniLogo /></v-sheet>
    <v-sheet class="d-flex h-100">
      <v-sheet v-if="!mobile" class="d-flex justify-center align-center" width="50%" height="80%">
        <v-sheet class="d-flex justify-center flex-column align-center" style="height: fit-content">
          <v-img src="/img/rioni-logo-big.png" max-width="150" width="150" />
          <v-sheet class="d-flex flex-column align-center justify-center" max-width="230">
            <v-sheet class="text-hard-blue font-18 text-center">
              {{ t('auth.slogan') }}
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-sheet>
      <v-sheet width="50%" class="d-flex flex-column" height="90%">
        <v-sheet
          class="rounded-xxl pa-6 mr-4 h-100"
          style="background-color: var(--color-MainBackground) !important"
        >
          <v-sheet
            class="d-flex ga-1 font-smaller cursor-pointer text-additional-link"
            @click="backToAuth()"
          >
            <v-icon icon="mdi-arrow-left" />
            <v-sheet>{{ t('auth.back') }}</v-sheet>
          </v-sheet>
          <recover-password v-if="!authStore.recoverSmsId" />
          <OTPForm v-else />
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
