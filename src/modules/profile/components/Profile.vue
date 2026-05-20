<script setup lang="ts">
  import { provide, ref } from 'vue';
  import { useAccountStore } from '@/stores/accountStore';
  import { useI18n } from 'vue-i18n';
  import dayjs from 'dayjs';
  import ProfileData from './profile/ProfileData.vue';
  import { useDisplay } from 'vuetify';

  const accountStore = useAccountStore();
  const { t } = useI18n();
  const hasProtect = ref(true);
  const showProfileData = ref(false);
  const { mobile } = useDisplay();

  provide('showProfileData', showProfileData);

  const onProtect = () => {
    hasProtect.value = !hasProtect.value;
  };
</script>

<template>
  <v-sheet class="d-flex ga-2" :class="{ 'flex-column': mobile }">
    <v-sheet
      :width="!mobile ? '50%' : 'auto'"
      class="rounded-xxl pa-6"
      style="background-color: white !important"
    >
      <v-sheet class="mb-4">{{ t('profile.cardTitle') }}</v-sheet>
      <v-sheet class="d-flex" :class="{ 'flex-row-reverse ga-6': mobile, 'ga-10': !mobile }">
        <v-sheet :width="mobile ? 127 : 170">
          <v-img
            :src="accountStore.data.info.photoUrl"
            alt="photo"
            :height="mobile ? 127 : 170"
            :width="mobile ? 127 : 170"
            aspect-ratio="1/1"
            rounded="mg"
            cover
          />
        </v-sheet>

        <v-sheet class="d-flex flex-column ga-2">
          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">{{ t('profile.nbsTitle') }}</v-sheet>
            <v-sheet class="font-default text-dark-blue">{{ accountStore.data.info.nbs }}</v-sheet>
          </v-sheet>
          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">{{ t('profile.nduTitle') }}</v-sheet>
            <v-sheet class="font-default text-dark-blue">{{ accountStore.data.info.ndu }}</v-sheet>
          </v-sheet>
          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">{{ t('profile.email') }}</v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{ accountStore.getEmail }}
            </v-sheet>
          </v-sheet>
          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">{{ t('profile.phoneNumber') }}</v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{ accountStore.getPhone }}
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <v-sheet
      :width="!mobile ? '50%' : 'auto'"
      class="rounded-xxl pa-6"
      style="background-color: white !important"
    >
      <v-sheet class="d-flex justify-space-between" :class="{ 'mb-4': !mobile }">
        <v-sheet class="d-flex ga-2">
          <v-sheet>{{ t('profile.privateProfileTitle') }}</v-sheet>
          <v-btn icon density="compact" variant="text" @click="onProtect()">
            <v-icon :icon="hasProtect ? 'mdi-eye-off' : 'mdi-eye'" color="middle-blue" />
          </v-btn>
        </v-sheet>
        <v-sheet class="ga-2">
          <v-btn disabled icon density="compact" :ripple="false" variant="text">
            <v-icon icon="mdi-square-edit-outline" color="middle-blue" />
          </v-btn>
        </v-sheet>
      </v-sheet>

      <v-sheet
        class="ga-10"
        :class="{
          'profile-form-protect': hasProtect && !mobile,
          'd-none': hasProtect && mobile,
          'd-flex': !mobile || (mobile && !hasProtect),
          'mt-4': mobile && !hasProtect
        }"
      >
        <v-sheet class="d-flex flex-column ga-2">
          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">{{ t('profile.fullName') }}</v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{ accountStore.data.info.name }} {{ accountStore.data.info.patronymic }}
              {{ accountStore.data.info.surname }}
            </v-sheet>
          </v-sheet>
          <v-sheet class="d-flex ga-8">
            <v-sheet class="d-flex flex-column">
              <v-sheet class="font-small text-type-text">{{ t('profile.birthdayTitle') }}</v-sheet>
              <v-sheet class="font-default text-dark-blue">
                {{ dayjs(accountStore.data.info.dateOfBirth).format('DD.MM.YYYY') }}
              </v-sheet>
            </v-sheet>
            <v-sheet class="d-flex flex-column">
              <v-sheet class="font-small text-type-text">{{ t('profile.gender') }}</v-sheet>
              <v-sheet class="font-default text-dark-blue">
                {{ accountStore.data.info.gender }}
              </v-sheet>
            </v-sheet>
          </v-sheet>

          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">{{ t('profile.citizenship') }}</v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{ accountStore.data.info.citizenship }}
            </v-sheet>
          </v-sheet>
          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">{{ t('profile.placeOfBirth') }}</v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{ accountStore.data.info.placeOfBirth }}
            </v-sheet>
          </v-sheet>
        </v-sheet>
        <v-sheet class="d-flex flex-column ga-2">
          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">{{ t('profile.documentType') }}</v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{ accountStore.data.info.documentType }}
            </v-sheet>
          </v-sheet>
          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">{{ t('profile.passportNumber') }}</v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{ accountStore.data.info.passportNumber }}
            </v-sheet>
          </v-sheet>
          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">
              {{ t('profile.passportIssueDate') }}
            </v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{ dayjs(accountStore.data.info.passportIssueDate).format('DD.MM.YYYY') }}
            </v-sheet>
          </v-sheet>
          <v-sheet v-if="accountStore.data.info.passportExpiryDate" class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">
              {{ t('profile.passportExpiryDate') }}
            </v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{ dayjs(accountStore.data.info.passportExpiryDate).format('DD.MM.YYYY') }}
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-sheet>

    <v-dialog v-model="showProfileData" width="auto" persistent scrollable>
      <ProfileData />
    </v-dialog>
  </v-sheet>
</template>

<style scoped lang="scss">
  .profile-form-protect {
    filter: blur(3px);
  }
</style>
