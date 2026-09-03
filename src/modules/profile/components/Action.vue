<script setup lang="ts">
  import { computed, provide, ref } from 'vue';
  import Anketa from '@/modules/profile/components/Anketa.vue';
  import ProfileSettings from '@/modules/profile/components/ProfileSettings.vue';
  import ActionCards from '@/components/ActionCards.vue';
  import { useProfileSettingsStore } from '@/stores/profileSettingsStore';
  import { useI18n } from 'vue-i18n';
  import { useDisplay } from 'vuetify';
  import Tariff from '@/modules/profile/components/Tariff.vue';

  const { t } = useI18n();
  const showAnketa = ref(false);
  const showTariffs = ref(false);
  const profileSettingsStore = useProfileSettingsStore();
  const showProfileSettings = computed<boolean>({
    get: () => profileSettingsStore.showProfileSettings,
    set: value => {
      profileSettingsStore.showProfileSettings = value;
    }
  });
  const { mobile } = useDisplay();

  provide('showAnketa', showAnketa);
  provide('showProfileSettings', showProfileSettings);
  provide('showTariffs', showTariffs);

  const clickCard = (id: number) => {
    switch (id) {
      case 1:
        showProfileSettings.value = true;
        break;
      case 2:
        showAnketa.value = true;
        break;
      case 3:
        showTariffs.value = true;
        break;
      default:
        break;
    }
  };

  const actionTitles = ['profile.settingsTitle', 'profile.anketaTitle', 'profile.tariffTitle'];

  const bgThirdCard = '/img/card-bg.png';
</script>

<template>
  <v-dialog
    v-model="showAnketa"
    width="auto"
    :min-width="mobile ? '100%' : 900"
    persistent
    scrollable
  >
    <Anketa />
  </v-dialog>
  <v-dialog
    v-model="showProfileSettings"
    width="auto"
    :min-width="mobile ? '100%' : 900"
    persistent
    scrollable
  >
    <ProfileSettings />
  </v-dialog>

  <v-dialog
    v-model="showTariffs"
    width="auto"
    :min-width="mobile ? '100%' : 900"
    persistent
    scrollable
  >
    <Tariff />
  </v-dialog>

  <v-sheet class="d-flex flex-column rounded-xxl pa-6" style="background-color: white !important">
    <v-sheet class="mb-4">{{ t('profile.actionsTitle') }}</v-sheet>
    <ActionCards
      @click-card="clickCard"
      :action-titles="actionTitles"
      :third-card-bg="bgThirdCard"
    />
  </v-sheet>
</template>

<style scoped lang="scss"></style>
