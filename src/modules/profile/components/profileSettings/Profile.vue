<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
</script>

<template>
  <v-sheet class="d-flex flex-column ga-3">
    <v-sheet
      class="pa-8 d-flex ga-3 flex-column"
      rounded="xxl"
      style="background-color: var(--color-MainBackground) !important"
    >
      <v-sheet class="text-common font-16">{{ t('profile.modals.settings.profileTitle') }}</v-sheet>
      <v-sheet class="d-flex flex-column ga-3">
        <v-sheet class="text-type-text">{{ t('profile.modals.settings.nicknameTitle') }}</v-sheet>
        <v-text-field variant="solo" flat hide-details="auto"></v-text-field>
      </v-sheet>
      <v-sheet
        class="d-flex justify-center px-10 py-5 rounded-20 mt-3 border-dashed border-color-element border-sm"
      >
        <v-img width="146" height="146" src="/img/avatar-default.png" />
      </v-sheet>
      <v-sheet class="d-flex justify-center">
        <v-icon icon="mdi-arrow-down" />
        {{ t('profile.modals.settings.uploadAvatarTitle') }}
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="pa-8 d-flex ga-3 flex-column"
      rounded="xxl"
      style="background-color: var(--color-MainBackground) !important"
    >
      <v-sheet class="d-flex flex-column ga-3">
        <v-sheet class="d-flex flex-column">
          <v-sheet class="">{{ t('profile.modals.settings.loginTitle') }}</v-sheet>
          <v-sheet class="d-flex justify-space-between">
            <v-sheet>ivanovivan</v-sheet>
            <v-icon icon="mdi-square-edit-outline" />
          </v-sheet>
        </v-sheet>
        <v-sheet class="d-flex flex-column">
          <v-sheet>{{ t('profile.modals.settings.passwordTitle') }}</v-sheet>
          <v-sheet class="d-flex justify-space-between">
            <v-sheet>*************</v-sheet>
            <v-icon icon="mdi-square-edit-outline" />
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
