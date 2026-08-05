<script setup lang="ts">
  import PhoneFields from '@/components/BaseComponents/PhoneFields.vue';
  import { reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { helpers, required, email } from '@vuelidate/validators';
  import { useVuelidate } from '@vuelidate/core';
  import { debounce } from 'lodash-es';
  import authService from '@/api/authService.ts';
  import { IContactModel } from '@/api/types.ts';
  import { phoneValidator } from '@/utils/validators.ts';
  import { useAuthStore } from '@/stores/authStore.ts';

  const $externalResults = ref<{ [key: string]: string[] }>({});
  const loading = ref(false);
  const loadingCheckNumber = ref(false);
  const authStore = useAuthStore();
  const { t } = useI18n();

  const state = reactive({
    value: '',
    type: 'phone'
  }) as IContactModel;

  const rules = {
    value: {
      required: helpers.withMessage(
        () =>
          t('validations.required', {
            field: state.type === 'phone' ? t('auth.phoneNumber') : t('auth.emailPlaceholder')
          }),
        required
      ),
      phoneOrEmail: helpers.withMessage(
        () => {
          if (state.type === 'phone') {
            return t('validations.invalidPhone');
          }
          return t('validations.invalidEmail');
        },
        (value: string) => {
          if (!value) return false;
          if (state.type === 'phone') {
            return phoneValidator(value);
          }
          return email(value);
        }
      )
    },
    type: {}
  };

  const changeType = () => {
    state.value = '';
    v$.value.$reset();
  };

  const v$ = useVuelidate(rules, state, { $externalResults });

  const onKeyUp = () => {
    v$.value.$touch();

    if (!v$.value.value.required.$invalid && !v$.value.value.phoneOrEmail.$invalid) {
      loadingCheckNumber.value = true;
      debouncedCheckContact();
      return;
    }
  };

  const debouncedCheckContact = debounce(() => {
    checkContact();
  }, 1000);

  const checkContact = async () => {
    const result = await authService.checkContact(state);

    if (!result.exists) {
      $externalResults.value.value = [t('validations.valueDoesntExist')];
    } else {
      $externalResults.value.value = [];
    }
    loadingCheckNumber.value = false;
  };

  const recoverHandle = async () => {
    const result = await authService.recoverSms(state);
    if (!result.sms_code_id) {
      $externalResults.value.value = [t('validations.cantSendSms')];
    } else {
      authStore.setRecoverSmsId(result.sms_code_id);
      authStore.setDataRecover(state);
      authStore.setTimerSms(30)
    }
  };
</script>

<template>
  <v-sheet class="text-hard-blue font-22 mb-1">
    {{ t('auth.recoverPermissionTitle') }}
  </v-sheet>
  <v-form id="recoverForm" ref="recoverForm" @submit.prevent="recoverHandle">
    <v-sheet class="d-flex flex-column ga-4">
      <v-sheet class="font-smaller">Выберите способ восстановления пароля</v-sheet>
      <v-sheet class="d-flex ga-2">
        <v-chip-group
          v-model="state.type"
          variant="flat"
          selected-class="type-selected bg-element text-white"
          class="pa-0"
          mandatory
          @update:model-value="changeType"
        >
          <v-chip
            v-for="(item, idx) in [
              { value: 'phone', name: 'Телефон' },
              { value: 'email', name: 'E-mail' }
            ]"
            :key="idx"
            :value="item.value"
            size="compact"
            variant="flat"
            class="px-4 py-1 bg-white ma-0 text-light-grey"
            style="background-color: white"
          >
            {{ item.name }}
          </v-chip>
        </v-chip-group>
      </v-sheet>
      <v-sheet class="d-flex flex-column">
        <v-sheet v-if="state.type === 'phone'" class="d-flex flex-column ga-1">
          <v-sheet class="text-type-text font-smaller">Номер телефона</v-sheet>
          <PhoneFields
            v-model="state.value"
            :error="v$.value.$error"
            @keyup="onKeyUp"
            :loading="loadingCheckNumber"
          />
          <v-sheet v-if="v$.value.$errors.length" class="text-red font-smaller">
            {{ v$.value.$errors.map(e => e.$message)[0] }}
          </v-sheet>
        </v-sheet>
        <v-sheet v-else class="d-flex flex-column ga-1">
          <v-sheet class="text-type-text font-smaller">E-mail</v-sheet>
          <v-text-field
            v-model="state.value"
            variant="solo"
            rounded
            flat
            hide-details
            label=""
            :error="v$.value.$error"
            :error-messages="v$.value.$error ? v$.value.$errors.map(e => e.$message) : []"
          />
        </v-sheet>
        <v-sheet class="font-smaller text-type-text">
          Введите {{ state.type === 'phone' ? 'телефон' : 'E-mail' }}, указанный при регистрации
        </v-sheet>
      </v-sheet>
      <v-sheet class="d-flex flex-column">
        <v-btn
          :loading="loading"
          variant="flat"
          rounded="lg"
          bg="middle-blue"
          color="middle-blue"
          type="submit"
          block
        >
          <v-sheet class="text-white">{{ t('auth.continue') }}</v-sheet>
        </v-btn>
      </v-sheet>
    </v-sheet>
  </v-form>
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
