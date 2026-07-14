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
      <v-sheet
        class="d-flex"
        :class="{ 'flex-row-reverse ga-6 justify-space-between': mobile, 'ga-10': !mobile }"
      >
        <v-sheet :width="mobile ? 127 : 170">
          <v-img
            v-if="accountStore.data.photoUrl"
            :src="accountStore.data.photoUrl"
            alt="photo"
            :height="mobile ? 127 : 170"
            :width="mobile ? 127 : 170"
            aspect-ratio="1/1"
            rounded="mg"
            cover
          />
          <v-img
            v-else
            src="/img/no-avatar.png"
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
            <v-sheet class="font-default text-dark-blue">{{ accountStore.data.nbs }}</v-sheet>
          </v-sheet>
          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">{{ t('profile.nduTitle') }}</v-sheet>
            <v-sheet class="font-default text-dark-blue">{{ accountStore.data.ndu }}</v-sheet>
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
              {{ accountStore.data.name }} {{ accountStore.data.patronymic }}
              {{ accountStore.data.surname }}
            </v-sheet>
          </v-sheet>
          <v-sheet class="d-flex ga-8">
            <v-sheet class="d-flex flex-column">
              <v-sheet class="font-small text-type-text">{{ t('profile.birthdayTitle') }}</v-sheet>
              <v-sheet class="font-default text-dark-blue">
                {{ dayjs(accountStore.data.dateOfBirth).format('DD.MM.YYYY') }}
              </v-sheet>
            </v-sheet>
            <v-sheet class="d-flex flex-column">
              <v-sheet class="font-small text-type-text">{{ t('profile.gender') }}</v-sheet>
              <v-sheet class="font-default text-dark-blue">
                {{ accountStore.data.gender }}
              </v-sheet>
            </v-sheet>
          </v-sheet>

          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">{{ t('profile.citizenship') }}</v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{ accountStore.data.citizenship }}
            </v-sheet>
          </v-sheet>
          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">{{ t('profile.placeOfBirth') }}</v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{ accountStore.data.placeOfBirth }}
            </v-sheet>
          </v-sheet>
        </v-sheet>
        <v-sheet class="d-flex flex-column ga-2">
          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">{{ t('profile.documentType') }}</v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{ accountStore.data.documentType }}
            </v-sheet>
          </v-sheet>
          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">{{ t('profile.passportNumber') }}</v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{ accountStore.data.passportNumber }}
            </v-sheet>
          </v-sheet>
          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">
              {{ t('profile.passportIssueDate') }}
            </v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{ dayjs(accountStore.data.passportIssueDate).format('DD.MM.YYYY') }}
            </v-sheet>
          </v-sheet>
          <v-sheet v-if="accountStore.data.passportExpiryDate" class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">
              {{ t('profile.passportExpiryDate') }}
            </v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{ dayjs(accountStore.data.passportExpiryDate).format('DD.MM.YYYY') }}
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
