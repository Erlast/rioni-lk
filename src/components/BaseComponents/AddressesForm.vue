<script setup lang="ts">
  import CountryAutocomplete from '@/components/BaseComponents/CountryAutocomplete.vue';
  import { useI18n } from 'vue-i18n';
  import { useDisplay } from 'vuetify';
  import { onMounted, reactive, ref, watch } from 'vue';
  import { useAccountStore } from '@/stores/accountStore.ts';
  import { addressType } from '@/api/types.ts';
  import { helpers, requiredIf } from '@vuelidate/validators';
  import { useVuelidate } from '@vuelidate/core';
  import { allowedTypes } from '@/utils/fileSystem.ts';

  const { t } = useI18n();
  const { mobile } = useDisplay();
  const accountStore = useAccountStore();

  const fileInput = ref<HTMLInputElement | null>(null);
  const fileInput2 = ref<HTMLInputElement | null>(null);
  const selectedDocuments = ref<File[]>([]);
  const selectedDocuments2 = ref<File[]>([]);

  const openDialogUploadDocuments = () => {
    fileInput.value?.click();
  };

  const openDialogUploadDocuments2 = () => {
    fileInput2.value?.click();
  };

  const onFilesSelected = (event: Event) => {
    const input = event.target as HTMLInputElement;
    selectedDocuments.value = input.files ? Array.from(input.files) : [];
    input.value = '';
  };

  const onFilesSelected2 = (event: Event) => {
    const input = event.target as HTMLInputElement;
    selectedDocuments2.value = input.files ? Array.from(input.files) : [];
    input.value = '';
  };

  const state = reactive({
    address1: {
      country: null as string | null,
      city: '',
      postcode: '',
      address: '',
      isMain: true,
      isConfirmed: false
    },
    address2: {
      country: null as string | null,
      city: '',
      postcode: '',
      address: '',
      isMain: false,
      isConfirmed: false
    }
  });

  const rules = {
    address1: {
      country: {
        required: helpers.withMessage(
          t('validations.requiredField'),
          requiredIf(() => state.address1.isMain)
        ),
        $autoDirty: true
      },
      city: {
        required: helpers.withMessage(
          t('validations.requiredField'),
          requiredIf(() => state.address1.isMain)
        ),
        $autoDirty: true
      },
      postcode: {
        required: helpers.withMessage(
          t('validations.requiredField'),
          requiredIf(() => state.address1.isMain)
        ),
        $autoDirty: true
      },
      address: {
        required: helpers.withMessage(
          t('validations.requiredField'),
          requiredIf(() => state.address1.isMain)
        ),
        $autoDirty: true
      }
    },
    address2: {
      country: {
        required: helpers.withMessage(
          t('validations.requiredField'),
          requiredIf(() => state.address2.isMain)
        )
      },
      city: {
        required: helpers.withMessage(
          t('validations.requiredField'),
          requiredIf(() => state.address2.isMain)
        )
      },
      postcode: {
        required: helpers.withMessage(
          t('validations.requiredField'),
          requiredIf(() => state.address2.isMain)
        )
      },
      address: {
        required: helpers.withMessage(
          t('validations.requiredField'),
          requiredIf(() => state.address2.isMain)
        )
      }
    }
  };

  const v$ = useVuelidate(rules, state);

  const loadAddressesFromStore = () => {
    const regAddr = accountStore.data.addresses?.find((a: any) => a.addressType === 'registration');
    if (regAddr) {
      state.address1.country = regAddr.country || null;
      state.address1.city = regAddr.city || '';
      state.address1.postcode = regAddr.postcode || '';
      state.address1.address = regAddr.address || '';
      state.address1.isMain = regAddr.isMain ?? true;
    }

    const actAddr = accountStore.data.addresses?.find((a: any) => a.addressType === 'actual');
    if (actAddr) {
      state.address2.country = actAddr.country || null;
      state.address2.city = actAddr.city || '';
      state.address2.postcode = actAddr.postcode || '';
      state.address2.address = actAddr.address || '';
      state.address2.isMain = actAddr.isMain ?? false;
    }
  };

  const syncAddresses = () => {
    if (!accountStore.data.addresses) {
      accountStore.data.addresses = [];
    }

    const regIdx = accountStore.data.addresses.findIndex(
      (a: any) => a.addressType === 'registration'
    );
    const regAddress = {
      ...state.address1,
      id: regIdx >= 0 ? accountStore.data.addresses[regIdx].id : 0,
      addressType: 'registration' as addressType,
      isConfirmed: regIdx >= 0 ? accountStore.data.addresses[regIdx].isConfirmed : false
    };

    const actIdx = accountStore.data.addresses.findIndex((a: any) => a.addressType === 'actual');
    const actAddress = {
      ...state.address2,
      id: actIdx >= 0 ? accountStore.data.addresses[actIdx].id : 0,
      addressType: 'actual' as addressType,
      isConfirmed: actIdx >= 0 ? accountStore.data.addresses[actIdx].isConfirmed : false
    };

    if (regIdx >= 0) {
      accountStore.data.addresses[regIdx] = regAddress;
    } else {
      accountStore.data.addresses.push(regAddress);
    }

    if (actIdx >= 0) {
      accountStore.data.addresses[actIdx] = actAddress;
    } else {
      accountStore.data.addresses.push(actAddress);
    }
  };
  defineExpose({
    syncAddresses,
    selectedDocuments,
    selectedDocuments2
  });

  onMounted(() => {
    loadAddressesFromStore();
  });

  watch(
    () => accountStore.data.addresses,
    () => {
      loadAddressesFromStore();
    },
    { deep: true }
  );
</script>

<template>
  <v-sheet class="address-form">
    <v-sheet class="d-flex flex-column ga-2">
      <v-sheet class="d-flex w-100 justify-space-between align-center">
        <v-sheet class="text-type-text">
          {{ t('profile.modals.settings.addressTitle') }}
        </v-sheet>
        <v-checkbox
          :label="t('profile.modals.settings.useAsPostTitle')"
          :model-value="state.address1.isMain"
          hide-details
          true-icon="rioni:formCheckOn"
          false-icon="rioni:formCheckOff"
          @update:model-value="
            val => {
              if (val) {
                state.address1.isMain = true;
                state.address2.isMain = false;
              }
            }
          "
        ></v-checkbox>
      </v-sheet>
      <v-sheet class="d-flex justify-space-between ga-2" :class="{ 'flex-column': mobile }">
        <v-sheet :width="mobile ? '100%' : '33%'">
          <CountryAutocomplete
            v-model="state.address1.country"
            :error-messages="v$.address1.country.$errors[0]?.$message as string"
            @update:model-value="v$.address1.country.$touch"
          />
        </v-sheet>
        <v-sheet :width="mobile ? '100%' : '33%'">
          <v-text-field
            v-model="state.address1.city"
            variant="solo"
            hide-details="auto"
            flat
            :label="t('profile.modals.settings.cityTitle')"
            :error-messages="v$.address1.city.$errors[0]?.$message as string"
            @update:modelValue="v$.address1.city.$touch"
          ></v-text-field>
        </v-sheet>
        <v-sheet :width="mobile ? '100%' : '33%'">
          <v-text-field
            v-model="state.address1.postcode"
            variant="solo"
            flat
            hide-details="auto"
            :label="t('profile.modals.settings.postCodeTitle')"
            :error-messages="v$.address1.postcode.$errors[0]?.$message as string"
            @update:modelValue="v$.address1.postcode.$touch"
          ></v-text-field>
        </v-sheet>
      </v-sheet>
      <v-sheet>
        <v-text-field
          v-model="state.address1.address"
          variant="solo"
          flat
          hide-details="auto"
          :label="t('profile.modals.settings.addressFormTitle')"
          :error-messages="v$.address1.address.$errors[0]?.$message as string"
          @update:modelValue="v$.address1.address.$touch"
        ></v-text-field>
      </v-sheet>
    </v-sheet>
    <v-sheet class="text-type-text font-smaller">
      {{ t('profile.modals.settings.confirmAddressText') }}
      <span
        class="text-additional-link"
        style="cursor: pointer"
        @click="openDialogUploadDocuments2"
      >
        {{ t('profile.modals.settings.confirmAddressLinkText') }}
        <v-icon icon="mdi-arrow-down" size="12" />
      </span>
      <v-tooltip v-if="selectedDocuments2.length > 0">
        <template v-slot:activator="{ props }">
          <span v-bind="props">загруженные файлы</span>
        </template>

        <span v-if="selectedDocuments2.length" class="text-type-text font-smaller">
          {{ selectedDocuments2.map(f => f.name).join(`,`) }}
        </span>
      </v-tooltip>
    </v-sheet>
    <input
      ref="fileInput2"
      type="file"
      multiple
      :accept="allowedTypes.join(',')"
      class="d-none"
      @change="onFilesSelected2"
    />
    <v-sheet class="d-flex flex-column ga-2">
      <v-sheet class="d-flex justify-space-between align-center">
        <v-sheet class="text-type-text">
          {{ t('profile.modals.settings.address2Title') }}
        </v-sheet>
        <v-checkbox
          :label="t('profile.modals.settings.useAsPostTitle')"
          :model-value="state.address2.isMain"
          hide-details
          true-icon="rioni:formCheckOn"
          false-icon="rioni:formCheckOff"
          @update:model-value="
            val => {
              if (val) {
                state.address2.isMain = true;
                state.address1.isMain = false;
              }
            }
          "
        ></v-checkbox>
      </v-sheet>
      <v-sheet class="d-flex justify-space-between ga-2" :class="{ 'flex-column': mobile }">
        <v-sheet :width="mobile ? '100%' : '33%'">
          <CountryAutocomplete
            v-model="state.address2.country"
            :error-messages="v$.address2.country.$errors[0]?.$message as string"
            @update:model-value="v$.address2.country.$touch"
          />
        </v-sheet>
        <v-sheet :width="mobile ? '100%' : '33%'">
          <v-text-field
            v-model="state.address2.city"
            variant="solo"
            flat
            hide-details="auto"
            :label="t('profile.modals.settings.cityTitle')"
            :error-messages="v$.address2.city.$errors[0]?.$message as string"
            @update:modelValue="v$.address2.city.$touch"
          ></v-text-field>
        </v-sheet>
        <v-sheet :width="mobile ? '100%' : '33%'">
          <v-text-field
            v-model="state.address2.postcode"
            variant="solo"
            flat
            hide-details="auto"
            :label="t('profile.modals.settings.postCodeTitle')"
            :error-messages="v$.address2.postcode.$errors[0]?.$message as string"
            @update:modelValue="v$.address2.postcode.$touch"
          ></v-text-field>
        </v-sheet>
      </v-sheet>
      <v-sheet class="d-flex">
        <v-text-field
          v-model="state.address2.address"
          variant="solo"
          flat
          hide-details="auto"
          :label="t('profile.modals.settings.addressFormTitle')"
          :error-messages="v$.address2.address.$errors[0]?.$message as string"
          @update:modelValue="v$.address2.address.$touch"
        ></v-text-field>
      </v-sheet>
    </v-sheet>
    <v-sheet class="text-type-text font-smaller">
      {{ t('profile.modals.settings.confirmAddressText') }}
      <span class="text-additional-link" style="cursor: pointer" @click="openDialogUploadDocuments">
        {{ t('profile.modals.settings.confirmAddressLinkText') }}
        <v-icon icon="mdi-arrow-down" size="12" />
      </span>
      <span v-if="selectedDocuments.length" class="text-type-text font-smaller">
        {{ selectedDocuments.map(f => f.name).join(', ') }}
      </span>
    </v-sheet>
    <input
      ref="fileInput"
      type="file"
      multiple
      :accept="allowedTypes.join(',')"
      class="d-none"
      @change="onFilesSelected"
    />
  </v-sheet>
</template>

<style scoped lang="scss">
  .address-form {
    font-size: 12px;
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

  .v-checkbox {
    :deep(.v-label) {
      color: var(--color-TypeText);
    }
  }
</style>
