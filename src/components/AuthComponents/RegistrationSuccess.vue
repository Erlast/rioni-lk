<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import { useAuthStore } from '@/stores/authStore.ts';
  import RioniLogo from '@/components/RioniLogo.vue';
  import CloseButton from '@/components/BaseComponents/CloseButton.vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { clearTempData } from '@/utils/loginHelper.ts';

  const { mobile } = useDisplay();
  const authStore = useAuthStore();
  const router = useRouter();
  const { t } = useI18n();

  const toAuth = () => {
    clearTempData();
    authStore.clearRegistrationData();
    router.push('/');
  };
</script>

<template>
  <v-sheet
    class="d-flex h-100 pa-6 flex-column position-relative"
    :class="{ 'justify-center': mobile }"
    :style="`background-color: ${mobile ? 'white' : 'var(--color-MainBackground)'} !important`"
  >
    <v-sheet class="position-absolute" style="top: 24px; left: 24px">
      <RioniLogo />
    </v-sheet>
    <v-sheet class="position-absolute" style="top: 24px; right: 24px">
      <CloseButton class-name="bg-hard-blue" color="white" @click="toAuth" />
    </v-sheet>
    <v-sheet
      width="100%"
      class="d-flex flex-column align-center"
      :class="{ 'pa-6': !mobile }"
      height="90%"
    >
      <v-sheet
        class="d-flex flex-column align-center justify-center"
        :class="{ 'ga-2': !mobile, 'ga-4': mobile }"
        :width="mobile ? '100%' : '70%'"
      >
        <v-sheet class="">
          <v-img src="/img/registration-result-icon.png" width="64" />
        </v-sheet>
        <v-sheet class="font-22 text-hard-blue">
          {{ t('registration.result.welcome', { name: authStore.registrationData?.name }) }}
        </v-sheet>
        <v-sheet :class="{ 'font-small': mobile }">
          {{ t('registration.result.accessAvailable') }}
        </v-sheet>
        <v-sheet class="d-flex ga-4">
          <v-sheet>
            <v-img :width="mobile ? 23 : 38" src="/img/registration-result-education-icon.png" />
          </v-sheet>
          <v-sheet class="d-flex flex-column ga-1">
            <v-sheet class="text-hard-blue" :class="{ 'font-18': !mobile, 'font-smaller': mobile }">
              {{ t('registration.result.educationTitle') }}
            </v-sheet>
            <v-sheet :class="{ 'font-smaller': !mobile, 'font-small': mobile }">
              {{ t('registration.result.educationDescription') }}
            </v-sheet>
          </v-sheet>
        </v-sheet>
        <v-sheet class="d-flex ga-4">
          <v-sheet>
            <v-img :width="mobile ? 23 : 38" src="/img/registration-result-dashboard-icon.png" />
          </v-sheet>
          <v-sheet class="d-flex flex-column ga-1">
            <v-sheet class="text-hard-blue" :class="{ 'font-18': !mobile, 'font-smaller': mobile }">
              {{ t('registration.result.dashboardTitle') }}
            </v-sheet>
            <v-sheet :class="{ 'font-smaller': !mobile, 'font-small': mobile }">
              {{ t('registration.result.dashboardDescription') }}
            </v-sheet>
          </v-sheet>
        </v-sheet>
        <v-sheet class="d-flex ga-4">
          <v-sheet>
            <v-img :width="mobile ? 23 : 38" src="/img/registration-result-analytics-icon.png" />
          </v-sheet>
          <v-sheet class="d-flex flex-column ga-1">
            <v-sheet class="text-hard-blue" :class="{ 'font-18': !mobile, 'font-smaller': mobile }">
              {{ t('registration.result.analyticsTitle') }}
            </v-sheet>
            <v-sheet :class="{ 'font-smaller': !mobile, 'font-small': mobile }">
              {{ t('registration.result.analyticsDescription') }}
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
