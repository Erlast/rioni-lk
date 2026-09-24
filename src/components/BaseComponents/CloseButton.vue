<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import { computed } from 'vue';

  const props = withDefaults(
    defineProps<{
      className?: string;
      color?: string;
    }>(),
    {
      className: '',
      color: 'hard-blue'
    }
  );

  const classComputed = computed(() => {
    return [`${props.className} rounded-circle`, { 'btn-close-mobile': mobile.value }];
  });
  const emits = defineEmits(['click']);
  const { mobile } = useDisplay();
</script>

<template>
  <v-icon
    :color="color"
    role="img"
    :class="classComputed"
    rounded="circle"
    style="outline: none"
    @click="emits('click')"
    icon="mdi-close"
  ></v-icon>
</template>

<style scoped lang="scss">
  .btn-close:hover {
    cursor: pointer;
  }
</style>
