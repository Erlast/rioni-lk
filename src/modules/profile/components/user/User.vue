<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const item = ref();

  const items = [
    {
      name: 'Россия',
      image: 'ru'
    },
    {
      name: 'Грузия',
      image: 'ge'
    }
  ];

  onMounted(() => {
    item.value = items[0];
  });
</script>

<template>
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
        <v-sheet class="d-flex ga-2 justify-space-between">
          <v-sheet class="number-count">1</v-sheet>
          <v-select
            variant="solo"
            flat
            density="compact"
            :items="['Австралия', 'Австрия', 'Азербайджан', 'Албания', 'Алжир']"
            hide-details="auto"
            :label="t('profile.modals.anketa.countryTitle')"
          ></v-select>
          <v-text-field
            variant="solo"
            density="compact"
            flat
            hide-details="auto"
            :label="t('profile.modals.anketa.innTitle')"
          ></v-text-field>
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <v-sheet class="d-flex flex-column ga-2">
      <v-sheet class="text-background-blue font-20 font-semibold">
        {{ t('profile.modals.anketa.additionalInformationTitle') }}
      </v-sheet>
      <v-sheet class="d-flex justify-space-between">
        <v-checkbox
          :label="t('profile.modals.anketa.beneficiariesTitle')"
          hide-details
          true-icon="rioni:formCheckOn"
          false-icon="rioni:formCheckOff"
        ></v-checkbox>
        <v-checkbox
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
        <v-sheet class="d-flex justify-space-between ga-2">
          <v-select
            :label="t('profile.modals.anketa.countryTitle')"
            variant="solo"
            flat
            hide-details="auto"
            density="compact"
            :items="['Австралия', 'Австрия', 'Азербайджан', 'Албания', 'Алжир']"
          ></v-select>
          <v-select
            :label="t('profile.modals.anketa.issuedByTitle')"
            variant="solo"
            flat
            hide-details="auto"
            density="compact"
            :items="['Данные 1', 'Данные 2', 'Данные 4']"
          ></v-select>
        </v-sheet>
        <v-sheet class="d-flex justify-space-between ga-2">
          <v-text-field
            variant="solo"
            flat
            hide-details="auto"
            :label="t('profile.modals.anketa.documentNumberTitle')"
          ></v-text-field>
          <v-text-field
            variant="solo"
            flat
            hide-details="auto"
            :label="t('profile.modals.anketa.durationTitle')"
          ></v-text-field>
        </v-sheet>

        <v-checkbox
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
              :items="items"
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
            <v-text-field variant="solo" flat hide-details="auto" label="E-mail"></v-text-field>
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

    <v-btn variant="flat" rounded="lg" bg="element-check" color="element-check">
      <v-sheet class="text-white">
        {{ t('profile.modals.settings.contactInformationSaveBtn') }}
      </v-sheet>
    </v-btn>
  </v-sheet>
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
