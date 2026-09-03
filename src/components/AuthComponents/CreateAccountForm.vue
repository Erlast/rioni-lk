<script setup lang="ts">
  import { computed, reactive, ref, unref } from 'vue';
  import { helpers, required, sameAs } from '@vuelidate/validators';
  import { useVuelidate } from '@vuelidate/core';
  import { debounce } from 'lodash-es';
  import { IContactModel, IRegistrationModel } from '@/api/types.ts';
  import authService from '@/api/authService.ts';
  import { useAuthStore } from '@/stores/authStore.ts';
  import { useI18n } from 'vue-i18n';
  import {
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    generatePassword,
    passwordDiversity,
    passwordHasNoKeyboardSequence,
    passwordHasNoPersonalInfo,
    passwordLength
  } from '@/utils/validators.ts';
  import useClipboard from 'vue-clipboard3';
  import { useNotify } from '@/stores/notifyStore.ts';

  const $externalResults = ref<{ [key: string]: string[] }>({});
  const loading = ref(false);
  const loadingCheckNumber = ref(false);
  const authStore = useAuthStore();
  const visiblePassword = ref(false);
  const visibleConfirmPassword = ref(false);
  const { t } = useI18n();
  const drawer = defineModel<boolean>('drawer', { default: false });
  const { toClipboard } = useClipboard();
  const notifyStore = useNotify();

  type IRegistrationForm = {
    login: string;
    password: string;
    confirm_password: string;
  };

  const state = reactive({
    login: '',
    password: '',
    confirm_password: ''
  }) as IRegistrationForm;

  const passwordValue = computed(() => state.password);
  const alpha = helpers.regex(/^[a-zA-Z0-9._-]*$/);

  const forbiddenValues = computed(() => {
    const data = authStore.registrationData;
    return [data?.name, data?.phone, data?.email, state.login].filter(Boolean) as string[];
  });

  const copy = async (text: string) => {
    await toClipboard(text);
    notifyStore.show(t('topUpAccount.textCopied'), '', 'info', 'copy', 2000);
  };

  const rules = {
    login: {
      required: helpers.withMessage(
        () =>
          t('validations.required', {
            field: t('auth.login')
          }),
        required
      ),
      $autoDirty: true
    },
    password: {
      required: helpers.withMessage(
        () =>
          t('validations.required', {
            field: t('auth.password')
          }),
        required
      ),
      passwordLength: helpers.withMessage(
        () =>
          t('validations.passwordLength', {
            min: PASSWORD_MIN_LENGTH,
            max: PASSWORD_MAX_LENGTH
          }),
        passwordLength
      ),
      alphaNumeric: helpers.withMessage(() => t('validations.alphaNum'), alpha),
      passwordDiversity: passwordDiversity,
      passwordKeyboardSequence: passwordHasNoKeyboardSequence,
      passwordPersonalInfo: passwordHasNoPersonalInfo(forbiddenValues.value),
      $autoDirty: true
    },
    confirm_password: {
      required: helpers.withMessage(
        () =>
          t('validations.required', {
            field: t('auth.confirmPassword')
          }),
        required
      ),
      sameAsPassword: helpers.withMessage(() => t('validations.sameAs'), sameAs(passwordValue))
    }
  };

  const v$ = useVuelidate(rules, state, { $externalResults });

  const onKeyUp = () => {
    v$.value.$touch();

    if (!v$.value.login.required.$invalid) {
      loadingCheckNumber.value = true;
      debouncedCheckContact();
      return;
    }
  };

  const debouncedCheckContact = debounce(() => {
    checkContact();
  }, 1000);

  const checkContact = async () => {
    const data = {
      value: state.login,
      type: 'login'
    } as IContactModel;
    const result = await authService.checkContact(data);

    if (result.exists) {
      $externalResults.value.login = [t('validations.valueLoginExists')];
    } else {
      $externalResults.value.login = [];
    }
    loadingCheckNumber.value = false;
  };

  const weakPassword = computed(() => {
    const password = v$.value.password;

    return (
      !!state.password &&
      !password.passwordLength.$invalid &&
      !password.alphaNumeric.$invalid &&
      (password.passwordDiversity.$invalid ||
        password.passwordKeyboardSequence.$invalid ||
        password.passwordPersonalInfo.$invalid)
    );
  });

  const passwordErrorMessages = computed<string[]>(() => {
    const password = v$.value.password;

    if (!password.$dirty) return [];

    if (password.required.$invalid) return [unref(password.required.$message)];
    if (password.passwordLength.$invalid) return [unref(password.passwordLength.$message)];
    if (password.alphaNumeric.$invalid) return [unref(password.alphaNumeric.$message)];
    if (weakPassword.value) return [t('validations.weakPassword')];

    return [];
  });

  const onGeneratePassword = () => {
    state.password = generatePassword();
    state.confirm_password = state.password;
    copy(state.password);
    v$.value.password.$touch();
    v$.value.confirm_password.$touch();
  };

  const registrationHandle = async () => {
    const isValid = await v$.value.$validate();
    if (!isValid) return;

    const data = {
      login: state.login,
      password: state.password,
      confirm_password: state.confirm_password,
      name: authStore.registrationData?.name || '',
      phone: authStore.registrationData?.phone || '',
      email: authStore.registrationData?.privacy_policy || '',
      confirm_adds: authStore.registrationData?.confirm_adds || ''
    } as IRegistrationModel;

    try {
      const response = await authService.registration(data);
      console.log(response);
      authStore.registrationStep = 4;
    } catch (error) {
      console.log(error);
    }
  };
</script>

<template>
  <v-sheet class="d-flex flex-column ga-4" width="100%">
    <v-sheet>
      <v-sheet class="text-hard-blue font-22">Создайте аккаунт</v-sheet>
      <v-sheet class="font-small">
        Придумайте логин и пароль
        <span class="text-additional-link cursor-pointer" @click="drawer = true">
          на основе рекомендаций
        </span>
      </v-sheet>
    </v-sheet>
    <v-form id="registrationForm" ref="registrationForm" @submit.prevent="registrationHandle">
      <v-sheet class="d-flex flex-column ga-4">
        <v-sheet class="d-flex flex-column">
          <v-sheet class="d-flex flex-column ga-1">
            <v-sheet class="text-type-text font-smaller">{{ t('auth.login') }}</v-sheet>
            <v-text-field
              v-model="state.login"
              variant="solo"
              rounded
              flat
              label=""
              autocomplete="off"
              :error="v$.login.$error"
              :error-messages="v$.login.$error ? v$.login.$errors.map(e => unref(e.$message)) : []"
              @keyup="onKeyUp()"
            />
          </v-sheet>
          <v-sheet class="d-flex flex-column ga-1">
            <v-sheet class="text-type-text font-smaller">{{ t('auth.password') }}</v-sheet>
            <v-text-field
              v-model="state.password"
              variant="solo"
              flat
              class="field-password"
              rounded
              :type="!visiblePassword ? 'password' : 'text'"
              label=""
              autocomplete="new-password"
              :error="v$.password.$error"
              :error-messages="passwordErrorMessages"
              @append-click="visiblePassword = !visiblePassword"
            >
              <template #append-inner>
                <v-sheet
                  style="cursor: pointer; height: 24px; background-color: transparent"
                  @click="visiblePassword = !visiblePassword"
                >
                  <v-icon icon="mdi-eye-off" color="type-text" v-if="!visiblePassword" />
                  <v-icon icon="mdi-eye" color="type-text" v-if="visiblePassword" />
                </v-sheet>
              </template>
              <template #message="{ message }">
                <v-sheet v-if="weakPassword" class="font-smaller">
                  {{ t('validations.weakPassword') }}
                  <span class="cursor-pointer text-additional-link" @click="onGeneratePassword">
                    {{ t('auth.generatePassword') }}
                  </span>
                </v-sheet>
                <v-sheet v-else>{{ message }}</v-sheet>
              </template>
            </v-text-field>
          </v-sheet>
          <v-sheet class="d-flex flex-column ga-1">
            <v-sheet class="text-type-text font-smaller">
              {{ t('auth.confirmPassword') }}
            </v-sheet>
            <v-text-field
              v-model="state.confirm_password"
              variant="solo"
              flat
              class="field-password"
              rounded
              :type="!visibleConfirmPassword ? 'password' : 'text'"
              label=""
              autocomplete="new-password"
              :error="v$.confirm_password.$error"
              :error-messages="v$.confirm_password.$errors.map(e => unref(e.$message))"
              @append-click="visibleConfirmPassword = !visibleConfirmPassword"
            >
              <template #append-inner>
                <v-sheet
                  style="cursor: pointer; height: 24px; background-color: transparent"
                  @click="visibleConfirmPassword = !visibleConfirmPassword"
                >
                  <v-icon icon="mdi-eye-off" color="type-text" v-if="!visibleConfirmPassword" />
                  <v-icon icon="mdi-eye" color="type-text" v-if="visibleConfirmPassword" />
                </v-sheet>
              </template>
            </v-text-field>
          </v-sheet>
        </v-sheet>

        <v-sheet class="d-flex flex-column ga-1">
          <v-btn
            :loading="loading"
            variant="flat"
            rounded="lg"
            bg="middle-blue"
            color="middle-blue"
            type="submit"
            block
          >
            <v-sheet class="text-white">Создать аккаунт</v-sheet>
          </v-btn>
        </v-sheet>
      </v-sheet>
    </v-form>
  </v-sheet>
</template>

<style scoped lang="scss">
  #registrationForm {
    :deep(.v-input--error) {
      &.field-password {
        input {
          border-radius: 8px 0 0 8px;
          border-right: 0;
        }
      }
      input {
        border-radius: 8px;
        border: 1px solid red;
      }
    }
    :deep(input) {
      border-radius: 8px;
    }
    .v-input {
      :deep(.v-field__overlay) {
        background-color: var(--color-LightBlue);
      }
    }
  }
</style>
