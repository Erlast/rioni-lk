<script setup lang="ts"></script>

<template>
  <div class="invest-test b-section">
    <div class="b-block"><div class="b-block__name">Инвестиционное тестирование</div></div>
    <div class="invest-test-banners">
      <div class="invest-test-banner">
        <div class="invest-test-name">Тест для инвестора</div>
        <div class="invest-test-desc">
          Пройдите тестирование, чтобы определить уровень подготовки и подобрать оптимальный тариф
        </div>
        <div class="tariff-block-desc-btns">
          <div class="tariff-block-desc__btn">Пройти тестирование</div>
          <div class="tariff-block-desc__btn"><v-icon icon="rioni:arrowRightWhiteB"></v-icon></div>
        </div>
      </div>
      <div class="invest-test-banner invest-test-banner-bg">
        <div class="invest-test-name">Тест для инвестора</div>
        <div class="invest-test-desc">
          Пройдите тестирование, чтобы определить уровень подготовки и подобрать оптимальный тариф
        </div>
        <div class="tariff-block-desc-btns">
          <div class="tariff-block-desc__btn">Пройти тестирование</div>
          <div class="tariff-block-desc__btn"><v-icon icon="rioni:arrowRightWhiteB"></v-icon></div>
        </div>
      </div>
      <div class="invest-test-banner">
        <div class="invest-test-name">Тест для инвестора</div>
        <div class="invest-test-desc">
          Пройдите тестирование, чтобы определить уровень подготовки и подобрать оптимальный тариф
        </div>
        <div class="tariff-block-desc-btns">
          <div class="tariff-block-desc__btn">Пройти тестирование</div>
          <div class="tariff-block-desc__btn"><v-icon icon="rioni:arrowRightWhiteB"></v-icon></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .invest-test-banners {
    display: flex;
  }

  .invest-test-banner {
    display: flex;
    margin-right: 20px;
    width: 267px;
    height: 298px;
    flex-direction: column;
    box-sizing: border-box;
    padding: 30px 40px 20px 20px;
    border-radius: 20px;
    background: var(--Backgrounds-light-green, #e7f8f0);
    color: var(--Green-total, #0c342c);
  }
  .invest-test-banner-bg {
    color: var(--Backgrounds-white, #fff);
    font-family: 'Plus Jakarta Sans';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background-image: url('/tmp/banner-profile.png');
  }
  .invest-test-name {
    margin-bottom: 18px;

    font-family: 'Plus Jakarta Sans';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .invest-test-desc {
    font-family: 'Plus Jakarta Sans';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .tariff-block-desc-btns {
    display: flex;
    margin-top: auto;
  }
  .tariff-block-desc__btn {
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 6px 10px;
    margin-right: 8px;
    color: var(--Backgrounds-white, #fff);
    font-family: 'Plus Jakarta Sans';
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border-radius: 20px;
    background: var(--Green-total, #0c342c);
  }
</style>
