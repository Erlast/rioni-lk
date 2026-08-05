<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { reactive, ref } from 'vue';
  import { helpers, required } from '@vuelidate/validators';
  import { useVuelidate } from '@vuelidate/core';
  import Timer from '@/components/BaseComponents/CodeTimer.vue';
  import { useAuthStore } from '@/stores/authStore.ts';

  const { t } = useI18n();
  const code = ref();
  const btnDisabled = ref(true);
  const $externalResults = ref<{ [key: string]: string[] }>({});
  const authStore = useAuthStore();

  const initialState = {
    code: code
  };

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

  const v = useVuelidate(rules, state, { $externalResults });

  const checkSmsHandle = () => {};
</script>

<template>
  <v-sheet class="text-hard-blue font-22 mb-1">
    {{ t('auth.recoverPermissionTitle') }}
  </v-sheet>
  <v-form id="recoverForm" ref="recoverForm" @submit.prevent="checkSmsHandle">
    <v-sheet class="d-flex flex-column ga-4">
      <v-sheet class="font-smaller">Введите код подтверждения</v-sheet>
      <v-sheet class="d-flex ga-2">
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
      <v-sheet class="d-flex flex-column">
        <v-btn
          :disabled="btnDisabled"
          variant="flat"
          rounded="lg"
          bg="middle-blue"
          color="middle-blue"
          type="submit"
          block
        >
          <v-sheet class="text-white">{{ t('auth.continue') }}</v-sheet>
        </v-btn>
        <div v-if="authStore.timerSms > 0" class="d-flex font-small mb-6 justify-start">
          <Timer v-model="authStore.timerSms" />
        </div>
      </v-sheet>
    </v-sheet>
  </v-form>
</template>

<style scoped lang="scss"></style>
