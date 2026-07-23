<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';

  const props = defineProps<{
    totalPages: number;
    modelValue?: number;
  }>();
  const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void;
  }>();
  const page = ref<number>(1);

  const updateModelValue = (currentValue: number) => {
    if (currentValue < 1 || currentValue > props.totalPages) {
      return;
    }
    page.value = currentValue;
    emit('update:modelValue', currentValue);
  };

  onMounted(() => {
    if (props.modelValue) {
      page.value = props.modelValue;
    }
  });

  watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal && newVal !== page.value) {
        page.value = newVal;
      }
    },
  );
</script>

<template>
  <v-sheet class="d-flex justify-end ga-1 align-center">
    <v-sheet
      class="rounded-circle bg-main d-flex align-center justify-center"
      :class="{ 'cursor-pointer': page > 1 }"
      height="30"
      width="30"
      @click="updateModelValue(page - 1)"
    >
      <v-icon icon="mdi-chevron-left" :disabled="page === 1" />
    </v-sheet>
    <v-sheet class="d-flex justify-space-between align-center px-4 bg-main rounded-xl" height="30">
      <v-sheet
        v-for="pg in totalPages"
        :key="pg"
        class="rounded-ml d-flex justify-center align-center cursor-pointer"
        :class="{ 'bg-element text-white': pg === page }"
        width="30"
        height="30"
        @click="updateModelValue(pg)"
      >
        {{ pg }}
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="rounded-circle bg-main d-flex align-center justify-center"
      :class="{ 'cursor-pointer': page < totalPages }"
      height="30"
      width="30"
      @click="updateModelValue(page + 1)"
    >
      <v-icon icon="mdi-chevron-right" :disabled="page === totalPages" />
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
