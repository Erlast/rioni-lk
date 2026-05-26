<script setup lang="ts">
  import { ref } from 'vue';
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';

  const tag = ref('full');
  const { mobile } = useDisplay();
  const { t } = useI18n();
  const tags = [
    {
      value: 'full',
      name: t('reports.tags.full')
    },
    {
      value: 'full',
      name: t('reports.tags.short')
    }
  ];
</script>

<template>
  <v-sheet class="d-flex flex-column ga-4 mt-6">
    <v-sheet
      class="d-flex ga-2 align-center pa-2 rounded-mr"
      style="background-color: white !important"
    >
      <v-sheet>{{ t('reports.reportTypes.broker') }}</v-sheet>
      <v-icon icon="mdi-chevron-up"></v-icon>
    </v-sheet>
    <v-sheet class="d-flex ga-2 flex-column">
      <v-sheet class="d-flex align-center justify-space-between">
        <v-sheet class="d-flex ga-2 align-center">
          <v-btn v-if="!mobile" variant="flat" rounded="mr" class="btn-custom">
            {{ t('reports.period.today') }}
          </v-btn>

          <v-icon icon="mdi-calendar-blank-outline" />
          <v-icon v-if="!mobile" icon="mdi-chevron-left" />
          <v-icon v-if="!mobile" icon="mdi-chevron-right" />

          <v-sheet>{{ t('reports.period.custom') }}</v-sheet>
        </v-sheet>

        <v-sheet class="d-flex ga-2 align-center">
          <span class="fi fi-ru rounded-circle" />
          <span>RU</span>
          <v-icon icon="mdi-chevron-down"></v-icon>
        </v-sheet>
      </v-sheet>

      <v-sheet
        class="d-flex"
        :class="{ 'flex-column ga-2': mobile, 'justify-space-between': !mobile }"
      >
        <v-sheet class="d-flex ga-2 align-center">
          <v-chip-group
            v-model="tag"
            variant="flat"
            selected-class="timeframe-selected bg-element text-white"
            class="pa-0"
            mandatory
          >
            <v-chip
              v-for="(item, idx) in tags"
              :key="idx"
              :value="item.value"
              size="compact"
              variant="flat"
              class="px-4 py-1 font-smaller bg-transparent ma-0"
            >
              {{ item.name }}
            </v-chip>
          </v-chip-group>
        </v-sheet>

        <v-sheet>
          <v-btn variant="flat" rounded="mr" :block="mobile" class="btn-custom-2">
            {{ t('reports.reportBtn') }}
          </v-btn>
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="d-flex align-center flex-column rounded-mg"
      style="background-color: white !important"
      height="244"
    >
      <v-sheet height="135" style="padding-top: 75px">
        <v-icon icon="mdi-folder-open-outline" class="opacity-10" color="dark-blue" />
      </v-sheet>
      <v-sheet class="color-dark-blue opacity-10">{{ t('reports.noReportText') }}</v-sheet>
    </v-sheet>
  </v-sheet>
</template>
<style scoped lang="scss">
  .btn-custom {
    background: var(--color-LightGreen);
  }

  .btn-custom-2 {
    background: var(--color-MiddleBlue);
    color: white;
  }

  .mdi-folder-open-outline:before {
    font-size: 135px;
  }
</style>
