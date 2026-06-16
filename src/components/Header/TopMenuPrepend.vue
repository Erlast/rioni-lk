<script setup lang="ts">
  import TopMenuElement from '@/components/Header/TopMenuElement.vue';
  import RioniLogo from '@/components/RioniLogo.vue';
  import { menuItem } from '@/utils/data.ts';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const menu = computed(() => {
    return menuItem.map(item => ({
      ...item,
      title: t(item.title)
    }));
  });
</script>

<template>
  <v-sheet class="menu-prepend d-flex align-center ga-4">
    <div style="width: 180px">
      <v-btn label="" variant="text" :to="{ name: 'portfolio' }" size="default" class="home-logo">
        <template #prepend>
          <RioniLogo />
        </template>
      </v-btn>
    </div>
    <v-sheet class="d-flex align-center bg-transparent top-menu ga-4">
      <TopMenuElement
        v-for="item in menu"
        :key="item.name"
        :label="item.title"
        :to="{ name: item.name }"
      />
    </v-sheet>
  </v-sheet>
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
