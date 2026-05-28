<script setup lang="ts">
  import { useAccountStore } from '@/stores/accountStore';
  import { useI18n } from 'vue-i18n';
  import { useVuelidate } from '@vuelidate/core';
  import { reactive } from 'vue';
  import { watch } from 'vue';
  import AvatarUpload from '@/components/AvatarUpload.vue';
  import { useDisplay } from 'vuetify';

  const { t } = useI18n();
  const accountStore = useAccountStore();
  const { mobile } = useDisplay();

  const initialState = {
    nickname: accountStore.data.info.nickname,
    login: accountStore.data.info.login
  };

  const state = reactive({
    ...initialState
  });

  const rules = {};
  const v$ = useVuelidate(rules, state);

  defineExpose({
    state,
    v$
  });
</script>

<template>
  <v-sheet class="d-flex flex-column ga-3">
    <v-sheet
      class="d-flex ga-3 flex-column"
      :class="{ 'pa-4': mobile, 'pa-8': !mobile }"
      rounded="xxl"
      style="background-color: var(--color-MainBackground) !important"
    >
      <v-sheet class="text-common font-16">{{ t('profile.modals.settings.profileTitle') }}</v-sheet>
      <v-sheet class="d-flex flex-column ga-3">
        <v-sheet class="text-type-text">{{ t('profile.modals.settings.nicknameTitle') }}</v-sheet>
        <v-text-field
          v-model="state.nickname"
          variant="solo"
          flat
          hide-details="auto"
        ></v-text-field>
      </v-sheet>

      <v-sheet class="d-flex justify-center">
        <avatar-upload />
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="d-flex ga-3 flex-column"
      :class="{ 'pa-4': mobile, 'pa-8': !mobile }"
      rounded="xxl"
      style="background-color: var(--color-MainBackground) !important"
    >
      <v-sheet class="d-flex flex-column ga-3">
        <v-sheet class="d-flex flex-column">
          <v-sheet class="">{{ t('profile.modals.settings.loginTitle') }}</v-sheet>
          <v-sheet class="d-flex justify-space-between">
            <v-sheet>{{ state.login }}</v-sheet>
            <v-icon disabled icon="mdi-square-edit-outline" />
          </v-sheet>
        </v-sheet>
        <v-sheet class="d-flex flex-column">
          <v-sheet>{{ t('profile.modals.settings.passwordTitle') }}</v-sheet>
          <v-sheet class="d-flex justify-space-between">
            <v-sheet>*************</v-sheet>
            <v-icon disabled icon="mdi-square-edit-outline" />
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  .v-file-upload {
    :deep(.v-file-upload-divider) {
      margin: 0 !important;
      padding: 0 !important;
    }
  }
</style>
