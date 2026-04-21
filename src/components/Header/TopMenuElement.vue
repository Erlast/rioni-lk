<script setup lang="ts">
  import { computed } from 'vue';
  import { ITopMenuElementProps } from '@/components/types';
  import { RouteLocationRaw, useRoute } from 'vue-router';

  const route = useRoute();

  const props = withDefaults(defineProps<ITopMenuElementProps>(), {
    label: '',
    state: 'enabled',
    to: undefined
  });
  const disabled = computed(() => {
    return props.to && (route.path.includes(props.to.name) || props.to.name === route.name);
  });
</script>

<template>
  <v-btn
    v-if="state !== undefined"
    :disabled="disabled"
    :active="disabled"
    active-color="white"
    variant="text"
    class="text-none additional-menu top-menu-element"
    size="lg"
    :to="to as RouteLocationRaw"
  >
    {{ label }}
  </v-btn>
</template>

<style scoped lang="scss">
  a[href].top-menu-element {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-radius: 20px;
    height: auto;
    font-size: 14px;

    &:hover {
      text-decoration: none;
    }

    &.v-btn--disabled {
      color: var(--color-BlackBlack);
      opacity: 1;
    }
    &.v-btn--active {
      background-color: var(--color-BackgroundBlue) !important;
    }
  }

  
</style>
