<script setup lang="ts">
  withDefaults(
    defineProps<{
      color?: string;
      size?: number | string;
      width?: number | string;
    }>(),
    {
      color: 'middle-blue',
      size: 48,
      width: '100%'
    }
  );
</script>

<template>
  <v-sheet
    class="base-loader-overlay d-flex align-center justify-center"
    :width="width"
  >
    <v-progress-circular indeterminate :size="size" :color="color" />
  </v-sheet>
</template>

<style scoped lang="scss">
  .base-loader-overlay {
    position: absolute;
    inset: 0;
    z-index: 10;
    backdrop-filter: blur(8px);
    background-color: rgba(255, 255, 255, 0.35);
  }
</style>
