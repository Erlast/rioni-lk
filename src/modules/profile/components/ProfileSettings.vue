<script setup lang="ts">
  import ContactInformation from '@/modules/profile/components/profileSettings/ContactInformation.vue';
  import Profile from '@/modules/profile/components/profileSettings/Profile.vue';
  import { inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';

  const {t} = useI18n()
  let showProfileSettings = inject('showProfileSettings');
</script>

<template>
  <v-card width="900">
    <div class="modal-window">
      <div class="form">
        <v-card-title>
          <div class="modal-windows-label">
            {{ t('profile.modals.settings.title') }}
            <div class="button-close" @click="showProfileSettings = false"></div>
          </div>
        </v-card-title>

        <v-card-text>
          <div class="d-flex ga-3">
            <ContactInformation></ContactInformation>
            <Profile></Profile>
          </div>
        </v-card-text>
        <v-divider></v-divider>
      </div>
    </div>
  </v-card>
</template>

<style scoped lang="scss"></style>
