<script setup lang="ts">
  import { provide, ref } from 'vue';
  import { useAccountStore } from '@/stores/accountStore';
  import { useI18n } from 'vue-i18n';
  import dayjs from 'dayjs';
  import ProfileData from './profile/ProfileData.vue';

  const accountStore = useAccountStore();
  const { t } = useI18n();
  const hasProtect = ref(true);
  const showProfileData = ref(false);

  provide('showProfileData', showProfileData);

  const onProtect = () => {
    hasProtect.value = !hasProtect.value;
  };
</script>

<template>
  <v-sheet class="d-flex ga-2">
    <v-sheet width="50%" class="rounded-xxl pa-6" style="background-color: white !important">
      <v-sheet class="mb-4">{{ t('profile.cardTitle') }}</v-sheet>
      <v-sheet class="d-flex ga-10">
        <v-sheet width="170">
          <v-img
            :src="accountStore.data.info.photoUrl"
            alt="photo"
            height="170"
            width="170"
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
              {{ accountStore.data.info.email }}
            </v-sheet>
          </v-sheet>
          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">{{ t('profile.phoneNumber') }}</v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{ accountStore.data.info.phone }}
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <v-sheet width="50%" class="rounded-xxl pa-6" style="background-color: white !important">
      <v-sheet class="d-flex justify-space-between mb-4">
        <v-sheet class="d-flex ga-2">
          <v-sheet>{{ t('profile.privateProfileTitle') }}</v-sheet>
          <v-btn icon density="compact" variant="text" @click="onProtect()">
            <v-icon :icon="hasProtect ? 'mdi-eye-off' : 'mdi-eye'" color="middle-blue" />
          </v-btn>
        </v-sheet>
        <v-sheet class="d-flex ga-2">
          <v-btn
            icon
            density="compact"
            :ripple="false"
            variant="text"
            @click="showProfileData = true"
          >
            <v-icon icon="mdi-square-edit-outline" color="middle-blue" />
          </v-btn>
        </v-sheet>
      </v-sheet>

      <v-sheet class="d-flex ga-10" :class="{ 'profile-form-protect': hasProtect }">
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
                {{
                  dayjs(accountStore.data.info.dateOfBirth, 'DD.MM.YYYY', true).format('DD.MM.YYYY')
                }}
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
              {{
                dayjs(accountStore.data.info.passportIssueDate, 'DD.MM.YYYY', true).format(
                  'DD.MM.YYYY'
                )
              }}
            </v-sheet>
          </v-sheet>
          <v-sheet class="d-flex flex-column">
            <v-sheet class="font-small text-type-text">
              {{ t('profile.passportExpiryDate') }}
            </v-sheet>
            <v-sheet class="font-default text-dark-blue">
              {{
                dayjs(accountStore.data.info.passportExpiryDate, 'DD.MM.YYYY', true).format(
                  'DD.MM.YYYY'
                )
              }}
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-sheet>

    <v-dialog v-model="showProfileData" width="auto" scrollable>
      <ProfileData />
    </v-dialog>
  </v-sheet>
</template>

<style scoped lang="scss">
  .profile-form-protect {
    filter: blur(3px);
  }
</style>
