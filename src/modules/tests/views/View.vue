<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import testsService from '@/api/testsService.ts';
  import i18n from '@/utils/i18n.ts';

  const localeMap: Record<string, string> = {
    ge: 'ka-GE'
  };

  const mapLocale = (locale: string) => localeMap[locale] || locale;

  const tests = ref();

  const loadTests = async (locale: string) => {
    const data = await testsService.tests(mapLocale(locale));
    tests.value = data.data;
  };

  const showTest = (id: string) => {
    const res = testsService.test(i18n.global.locale.value, id);
    console.log(res);
  };

  onMounted(() => {
    loadTests(i18n.global.locale.value);
  });

  watch(
    () => i18n.global.locale.value,
    newLocale => {
      loadTests(newLocale);
    }
  );
</script>

<template>
  <v-sheet v-for="test in tests">
    <v-sheet class="border-lg rounded-lg" @click="showTest(test.documentId)">
      {{ test.title }}
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
