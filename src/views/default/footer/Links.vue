<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';

  const { mobile } = useDisplay();
  const { t } = useI18n();
</script>

<template>
  <v-sheet
    class="d-flex ga-4 text-white font-small mt-6 pb-6"
    :class="{ 'flex-column': mobile, 'justify-space-between': !mobile }"
  >
    <v-sheet class="d-flex ga-4" :class="{ 'flex-column': mobile }">
      <v-sheet>{{ t('footer.link1') }}</v-sheet>
      <v-sheet>{{ t('footer.link2') }}</v-sheet>
    </v-sheet>
    <v-sheet>{{ t('footer.link3') }}</v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
