<script setup lang="ts">
  import { useAuthStore } from '@/stores/authStore';
  import AuthForm from '@/components/AuthForm.vue';
  import AuthSmsForm from '@/components/AuthSmsForm.vue';
  import { useRouter } from 'vue-router';
  import { useDisplay } from 'vuetify';
  import RioniLogo from '@/components/RioniLogo.vue';
  import { useNotification } from '@kyvg/vue3-notification';
  import { stringToPositiveHash } from '@/utils/number.extensions';
  import { useNotify } from '@/stores/notifyStore.ts';
  import { clearTempData } from '@/utils/loginHelper.ts';
  import { useI18n } from 'vue-i18n';
  import LanguageSelect from '@/components/LanguageSelect.vue';

  const authStore = useAuthStore();
  const router = useRouter();
  const { mobile } = useDisplay();
  const { notify } = useNotification();
  const notifyStore = useNotify();
  const { t } = useI18n();

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
  <v-sheet
    class="d-flex justify-end align-center pa-4"
    style="background-color: var(--color-Choosen) !important"
  >
    <v-sheet
      v-if="mobile"
      class="position-absolute d-flex align-center justify-space-between w-100 px-8"
      height="46"
      :class="{ 'mt-3': mobile }"
    >
      <RioniLogo />
    </v-sheet>
    <LanguageSelect />
  </v-sheet>

  <div
    :class="['d-flex', 'align-center', 'justify-center', 'bg-image']"
    style="height: calc(100vh - 68px); background-color: var(--color-Choosen) !important"
  >
    <v-card
      :width="mobile ? '100%' : 760"
      height="520"
      class="elevation-0 rounded-xxl"
      style="background-color: white !important"
    >
      <v-card-text class="pa-0 h-100">
        <AuthForm v-if="!authStore.isSmsSend" @login="loginHandle" />
        <AuthSmsForm v-else @send-sms="smsSend" />
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
  .bg-image {
    background-color: var(--color-MainBackground);
  }
</style>
