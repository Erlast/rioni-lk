<script setup lang="ts"></script>

<template>
  <div class="tariff b-section">
    <div class="b-block"><div class="b-block__name">Тарифный план</div></div>
    <div class="tariff-block">
      <div class="tariff-block-desc">
        <div class="tariff-block-desc-active">активен</div>
        <div class="tariff-block-desc-name">Стандарт</div>
        <div class="tariff-block-desc-currency">ХХ$/месяц</div>
        <div class="tariff-block-desc-date">действует до 20.05.2025</div>
        <div class="tariff-block-desc-btns">
          <div class="tariff-block-desc__btn">Управление тарифом</div>
          <div class="tariff-block-desc__btn"><v-icon icon="rioni:arrowRightWhite"></v-icon></div>
        </div>
      </div>
      <div class="tariff-block-list">
        <div class="tariff-block-list-li">
          <div class="aprove"></div>
          Перечень входящий в тариф
        </div>
        <div class="tariff-block-list-li">
          <div class="aprove"></div>
          Перечень входящий в тариф
        </div>
        <div class="tariff-block-list-li">
          <div class="aprove"></div>
          Перечень входящий в тариф
        </div>
        <div class="tariff-block-list-li">
          <div class="aprove"></div>
          Перечень входящий в тариф
        </div>
        <div class="tariff-block-list-li">
          <div class="aprove"></div>
          Перечень входящий в тариф
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .tariff-block {
    display: flex;
    width: 654px;
    height: 200px;
    padding: 30px;
    align-items: flex-start;
    gap: 20px;
    flex-shrink: 0;
    border-radius: 20px;
    box-sizing: border-box;
    background: var(--Big-text, linear-gradient(67deg, #103673 40.45%, #4a77c1 81.54%));
  }
  .tariff-block-desc {
    position: relative;
    margin-right: 20px;
    width: 314px;
  }
  .tariff-block-desc-active {
    position: absolute;
    right: 0px;
    padding: 0px 10px;
    color: var(--Backgrounds-Blue, #2c4d90);
    font-family: 'Plus Jakarta Sans';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border-radius: 30px;
    background: var(--Backgrounds-choice-button, #cad9f6);
  }
  .tariff-block-desc-name {
    margin-bottom: 20px;
    color: var(--Backgrounds-white, #fff);
    font-family: 'Plus Jakarta Sans';
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .tariff-block-desc-currency {
    color: var(--Backgrounds-white, #fff);
    font-family: 'Plus Jakarta Sans';
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .tariff-block-desc-date {
    color: var(--Backgrounds-choice-button, #cad9f6);
    font-family: 'Plus Jakarta Sans';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .tariff-block-desc-btns {
    display: flex;
    margin-top: 24px;
  }
  .tariff-block-desc__btn {
    margin-right: 5px;
    padding: 6px 12px;
    border-radius: 20px;
    background: var(--Elements, #6794da);
    color: var(--Backgrounds-white, #fff);
    font-family: 'Plus Jakarta Sans';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .tariff-block-list {
    padding: 0px 0px 0px 20px;
    height: 139px;
    box-sizing: border-box;
    border-left: 1px solid var(--Elements, #6794da);
  }
  .tariff-block-list-li {
    display: flex;
    margin-bottom: 8px;
    align-items: center;
    color: var(--Backgrounds-light-blue, #edf6ff);

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .aprove {
    margin-right: 5px;
    width: 23px;
    height: 23px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFVSURBVHgB7dM/SIJBGMfx73sW/YGMjMqxJaKloVolITCCCBoaG4Ig1+aC5poaGhoimprLoMxQyITyH1gWVoMRVJBBKJiK+b5mumgqhOYSfrZ77rnndzcc1NWVINE/1UYNCHwnMs5DuXijOipuT5NE4wKtZoPvF+SRqJzEvT1FKCJoabIybBjP1OTChkpd2+KEP5ppbQoxZNBmKumfLaqiQ64jJynNPj5XrMxYgcd8RzTRQ6c6zeCYutTgXGO+6dlu4skRFiZe6dU3F7frGzI33iXx2UePWmFgtLHc4FIkntxLOA4UvBalMHxF8OZdxWFKc2OTs0EVEDxerGUD/LYUuQCJF9cyZ5ma51jJBv3qpqWpCDo2eX6fp7tdIfAwh6ZjGyEEW1YNO+thqhieC/Bb94jEJrMrWZEJBHUYF8/5I4JLyxV2k4zbbKQGBLqZLqr7cHX/wRc7cG7ypJM4CQAAAABJRU5ErkJggg==);
  }
</style>
