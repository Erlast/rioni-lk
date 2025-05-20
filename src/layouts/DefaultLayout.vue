<script setup lang="ts">
  import Header from '@/views/default/HeaderView.vue'
  import Footer from '@/views/default/FooterView.vue'
</script>

<template>
  <v-app>
    <v-container>
      <Header></Header>
      <RouterView />
      <Footer></Footer>
    </v-container>
  </v-app>
</template>
<style scoped lang="scss"></style>
