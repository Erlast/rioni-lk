<script setup lang="ts">
  import Social from '@/views/default/footer/Social.vue';
  import Contacts from '@/views/default/footer/Contacts.vue';
  import Feedback from '@/views/default/footer/Feedback.vue';
  import BigText from '@/views/default/footer/BigText.vue';
  import Links from '@/views/default/footer/Links.vue';
  import Menu from '@/views/default/footer/Menu.vue';
  import { onMounted, watch } from 'vue';
  import { useFooterStore } from '@/stores/footerStore.ts';
  import i18n from '@/utils/i18n.ts';
  import { mapLocale } from '@/utils/data.ts';

  const footerStore = useFooterStore();

  watch(
    () => i18n.global.locale.value,
    newLocale => {
      footerStore.locale = mapLocale(newLocale);
      footerStore.lastUpdated = null;
      footerStore.fetchFooter()
    }
  );

  onMounted(async () => {
    await footerStore.fetchFooter();
  });
</script>
<template>
  <v-container class="pa-0" max-width="1280">
    <v-sheet class="footer">
      <v-sheet class="d-flex flex-column ga-2">
        <v-sheet class="d-flex ga-6 pb-6">
          <v-sheet width="50%">
            <v-sheet class="footer-top__logo" />
          </v-sheet>
          <Social />
        </v-sheet>
        <v-sheet class="d-flex ga-6 pt-6">
          <v-sheet width="50%">
            <Menu />
          </v-sheet>
          <v-sheet class="d-flex flex-column ga-4" width="50%">
            <Contacts />

            <Feedback />
          </v-sheet>
        </v-sheet>
      </v-sheet>
      <BigText />
      <Links />
    </v-sheet>
  </v-container>
</template>
<style scoped lang="scss">
  .footer {
    padding: 34px 70px 0 70px;
    background-image: url('/img/footer-bg.png');
  }

  .footer-top__logo {
    width: 170px;
    height: 64px;
    background-image: url('/img/footer-logo.png');
  }
</style>
