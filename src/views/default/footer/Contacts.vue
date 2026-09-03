<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';

  const { mobile } = useDisplay();
  const { t } = useI18n();
</script>

<template>
  <v-sheet class="d-flex flex-column ga-2">
    <v-sheet class="d-flex flex-column ga-2">
      <v-sheet class="text-white">
        Email:
        <a href="mailto:clients@rioni-capital.ge">info@rioni-capital.ge</a>
      </v-sheet>
      <v-sheet class="text-white">Телефон: +995 595 43 66 55</v-sheet>

      <v-sheet>
        <v-sheet class="text-white">Почтовый адрес: {{ t('footer.officePeriod') }}</v-sheet>
        <v-sheet class="text-type-text">{{ t('footer.officeSubtitle') }}</v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  a {
    color: white;
  }
</style>
