<script setup lang="ts">
  import TopMenuElement from '@/components/Header/TopMenuElement.vue';
  import { useI18n } from 'vue-i18n';
  import RioniLogo from '@/components/RioniLogo.vue';

  const { t } = useI18n();

  const menuItem = [
    {
      name: 'portfolio',
      title: t('header.portfolio')
    },
    {
      name: 'market',
      title: t('header.market')
    },
    {
      name: 'pronouns',
      title: t('header.pronouns')
    },
    {
      name: 'reports',
      title: t('header.reports')
    },
    {
      name: 'analitics',
      title: t('header.analitics')
    }
  ];
</script>

<template>
  <div class="menu-prepend d-flex align-center ga-4">
    <div style="width: 180px">
      <v-btn label="" variant="text" :to="{ name: 'portfolio' }" size="default" class="home-logo">
        <template #prepend>
          <RioniLogo />
        </template>
      </v-btn>
    </div>
    <v-sheet class="d-flex align-center bg-transparent top-menu ga-4">
      <TopMenuElement
        v-for="item in menuItem"
        :key="item.name"
        :label="item.title"
        :to="{ name: item.name }"
      />
    </v-sheet>
  </div>
</template>

<style scoped lang="scss">
  div.menu-prepend {
    .home-logo.v-btn {
      background: none;
      margin: 0 !important;
      padding-left: 0;
      height: fit-content;

      :deep(.v-btn__overlay) {
        background: none;
      }
    }
  }
</style>
