<script setup lang="ts">
  import { useDisplay, useTheme } from 'vuetify'

  const emits = defineEmits(['click'])
  const { mobile } = useDisplay()
</script>

<template>
  <v-icon
    role="img"
    class="btn-close elevation-01-dp"
    :class="{ 'btn-close-mobile': mobile }"
    style="outline: none"
    @click="emits('click')"
  >
    <v-icon icon="mdi-close" color="black" />
  </v-icon>
</template>

<style scoped lang="scss">
  .btn-close:hover {
    cursor: pointer;
  }
</style>
