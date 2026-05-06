<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const item = ref();

  const openDialogUploadDocuments = () => {
    console.log('here');
  };

  const address1 = ref({
    country: null
  });

  const address2 = ref({
    country: null
  });

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

  function itemProps(item: any) {
    return {
      title: item.name
    };
  }

  onMounted(() => {
    item.value = items[0];
  });
</script>

<template>
  <v-sheet class="d-flex flex-column ga-3">
    <v-sheet
      class="pa-8"
      rounded="xxl"
      style="background-color: var(--color-MainBackground) !important"
    >
      <v-sheet class="text-common font-16">
        {{ t('profile.modals.settings.contactInformationTitle') }}
      </v-sheet>
      <v-sheet class="d-flex flex-column ga-3">
        <v-sheet class="d-flex">
          <v-col cols="9" class="pa-0">
            <v-sheet class="d-flex justify-space-between my-2">
              <v-sheet class="text-type-text">
                {{ t('profile.modals.settings.emailTitle') }}
              </v-sheet>
              <v-checkbox
                :label="t('profile.modals.settings.useForAuthentificationTitle')"
                hide-details
                true-icon="rioni:formCheckOn"
                false-icon="rioni:formCheckOff"
              ></v-checkbox>
            </v-sheet>
            <v-sheet class="d-flex">
              <v-text-field
                variant="solo"
                flat
                hide-details="auto"
              ></v-text-field>
            </v-sheet>
          </v-col>
          <v-col cols="3" class="pa-0 d-flex justify-center align-end">
            <v-sheet class="d-flex align-center text-element-check" height="36">
              {{ t('profile.modals.settings.confirmedTitle') }}
            </v-sheet>
          </v-col>
        </v-sheet>
        <v-sheet class="d-flex">
          <v-col cols="9" class="pa-0">
            <v-sheet class="d-flex justify-end align-center my-2">
              <v-checkbox
                :label="t('profile.modals.settings.useForAuthentificationTitle')"
                hide-details
                true-icon="rioni:formCheckOn"
                false-icon="rioni:formCheckOff"
              ></v-checkbox>
            </v-sheet>
            <v-sheet>
              <v-text-field
                variant="solo"
                flat
                hide-details="auto"
              ></v-text-field>
            </v-sheet>
          </v-col>
          <v-col cols="3" class="pa-0 d-flex justify-center align-end">
            <v-sheet class="d-flex align-center text-element-check" height="36">
              {{ t('profile.modals.settings.confirmedTitle') }}
            </v-sheet>
          </v-col>
        </v-sheet>
        <v-sheet class="d-flex">
          <v-col cols="9" class="pa-0">
            <v-sheet class="d-flex justify-space-between align-center my-2">
              <span class="text-type-text">{{ t('profile.modals.settings.phoneTitle') }}</span>
              <v-checkbox
                :label="t('profile.modals.settings.useForAuthentificationTitle')"
                hide-details
                true-icon="rioni:formCheckOn"
                false-icon="rioni:formCheckOff"
              ></v-checkbox>
            </v-sheet>
            <v-sheet class="d-flex justify-space-between">
              <v-col cols="2" class="pa-0">
                <v-select
                  variant="solo"
                  flat
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
              </v-col>

              <v-col cols="9" class="pa-0">
                <v-text-field
                  variant="solo"
                  flat
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-sheet>
          </v-col>
          <v-col cols="3" class="pa-0 d-flex justify-center align-end">
            <v-sheet class="d-flex align-center text-element-check" height="36">
              {{ t('profile.modals.settings.confirmedTitle') }}
            </v-sheet>
          </v-col>
        </v-sheet>

        <v-sheet
          class="px-6 py-3 font-smaller"
          style="background-color: var(--color-LightGreen) !important"
        >
          {{ t('profile.modals.settings.helpText') }}
        </v-sheet>

        <v-sheet class="d-flex align-center">
          <v-col cols="12" class="pa-0">
            <v-sheet class="d-flex w-100 justify-space-between align-center">
              <v-sheet class="text-type-text">
                {{ t('profile.modals.settings.addressTitle') }}
              </v-sheet>
              <v-checkbox
                :label="t('profile.modals.settings.useAsPostTitle')"
                hide-details
                true-icon="rioni:formCheckOn"
                false-icon="rioni:formCheckOff"
              ></v-checkbox>
            </v-sheet>
            <v-sheet class="d-flex justify-space-between">
              <v-col cols="4" class="pa-0">
                <v-select
                  variant="solo"
                  flat
                  :label="t('profile.modals.settings.countryTitle')"
                  density="compact"
                  :items="items"
                  :item-props="itemProps"
                  v-model="address1.country"
                ></v-select>
              </v-col>
              <v-col cols="3" class="pa-0">
                <v-text-field
                  variant="solo"
                  flat
                  hide-details="auto"
                  :label="t('profile.modals.settings.cityTitle')"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="pa-0">
                <v-text-field
                  variant="solo"
                  flat
                  hide-details="auto"
                  :label="t('profile.modals.settings.postCodeTitle')"
                ></v-text-field>
              </v-col>
            </v-sheet>
            <v-sheet>
              <v-col cols="12" class="pa-0">
                <v-text-field
                  variant="solo"
                  flat
                  hide-details="auto"
                  :label="t('profile.modals.settings.addressFormTitle')"
                ></v-text-field>
              </v-col>
            </v-sheet>
          </v-col>
        </v-sheet>
        <v-sheet>
          <v-col cols="12" class="pa-0">
            <v-sheet class="d-flex justify-space-between align-center">
              <v-sheet class="text-type-text">
                {{ t('profile.modals.settings.address2Title') }}
              </v-sheet>
              <v-checkbox
                :label="t('profile.modals.settings.useAsPostTitle')"
                hide-details
                true-icon="rioni:formCheckOn"
                false-icon="rioni:formCheckOff"
              ></v-checkbox>
            </v-sheet>
            <v-sheet class="d-flex justify-space-between">
              <v-col cols="4" class="pa-0">
                <v-select
                  variant="solo"
                  flat
                  :label="t('profile.modals.settings.countryTitle')"
                  density="compact"
                  :items="items"
                  :item-props="itemProps"
                  v-model="address2.country"
                ></v-select>
              </v-col>
              <v-col cols="3" class="pa-0">
                <v-text-field
                  variant="solo"
                  flat
                  hide-details="auto"
                  :label="t('profile.modals.settings.cityTitle')"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="pa-0">
                <v-text-field
                  variant="solo"
                  flat
                  hide-details="auto"
                  :label="t('profile.modals.settings.postCodeTitle')"
                ></v-text-field>
              </v-col>
            </v-sheet>
            <div class="form-inside-inputs-grid justify-space-between">
              <v-col cols="12" class="pa-0">
                <v-text-field
                  variant="solo"
                  flat
                  hide-details="auto"
                  :label="t('profile.modals.settings.addressFormTitle')"
                ></v-text-field>
              </v-col>
            </div>
          </v-col>
        </v-sheet>
        <v-sheet class="text-type-text">
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
    <v-btn variant="flat" rounded="lg" bg="element-check" color="element-check">
      <v-sheet class="text-white">
        {{ t('profile.modals.settings.contactInformationSaveBtn') }}
      </v-sheet>
    </v-btn>
  </v-sheet>
</template>

<style scoped lang="scss">
  .v-checkbox {
    :deep(.v-label) {
      color: var(--color-TypeText);
    }
  }
</style>
