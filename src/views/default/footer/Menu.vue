<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';

  const { mobile } = useDisplay();
  const { t } = useI18n();
</script>

<template>
  <v-sheet :class="{ 'd-flex flex-column ga-4 mt-6': mobile }">
    <v-sheet class="text-type-text mb-2">{{ t('footer.menuTitle') }}</v-sheet>
    <v-sheet class="d-flex ga-2">
      <v-sheet class="d-flex flex-column ga-2 text-white" width="50%">
        <v-sheet>{{ t('footer.menu.about') }}</v-sheet>
        <v-sheet>{{ t('footer.menu.whyRioni') }}</v-sheet>
        <v-sheet>{{ t('footer.menu.services') }}</v-sheet>
        <v-sheet>{{ t('footer.menu.tariffs') }}</v-sheet>
        <v-sheet>{{ t('footer.menu.education') }}</v-sheet>
        <v-sheet>{{ t('footer.menu.tests') }}</v-sheet>
      </v-sheet>

      <v-sheet class="d-flex flex-column ga-2 text-white">
        <v-sheet>{{ t('footer.menu.news') }}</v-sheet>
        <v-sheet>{{ t('footer.menu.documents') }}</v-sheet>
        <v-sheet>FAQ</v-sheet>
        <v-sheet>{{ t('footer.menu.career') }}</v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
