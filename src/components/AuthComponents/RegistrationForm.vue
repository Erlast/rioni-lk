<script setup lang="ts">
  import PhoneFields from '@/components/BaseComponents/PhoneFields.vue';
  import { reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { helpers, required, email } from '@vuelidate/validators';
  import { useVuelidate } from '@vuelidate/core';
  import { debounce } from 'lodash-es';
  import authService from '@/api/authService.ts';
  import { IContactModel, IRegistrationSendSmsModel } from '@/api/types.ts';
  import { useAuthStore } from '@/stores/authStore.ts';
  import { useRouter } from 'vue-router';
  import { proceedStores } from '@/utils/loginHelper.ts';
  import RioniLogo from '@/components/RioniLogo.vue';
  import { useDisplay } from 'vuetify';

  const $externalResults = ref<{ [key: string]: string[] }>({});
  const loading = ref(false);
  const loadingCheckNumber = ref(false);
  const authStore = useAuthStore();
  const router = useRouter();
  const { t } = useI18n();
  const { mobile } = useDisplay();

  type IRegistrationForm = {
    name: string;
    phone: string;
    email: string;
    privacy_policy: false;
    confirm_adds: true;
  };

  const state = reactive({
    name: '',
    phone: '',
    email: '',
    privacy_policy: false,
    confirm_adds: true
  }) as IRegistrationForm;

  const rules = {
    name: {
      required: helpers.withMessage(
        () =>
          t('validations.required', {
            field: t('auth.name')
          }),
        required
      ),
      $autoDirty: true
    },
    phone: {
      required: helpers.withMessage(
        () =>
          t('validations.required', {
            field: t('auth.phoneNumber')
          }),
        required
      ),
      $autoDirty: true
    },
    email: {
      required: helpers.withMessage(
        () =>
          t('validations.required', {
            field: t('auth.email')
          }),
        required
      ),
      email: helpers.withMessage(t('validations.invalidEmail'), email)
    }
  };

  const v$ = useVuelidate(rules, state, { $externalResults });

  const onKeyUp = () => {
    v$.value.$touch();

    if (!v$.value.email.required.$invalid) {
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
      value: state.email,
      type: 'email'
    } as IContactModel;
    const result = await authService.checkContact(data);

    if (result.exists) {
      $externalResults.value.email = [t('validations.valueExists')];
    } else {
      $externalResults.value.email = [];
    }
    loadingCheckNumber.value = false;
  };

  const registrationSendSmsHandle = async () => {
    const data = {
      phone: state.phone
    } as IRegistrationSendSmsModel;

    try {
      const response = await authService.registrationSendSms(data);

      await proceedStores(response);

      authStore.registrationData = {
        name: state.name,
        phone: state.phone,
        email: state.email,
        privacy_policy: state.privacy_policy,
        confirm_adds: state.confirm_adds
      };
      authStore.registrationStep = 1;
    } catch (error) {
      console.log(error);
    }
  };
</script>

<template>
  <v-sheet
    class="d-flex h-100"
    :class="{ 'justify-center': mobile }"
    style="background-color: var(--color-MainBackground) !important"
  >
    <v-sheet class="rounded-xxl h-100 pa-6" width="50%" style="background-color: white !important">
      <v-sheet v-if="!mobile"><RioniLogo /></v-sheet>
      <v-sheet class="d-flex justify-center align-center" height="80%">
        <v-sheet v-if="!mobile" class="d-flex">
          <v-sheet
            class="d-flex justify-center flex-column align-center"
            style="height: fit-content"
          >
            <v-img src="/img/rioni-logo-big.png" max-width="150" width="150" />
            <v-sheet class="d-flex flex-column align-center justify-center" max-width="230">
              <v-sheet class="text-hard-blue font-18 text-center">
                {{ t('auth.slogan') }}
              </v-sheet>
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <v-sheet width="50%" class="d-flex align-center pa-6" height="90%">
      <v-sheet class="d-flex flex-column" width="100%">
        <v-sheet class="text-hard-blue font-22 mb-1">Регистрация профиля</v-sheet>
        <v-form
          id="registrationSmsCodeForm"
          ref="registrationSmsCodeForm"
          @submit.prevent="registrationSendSmsHandle"
        >
          <v-sheet class="d-flex flex-column ga-4">
            <v-sheet class="d-flex flex-column ga-2">
              <v-sheet class="d-flex flex-column ga-1">
                <v-sheet class="text-type-text font-smaller">{{ t('auth.name') }}</v-sheet>
                <v-text-field
                  v-model="state.name"
                  variant="solo"
                  rounded
                  flat
                  hide-details="auto"
                  label=""
                  :error="v$.name.$error"
                  :error-messages="v$.name.$error ? v$.name.$errors.map(e => e.$message) : []"
                />
              </v-sheet>
              <v-sheet class="d-flex flex-column ga-1">
                <v-sheet class="text-type-text font-smaller">{{ t('auth.phoneNumber') }}</v-sheet>
                <PhoneFields v-model="state.phone" :error="v$.phone.$error" />
                <v-sheet v-if="v$.phone.$errors.length" class="text-red font-smaller">
                  {{ v$.phone.$errors.map(e => e.$message)[0] }}
                </v-sheet>
              </v-sheet>
              <v-sheet class="d-flex flex-column ga-1">
                <v-sheet class="text-type-text font-smaller">E-mail</v-sheet>
                <v-text-field
                  v-model="state.email"
                  :loading="loadingCheckNumber"
                  variant="solo"
                  rounded
                  flat
                  hide-details="auto"
                  label=""
                  :error="v$.email.$error"
                  :error-messages="v$.email.$error ? v$.email.$errors.map(e => e.$message) : []"
                  @keyup="onKeyUp"
                />
              </v-sheet>
            </v-sheet>
            <v-sheet class="d-flex flex-column font-smaller text-type-text">
              <v-sheet class="d-flex ga-1 align-center">
                <v-checkbox
                  v-model="state.privacy_policy"
                  label=""
                  class="checkbox-gender"
                  hide-details
                  true-icon="rioni:formCheckOn"
                  false-icon="rioni:formCheckOff"
                ></v-checkbox>
                <v-sheet>
                  Я согласен с
                  <span class="text-additional-link">Rioni T&C</span>
                  и
                  <span class="text-additional-link">privacy notice</span>
                </v-sheet>
              </v-sheet>

              <v-sheet class="d-flex ga-1 align-center">
                <v-checkbox
                  label=""
                  class="checkbox-gender"
                  hide-details
                  true-icon="rioni:formCheckOn"
                  false-icon="rioni:formCheckOff"
                  v-model="state.confirm_adds"
                ></v-checkbox>
                <v-sheet>Я согласен на получение рекламных рассылок</v-sheet>
              </v-sheet>
            </v-sheet>
            <v-sheet class="d-flex flex-column ga-1">
              <v-btn
                :loading="loading"
                :disabled="!state.privacy_policy"
                variant="flat"
                rounded="lg"
                bg="middle-blue"
                color="middle-blue"
                type="submit"
                block
              >
                <v-sheet class="text-white">Зарегистрироваться</v-sheet>
              </v-btn>
              <v-sheet class="d-flex font-smaller w-100 justify-center">
                Уже есть аккаунт? &nbsp;
                <span class="text-additional-link cursor-pointer" @click="router.push('/')">
                  Войти
                </span>
              </v-sheet>
            </v-sheet>
          </v-sheet>
        </v-form>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  .v-chip-group {
    width: 100%;
    .type-selected {
      color: white !important;
    }
  }
  .v-slide-group__content {
    .v-chip.v-chip--density-default {
      --v-chip-height: 30px;
      width: 50%;
    }
  }
</style>
