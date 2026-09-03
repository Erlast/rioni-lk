<script setup lang="ts">
  import RegistrationForm from '@/components/AuthComponents/RegistrationForm.vue';
  import { useAuthStore } from '@/stores/authStore.ts';
  import OTPForm from '@/components/AuthComponents/OTPForm.vue';
  import RegistrationAdditionalForm from '@/components/AuthComponents/RegistrationAdditionalForm.vue';
  import { useRouter } from 'vue-router';

  const authStore = useAuthStore();
  const router = useRouter();

  const afterSendSMS = () => {
    authStore.registrationStep = 2;
  };

  const backToRegistration = () => {
    authStore.registrationStep = 0;
    router.push('/auth/registration');
  };
</script>

<template>
  <registration-form v-if="authStore.registrationStep === 0" />

  <OTPForm
    v-if="authStore.registrationStep === 1"
    @send-sms="afterSendSMS"
    @back="backToRegistration"
  />

  <RegistrationAdditionalForm v-if="authStore.registrationStep === 2" />
</template>

<style scoped lang="scss"></style>
