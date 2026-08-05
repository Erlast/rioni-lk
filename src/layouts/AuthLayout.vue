<script setup lang="ts">
  import RioniLogo from '@/components/RioniLogo.vue';
  import LanguageSelect from '@/components/LanguageSelect.vue';
  import { useDisplay } from 'vuetify';

  const { mobile } = useDisplay();
</script>
<template>
  <v-sheet
    class="d-flex justify-end align-center pa-4"
    style="background-color: var(--color-Choosen) !important"
  >
    <v-sheet
      v-if="mobile"
      class="position-absolute d-flex align-center justify-space-between w-100 px-8"
      height="46"
      :class="{ 'mt-3': mobile }"
    >
      <RioniLogo />
    </v-sheet>
    <LanguageSelect />
  </v-sheet>

  <div
    :class="['d-flex', 'align-center', 'justify-center', 'bg-image']"
    style="height: calc(100vh - 68px); background-color: var(--color-Choosen) !important"
  >
    <v-card
      :width="mobile ? '100%' : 760"
      height="520"
      class="elevation-0 rounded-xxl"
      style="background-color: white !important"
    >
      <v-card-text class="pa-0 h-100">
        <RouterView />
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped lang="scss"></style>
