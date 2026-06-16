<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required, helpers } from '@vuelidate/validators';
  import { useI18n } from 'vue-i18n';
  import type { ICredentialModel } from '@/api/types';
  import { useNotify } from '@/stores/notifyStore.ts';
  import { useDisplay, useTheme } from 'vuetify';
  import { loginStoreData } from '@/utils/loginHelper.ts';

  const loading = ref(false);
  const login = ref('');
  const password = ref('');
  const visible = ref<boolean>(false);
  const { t } = useI18n();
  const $externalResults = ref<{ [key: string]: string[] }>({});

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
      if (error.status === 403) {
        $externalResults.value.password = [t('validations.wrongLoginOrPassword')];
      } else {
        notifyStore.showServiceError(error);
      }

      loading.value = false;
    }
  };
</script>

<template>
  <v-sheet class="rounded-xxl pa-5" style="background-color: var(--color-LightBlue) !important">
    <v-sheet class="text-hard-blue font-22 mb-6">{{ t('auth.enterTitle') }}</v-sheet>
    <v-form id="loginForm" ref="loginForm" fast-fail @submit.prevent="loginHandle">
      <v-sheet class="d-flex flex-column ga-4">
        <v-sheet class="d-flex flex-column ga-2">
          <v-sheet class="text-type-text font-smaller">{{ t('auth.login') }}</v-sheet>
          <v-text-field
            v-model="login"
            variant="solo"
            flat
            hide-details="auto"
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
        </v-sheet>
        <v-sheet class="d-flex flex-column ga-2 mt-4">
          <v-btn
            :loading="loading"
            variant="flat"
            rounded="lg"
            bg="type-text"
            color="type-text"
            type="submit"
            block
          >
            <v-sheet class="text-white">{{t('auth.continue')}}</v-sheet>
          </v-btn>
        </v-sheet>
      </v-sheet>
    </v-form>
  </v-sheet>
</template>

<style lang="scss">
  #loginForm {
    .v-field {
      background-color: white !important;
    }
  }
</style>
