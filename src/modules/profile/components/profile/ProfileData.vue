<script setup lang="ts">
  import { inject, onMounted, reactive, ref } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { email, required, helpers } from '@vuelidate/validators';
  import { useI18n } from 'vue-i18n';
  import { itemsFlags } from '@/utils/data';
  import { useAccountStore } from '@/stores/accountStore';

  const showProfileData = inject('showProfileData');
  const item = ref();
  const { t } = useI18n();
  const accountStore = useAccountStore();

  const initialState = {
    name: accountStore.data.info.name,
    surname: accountStore.data.info.surname,
    phone: accountStore.data.info.phone,
    email: accountStore.data.info.email,
    dateOfBirth: accountStore.data.info.dateOfBirth,
    gender: accountStore.data.info.gender,
    citizenship: accountStore.data.info.citizenship,
    documentType: 'passport',
    passportNumber: accountStore.data.info.passportNumber,
    passportIssueDate: accountStore.data.info.passportIssueDate,
    passportExpiryDate: accountStore.data.info.passportExpiryDate,
    countryOfBirth: accountStore.data.info.countryOfBirth,
    cityOfBirth: accountStore.data.info.cityOfBirth,
    issuedBy: ''
  };

  const state = reactive({
    ...initialState
  });

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  const rules = {
    name: {
      required: helpers.withMessage(
        'Данные неверны или не соответствуют заполненным полям ',
        required
      )
    },
    passportNumber: { required },
    email: { required, email },
    surname: { required },
    gender: { required },
    citizenship: { required }
  };

  const v$ = useVuelidate(rules, state);

  function clear() {
    v$.value.$reset();

    // for (const [key, value] of Object.entries(initialState)) {
    //   state[key] = value;
    // }
  }

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
          <v-form ref="form">
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
                        hide-details
                        true-icon="rioni:formCheckOn"
                        false-icon="rioni:formCheckOff"
                        :model-value="state.gender"
                      ></v-checkbox>
                      <v-checkbox
                        label="Женщина"
                        hide-details
                        true-icon="rioni:formCheckOn"
                        false-icon="rioni:formCheckOff"
                        ,
                        :model-value="state.gender"
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
                    <v-text-field
                      variant="solo"
                      density="compact"
                      flat
                      hide-details="auto"
                      label="Дата рождения"
                      v-model="state.dateOfBirth"
                    ></v-text-field>
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
                    <v-text-field
                      v-model="state.passportNumber"
                      variant="solo"
                      density="compact"
                      flat
                      hide-details="auto"
                      label="Номер документа"
                      required
                      :error-messages="v$.passportNumber.$errors.map(e => e.$message)"
                      @blur="v$.passportNumber.$touch"
                      @input="v$.passportNumber.$touch"
                    ></v-text-field>

                    <v-select
                      variant="solo"
                      flat
                      density="compact"
                      :items="['РФ', 'Грузия']"
                      hide-details="auto"
                      label="Гражданство"
                      v-model="state.citizenship"
                    ></v-select>
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
                    <v-text-field
                      variant="solo"
                      density="compact"
                      flat
                      hide-details="auto"
                      label="Дата выдачи"
                      v-model="state.passportIssueDate"
                    ></v-text-field>

                    <v-text-field
                      variant="solo"
                      density="compact"
                      flat
                      hide-details="auto"
                      label="Срок действия"
                      v-model="state.passportExpiryDate"
                    ></v-text-field>
                  </v-sheet>
                </v-sheet>
                <v-sheet class="d-flex flex-column ga-2">
                  <v-sheet class="d-flex">Место рождения</v-sheet>
                  <v-sheet class="d-flex ga-2">
                    <v-text-field
                      variant="solo"
                      density="compact"
                      flat
                      hide-details="auto"
                      label="Страна"
                      v-model="state.countryOfBirth"
                    ></v-text-field>

                    <v-text-field
                      variant="solo"
                      density="compact"
                      flat
                      hide-details="auto"
                      label="Город"
                      v-model="state.cityOfBirth"
                    ></v-text-field>
                  </v-sheet>
                </v-sheet>
                <v-sheet class="text-type-text font-smaller">
                  Для подтверждения указанной информации необходимо
                  <span
                    class="text-additional-link"
                    style="cursor: pointer"
                    @click="openDialogUploadDocuments"
                  >
                    загрузить скан паспорта сюда
                    <v-icon icon="mdi-arrow-down" size="12" />
                  </span>
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
                      variant="solo"
                      flat
                      hide-details="auto"
                      :label="t('profile.modals.anketa.companyNameTitle')"
                    ></v-text-field>
                  </v-sheet>
                  <v-sheet class="d-flex justify-space-between ga-2">
                    <v-text-field
                      variant="solo"
                      flat
                      hide-details="auto"
                      :label="t('profile.modals.anketa.industryTitle')"
                    ></v-text-field>

                    <v-text-field
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
                        variant="solo"
                        flat
                        hide-details="auto"
                        :label="t('profile.modals.anketa.phoneNumberTitle')"
                      ></v-text-field>
                    </v-sheet>
                    <v-sheet width="50%">
                      <v-text-field
                        variant="solo"
                        flat
                        hide-details="auto"
                        label="E-mail"
                      ></v-text-field>
                    </v-sheet>
                  </v-sheet>
                  <v-checkbox
                    :label="t('profile.modals.anketa.memberOfNPOTitle')"
                    hide-details="auto"
                    true-icon="rioni:formCheckOn"
                    false-icon="rioni:formCheckOff"
                  ></v-checkbox>
                  <v-checkbox
                    :label="t('profile.modals.anketa.memberOfNGOTitle')"
                    hide-details="auto"
                    true-icon="rioni:formCheckOn"
                    false-icon="rioni:formCheckOff"
                  ></v-checkbox>
                  <v-checkbox
                    :label="t('profile.modals.anketa.selfEmployedStatusTitle')"
                    hide-details="auto"
                    true-icon="rioni:formCheckOn"
                    false-icon="rioni:formCheckOff"
                  ></v-checkbox>
                  <v-checkbox
                    :label="t('profile.modals.anketa.doNotWorkTitle')"
                    hide-details="auto"
                    true-icon="rioni:formCheckOn"
                    false-icon="rioni:formCheckOff"
                  ></v-checkbox>
                </v-sheet>
              </v-sheet>
              <v-btn
                variant="flat"
                rounded="lg"
                bg="element-check"
                color="element-check"
                @click="v$.$validate"
              >
                <v-sheet class="text-white">
                  {{ t('profile.modals.settings.contactInformationSaveBtn') }}
                </v-sheet>
              </v-btn>
            </v-sheet>
          </v-form>
        </v-card-text>
      </v-sheet>
    </v-sheet>
  </v-card>
</template>

<style scoped lang="scss"></style>
