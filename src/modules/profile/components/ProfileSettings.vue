<script setup lang="ts">
  import ContactInformation from '@/modules/profile/components/profileSettings/ContactInformation.vue';
  import Profile from '@/modules/profile/components/profileSettings/Profile.vue';
  import { inject } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  let showProfileSettings = inject('showProfileSettings');
</script>

<template>
  <v-card width="900">
    <v-sheet class="modal-window">
      <v-sheet>
        <v-card-title>
          <v-sheet class="modal-windows-label">
            {{ t('profile.modals.settings.title') }}
            <v-sheet class="button-close" @click="showProfileSettings = false"></v-sheet>
          </v-sheet>
        </v-card-title>

        <v-card-text>
          <v-sheet class="d-flex ga-3">
            <ContactInformation></ContactInformation>
            <Profile></Profile>
          </v-sheet>
        </v-card-text>
        <v-divider></v-divider>
      </v-sheet>
    </v-sheet>
  </v-card>
</template>

<style scoped lang="scss">
  .modal-window {
    .modal-windows-label {
      background: linear-gradient(67deg, #103673 40.45%, #4a77c1 81.54%) !important;
    }
  }
</style>
