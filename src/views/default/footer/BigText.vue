<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import dayjs from 'dayjs';

  const { t } = useI18n();
</script>

<template>
  <v-sheet class="mt-6 text-big" style="line-height: 1">
    <span class="text-white font-8">
      {{ t('footer.bigText1') }}
      <br />
      {{ t('footer.bigText2') }}
      <br />
      {{ t('footer.bigText3', { year: dayjs().year() }) }}
    </span>
  </v-sheet>
</template>

<style scoped lang="scss">
  .text-big {
    padding: 10px 0;
    border-bottom: 1px solid var(--color-LightGrey);
    border-top: 1px solid var(--color-LightGrey);
  }
</style>
