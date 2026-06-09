<script setup lang="ts">
  import { useAuthStore } from '@/stores/authStore';
  import AuthForm from '@/components/AuthForm.vue';
  import AuthSmsForm from '@/components/AuthSmsForm.vue';
  import { computed, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useDisplay, useTheme } from 'vuetify';
  import RioniLogo from '@/components/RioniLogo.vue';
  import { useNotification } from '@kyvg/vue3-notification';
  import { stringToPositiveHash } from '@/utils/number.extensions';
  import { useNotify } from '@/stores/notifyStore.ts';
  import { clearTempData } from '@/utils/loginHelper.ts';

  const authStore = useAuthStore();
  const router = useRouter();
  const { mobile } = useDisplay();
  const { notify } = useNotification();
  const notifyStore = useNotify();

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
  const isImageLoaded = ref(false);
  const loaded = computed(() => (isImageLoaded.value && !mobile.value ? 'loaded' : ''));
  const bgImage = computed(() => (!mobile.value ? 'bg-image' : ''));

  const preloadImage = () => {
    const img = new Image();
    img.src = '/img/corporate.jpg';
    img.onload = () => {
      isImageLoaded.value = true; // Устанавливаем флаг после загрузки изображения
    };
  };

  const smsSend = async () => {
    try {
      await router.push('/');

      clearTempData();
    } catch (error) {
      console.warn(error);
    }
  };

  onMounted(() => {
    if (!mobile.value) {
      preloadImage();
    }
  });
</script>

<template>
  <v-sheet
    v-if="mobile"
    class="position-absolute d-flex align-center justify-space-between w-100 px-8"
    height="46"
    :class="{ 'mt-3': mobile }"
  >
    <RioniLogo />
  </v-sheet>

  <div :class="['d-flex', 'align-center', 'justify-center', loaded, bgImage]" style="height: 100vh">
    <v-card :width="720" height="480" class="elevation-0 rounded-xxl pa-5">
      <v-card-title><RioniLogo /></v-card-title>
      <v-card-text class="d-flex align-center justify-space-between mt-6">
        <v-sheet v-if="!mobile" class="d-flex justify-center" width="50%">
          <v-sheet class="d-flex flex-column align-center justify-center" max-width="230">
            <v-img src="/img/rioni-logo-big.png" max-width="150" width="150" />
            <v-sheet class="text-hard-blue">
              Rioni Capital – a European broker with a Georgian flair
            </v-sheet>
          </v-sheet>
        </v-sheet>
        <v-sheet width="320">
          <AuthForm v-if="!authStore.isSmsSend" @login="loginHandle" />
          <AuthSmsForm v-else @send-sms="smsSend" />
        </v-sheet>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
  .bg-image {
    background-color: var(--color-MainBackground);
    //background-size: cover; /* Это обеспечит, что изображение покроет весь экран */
    //background-image: url('/img/corporate_sm.jpg'); /* Путь к вашему изображению */
    //background-position: center; /* Центрирование изображения */
    //background-repeat: no-repeat; /* Чтобы изображение не повторялось */
    //transition: background-image 1s ease-in-out;

    &.loaded {
      // background-image: url('/img/corporate.jpg');
    }
  }
</style>
