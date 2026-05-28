<script setup lang="ts">
  import { provide, ref } from 'vue';
  import Anketa from '@/modules/profile/components/Anketa.vue';
  import ProfileSettings from '@/modules/profile/components/ProfileSettings.vue';
  import ActionCards from '@/components/ActionCards.vue';
  import { useI18n } from 'vue-i18n';
  import { useDisplay } from 'vuetify';

  const { t } = useI18n();
  const showAnketa = ref(false);
  const showProfileSettings = ref(false);
  const { mobile } = useDisplay();

  provide('showAnketa', showAnketa);
  provide('showProfileSettings', showProfileSettings);

  const clickCard = (id: number) => {
    switch (id) {
      case 1:
        showProfileSettings.value = true;
        break;
      case 2:
        showAnketa.value = true;
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
