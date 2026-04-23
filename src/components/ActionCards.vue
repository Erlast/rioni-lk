<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  interface IActionCardsProps {
    thirdCardBg: string;
    actionTitles: string[];
  }
  const { t } = useI18n();
  const emit = defineEmits(['click-card']);
  const props = defineProps<IActionCardsProps>();
</script>
<template>
  <v-sheet class="d-flex ga-2">
    <v-sheet class="action-card d-flex position-relative action-inside-block-bg-1 pa-4 rounded-mr">
      <v-sheet class="text-white">{{ t(actionTitles[0]) }}</v-sheet>
      <v-sheet @click="emit('click-card', 1)">
        <v-sheet class="position-absolute top-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="74"
            height="70"
            viewBox="0 0 74 70"
            fill="none"
          >
            <circle cx="53" cy="17" r="52" stroke="white" stroke-width="2" />
          </svg>
        </v-sheet>
        <v-sheet class="position-absolute top-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="51"
            height="47"
            viewBox="0 0 51 47"
            fill="none"
          >
            <circle cx="30" cy="17" r="29" stroke="white" stroke-width="2" />
          </svg>
        </v-sheet>
        <v-sheet class="action-arrow position-absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
          >
            <path
              d="M16.7071 8.07136C17.0976 7.68084 17.0976 7.04768 16.7071 6.65715L10.3431 0.29319C9.95262 -0.0973344 9.31946 -0.0973344 8.92893 0.29319C8.53841 0.683714 8.53841 1.31688 8.92893 1.7074L14.5858 7.36426L8.92893 13.0211C8.53841 13.4116 8.53841 14.0448 8.92893 14.4353C9.31946 14.8259 9.95262 14.8259 10.3431 14.4353L16.7071 8.07136ZM0 7.36426V8.36426H16V7.36426V6.36426H0V7.36426Z"
              fill="white"
            />
          </svg>
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <v-sheet class="action-card d-flex position-relative action-inside-block-bg-2 pa-4 rounded-mr">
      <v-sheet class="text-white">{{ t(actionTitles[1]) }}</v-sheet>
      <v-sheet @click="emit('click-card', 2)">
        <v-sheet class="position-absolute top-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="51"
            height="47"
            viewBox="0 0 51 47"
            fill="none"
          >
            <circle cx="30" cy="17" r="29" stroke="white" stroke-width="2" />
          </svg>
        </v-sheet>
        <v-sheet class="action-arrow position-absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
          >
            <path
              d="M16.7071 8.07136C17.0976 7.68084 17.0976 7.04768 16.7071 6.65715L10.3431 0.29319C9.95262 -0.0973344 9.31946 -0.0973344 8.92893 0.29319C8.53841 0.683714 8.53841 1.31688 8.92893 1.7074L14.5858 7.36426L8.92893 13.0211C8.53841 13.4116 8.53841 14.0448 8.92893 14.4353C9.31946 14.8259 9.95262 14.8259 10.3431 14.4353L16.7071 8.07136ZM0 7.36426V8.36426H16V7.36426V6.36426H0V7.36426Z"
              fill="white"
            />
          </svg>
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="action-card d-flex position-relative action-inside-block-bg-3 pa-4 rounded-mr"
      :style="`background: url(${props.thirdCardBg});`"
    >
      <v-sheet class="text-white">{{ t(actionTitles[2]) }}</v-sheet>
      <v-sheet>
        <v-sheet class="position-absolute top-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="51"
            height="47"
            viewBox="0 0 51 47"
            fill="none"
          >
            <circle cx="30" cy="17" r="29" stroke="white" stroke-width="2" />
          </svg>
        </v-sheet>
        <v-sheet class="action-arrow position-absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="15"
            viewBox="0 0 17 15"
            fill="none"
          >
            <path
              d="M16.7071 8.07136C17.0976 7.68084 17.0976 7.04768 16.7071 6.65715L10.3431 0.29319C9.95262 -0.0973344 9.31946 -0.0973344 8.92893 0.29319C8.53841 0.683714 8.53841 1.31688 8.92893 1.7074L14.5858 7.36426L8.92893 13.0211C8.53841 13.4116 8.53841 14.0448 8.92893 14.4353C9.31946 14.8259 9.95262 14.8259 10.3431 14.4353L16.7071 8.07136ZM0 7.36426V8.36426H16V7.36426V6.36426H0V7.36426Z"
              fill="white"
            />
          </svg>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  .action-card {
    width: 33%;
    height: 140px;
    :hover circle {
      fill: red;
      border-radius: 0px 16px 0px 0px;
    }

    &.action-inside-block-bg-1 {
      background: linear-gradient(67deg, #103673 40.45%, #4a77c1 81.54%) !important;
    }
    &.action-inside-block-bg-2 {
      background-color: var(--color-Element) !important;
    }
    &.action-inside-block-bg-3 {
      background-size: contain;
      background-repeat: no-repeat;
    }

    .action-arrow {
      top: 6px;
      right: 12px;
    }
  }
</style>
