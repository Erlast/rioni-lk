<script setup lang="ts">
  interface ISocialProps {
    height?: number;
    width?: number;
  }
  withDefaults(defineProps<ISocialProps>(), {
    width: 64,
    height: 64
  });
</script>

<template>
  <a href="https://www.facebook.com/profile.php?id=61554383455994" target="_blank" rel="nofollow">
    <v-img src="/img/social/facebook.png" :height="height" :width="width" />
  </a>
  <a href="https://x.com/RioniCapital" rel="nofollow">
    <v-img src="/img/social/xcorp.png" :height="height" :width="width" />
  </a>
  <a href="https://ge.linkedin.com/in/rioni-capital" rel="nofollow">
    <v-img src="/img/social/linkedin.png" :height="height" :width="width" />
  </a>
  <a href="https://www.youtube.com/@RIONICapital" rel="nofollow">
    <v-img src="/img/social/youtube.png" :height="height" :width="width" />
  </a>
  <a href="https://www.tiktok.com/@rioni_capital" rel="nofollow">
    <v-img src="/img/social/tiktok.png" :height="height" :width="width" />
  </a>
  <a href="https://www.instagram.com/rioni.capital/" rel="nofollow">
    <v-img src="/img/social/instagram.png" :height="height" :width="width" />
  </a>
</template>

<style scoped lang="scss"></style>
