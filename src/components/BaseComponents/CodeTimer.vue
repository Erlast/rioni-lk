<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  interface IProps {
    // eslint-disable-next-line vue/require-default-prop
    tParam?: string
    showLeadingZero?: boolean
  }

  const { t } = useI18n()

  const props = withDefaults(defineProps<IProps>(), {
    tParam: 'auth.codeDelay',
    showLeadingZero: false
  })
  const modelValue = defineModel<string | number | null>()

  const isActive = ref(false)
  const timerInterval = () =>
    setInterval(() => {
      if (typeof modelValue.value !== 'number') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        modelValue.value = 0
      }
      if (modelValue.value > 0) {
        modelValue.value--
      } else {
        pauseTimer() // Останавливаем таймер, когда он доходит до 0
      }
    }, 1000)

  const formattedTime = computed(() => {
    if (typeof modelValue.value !== 'number') {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      modelValue.value = 0
    }
    //const minutes = Math.floor(modelValue.value / 60)
    const minutes = Math.floor(modelValue.value / 60)
    const seconds = modelValue.value % 60

    if (props.showLeadingZero) {
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    } else {
      // Если минуты равны 0, показываем только секунды
      if (minutes === 0) {
        return `${seconds}`
      } else {
        return `${minutes}:${String(seconds).padStart(2, '0')}`
      }
    }
  })

  const startTimer = () => {
    if (!isActive.value) {
      isActive.value = true
      timerInterval()
    }
  }

  const pauseTimer = () => {
    if (isActive.value) {
      isActive.value = false
      clearInterval(timerInterval())
    }
  }

  onMounted(() => {
    startTimer()
  })

  onUnmounted(() => {
    clearInterval(timerInterval())
  })
</script>

<template>
  <v-sheet>{{ t(tParam, { delay: formattedTime }) }}</v-sheet>
</template>

<style scoped></style>
