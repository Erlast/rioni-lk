<script setup lang="ts"></script>

<template>
  <div class="banner b-section">
    <div class="banner-bg">
      <div class="banner-bg__name">Узнай как инвестировать</div>
      <div class="banner-bg__desc">
        Тут можно разместить банер с рекламой продукта/услгуи и подобного
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .banner {
    margin-bottom: 30px;
  }

  .banner-bg {
    padding: 50px;
    width: 932px;
    height: 222px;
    box-sizing: border-box;
    background-image: url('/tmp/banner-port.png');
  }

  .banner-bg__name {
    color: var(--Backgrounds-white, #fff);
    margin-bottom: 30px;
    font-family: 'Plus Jakarta Sans';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .banner-bg__desc {
    width: 300px;
    color: var(--Backgrounds-white, #fff);
    font-family: 'Plus Jakarta Sans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
</style>
