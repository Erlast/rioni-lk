<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required, helpers } from '@vuelidate/validators';
  import { useI18n } from 'vue-i18n';
  import type { ICredentialModel } from '@/api/types';
  import { useNotify } from '@/stores/notifyStore.ts';
  import { useDisplay } from 'vuetify';
  import { loginStoreData, setBlocked } from '@/utils/loginHelper.ts';
  import RioniLogo from '@/components/RioniLogo.vue';
  import { useRouter } from 'vue-router';

  const loading = ref(false);
  const login = ref('');
  const password = ref('');
  const visible = ref<boolean>(false);
  const { t } = useI18n();
  const $externalResults = ref<{ [key: string]: string[] }>({});
  const router = useRouter();

  const { mobile } = useDisplay();

  const initialState = {
    login: login,
    password: password
  };
  const notifyStore = useNotify();
  const emit = defineEmits(['login']);

  const state = reactive({
    ...initialState
  });

  const rules = {
    login: {
      required: helpers.withMessage(
        t('validations.required', { field: t('auth.login') }),
        required
      ),
      $autoDirty: true
    },
    password: {
      required: helpers.withMessage(
        t('validations.required', { field: t('auth.password') }),
        required
      ),
      $autoDirty: true
    }
  };

  const v$ = useVuelidate(rules, state, { $externalResults });

  const loginHandle = async () => {
    loading.value = true;
    // eslint-disable-next-line no-useless-catch
    try {
      v$.value.$touch();

      if (!v$.value.$invalid) {
        const credential: ICredentialModel = {
          login: login.value,
          password: password.value
        };

        await loginStoreData(credential);

        emit('login');
      } else {
        loading.value = false;
      }
    } catch (error: any) {
      if (error.status === 403 || error.status === 401) {
        $externalResults.value.password = [t('validations.wrongLoginOrPassword')];
        $externalResults.value.login = [''];
      } else if (error.status === 422) {
        setBlocked(error.response.data.timeLeft);
      } else {
        notifyStore.showServiceError(error);
      }

      loading.value = false;
    }
  };
</script>

<template>
  <v-sheet
    class="d-flex align-center h-100"
    :class="{ 'justify-space-between': !mobile, 'justify-center': mobile }"
    style="background-color: var(--color-MainBackground) !important"
  >
    <v-sheet width="50%" class="d-flex flex-column pa-5" height="100%">
      <v-sheet v-if="!mobile"><RioniLogo /></v-sheet>
      <v-sheet class="rounded-xxl pa-8 mt-6">
        <v-sheet class="text-hard-blue font-22 mb-1">{{ t('auth.enterTitle') }}</v-sheet>
        <v-form id="loginForm" ref="loginForm" fast-fail @submit.prevent="loginHandle">
          <v-sheet class="d-flex flex-column ga-2">
            <v-sheet class="d-flex flex-column ga-1">
              <v-sheet class="text-type-text font-smaller">{{ t('auth.login') }}</v-sheet>
              <v-text-field
                v-model="login"
                variant="solo"
                rounded
                flat
                hide-details
                label=""
                :error="v$.login.$invalid"
                :error-messages="v$.login.$errors.map(e => e.$message)"
              />
            </v-sheet>
            <v-sheet class="d-flex flex-column ga-2">
              <v-sheet class="text-type-text font-smaller">{{ t('auth.password') }}</v-sheet>
              <v-text-field
                v-model="password"
                variant="solo"
                flat
                class="field-password"
                rounded
                hide-details="auto"
                :type="!visible ? 'password' : 'text'"
                label=""
                :error="v$.password.$invalid"
                :error-messages="v$.password.$errors.map(e => e.$message)"
                @append-click="visible = !visible"
              >
                <template #append-inner>
                  <v-sheet
                    style="cursor: pointer; height: 24px; background-color: transparent"
                    @click="visible = !visible"
                  >
                    <v-icon icon="mdi-eye-off" color="type-text" v-if="!visible" />
                    <v-icon icon="mdi-eye" color="type-text" v-if="visible" />
                  </v-sheet>
                </template>
              </v-text-field>
              <v-sheet
                class="d-flex justify-end text-additional-link cursor-pointer font-smaller"
                @click="router.push('/auth/reset-password')"
              >
                {{ t('auth.forgotPassword') }}
              </v-sheet>
            </v-sheet>
            <v-sheet class="d-flex flex-column ga-2 mt-2">
              <v-btn
                :loading="loading"
                variant="flat"
                rounded="lg"
                bg="middle-blue"
                color="middle-blue"
                type="submit"
                block
              >
                <v-sheet class="text-white">{{ t('auth.enterBtn') }}</v-sheet>
              </v-btn>
            </v-sheet>
            <v-sheet class="d-flex justify-center font-smaller ga-1">
              {{ t('auth.haveNoAccountYet') }}
              <span class="text-additional-link cursor-pointer">{{ t('auth.reg') }}</span>
            </v-sheet>
          </v-sheet>
        </v-form>
      </v-sheet>
    </v-sheet>
    <v-sheet
      v-if="!mobile"
      class="rounded-l-60 d-flex justify-center align-center"
      width="50%"
      height="100%"
      style="background-color: white !important"
    >
      <v-sheet class="d-flex justify-center flex-column align-center" style="height: fit-content">
        <v-img src="/img/rioni-logo-big.png" max-width="150" width="150" />
        <v-sheet class="d-flex flex-column align-center justify-center" max-width="230">
          <v-sheet class="text-hard-blue font-18 text-center">
            {{ t('auth.slogan') }}
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style lang="scss">
  #loginForm {
    .v-input--error {
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

    .v-field {
      background-color: white !important;
    }

    input {
      border-radius: 8px;
    }
  }
</style>
