<script setup lang="ts">
  import { useDisplay } from 'vuetify';

  const emits = defineEmits(['click']);
  const { mobile } = useDisplay();
</script>

<template>
  <v-icon
    color="hard-blue"
    role="img"
    class="button-close rounded-circle"
    rounded="circle"
    :class="{ 'btn-close-mobile': mobile }"
    style="outline: none"
    @click="emits('click')"
    icon="mdi-close"
  >
  </v-icon>
</template>

<style scoped lang="scss">
  .btn-close:hover {
    cursor: pointer;
  }
</style>
