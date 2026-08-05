<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import type { ICodeModel } from '@/api/types';
  import authService from '@/api/authService.ts';
  import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
  import { helpers, required } from '@vuelidate/validators';
  import { useVuelidate } from '@vuelidate/core';
  import Timer from '@/components/BaseComponents/CodeTimer.vue';
  import { useAuthStore } from '@/stores/authStore';
  import { useNotify } from '@/stores/notifyStore.ts';
  import { useRouter } from 'vue-router';
  import { clearTempData, proceedStores, setBlocked } from '@/utils/loginHelper.ts';
  import RioniLogo from '@/components/RioniLogo.vue';
  import { useDisplay } from 'vuetify';

  interface OTPCredential extends Credential {
    code: string;
  }

  const { t } = useI18n();
  const code = ref('');
  const authStore = useAuthStore();
  const $externalResults = ref<{ [key: string]: string[] }>({});
  const notifyStore = useNotify();
  const router = useRouter();
  const otpInputRef = ref<HTMLInputElement | null>(null);
  const interval = ref();
  const btnDisabled = ref(true);
  const { mobile } = useDisplay();
  const isActive = ref(false);
  const blockedTimerId = ref<ReturnType<typeof setInterval> | null>(null);

  const initialState = {
    code: code
  };

  const emit = defineEmits(['sendSms']);

  const state = reactive({
    ...initialState
  });

  const rules = {
    code: {
      required: helpers.withMessage(
        t('validations.required', { field: t('auth.codeLabel') }),
        required
      ),
      $autoDirty: true
    }
  };

  const formattedTimeLeft = computed(() => {
    if (typeof authStore.blockedTimeLeft !== 'number') {
      authStore.setBlockedTimeLeft(0);
    }
    const minutes = Math.floor(authStore.blockedTimeLeft / 60);
    const seconds = authStore.blockedTimeLeft % 60;

    if (minutes === 0) {
      return `${seconds}`;
    } else {
      return `${minutes}:${String(seconds).padStart(2, '0')}`;
    }
  });

  const startBlockedTimer = () => {
    if (blockedTimerId.value !== null) return;
    blockedTimerId.value = setInterval(() => {
      if (typeof authStore.blockedTimeLeft !== 'number') {
        authStore.setBlockedTimeLeft(0);
      }
      if (authStore.blockedTimeLeft > 0) {
        authStore.blockedTimeLeft--;
      } else {
        clearTempData();
        pauseTimer();
      }
    }, 1000);
  };

  const clearBlockedTimer = () => {
    if (blockedTimerId.value !== null) {
      clearInterval(blockedTimerId.value);
      blockedTimerId.value = null;
    }
  };

  const startTimer = () => {
    if (!isActive.value) {
      isActive.value = true;
      startBlockedTimer();
    }
  };

  const pauseTimer = () => {
    if (isActive.value) {
      isActive.value = false;
      clearBlockedTimer();
    }
  };

  const v = useVuelidate(rules, state, { $externalResults });

  const sendSms = async () => {
    try {
      v.value.$touch();

      if (!v.value.$invalid) {
        btnDisabled.value = true;
        const codeSend: ICodeModel = {
          sms_code_id: authStore.idAuth,
          code: code.value
        };
        const response = await authService.check2faSms(codeSend);

        await proceedStores(response);
        emit('sendSms');
        btnDisabled.value = false;
      }
    } catch (error: any) {
      if (error.status === 400 || error.status === 403) {
        $externalResults.value.code = [t('validations.wrongCode')];
      } else if (error.status === 422) {
        setBlocked(error.response.data.timeLeft);
      } else {
        notifyStore.showServiceError(error);
      }
    }
  };

  const OTP_LENGTH = 6;

  watch(code, newCode => {
    if (newCode.length === OTP_LENGTH) {
      sendSms();
    }
  });

  const sendSmsAgain = async () => {
    try {
      if (typeof authStore.dataSms !== 'undefined') {
        authStore.setTimerSms(300);
        authStore.setSmsSend(true);
        code.value = '';
        v.value.code.$reset();
        btnDisabled.value = false;
        const response = await authService.login(authStore.dataSms);

        authStore.setIdAuth(response.sms_code_id);
      } else {
        throw new Error('Credential is undefined');
      }
    } catch (error) {
      notifyStore.showServiceError(error);
    }
  };

  const backToAuth = () => {
    authStore.setTimerSms(0);
    authStore.setSmsSend(false);
    authStore.setDataSms(undefined);
    authStore.setIdAuth(0);
    authStore.setMaskedPhoneNumber('');
    router.push('/');
  };
  let abortController: AbortController | null = null;

  const startOTPListener = async () => {
    if ('OTPCredential' in window) {
      abortController = new AbortController();

      try {
        const content = (await navigator.credentials.get({
          otp: { transport: ['sms'] },
          signal: abortController.signal // Для отмены позже
        })) as OTPCredential | null;

        if (content?.code) {
          code.value = content.code;
        }
      } catch (err) {
        console.log('OTP listener cancelled or failed:', err);
      }
    }
  };

  onMounted(async () => {
    if (otpInputRef.value) {
      otpInputRef.value.focus();
    }

    if (authStore.blockedTimeLeft === 0) {
      await startOTPListener();

      interval.value = setInterval(startOTPListener, 10000);
    } else {
      startTimer();
    }
  });

  onUnmounted(() => {
    abortController?.abort();
    clearInterval(interval.value);
    clearBlockedTimer();
  });
</script>

<template>
  <v-sheet class="d-flex flex-column rounded-xxl pa-5" style="height: 80%">
    <v-sheet v-if="!mobile"><RioniLogo /></v-sheet>
    <v-sheet
      class="d-flex ga-1 font-smaller cursor-pointer text-additional-link mt-4"
      @click="backToAuth()"
    >
      <v-icon icon="mdi-arrow-left" />
      <v-sheet>{{ t('auth.back') }}</v-sheet>
    </v-sheet>
    <v-sheet v-if="!authStore.blockedTimeLeft" class="d-flex justify-center h-100 align-center">
      <v-sheet class="d-flex flex-column align-center justify-center" max-width="355">
        <v-sheet class="text-hard-blue font-22">{{ t('auth.codeTitle') }}</v-sheet>
        <v-sheet class="text-type-text font-smaller">
          {{ t('auth.codeSubtitle', { phoneNumber: authStore.maskedPhone }) }}
        </v-sheet>
        <v-form ref="loginForm" fast-fail @submit.prevent="sendSms">
          <v-sheet class="mt-2">
            <v-otp-input
              ref="otpInputRef"
              v-model="code"
              autocomplete="one-time-code"
              inputmode="numeric"
              length="6"
              max-width="246"
              focused
              :error="!!v.code.$errors.length"
              @finish="btnDisabled = false"
            ></v-otp-input>
            <v-sheet
              v-if="!!v.code.$errors.length"
              class="d-flex justify-center mb-2 font-smaller"
              :class="[v.code.$errors.length ? 'text-additional-error' : '']"
            >
              {{ v.code.$errors[0].$message }}
            </v-sheet>
          </v-sheet>
          <v-sheet class="d-flex flex-column ga-2">
            <v-btn
              v-if="authStore.timerSms <= 0"
              ref="smsSendAgain"
              rounded="lg"
              variant="flat"
              bg="element"
              color="element"
              block
              @click="sendSmsAgain"
            >
              <v-sheet class="text-white">{{ t('auth.sendCodeAgain') }}</v-sheet>
            </v-btn>
            <div v-if="authStore.timerSms > 0" class="d-flex font-small mb-6 justify-start">
              <Timer v-model="authStore.timerSms" />
            </div>
          </v-sheet>
        </v-form>
      </v-sheet>
    </v-sheet>
    <v-sheet v-else class="d-flex flex-column justify-center h-100 align-center">
      <v-sheet max-width="420">
        <v-sheet width="100%" height="113" class="d-flex justify-center">
          <v-img src="/img/blocked.png" width="113" />
        </v-sheet>
        <v-sheet
          class="d-flex justify-center text-center font-22 font-semibold text-hard-blue mb-4 mt-2"
        >
          {{ t('auth.attemptCountErrorTitle') }}
        </v-sheet>
        <v-sheet class="text-center font-smaller">
          {{ t('auth.timeLeftText') }}
          <span class="text-additional-error">
            {{ t('auth.timeLeftTimer', { delay: formattedTimeLeft }) }}
          </span>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  .error-message {
    display: flex;
    justify-content: center;
    color: var(--color-AdditionalRed) !important;
  }

  .v-otp-input {
    :deep(.v-field) {
      height: 50px !important;
      width: 50px !important;
      min-width: 50px !important;
      color: var(--color-Element) !important;
    }

    :deep(.v-field--focused) {
      .v-field__outline {
        --v-field-border-opacity: 0.38;
      }
    }

    :deep(.v-field__outline) {
      --v-field-border-opacity: 0.18;
      --v-field-border-width: 1px;
    }
  }
</style>
