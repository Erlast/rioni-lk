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
    rounded="lg"
    max-width="48"
    max-height="48"
    class="img-zoom"
    :src="logo"
    lazy-src="/img/no-img.png"
    :alt="ticker + paperType"
  />
</template>

<style scoped lang="scss">
  .logo-disabled {
    filter: grayscale(100%) opacity(0.8);
    transition: all 0.2s ease;
  }
</style>
