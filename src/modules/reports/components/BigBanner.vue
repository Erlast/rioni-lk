<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import GlossaryText from '@/components/GlossaryText.vue';

  const { t } = useI18n();
</script>

<template>
  <v-sheet class="banner-content d-flex pa-8 text-white" rounded="xxl" min-height="230">
    <v-sheet class="d-flex flex-column justify-end ga-2">
      <v-sheet class="font-20 font-semibold">{{ t('reports.banner.title') }}</v-sheet>
      <v-sheet max-width="350">
        <GlossaryText :text="t('reports.banner.subtitle')" />
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>
<style scoped lang="scss">
  .banner-content {
    background-image: url('/tmp/big-banner.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
