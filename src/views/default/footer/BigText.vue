<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import dayjs from 'dayjs';
  import { useFooterStore } from '@/stores/footerStore.ts';

  const footerStore = useFooterStore();
</script>

<template>
  <v-sheet class="mt-6 text-big" style="line-height: 1">
    <span class="text-white font-8" style="white-space: pre-line">{{ footerStore.footer_text }} {{ dayjs().year() }}</span>
  </v-sheet>
</template>

<style scoped lang="scss">
  .text-big {
    padding: 10px 0;
    border-bottom: 1px solid var(--color-LightGrey);
    border-top: 1px solid var(--color-LightGrey);
  }
</style>
