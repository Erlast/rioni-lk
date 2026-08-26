<script setup lang="ts">
  import HeaderView from '@/views/default/HeaderView.vue';
  import Footer from '@/views/default/FooterView.vue';
  import { useDisplay } from 'vuetify/lib/composables/display';
  import { useAccountStore } from '@/stores/accountStore';
  import { onMounted } from 'vue';
  import HeaderMobileView from '@/views/default/HeaderMobileView.vue';
  import FooterMobileView from '@/views/default/FooterMobileView.vue';
  import { useMediaQuery } from '@vueuse/core';
  import { useRoute } from 'vue-router';
  import AccountConfirm from '@/components/AccountConfirm/Index.vue';

  const { mobile } = useDisplay();
  const accountStore = useAccountStore();
  const landscape = useMediaQuery('(orientation: landscape)');
  const route = useRoute();
  onMounted(async () => {
    await accountStore.load();
  });
</script>

<template>
  <AccountConfirm />
  <HeaderMobileView v-if="mobile && !landscape" />
  <HeaderView v-if="!mobile" />
  x
  <v-main app>
    <v-sheet class="main-wrapper">
      <v-container
        max-width="1280"
        class="py-12 main-container"
        :class="{ 'px-4': mobile, 'px-12': !mobile }"
        :style="route.name === 'pronouns' ? 'background-color:white !important;' : ''"
      >
        <RouterView />
      </v-container>
    </v-sheet>
  </v-main>
  <v-footer class="justify-lg-space-between align-center my-footer">
    <FooterMobileView v-if="mobile && !landscape" />
    <Footer v-if="!mobile"></Footer>
  </v-footer>
</template>
<style lang="scss">
  .main-container {
    background-color: var(--color-MainBackground);
  }
  .my-footer {
    box-sizing: border-box;
    padding: 0 !important;
    margin: 0;
    flex-grow: 0;
    padding: 0;
  }
</style>
