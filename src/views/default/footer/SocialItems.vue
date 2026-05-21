<script setup lang="ts">
  import { useDisplay } from 'vuetify';

  interface ISocialProps {
    height?: number;
    width?: number;
  }
  const { mobile } = useDisplay();
  const props = withDefaults(defineProps<ISocialProps>(), {
    width: 64,
    height: 64
  });
</script>

<template>
  <v-img src="/img/social/facebook.png" :height="height" :width="width" />
  <v-img src="/img/social/xcorp.png" :height="height" :width="width" />
  <v-img src="/img/social/linkedin.png" :height="height" :width="width" />
  <v-img src="/img/social/youtube.png" :height="height" :width="width" />
  <v-img src="/img/social/tiktok.png" :height="height" :width="width" />
  <v-img src="/img/social/instagram.png" :height="height" :width="width" />
</template>

<style scoped lang="scss"></style>
