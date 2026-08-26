<script setup lang="ts">
  import { useDisplay } from 'vuetify';

  const { mobile } = useDisplay();
</script>

<template>
  <v-sheet class="d-flex ga-6 justify-space-between" :class="{ 'flex-column': mobile }">
    <v-sheet
      class="rounded-40 pa-8 position-relative"
      :width="mobile ? 'auto' : 695"
      height="550"
      style="background-color: var(--color-OceanBlue) !important"
    >
      <v-sheet class="d-flex flex-column ga-6 text-white">
        <v-sheet style="font-size: 62px; line-height: 62px">Страница сейчас недоступна</v-sheet>
        <v-sheet style="font-size: 20px">
          Мы уже знаем о возникшей проблеме и работаем над ее устранением
        </v-sheet>
      </v-sheet>

      <v-sheet class="bg-container position-absolute" width="100%" height="512">
        <v-sheet class="bg-img"></v-sheet>
      </v-sheet>
    </v-sheet>
    <v-sheet class="bg-img2 rounded-40" :width="mobile ? 'auto' : 460" height="550"></v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  .bg-container {
    bottom: 20px;
    left: 0;
    padding: 20px;
  }
  .bg-img {
    background: url('/img/under-construct-bg.png') no-repeat center bottom;
    width: 100%;
    height: 100%;
    background-size: contain;
  }
  .bg-img2 {
    background: url('/img/under-construct-bg3.png') no-repeat center bottom;
    width: 100%;
    height: 100%;
    background-size: cover;
  }
</style>
