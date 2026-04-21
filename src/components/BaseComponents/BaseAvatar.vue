<script setup lang="ts">
  import { computed } from 'vue'

  const defaultImage =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAONJREFUeF7t20EOhEAIRFG4/6F7DvEnYeFzryQIv6pBd2behOu9dPvsbog+k+NLgArQAqmJcw9iAAhSgZKB3IJkkAySQTJ4CiE+gA8oBeg0mH3Ai084P89HhqwEqIA209ICsQdjAeaZIgaAYKxBDMCAYy8fXwAIgiAIcoJpJEYGI4VjB3YrbC9gL2AvkCB43cM5PgZgAAZgQFnNZAhdGykQBEEQBEEQDBmgAm2glM/z+QUYisYUGoldO7kY32IEAzCg6RgIRgjFAsw+AgRBMNYgBmCAT2TCYfoPPz/HCqQCX1eBHzHnv7C7WhBSAAAAAElFTkSuQmCC'
  const { fullName } = defineProps({
    fullName: {
      type: String,
      default: ''
    }
  })
  const firstSymbol = computed(() => {
    if (fullName === '') {
      return ''
    }
    return fullName.split(' ')[0][0]
  })
  const secondSymbol = computed(() => {
    if (fullName === '') {
      return ''
    }
    const splitted = fullName.split(' ')

    if (splitted.length <= 1) {
      return ''
    }
    return splitted[1][0]
  })
</script>

<template>
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <circle cx="24" cy="24" r="24" fill="url(#pattern0_21_1984)" />
    <circle cx="24" cy="24" r="23" stroke="black" stroke-opacity="0.38" stroke-width="2" />
    <defs v-if="fullName === ''">
      <pattern id="pattern0_21_1984" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlink:href="#image0_21_1984" transform="scale(0.015625)" />
      </pattern>
      <image id="image0_21_1984" width="64" height="64" :xlink:href="defaultImage" />
    </defs>
    <rect v-if="fullName !== ''" width="48" height="48" rx="24" fill="#696CEC" />
    <text
      v-if="fullName !== ''"
      x="10"
      y="30"
      font-family="Onset"
      font-size="18"
      fill="white"
    >
      {{ firstSymbol }}
    </text>
    <text
      v-if="fullName !== ''"
      x="24"
      y="30"
      font-family="Onset"
      font-size="18"
      fill="white"
    >
      {{ secondSymbol }}
    </text>
  </svg>
</template>
