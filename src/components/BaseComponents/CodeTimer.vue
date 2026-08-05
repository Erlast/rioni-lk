<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  interface IProps {
    // eslint-disable-next-line vue/require-default-prop
    tParam?: string;
    showLeadingZero?: boolean;
  }

  const { t } = useI18n();

  const props = withDefaults(defineProps<IProps>(), {
    tParam: 'auth.codeDelay',
    showLeadingZero: false
  });
  const modelValue = defineModel<string | number | null>();

  const isActive = ref(false);
  const timerId = ref<ReturnType<typeof setInterval> | null>(null);

  const startInterval = () => {
    if (timerId.value !== null) return;
    timerId.value = setInterval(() => {
      if (typeof modelValue.value !== 'number') {
        modelValue.value = 0;
      }
      if (modelValue.value > 0) {
        modelValue.value--;
      } else {
        pauseTimer();
      }
    }, 1000);
  };

  const clearTimer = () => {
    if (timerId.value !== null) {
      clearInterval(timerId.value);
      timerId.value = null;
    }
  };

  const formattedTime = computed(() => {
    if (typeof modelValue.value !== 'number') {
      modelValue.value = 0;
    }
    const minutes = Math.floor(modelValue.value / 60);
    const seconds = modelValue.value % 60;

    if (props.showLeadingZero) {
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    } else {
      if (minutes === 0) {
        return `${seconds}`;
      } else {
        return `${minutes}:${String(seconds).padStart(2, '0')}`;
      }
    }
  });

  const startTimer = () => {
    if (!isActive.value) {
      isActive.value = true;
      startInterval();
    }
  };

  const pauseTimer = () => {
    if (isActive.value) {
      isActive.value = false;
      clearTimer();
    }
  };

  onMounted(() => {
    startTimer();
  });

  onUnmounted(() => {
    clearTimer();
  });
</script>

<template>
  <v-sheet>
    {{ t('auth.codeDelayPrepend') }}
    <span class="text-additional-link">{{ t(tParam, { delay: formattedTime }) }}</span>
  </v-sheet>
</template>

<style scoped></style>
