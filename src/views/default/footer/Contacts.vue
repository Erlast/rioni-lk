<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';

  const { mobile } = useDisplay();
  const { t } = useI18n();
</script>

<template>
  <v-sheet class="d-flex flex-column ga-2">
    <v-sheet v-if="!mobile" class="text-type-text">{{ t('footer.contactsTitle') }}</v-sheet>
    <v-sheet class="d-flex" :class="{ 'flex-column': mobile }">
      <v-sheet class="text-white">+995 595 43 66 55</v-sheet>
      <v-sheet class="text-type-text">{{ t('footer.officePeriod') }}</v-sheet>
    </v-sheet>
  </v-sheet>
  <v-sheet class="footer-bottom-block">
    <v-sheet v-if="!mobile" class="text-type-text">{{ t('footer.emailTitle') }}</v-sheet>
    <v-sheet class="text-white">
      <a href="mailto:clients@rioni-capital.ge">clients@rioni-capital.ge</a>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  a {
    color: white;
  }
</style>
