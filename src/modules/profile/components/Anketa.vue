<script setup lang="ts">
  import User from '@/modules/profile/components/user/User.vue';
  import UserBanksRequisite from '@/modules/profile/components/user/UserBanksRequisite.vue';
  import { inject, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useDisplay } from 'vuetify';

  const { t } = useI18n();
  const { mobile } = useDisplay();

  let showAnketa = inject('showAnketa');
</script>

<template>
  <v-card :width="mobile ? 'auto' : 900">
    <v-sheet class="modal-window">
      <v-sheet>
        <v-card-title>
          <v-sheet class="modal-windows-label">
            {{ t('profile.modals.anketa.anketaTitle') }}
            <v-sheet class="button-close" @click="showAnketa = false"></v-sheet>
          </v-sheet>
        </v-card-title>
        <v-card-text>
          <v-sheet class="d-flex flex-column ga-3">
            <User></User>
            <UserBanksRequisite></UserBanksRequisite>
          </v-sheet>
        </v-card-text>
      </v-sheet>
    </v-sheet>
  </v-card>
</template>

<style scoped lang="scss"></style>
