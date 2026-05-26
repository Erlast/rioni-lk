<script setup lang="ts">
  import { Scope, TabDef, useTabsStore } from '@/stores/tabsStore';
  import { computed, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Asset } from './types/AssetsTable';
  import { useAssetsStore } from '@/stores/assetsStore';
  import AssetsTab from '@/components/AssetsTab.vue';
  import { useDisplay } from 'vuetify';
  import AssetsTabMobile from '@/components/AssetsTabMobile.vue';
  import { useMediaQuery } from '@vueuse/core';

  const { t, locale } = useI18n();
  const tabsStore = useTabsStore();
  const assetsStore = useAssetsStore();
  const scope: Scope = 'portfolio';
  const { mobile } = useDisplay();
  const landscape = useMediaQuery('(orientation: landscape)');

  const tabs = tabsStore.tabsFor(scope);

  const tab = ref<Asset>('' as Asset);
  const instrumentsMain = computed(() => assetsStore.getAssets);

  type UITab = { name: string; title: string };

  const uiTabs = computed<UITab[]>(() =>
    (locale.value, tabs.value).map((tb: TabDef) => ({
      name: tb.name,
      title: t(tb.titleKey) as string
    }))
  );

  const loadAssets = async () => {
    switch (tab.value) {
      case 'action':
        await assetsStore.portfolioAssetsAction();
        break;
      case 'option':
        await assetsStore.portfolioAssetsOption();
        break;
      case 'obligation':
        await assetsStore.portfolioAssetsObligation();
        break;
      case 'futuries':
        await assetsStore.portfolioAssetsFuturies();
        break;
      case 'currency':
        await assetsStore.portfolioAssetsCurrency();
        break;
    }

    await assetsStore.load();
  };

  watch(
    () => tabs.value,
    (list: TabDef[]) => {
      if (!list.length) {
        return;
      }
      if (!list.some(tb => tb.name === tab.value)) {
        tab.value = list[0].name as Asset;
      }
    },
    { immediate: true }
  );

  watch(
    tab,
    () => {
      loadAssets();
    },
    { immediate: true }
  );
</script>
<template>
  <v-tabs v-model="tab" hide-slider>
    <v-tab
      v-for="tb in uiTabs"
      :key="tb.name"
      :value="tb.name"
      :data-name="tb.name"
      class="tab-center rounded-tt-lg hover-icon text-common"
      selected-class="selected"
      hide-slider
    >
      {{ tb.title }}
    </v-tab>
  </v-tabs>
  <v-tabs-window v-model="tab">
    <v-tabs-window-item
      v-for="tb in tabs"
      :key="tb.name"
      :value="tb.name"
      transition="expand-transition"
      reverse-transition="expand-transition"
    >
      <v-sheet class="instruments-tables">
        <AssetsTab
          v-show="(!mobile || (mobile && landscape)) && instrumentsMain && instrumentsMain.length"
          :current-asset="tab"
          :items="instrumentsMain"
        />
        <AssetsTabMobile
          v-show="mobile && !landscape && instrumentsMain && instrumentsMain.length"
          :current-asset="tab"
          :items="instrumentsMain"
        />
        <v-sheet v-if="mobile && !landscape" class="font-smaller d-flex align-center ga-2 justify-center">
          <v-icon icon="mdi-screen-rotation"></v-icon>
          <span>{{ t('portfolio.rotateTip') }}</span>
        </v-sheet>
        <v-sheet
          v-if="!instrumentsMain.length"
          class="align-center w-100 d-flex align-center justify-center align-self-center rounded-bb-lg empty-table bg-additional-light-grey"
          height="160px"
          data-testid="portfolio-emptyData"
        >
          {{ t('portfolio.emptyData') }}
        </v-sheet>
      </v-sheet>
    </v-tabs-window-item>
  </v-tabs-window>
</template>
<style scoped lang="scss">
  .v-tabs {
    --v-tabs-height: 26px;
  }
  .selected {
    background-color: var(--color-Choosen);
  }

  .v-tab.v-tab.v-btn {
    border-radius: 20px !important;
    min-width: auto !important;
  }

  .v-btn.v-btn--density-default {
    --v-btn-height: 26px;
  }
</style>
