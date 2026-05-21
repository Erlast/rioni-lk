<script setup lang="ts">
  import Social from '@/views/default/footer/Social.vue';
  import Contacts from '@/views/default/footer/Contacts.vue';
  import Feedback from '@/views/default/footer/Feedback.vue';
  import BigText from '@/views/default/footer/BigText.vue';
  import Links from '@/views/default/footer/Links.vue';
  import Menu from '@/views/default/footer/Menu.vue';
</script>

<template>
  <v-container class="pa-0" max-width="1280">
    <v-sheet class="footer pa-10">
      <v-sheet class="d-flex flex-column ga-4">
        <v-sheet class="footer-top__logo"></v-sheet>

        <Contacts />

        <Menu />

        <Social :width="51" height="51" />
      </v-sheet>
      <Feedback />
      <BigText />
      <Links />
    </v-sheet>
  </v-container>
</template>

<style scoped lang="scss">
  .footer {
    background-image: url('/img/footer-mobile-bg.png');
    background-size: cover;
  }
  .footer-top__logo {
    width: 170px;
    height: 64px;
    background-image: url('/img/footer-logo.png');
  }
</style>
