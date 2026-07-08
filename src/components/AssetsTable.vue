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
  import { debounce } from 'lodash-es';

  const { t, locale } = useI18n();
  const tabsStore = useTabsStore();
  const assetsStore = useAssetsStore();
  const scope: Scope = 'portfolio';
  const { mobile } = useDisplay();
  const landscape = useMediaQuery('(orientation: landscape)');

  const tabs = tabsStore.tabsFor(scope);

  const tab = ref<Asset>('' as Asset);
  const instrumentsMain = computed(() => assetsStore.getAssets);
  const search = ref();

  type UITab = { name: string; title: string };

  const uiTabs = computed<UITab[]>(() =>
    (locale.value, tabs.value).map((tb: TabDef) => ({
      name: tb.name,
      title: t(tb.titleKey) as string
    }))
  );

  const onSearch = debounce(() => {
    assetsStore.params.search = search.value;
  }, 100);

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

  const isPaginatorVisible = computed(() => {
    return assetsStore.data.totalPages > 1;
  });

  const changePage = (page: number) => {
    if (page < 1 || page > assetsStore.data.totalPages) {
      return;
    }
    assetsStore.params.page = page;
    loadAssets();
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
  <v-sheet class="d-flex align-center" :class="{ 'justify-space-between': !mobile }">
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
    <v-sheet v-if="!mobile" min-width="250" class="d-flex justify-end">
      <v-text-field
        v-model="search"
        label="Поиск"
        flat
        class="filter-control"
        append-inner-icon="mdi-magnify"
        rounded="xl"
        variant="solo"
        density="compact"
        hide-details
        max-width="200"
        @update:modelValue="onSearch"
      ></v-text-field>
    </v-sheet>
  </v-sheet>

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
        <v-sheet
          v-if="mobile && !landscape"
          class="font-smaller d-flex align-center ga-2 justify-center"
        >
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
  <v-sheet v-if="isPaginatorVisible" class="d-flex justify-end ga-1 align-center">
    <v-sheet
      class="rounded-circle bg-main d-flex align-center justify-center"
      :class="{ 'cursor-pointer': assetsStore.data.page > 1 }"
      height="30"
      width="30"
      @click="changePage(assetsStore.data.page - 1)"
    >
      <v-icon icon="mdi-chevron-left" :disabled="assetsStore.data.page === 1" />
    </v-sheet>
    <v-sheet class="d-flex justify-space-between align-center px-4 bg-main rounded-xl" height="30">
      <v-sheet
        v-for="page in assetsStore.data.totalPages"
        :key="page"
        class="rounded-ml d-flex justify-center align-center cursor-pointer"
        :class="{ 'bg-element text-white': page === assetsStore.data.page }"
        width="30"
        height="30"
        @click="changePage(page)"
      >
        {{ page }}
      </v-sheet>
    </v-sheet>
    <v-sheet
      class="rounded-circle bg-main d-flex align-center justify-center"
      :class="{ 'cursor-pointer': assetsStore.data.page < assetsStore.data.totalPages }"
      height="30"
      width="30"
      @click="changePage(assetsStore.data.page + 1)"
    >
      <v-icon
        icon="mdi-chevron-right"
        :disabled="assetsStore.data.page === assetsStore.data.totalPages"
      />
    </v-sheet>
  </v-sheet>
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

  .v-input {
    :deep(.v-field__input) {
      min-height: 30px !important;
    }
    &.v-input--density-compact {
      :deep(.v-field--variant-solo) {
        --v-input-control-height: 30px !important;
      }
    }
  }
</style>
