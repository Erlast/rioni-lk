<script setup lang="ts">
  import TopMenuPrepend from '@/components/Header/TopMenuPrepend.vue';
  import TopMenuAppend from '@/components/Header/TopMenuAppend.vue';
</script>
<template>
  <v-app-bar
    height="80"
    :elevation="0"
    class="d-flex d-flex justify-lg-space-between align-center main-menu"
  >
    <template #prepend>
      <TopMenuPrepend />
    </template>
    <template #append>
      <TopMenuAppend />
    </template>
  </v-app-bar>
</template>

<style scoped lang="scss">
  .main-menu {
    box-sizing: border-box;
    //backdrop-filter: blur(50px);
    z-index: 2000 !important;

    :deep(.v-toolbar__content) {
      padding: 1rem 4rem;
      justify-content: space-between;
      max-width: 1280px;
    }

    :deep(.v-toolbar__prepend) {
      margin: 0;
    }

    :deep(.v-toolbar__append) {
      margin: 0;
    }
  }
</style>
