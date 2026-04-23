<script setup lang="ts">
  import HeaderView from '@/views/default/HeaderView.vue';
  import Footer from '@/views/default/FooterView.vue';
  import { useDisplay } from 'vuetify/lib/composables/display';
  import { useAccountStore } from '@/stores/accountStore';
  import { onMounted } from 'vue';

  const { mobile } = useDisplay();
  const accountStore = useAccountStore();
  onMounted(async () => {
    await accountStore.load();
  });
</script>

<template>
    <HeaderView />
    <v-main app>
      <v-sheet class="main-wrapper">
        <v-container
          max-width="1280"
          class="py-12 main-container"
          :class="{ 'px-0 pt-2 pb-0': mobile }"
        >
          <RouterView />
        </v-container>
      </v-sheet>
    </v-main>
    <v-footer class="justify-lg-space-between align-center my-footer">
      <Footer></Footer>
    </v-footer>
</template>
<style lang="scss">
  .main-container {
    background-color: var(--color-MainBackground);
    padding: 1rem 4rem;
  }
  .my-footer {
    box-sizing: border-box;
    padding: 0 !important;
    margin: 0;
    flex-grow: 0;
    padding: 0;
  }
</style>
