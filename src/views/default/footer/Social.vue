<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import SocialItems from '@/views/default/footer/SocialItems.vue';

  const { mobile } = useDisplay();
</script>

<template>
  <v-sheet class="d-flex ga-2" max-width="390" :height="mobile ? 51 : 64">
    <SocialItems />
  </v-sheet>
</template>

<style scoped lang="scss"></style>
