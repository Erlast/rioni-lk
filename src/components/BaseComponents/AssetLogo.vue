<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      paperId: number;
      ticker: string;
      logo: string;
      paperType?: number;
      active?: boolean;
    }>(),
    {
      paperType: undefined,
      active: true
    }
  );
</script>

<template>
  <v-img
    max-width="36"
    max-height="36"
    class="img-zoom"
    :src="logo ?? null"
    lazy-src="/img/no-img.png"
    :alt="ticker + paperType"
  />
</template>

<style scoped lang="scss">
  .img-zoom {
    border-radius: 50%;
  }
  .logo-disabled {
    filter: grayscale(100%) opacity(0.8);
    transition: all 0.2s ease;
  }
</style>
