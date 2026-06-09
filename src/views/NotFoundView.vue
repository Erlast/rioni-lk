<script setup lang="ts">
  import RioniLogo from '@/components/RioniLogo.vue';

  const moveToSite = () => {
    window.location.href = 'https://rioni.ru'
  }
</script>

<template>
  <v-sheet class="w-100 body" data-testid="not-found">
    <div class="position-relative d-flex w-100 h-100 justify-center flex-wrap align-center">
      <v-sheet class="w-98"></v-sheet>
      <v-sheet
        class="not-found-container w-98 d-flex pa-6 overflow-hidden flex-column justify-start align-center ga-2 rounded-2lg"
      >
        <v-sheet class="align-stretch flex-column justify-start align-start ga-6 d-flex">
          <RioniLogo class-name="position-relative" />
          <v-sheet class="align-stretch text-center title-promo">404</v-sheet>
          <v-sheet class="align-stretch text-center title-h2">СТРАНИЦА НЕ НАЙДЕНА</v-sheet>
        </v-sheet>
        <v-sheet class="align-stretch flex-column justify-start align-start ga-4 d-flex">
          <v-sheet class="align-stretch text-center body-b1">
            К сожалению, что-то пошло не так и запрашиваемая вами страница не найдена.
          </v-sheet>
          <v-sheet class="align-stretch justify-start align-start ga-3 d-flex">
            <v-btn
              width="100%"
              label="Личный кабинет"
              @click="$router.push({ name: 'portfolio' })"
            ></v-btn>
          </v-sheet>
          <v-sheet class="align-stretch text-center body-b1">или</v-sheet>
          <v-sheet class="align-stretch justify-start align-start ga-3 d-flex">
            <v-btn
              width="100%"
              variant="outlined"
              label="На главную страницу сайта"
              @click="moveToSite"
            ></v-btn>
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </div>
  </v-sheet>
</template>

<style scoped lang="scss">
  .body {
    //background-image: url('/img/corporate.jpg');
    //background-size: cover;
    //background-repeat: no-repeat;
    height: 100vh;
   // background-position: center;
  }
  .w-98 {
    width: 392px;
  }
  .not-found-container {
    &.v-theme--myCustomLightTheme {
      background-color: var(--color-WhiteSurface) !important;
    }

    &.v-theme--myCustomDarkTheme {
      background-color: var(--color-BlackSurface) !important;
    }
  }
</style>
