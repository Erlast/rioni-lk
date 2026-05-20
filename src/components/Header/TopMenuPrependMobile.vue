<script setup lang="ts">
  import RioniLogo from '@/components/RioniLogo.vue';
  import { useDisplay } from 'vuetify';
  const { mobile } = useDisplay();
</script>

<template>
  <v-sheet class="menu-prepend d-flex align-center ga-4">
    <v-sheet :width="mobile ? 'auto' : 180">
      <v-btn label="" variant="text" :to="{ name: 'portfolio' }" size="default" class="home-logo">
        <template #prepend>
          <RioniLogo />
        </template>
      </v-btn>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  .menu-prepend {
    .home-logo.v-btn {
      background: none;
      margin: 0 !important;
      height: fit-content;

      :deep(.v-btn__overlay) {
        background: none;
      }
    }
  }
</style>
