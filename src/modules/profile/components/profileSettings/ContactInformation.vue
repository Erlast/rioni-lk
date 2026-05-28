<script setup lang="ts">
  import { addressType, contactType } from '@/api/types';
  import { useAccountStore } from '@/stores/accountStore';
  import { countries, itemsFlags } from '@/utils/data';
  import { onMounted, ref, computed, reactive, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useVuelidate } from '@vuelidate/core';
  import { email, helpers, requiredIf } from '@vuelidate/validators';
  import { useDisplay } from 'vuetify';

  const { t } = useI18n();
  const item = ref();
  const accountStore = useAccountStore();
  const { mobile } = useDisplay();

  const openDialogUploadDocuments = () => {
    console.log('here');
  };

  const emailContacts = computed(
    () => accountStore.data.info.contacts?.filter((c: any) => c.contactType === 'email') || []
  );
  const phoneContacts = computed(
    () => accountStore.data.info.contacts?.filter((c: any) => c.contactType === 'phone') || []
  );

  const state = reactive({
    emails: [] as { value: string }[],
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
    emails: {
      $each: helpers.forEach({
        value: {
          email: helpers.withMessage(t('validations.invalidEmail'), email)
        }
      })
    },
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

  const syncEmailsToStore = () => {
    if (!accountStore.data.info.contacts) return;
    emailContacts.value.forEach((contact, idx) => {
      if (state.emails[idx]) {
        contact.value = state.emails[idx].value;
      }
    });
  };

  watch(
    emailContacts,
    contacts => {
      state.emails = contacts.map(c => ({ value: c.value }));
    },
    { immediate: true, deep: true }
  );

  const loadAddressesFromStore = () => {
    const regAddr = accountStore.data.info.addresses?.find(
      (a: any) => a.addressType === 'registration'
    );
    if (regAddr) {
      state.address1.country = regAddr.country || null;
      state.address1.city = regAddr.city || '';
      state.address1.postcode = regAddr.postcode || '';
      state.address1.address = regAddr.address || '';
      state.address1.isMain = regAddr.isMain ?? true;
    }

    const actAddr = accountStore.data.info.addresses?.find((a: any) => a.addressType === 'actual');
    if (actAddr) {
      state.address2.country = actAddr.country || null;
      state.address2.city = actAddr.city || '';
      state.address2.postcode = actAddr.postcode || '';
      state.address2.address = actAddr.address || '';
      state.address2.isMain = actAddr.isMain ?? false;
    }
  };

  const syncAddressesToStore = () => {
    if (!accountStore.data.info.addresses) {
      accountStore.data.info.addresses = [];
    }

    const regIdx = accountStore.data.info.addresses.findIndex(
      (a: any) => a.addressType === 'registration'
    );
    const regAddress = {
      ...state.address1,
      id: regIdx >= 0 ? accountStore.data.info.addresses[regIdx].id : 0,
      addressType: 'registration' as addressType,
      isConfirmed: regIdx >= 0 ? accountStore.data.info.addresses[regIdx].isConfirmed : false
    };

    const actIdx = accountStore.data.info.addresses.findIndex(
      (a: any) => a.addressType === 'actual'
    );
    const actAddress = {
      ...state.address2,
      id: actIdx >= 0 ? accountStore.data.info.addresses[actIdx].id : 0,
      addressType: 'actual' as addressType,
      isConfirmed: actIdx >= 0 ? accountStore.data.info.addresses[actIdx].isConfirmed : false
    };

    if (regIdx >= 0) {
      accountStore.data.info.addresses[regIdx] = regAddress;
    } else {
      accountStore.data.info.addresses.push(regAddress);
    }

    if (actIdx >= 0) {
      accountStore.data.info.addresses[actIdx] = actAddress;
    } else {
      accountStore.data.info.addresses.push(actAddress);
    }
  };

  const addContact = (type: contactType) => {
    accountStore.data.info.contacts.push({
      id: 0,
      contactType: type,
      isMain: false,
      value: '',
      isConfirmed: false
    });
  };

  const validateAll = async () => {
    const result = await v$.value.$validate();
    return result;
  };

  defineExpose({
    validateAll,
    syncAddressesToStore,
    syncEmailsToStore
  });

  onMounted(() => {
    item.value = itemsFlags[0];
    loadAddressesFromStore();
  });

  watch(
    () => accountStore.data.info.addresses,
    () => {
      loadAddressesFromStore();
    },
    { deep: true }
  );
</script>

<template>
  <v-sheet
    class="d-flex flex-column ga-3"
    :class="{ 'pa-4': mobile, 'pa-8': !mobile }"
    rounded="xxl"
    style="background-color: var(--color-MainBackground) !important"
  >
    <v-sheet class="text-common font-16">
      {{ t('profile.modals.settings.contactInformationTitle') }}
    </v-sheet>
    <v-sheet class="d-flex flex-column ga-3">
      <v-sheet class="d-flex flex-column ga-2">
        <v-sheet
          v-for="(contact, idx) in emailContacts"
          :key="contact.id"
          class="d-flex flex-column"
        >
          <v-sheet>
            <v-col :cols="mobile ? 12 : 9" class="pa-0">
              <v-sheet
                class="d-flex"
                :class="{ 'justify-space-between': idx === 0, 'justify-end': idx !== 0 }"
              >
                <v-sheet v-if="idx === 0" class="text-type-text">
                  {{ t('profile.modals.settings.emailTitle') }}
                </v-sheet>
                <v-checkbox
                  v-model="contact.isMain"
                  disabled
                  :label="t('profile.modals.settings.useForAuthentificationTitle')"
                  hide-details
                  true-icon="rioni:formCheckOn"
                  false-icon="rioni:formCheckOff"
                ></v-checkbox>
              </v-sheet>
            </v-col>
            <v-col v-if="!mobile" cols="3" class="pa-0"></v-col>
          </v-sheet>
          <v-sheet class="d-flex">
            <v-col :cols="mobile ? 10 : 9" class="pa-0">
              <v-sheet class="d-flex">
                <v-text-field
                  v-model="state.emails[idx].value"
                  :disabled="contact.isMain"
                  variant="solo"
                  flat
                  hide-details="auto"
                  :error="v$.emails.$each.$response.$errors[idx].value.$invalid"
                  :error-messages="
                    v$.emails.$each.$response.$errors[idx].value.length
                      ? (v$.emails.$each.$response.$errors[idx].value[0]?.$message as string)
                      : ''
                  "
                ></v-text-field>
              </v-sheet>
            </v-col>
            <v-col cols="3" class="pa-0 d-flex justify-center align-end">
              <v-sheet
                v-if="!mobile && contact.isConfirmed"
                class="d-flex align-center text-element-check"
                height="36"
              >
                {{ t('profile.modals.settings.confirmedTitle') }}
              </v-sheet>
              <v-sheet
                v-if="mobile && contact.isConfirmed"
                class="d-flex align-center justify-center rounded-mg"
                height="36"
                width="36"
                style="background-color: var(--color-ElementCheck) !important"
              >
                <v-icon icon="mdi-check" color="white" />
              </v-sheet>
            </v-col>
          </v-sheet>
        </v-sheet>
        <v-sheet
          v-if="emailContacts.length < 2"
          class="text-type-text font-smaller cursor-pointer"
          @click="addContact('email')"
        >
          + добавить E-mail
        </v-sheet>
      </v-sheet>

      <v-sheet class="d-flex flex-column ga-2">
        <v-sheet
          v-for="(contact, idx) in phoneContacts"
          :key="contact.id"
          class="d-flex flex-column"
        >
          <v-sheet>
            <v-col :cols="mobile ? 12 : 9" class="pa-0">
              <v-sheet
                class="d-flex align-center"
                :class="{ 'justify-space-between': idx === 0, 'justify-end': idx !== 0 }"
              >
                <span v-if="idx === 0" class="text-type-text">
                  {{ t('profile.modals.settings.phoneTitle') }}
                </span>
                <v-checkbox
                  v-model="contact.isMain"
                  disabled
                  :label="t('profile.modals.settings.useForAuthentificationTitle')"
                  hide-details
                  true-icon="rioni:formCheckOn"
                  false-icon="rioni:formCheckOff"
                ></v-checkbox>
              </v-sheet>
            </v-col>
            <v-col v-if="!mobile" cols="3" class="pa-0"></v-col>
          </v-sheet>
          <v-sheet class="d-flex">
            <v-col :cols="mobile ? 10 : 9" class="pa-0">
              <v-sheet class="d-flex justify-space-between">
                <v-col cols="2" class="pa-0">
                  <v-select
                    :disabled="contact.isMain"
                    variant="solo"
                    flat
                    density="compact"
                    :items="itemsFlags"
                    hide-details="auto"
                    v-model="item"
                  >
                    <template v-slot:item="{ props: itemProps, item }">
                      <v-list-item v-bind="itemProps" title="">
                        <span :class="`fi fi-${item.raw.image}`" />
                      </v-list-item>
                    </template>
                    <template v-slot:selection="{ item, index }">
                      <span :class="`fi fi-${item.raw.image}`" />
                    </template>
                  </v-select>
                </v-col>

                <v-col cols="9" class="pa-0">
                  <v-text-field
                    :model-value="contact.value"
                    :disabled="contact.isMain"
                    variant="solo"
                    flat
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
              </v-sheet>
            </v-col>
            <v-col cols="3" class="pa-0 d-flex justify-center align-end">
              <v-sheet
                v-if="!mobile && contact.isConfirmed"
                class="d-flex align-center text-element-check"
                height="36"
              >
                {{ t('profile.modals.settings.confirmedTitle') }}
              </v-sheet>
              <v-sheet
                v-if="mobile && contact.isConfirmed"
                class="d-flex align-center justify-center rounded-mg"
                height="36"
                width="36"
                style="background-color: var(--color-ElementCheck) !important"
              >
                <v-icon icon="mdi-check" color="white" />
              </v-sheet>
            </v-col>
          </v-sheet>
        </v-sheet>
        <v-sheet
          v-if="phoneContacts.length < 2"
          class="text-type-text font-smaller cursor-pointer"
          @click="addContact('phone')"
        >
          + добавить телефон
        </v-sheet>
      </v-sheet>

      <v-sheet
        class="px-6 py-3 font-smaller"
        style="background-color: var(--color-LightGreen) !important"
      >
        {{ t('profile.modals.settings.helpText') }}
      </v-sheet>

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
            <v-autocomplete
              v-model="state.address1.country"
              variant="solo"
              hide-details="auto"
              placeholder="Страна"
              flat
              :label="t('profile.modals.settings.countryTitle')"
              density="compact"
              auto-select-first
              clearable
              :items="countries"
              :error-messages="v$.address1.country.$errors[0]?.$message as string"
              @update:modelValue="v$.address1.country.$touch"
            ></v-autocomplete>
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
            <v-autocomplete
              v-model="state.address2.country"
              variant="solo"
              hide-details="auto"
              flat
              :label="t('profile.modals.settings.countryTitle')"
              density="compact"
              :items="countries"
              clearable
              :error-messages="v$.address2.country.$errors[0]?.$message as string"
              @update:modelValue="v$.address2.country.$touch"
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
        <span
          class="text-additional-link"
          style="cursor: pointer"
          @click="openDialogUploadDocuments"
        >
          {{ t('profile.modals.settings.confirmAddressLinkText') }}
          <v-icon icon="mdi-arrow-down" size="12" />
        </span>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  .v-checkbox {
    :deep(.v-label) {
      color: var(--color-TypeText);
    }
  }
</style>
