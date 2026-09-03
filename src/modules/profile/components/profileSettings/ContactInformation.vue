<script setup lang="ts">
  import { contactType } from '@/api/types';
  import { useAccountStore } from '@/stores/accountStore';
  import { computed, reactive, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useVuelidate } from '@vuelidate/core';
  import { email, helpers } from '@vuelidate/validators';
  import { useDisplay } from 'vuetify';
  import PhoneFields from '@/components/BaseComponents/PhoneFields.vue';
  import AddressesForm from '@/components/BaseComponents/AddressesForm.vue';

  const { t } = useI18n();
  const accountStore = useAccountStore();
  const { mobile } = useDisplay();
  const addressesFormRef = ref<InstanceType<typeof AddressesForm> | null>(null);

  const emailContacts = computed(
    () => accountStore.data.contacts?.filter((c: any) => c.contactType === 'email') || []
  );
  const phoneContacts = computed(
    () => accountStore.data.contacts?.filter((c: any) => c.contactType === 'phone') || []
  );

  const state = reactive({
    emails: [] as { value: string }[]
  });

  const rules = {
    emails: {
      $each: helpers.forEach({
        value: {
          email: helpers.withMessage(t('validations.invalidEmail'), email)
        }
      })
    }
  };

  const v$ = useVuelidate(rules, state);

  const syncEmailsToStore = () => {
    if (!accountStore.data.contacts) return;
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

  const syncAddressesToStore = () => {
    addressesFormRef.value?.syncAddresses();
  };

  const addContact = (type: contactType) => {
    accountStore.data.contacts.push({
      id: 0,
      contactType: type,
      isMain: false,
      value: '',
      isConfirmed: false
    });
  };

  const validateAll = async () => {
    return await v$.value.$validate();
  };

  defineExpose({
    validateAll,
    syncAddressesToStore,
    syncEmailsToStore
  });
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
          {{ t('profile.modals.settings.emailAddBtn') }}
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
              <PhoneFields v-model="contact.value" :idx="idx" :is-main="contact.isMain" />
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
          {{ t('profile.modals.settings.phoneAddBtn') }}
        </v-sheet>
      </v-sheet>

      <v-sheet
        class="px-6 py-3 font-smaller"
        style="background-color: var(--color-LightGreen) !important"
      >
        {{ t('profile.modals.settings.helpText') }}
      </v-sheet>

      <AddressesForm ref="addressesFormRef" />
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
