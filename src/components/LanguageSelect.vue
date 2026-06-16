<script setup lang="ts">
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  import i18n from '@/utils/i18n.ts';

  interface Language {
    code: 'ru' | 'en';
    name: string;
    flag: string;
  }

  const languages: Language[] = [
    { code: 'ru', name: 'Русский', flag: '/flags/4x3/ru.svg' },
    { code: 'en', name: 'English', flag: '/flags/4x3/gb.svg' }
  ];

  const { locale } = useI18n();

  const currentLanguage = computed(() => {
    return languages.find(lang => lang.code === locale.value) || languages[0];
  });

  const selectLanguage = (code: 'ru' | 'en') => {
    locale.value = code;
    i18n.global.locale.value = code;
    localStorage.setItem('user-locale', code);
  };
</script>

<template>
  <v-menu location="bottom end">
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="text" class="language-select-btn">
        <v-avatar size="24">
          <v-img :src="currentLanguage.flag" :alt="currentLanguage.name" />
        </v-avatar>
        <v-icon icon="mdi-chevron-down" size="small" class="ml-1" />
      </v-btn>
    </template>

    <v-list class="language-list" density="compact">
      <v-list-item
        v-for="lang in languages"
        :key="lang.code"
        :active="lang.code === i18n.global.locale"
        @click="selectLanguage(lang.code)"
      >
        <template #prepend>
          <v-avatar size="20">
            <v-img :src="lang.flag" :alt="lang.name" />
          </v-avatar>
        </template>
        <v-list-item-title>{{ lang.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped lang="scss">
  .language-select-btn {
    padding: 4px 8px;
    min-width: auto;

    :deep(.v-btn__overlay) {
      opacity: 0;
    }
  }

  .language-list {
    min-width: 140px;
  }
</style>
