<script setup lang="ts">
  import accountsService from '@/api/accountService';
  import { IResidencePermit, ITaxResidenceModel } from '@/api/types';
  import { useAccountStore } from '@/stores/accountStore';
  import { useNotify } from '@/stores/notifyStore';
  import { countries, itemsFlags } from '@/utils/data';
  import { filterDigits } from '@/utils/filters';
  import { inject, onMounted, Ref, ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import DatePicker from '@/components/BaseComponents/DatePicker.vue';
  import { useVuelidate } from '@vuelidate/core';
  import { helpers, requiredIf } from '@vuelidate/validators';

  const { t } = useI18n();
  const item = ref();
  const notifyStore = useNotify();
  const accountStore = useAccountStore();
  const isSending = ref(false);
  const showAnketa = inject<Ref<boolean>>('showAnketa', ref(false));

  const state = reactive({
    taxResidences: [] as ITaxResidenceModel[],
    residencePermits: [] as IResidencePermit[]
  });

  const rules = {
    taxResidences: {
      $each: helpers.forEach({
        country: {
          required: helpers.withMessage(
            t('validations.requiredField'),
            requiredIf((_, vm: any) => {
              return !!vm.inn;
            })
          )
        },
        inn: {
          required: helpers.withMessage(
            t('validations.requiredField'),
            requiredIf((_, vm) => {
              return !!vm.country;
            })
          )
        }
      })
    },
    residencePermits: {
      $each: helpers.forEach({
        country: {
          required: helpers.withMessage(
            t('validations.requiredField'),
            requiredIf((_, vm: any) => {
              return !!vm.issuedBy || !!vm.documentNumber || !!vm.stayPeriod;
            })
          )
        },
        issuedBy: {
          required: helpers.withMessage(
            t('validations.requiredField'),
            requiredIf((_, vm) => {
              return !!vm.country || !!vm.documentNumber || !!vm.stayPeriod;
            })
          )
        },
        documentNumber: {
          required: helpers.withMessage(
            t('validations.requiredField'),
            requiredIf((_, vm) => {
              return !!vm.country || !!vm.issuedBy || !!vm.stayPeriod;
            })
          )
        },
        stayPeriod: {
          required: helpers.withMessage(
            t('validations.requiredField'),
            requiredIf((_, vm) => {
              return !!vm.country || !!vm.issuedBy || !!vm.documentNumber;
            })
          )
        }
      })
    }
  };

  const v$ = useVuelidate(rules, state);

  const addTaxResidence = () => {
    state.taxResidences.push({ id: 0, country: null, inn: '' });
  };

  const addResidencePermit = () => {
    state.residencePermits.push({
      id: 0,
      country: null,
      issuedBy: '',
      documentNumber: '',
      stayPeriod: ''
    });
  };

  const handleFormSubmit = async () => {
    isSending.value = true;
    try {
      const result = await v$.value.$validate();
      if (!result) {
        return;
      }
      const filteredTaxResidences = state.taxResidences.filter(tr => tr.country || tr.inn);
      const filteredPermits = state.residencePermits.filter(
        rp => rp.country || rp.issuedBy || rp.documentNumber || rp.stayPeriod
      );
      await accountsService.profileSave(accountStore.data.id, accountStore.data.info);
      await accountsService.profileTaxResidencesSave(accountStore.data.id, filteredTaxResidences);
      await accountsService.profileResidencePermitsSave(accountStore.data.id, filteredPermits);
      showAnketa.value = false;
    } catch (error) {
      notifyStore.showServiceError(error);
    } finally {
      isSending.value = false;
    }
  };

  onMounted(async () => {
    item.value = itemsFlags[0];
    state.taxResidences = await accountsService.profileTaxResidences(accountStore.data.id);
    state.residencePermits = await accountsService.profileResidencePermits(accountStore.data.id);
    if (!state.taxResidences.length) {
      state.taxResidences.push({ id: 0, country: null, inn: '' });
    }
    if (!state.residencePermits.length) {
      state.residencePermits.push({
        id: 0,
        country: null,
        issuedBy: '',
        documentNumber: '',
        stayPeriod: ''
      });
    }
  });
</script>

<template>
  <v-form ref="anketa" @submit.prevent="handleFormSubmit">
    <v-sheet
      class="pa-8 d-flex flex-column ga-4"
      rounded="xxl"
      style="background-color: var(--color-MainBackground) !important"
    >
      <v-sheet class="d-flex flex-column ga-2">
        <v-sheet class="text-background-blue font-20 font-semibold">
          {{ t('profile.modals.anketa.taxResidenciesTitle') }}
        </v-sheet>
        <v-sheet class="d-flex flex-column ga-2">
          <v-sheet class="text-common font-smaller">
            {{ t('profile.modals.anketa.chooseText1') }}
            <span style="font-weight: 600">{{ t('profile.modals.anketa.chooseText2') }}</span>
            {{ t('profile.modals.anketa.chooseText3') }}
          </v-sheet>
          <v-sheet
            v-for="(residence, index) in state.taxResidences"
            :key="index"
            class="d-flex ga-2 justify-space-between"
          >
            <v-sheet class="d-flex ga-2" width="50%">
              <v-sheet>
                <v-sheet class="number-count">{{ index + 1 }}</v-sheet>
              </v-sheet>
              <v-sheet width="100%">
                <v-autocomplete
                  v-model="state.taxResidences[index].country"
                  variant="solo"
                  flat
                  density="compact"
                  :items="countries"
                  hide-details="auto"
                  :label="t('profile.modals.anketa.countryTitle')"
                  :error="v$.taxResidences.$each.$response.$errors[index].country.$invalid"
                  :error-messages="
                    v$.taxResidences.$each.$response.$errors[index].country.length
                      ? (v$.taxResidences.$each.$response.$errors[index].country[0]
                          ?.$message as string)
                      : ''
                  "
                />
              </v-sheet>
            </v-sheet>
            <v-sheet width="50%">
              <v-text-field
                v-model="state.taxResidences[index].inn"
                variant="solo"
                density="compact"
                flat
                hide-details="auto"
                :label="t('profile.modals.anketa.innTitle')"
                :error="v$.taxResidences.$each.$response.$errors[index].inn.$invalid"
                :error-messages="
                  v$.taxResidences.$each.$response.$errors[index].inn.length
                    ? (v$.taxResidences.$each.$response.$errors[index].inn[0]?.$message as string)
                    : ''
                "
                @keydown="filterDigits"
              ></v-text-field>
            </v-sheet>
          </v-sheet>
          <v-sheet class="text-type-text font-smaller cursor-pointer" @click="addTaxResidence">
            {{ t('profile.modals.anketa.addBtn') }}
          </v-sheet>
        </v-sheet>
      </v-sheet>
      <v-sheet class="d-flex flex-column ga-2">
        <v-sheet class="text-background-blue font-20 font-semibold">
          {{ t('profile.modals.anketa.additionalInformationTitle') }}
        </v-sheet>
        <v-sheet class="d-flex justify-space-between">
          <v-checkbox
            v-model="accountStore.data.info.hasBeneficiaries"
            :label="t('profile.modals.anketa.beneficiariesTitle')"
            hide-details
            true-icon="rioni:formCheckOn"
            false-icon="rioni:formCheckOff"
          ></v-checkbox>
          <v-checkbox
            v-model="accountStore.data.info.isPep"
            :label="t('profile.modals.anketa.pepTitle')"
            hide-details
            true-icon="rioni:formCheckOn"
            false-icon="rioni:formCheckOff"
          ></v-checkbox>
        </v-sheet>
      </v-sheet>
      <v-sheet class="d-flex flex-column ga-2">
        <v-sheet class="text-background-blue font-20 font-semibold">
          {{ t('profile.modals.anketa.residenceTitle') }}
        </v-sheet>
        <v-sheet class="d-flex flex-column ga-2">
          <v-sheet class="text-common font-smaller">
            {{ t('profile.modals.anketa.chooseText4') }}
          </v-sheet>
          <v-sheet
            v-for="(permit, index) in state.residencePermits"
            :key="index"
            class="d-flex flex-column ga-2"
          >
            <v-sheet class="d-flex justify-space-between ga-2">
              <v-sheet width="50%">
                <v-autocomplete
                  v-model="permit.country"
                  :label="t('profile.modals.anketa.countryTitle')"
                  variant="solo"
                  flat
                  hide-details="auto"
                  density="compact"
                  :items="countries"
                  :error="v$.residencePermits.$each.$response.$errors[index].country.$invalid"
                  :error-messages="
                    v$.residencePermits.$each.$response.$errors[index].country.length
                      ? (v$.residencePermits.$each.$response.$errors[index].country[0]
                          ?.$message as string)
                      : ''
                  "
                />
              </v-sheet>
              <v-sheet width="50%">
                <v-text-field
                  v-model="permit.issuedBy"
                  variant="solo"
                  flat
                  hide-details="auto"
                  :label="t('profile.modals.anketa.issuedByTitle')"
                  :error="v$.residencePermits.$each.$response.$errors[index].issuedBy.$invalid"
                  :error-messages="
                    v$.residencePermits.$each.$response.$errors[index].issuedBy.length
                      ? (v$.residencePermits.$each.$response.$errors[index].issuedBy[0]
                          ?.$message as string)
                      : ''
                  "
                ></v-text-field>
              </v-sheet>
            </v-sheet>
            <v-sheet class="d-flex justify-space-between ga-2">
              <v-sheet width="50%">
                <v-text-field
                  v-model="permit.documentNumber"
                  variant="solo"
                  flat
                  hide-details="auto"
                  :label="t('profile.modals.anketa.documentNumberTitle')"
                  :error="
                    v$.residencePermits.$each.$response.$errors[index].documentNumber.$invalid
                  "
                  :error-messages="
                    v$.residencePermits.$each.$response.$errors[index].documentNumber.length
                      ? (v$.residencePermits.$each.$response.$errors[index].documentNumber[0]
                          ?.$message as string)
                      : ''
                  "
                ></v-text-field>
              </v-sheet>
              <v-sheet width="50%">
                <date-picker
                  :label="t('profile.modals.anketa.durationTitle')"
                  v-model="permit.stayPeriod"
                  :error-messages="v$.residencePermits.$each.$response.$errors[index].stayPeriod"
                />
              </v-sheet>
            </v-sheet>
          </v-sheet>
          <v-sheet class="text-type-text font-smaller cursor-pointer" @click="addResidencePermit">
            {{ t('profile.modals.anketa.addBtn') }}
          </v-sheet>
          <v-checkbox
            v-model="accountStore.data.info.noResidencePermit"
            :label="t('profile.modals.anketa.noResidenceTitle')"
            hide-details="auto"
            true-icon="rioni:formCheckOn"
            false-icon="rioni:formCheckOff"
          ></v-checkbox>
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
              v-model="accountStore.data.info.companyName"
              variant="solo"
              flat
              hide-details="auto"
              :label="t('profile.modals.anketa.companyNameTitle')"
            ></v-text-field>
          </v-sheet>
          <v-sheet class="d-flex justify-space-between ga-2">
            <v-text-field
              v-model="accountStore.data.info.companyIndustry"
              variant="solo"
              flat
              hide-details="auto"
              :label="t('profile.modals.anketa.industryTitle')"
            ></v-text-field>

            <v-text-field
              v-model="accountStore.data.info.companyPosition"
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
                v-model="accountStore.data.info.companyPhone"
                variant="solo"
                flat
                hide-details="auto"
                :label="t('profile.modals.anketa.phoneNumberTitle')"
              ></v-text-field>
            </v-sheet>
            <v-sheet width="50%">
              <v-text-field
                v-model="accountStore.data.info.companyWebsite"
                variant="solo"
                flat
                hide-details="auto"
                label="E-mail"
              ></v-text-field>
            </v-sheet>
          </v-sheet>
          <v-checkbox
            v-model="accountStore.data.info.isNpo"
            :label="t('profile.modals.anketa.memberOfNPOTitle')"
            hide-details="auto"
            true-icon="rioni:formCheckOn"
            false-icon="rioni:formCheckOff"
          ></v-checkbox>
          <v-checkbox
            v-model="accountStore.data.info.isNgo"
            :label="t('profile.modals.anketa.memberOfNGOTitle')"
            hide-details="auto"
            true-icon="rioni:formCheckOn"
            false-icon="rioni:formCheckOff"
          ></v-checkbox>
          <v-checkbox
            v-model="accountStore.data.info.isSelfEmployed"
            :label="t('profile.modals.anketa.selfEmployedStatusTitle')"
            hide-details="auto"
            true-icon="rioni:formCheckOn"
            false-icon="rioni:formCheckOff"
          ></v-checkbox>
          <v-checkbox
            v-model="accountStore.data.info.isNotWorking"
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
</template>

<style scoped lang="scss">
  .number-count {
    padding: 8px 16px;
    background-color: white !important;
    color: var(--color-TypeText) !important;
    font-size: 14px;
    border-radius: 8px;
  }
</style>
