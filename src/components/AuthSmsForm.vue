<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import type { ICodeModel } from '@/api/types';
  import authService from '@/api/authService';
  import { onMounted, onUnmounted, reactive, ref } from 'vue';
  import { helpers, required } from '@vuelidate/validators';
  import { useVuelidate } from '@vuelidate/core';
  import Timer from '@/components/BaseComponents/CodeTimer.vue';
  import { useAuthStore } from '@/stores/authStore';
  import { useNotify } from '@/stores/notifyStore.ts';
  import { useRouter } from 'vue-router';
  import { proceedStores } from '@/utils/loginHelper.ts';

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
  const btnDisabled = ref(false);

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
      )
      //$autoDirty: true
    }
  };

  const v = useVuelidate(rules, state, { $externalResults });

  const sendSms = async () => {
    // eslint-disable-next-line no-useless-catch
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
      if (error.status === 422 || error.status === 403) {
        $externalResults.value.code = [t('validations.wrongCode')];
      } else {
        notifyStore.showServiceError(error);
      }
    }
  };

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

    await startOTPListener();

    interval.value = setInterval(startOTPListener, 10000);
  });

  onUnmounted(() => {
    abortController?.abort();
    clearInterval(interval.value);
  });
</script>

<template>
  <v-sheet class="rounded-xxl pa-5" style="background-color: var(--color-LightBlue) !important">
    <v-sheet class="text-hard-blue font-22">{{ t('auth.codeTitle') }}</v-sheet>
    <v-sheet class="text-type-text font-smaller">{{ t('auth.enterConfirmationCode') }}</v-sheet>
    <v-form ref="loginForm" fast-fail @submit.prevent="sendSms">
      <v-sheet class="mt-2">
        <v-otp-input
          ref="otpInputRef"
          v-model="code"
          autocomplete="one-time-code"
          inputmode="numeric"
          max-width="246"
          focused
          :error="!!v.code.$errors.length"
        ></v-otp-input>
        <v-sheet
          v-if="!!v.code.$errors.length"
          class="d-flex justify-center mb-2"
          :class="[v.code.$errors.length ? 'text-additional-error' : '']"
        >
          {{ v.code.$errors[0].$message }}
        </v-sheet>
      </v-sheet>
      <v-sheet class="d-flex flex-column ga-2">
        <v-btn
          :disabled="btnDisabled"
          variant="flat"
          rounded="lg"
          bg="type-text"
          color="type-text"
          type="submit"
          block
        >
          <v-sheet class="text-white">{{ t('next') }}</v-sheet>
        </v-btn>
        <v-btn
          v-if="authStore.timerSms <= 0"
          ref="smsSendAgain"
          rounded="lg"
          variant="flat"
          bg="white"
          color="white"
          block
          @click="sendSmsAgain"
        >
          <v-sheet class="text-hard-blue">{{ t('auth.sendCodeAgain') }}</v-sheet>
        </v-btn>
        <v-btn
          ref="btnBackToAuth"
          variant="flat"
          bg="white"
          color="white"
          rounded="lg"
          block
          @click="backToAuth"
        >
          <v-sheet class="text-hard-blue">{{ t('back') }}</v-sheet>
        </v-btn>
        <div v-if="authStore.timerSms > 0" class="d-flex font-small mb-6 justify-start">
          <Timer v-model="authStore.timerSms" />
        </div>
      </v-sheet>
    </v-form>
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
      height: 40px !important;
      width: 40px !important;
      min-width: 40px !important;
    }

    :deep(.v-field__outline) {
      --v-field-border-width: 0;
    }
  }
</style>
