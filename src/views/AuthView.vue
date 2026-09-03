<script setup lang="ts">
  import { useAuthStore } from '@/stores/authStore';
  import AuthForm from '../components/AuthComponents/AuthForm.vue';
  import { stringToPositiveHash } from '@/utils/number.extensions.ts';
  import { useNotification } from '@kyvg/vue3-notification';
  import { useNotify } from '@/stores/notifyStore.ts';
  import { useRouter } from 'vue-router';
  import { clearTempData } from '@/utils/loginHelper.ts';
  import OTPForm from '@/components/AuthComponents/OTPForm.vue';
  import authService from '@/api/authService.ts';

  const authStore = useAuthStore();
  const { notify } = useNotification();
  const notifyStore = useNotify();
  const router = useRouter();

  const loginHandle = async () => {
    const idWarnSession = stringToPositiveHash('warnsession');
    notify.close(idWarnSession); // закроем окно о завершении сессии

    try {
      if (authStore.token) {
        await router.push('/');
        return;
      }
    } catch (error) {
      notifyStore.showServiceError(error);
    }
  };

  const sendSmsAgain = async () => {
    const response = await authService.login(authStore.dataSms);

    authStore.setIdAuth(response.sms_code_id);
  };

  const smsSend = async () => {
    try {
      await router.push('/');

      clearTempData();
    } catch (error) {
      console.warn(error);
    }
  };
</script>

<template>
  <AuthForm v-if="!authStore.isSmsSend" @login="loginHandle" />
  <OTPForm v-else @send-sms="smsSend" @send-sms-again="sendSmsAgain" @back="router.push('/')" />
</template>

<style scoped lang="scss">
  .bg-image {
    background-color: var(--color-MainBackground);
  }
</style>
