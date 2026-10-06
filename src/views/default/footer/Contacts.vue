<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useFooterStore } from '@/stores/footerStore.ts';

  const { t } = useI18n();
  const footerStore = useFooterStore();
</script>

<template>
  <v-sheet class="d-flex flex-column ga-2">
    <v-sheet class="d-flex flex-column ga-2">
      <v-sheet class="text-white">
        Email:
        <a href="mailto:clients@rioni-capital.ge">{{ footerStore.email }}</a>
      </v-sheet>
      <v-sheet class="text-white">{{ t('footer.phone') }}: {{footerStore.phone_number}}</v-sheet>

      <v-sheet>
        <v-sheet class="text-white">
          {{ t('footer.postalAddress') }}: {{ footerStore.post_address?.name }}
        </v-sheet>
        <v-sheet class="text-type-text">{{ footerStore.post_address?.subtitle }}</v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  a {
    color: white;
  }
</style>
