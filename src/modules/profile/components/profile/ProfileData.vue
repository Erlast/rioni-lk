<script setup lang="ts">
  import { inject, onMounted, reactive, Ref, ref } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { email, required, helpers } from '@vuelidate/validators';
  import { useI18n } from 'vue-i18n';
  import { itemsFlags, countries } from '@/utils/data';
  import { useAccountStore } from '@/stores/accountStore';
  import DatePicker from '@/components/BaseComponents/DatePicker.vue';
  import dayjs from 'dayjs';
  import { useNotify } from '@/stores/notifyStore';
  import accountsService from '@/api/accountService';

  const showProfileData = inject<Ref<boolean>>('showProfileData', ref(false));
  const item = ref();
  const { t } = useI18n();
  const accountStore = useAccountStore();
  const isSending = ref(false);
  const notifyStore = useNotify();

  const initialState = {
    name: accountStore.data.info.name,
    surname: accountStore.data.info.surname,
    email: '',
    phone: '',
    dateOfBirth: accountStore.data.info.dateOfBirth,
    gender: accountStore.data.info.gender ?? 'M',
    citizenship: accountStore.data.info.citizenship,
    documentType: 'passport',
    passportNumber: accountStore.data.info.passportNumber,
    passportIssueDate: accountStore.data.info.passportIssueDate,
    passportExpiryDate: accountStore.data.info.passportExpiryDate,
    issuedBy: accountStore.data.info.issuedBy,
    companyName: accountStore.data.info.companyName,
    companyIndustry: accountStore.data.info.companyIndustry,
    companyPosition: accountStore.data.info.companyPosition,
    companyPhone: accountStore.data.info.companyPhone,
    companyWebsite: accountStore.data.info.companyWebsite,
    isNgo: accountStore.data.info.isNgo,
    isNotWorkinhg: accountStore.data.info.isNotWorking,
    isNpo: accountStore.data.info.isNpo,
    isSelfEmployed: accountStore.data.info.isSelfEmployed
  };

  const state = reactive({
    ...initialState
  });

  const rules = {
    name: {
      required: helpers.withMessage(
        'Данные неверны или не соответствуют заполненным полям ',
        required
      )
    },
    passportNumber: {
      required: helpers.withMessage(
        'Данные неверны или не соответствуют заполненным полям ',
        required
      )
    },
    surname: {
      required: helpers.withMessage(
        'Данные неверны или не соответствуют заполненным полям ',
        required
      )
    },
    citizenship: {
      required: helpers.withMessage(
        'Данные неверны или не соответствуют заполненным полям ',
        required
      )
    }
  };

  const v$ = useVuelidate(rules, state);

  const handleFormSubmit = async () => {
    isSending.value = true;
    const dateOfBirth = dayjs(state.dateOfBirth);
    const passportIssueDate = dayjs(state.passportIssueDate);
    const passportExpiryDate = state.passportExpiryDate ? dayjs(state.passportExpiryDate) : null;
    v$.value.$touch();

    if (!v$.value.$invalid) {
      try {
        const payload = {
          ...state,
          dateOfBirth: dateOfBirth.format('YYYY-MM-DD'),
          passportIssueDate: passportIssueDate.format('YYYY-MM-DD'),
          passportExpiryDate: passportExpiryDate ? passportExpiryDate.format('YYYY-MM-DD') : null
        };

        await accountsService.profileSave(accountStore.data.id, payload);
        await accountStore.load();
        showProfileData.value = false;
      } catch (error) {
        notifyStore.showServiceError(error);
      } finally {
        isSending.value = false;
      }
    }
  };

  const openDialogUploadDocuments = () => {
    console.log('here');
  };

  onMounted(() => {
    item.value = itemsFlags[0];
  });
</script>

<template>
  <v-card width="900">
    <v-sheet class="modal-window">
      <v-sheet>
        <v-card-title>
          <v-sheet class="modal-windows-label">
            {{ t('profile.modals.profileData.title') }}
            <v-sheet class="button-close" @click="showProfileData = false"></v-sheet>
          </v-sheet>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" @submit.prevent="handleFormSubmit">
            <v-sheet
              class="pa-8 d-flex flex-column ga-4"
              rounded="xxl"
              style="background-color: var(--color-MainBackground) !important"
            >
              <v-sheet class="d-flex flex-column ga-3">
                <v-sheet class="d-flex flex-column ga-3">
                  <v-sheet class="d-flex ga-2">
                    <v-sheet width="50%">Персональная информация</v-sheet>
                    <v-sheet>Выберите пол</v-sheet>
                  </v-sheet>
                  <v-sheet class="d-flex ga-2">
                    <v-sheet width="50%">
                      <v-text-field
                        variant="solo"
                        density="compact"
                        flat
                        hide-details="auto"
                        label="Имя"
                        v-model="state.name"
                      ></v-text-field>
                    </v-sheet>

                    <v-sheet class="d-flex">
                      <v-checkbox
                        label="Мужчина"
                        class="checkbox-gender"
                        hide-details
                        true-icon="rioni:formCheckOn"
                        false-icon="rioni:formCheckOff"
                        :model-value="state.gender === 'M'"
                        @update:model-value="$event && (state.gender = 'M')"
                      ></v-checkbox>
                      <v-checkbox
                        label="Женщина"
                        class="checkbox-gender"
                        hide-details
                        true-icon="rioni:formCheckOn"
                        false-icon="rioni:formCheckOff"
                        :model-value="state.gender === 'F'"
                        @update:model-value="$event && (state.gender = 'F')"
                      ></v-checkbox>
                    </v-sheet>
                  </v-sheet>
                  <v-sheet class="d-flex ga-2">
                    <v-sheet width="50%">
                      <v-text-field
                        variant="solo"
                        density="compact"
                        flat
                        hide-details="auto"
                        label="Фамилия"
                        v-model="state.surname"
                      ></v-text-field>
                    </v-sheet>
                    <v-sheet width="50%">
                      <date-picker label="Дата рождения" v-model="state.dateOfBirth" />
                    </v-sheet>
                  </v-sheet>
                  <v-sheet class="d-flex ga-2">
                    <v-sheet class="d-flex ga-2" width="50%">
                      <v-select
                        width="100"
                        max-width="100"
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
                      <v-text-field
                        variant="solo"
                        density="compact"
                        flat
                        hide-details="auto"
                        label="Номер телефона"
                        v-model="state.phone"
                      ></v-text-field>
                    </v-sheet>
                    <v-text-field
                      variant="solo"
                      density="compact"
                      flat
                      hide-details="auto"
                      label="E-mail"
                      v-model="state.email"
                    ></v-text-field>
                  </v-sheet>
                </v-sheet>
                <v-sheet class="d-flex flex-column ga-2">
                  <v-sheet class="d-flex">Паспорт</v-sheet>
                  <v-sheet class="d-flex ga-2">
                    <v-sheet width="50%">
                      <v-text-field
                        v-model="state.passportNumber"
                        variant="solo"
                        density="compact"
                        flat
                        hide-details="auto"
                        label="Номер документа"
                        required
                        :error-messages="v$.passportNumber.$errors[0].$message as string"
                        @blur="v$.passportNumber.$touch"
                        @input="v$.passportNumber.$touch"
                      ></v-text-field>
                    </v-sheet>
                    <v-autocomplete
                      variant="solo"
                      flat
                      density="compact"
                      :items="countries"
                      hide-details="auto"
                      label="Гражданство"
                      v-model="state.citizenship"
                    ></v-autocomplete>
                  </v-sheet>
                  <v-sheet class="d-flex ga-2">
                    <v-text-field
                      variant="solo"
                      density="compact"
                      flat
                      hide-details="auto"
                      label="Выдавший орган"
                      v-model="state.issuedBy"
                    ></v-text-field>
                  </v-sheet>
                  <v-sheet class="d-flex ga-2">
                    <date-picker label="Дата выдачи" v-model="state.passportIssueDate" />
                    <date-picker label="Срок действия" v-model="state.passportExpiryDate" />
                  </v-sheet>
                </v-sheet>
              </v-sheet>
              <v-sheet class="d-flex flex-column ga-2">
                <v-sheet class="text-background-blue font-20 font-semibold">
                  {{ t('profile.modals.anketa.placeOfWorkTitle') }}
                </v-sheet>
                <v-sheet class="text-common font-smaller">
                  {{ t('profile.modals.anketa.specifyPlaceOfworkTitle') }}
                </v-sheet>
                <v-sheet class="d-flex flex-column ga-2">
                  <v-sheet class="d-flex justify-space-between ga-2">
                    <v-text-field
                      v-model="state.companyName"
                      variant="solo"
                      flat
                      hide-details="auto"
                      :label="t('profile.modals.anketa.companyNameTitle')"
                    ></v-text-field>
                  </v-sheet>
                  <v-sheet class="d-flex justify-space-between ga-2">
                    <v-text-field
                      v-model="state.companyIndustry"
                      variant="solo"
                      flat
                      hide-details="auto"
                      :label="t('profile.modals.anketa.industryTitle')"
                    ></v-text-field>

                    <v-text-field
                      v-model="state.companyPosition"
                      variant="solo"
                      flat
                      hide-details="auto"
                      :label="t('profile.modals.anketa.jobTitle')"
                    ></v-text-field>
                  </v-sheet>
                  <v-sheet class="d-flex justify-space-between ga-2">
                    <v-sheet class="d-flex ga-2" width="50%">
                      <v-select
                        variant="solo"
                        flat
                        width="100"
                        max-width="100"
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

                      <v-text-field
                        v-model="state.companyPhone"
                        variant="solo"
                        flat
                        hide-details="auto"
                        :label="t('profile.modals.anketa.phoneNumberTitle')"
                      ></v-text-field>
                    </v-sheet>
                    <v-sheet width="50%">
                      <v-text-field
                        v-model="state.companyWebsite"
                        variant="solo"
                        flat
                        hide-details="auto"
                        label="Сайт"
                      ></v-text-field>
                    </v-sheet>
                  </v-sheet>
                  <v-checkbox
                    v-model="state.isNpo"
                    :label="t('profile.modals.anketa.memberOfNPOTitle')"
                    hide-details="auto"
                    true-icon="rioni:formCheckOn"
                    false-icon="rioni:formCheckOff"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="state.isNgo"
                    :label="t('profile.modals.anketa.memberOfNGOTitle')"
                    hide-details="auto"
                    true-icon="rioni:formCheckOn"
                    false-icon="rioni:formCheckOff"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="state.isSelfEmployed"
                    :label="t('profile.modals.anketa.selfEmployedStatusTitle')"
                    hide-details="auto"
                    true-icon="rioni:formCheckOn"
                    false-icon="rioni:formCheckOff"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="state.isNotWorkinhg"
                    :label="t('profile.modals.anketa.doNotWorkTitle')"
                    hide-details="auto"
                    true-icon="rioni:formCheckOn"
                    false-icon="rioni:formCheckOff"
                  ></v-checkbox>
                </v-sheet>
              </v-sheet>
              <v-sheet>
                <v-btn
                  :loading="isSending"
                  variant="flat"
                  rounded="lg"
                  bg="element-check"
                  color="element-check"
                  type="submit"
                >
                  <v-sheet class="text-white">
                    {{ t('profile.modals.settings.contactInformationSaveBtn') }}
                  </v-sheet>
                </v-btn>
              </v-sheet>
            </v-sheet>
          </v-form>
        </v-card-text>
      </v-sheet>
    </v-sheet>
  </v-card>
</template>

<style scoped lang="scss">
  .checkbox-gender:has(.v-selection-control:not(.v-selection-control--dirty)) {
    :deep(.v-label) {
      color: var(--color-TypeText) !important;
    }
  }
</style>
