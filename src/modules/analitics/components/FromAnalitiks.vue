<script setup lang="ts"></script>

<template>
  <div class="from-analitiks b-section">
    <div class="b-block"><div class="b-block__name">От аналитиков Rioni capital</div></div>
    <div class="from-analitiks-banners">
      <div class="from-analitiks-banners-banner from-analitiks-banners-banner-img">
        <div class="from-analitiks-banners-banner-status">новая публикация</div>
        <div class="from-analitiks-banners-banner-category">
          <div class="icon"></div>
          <div class="name">Инвестобзоры</div>
          <div class="date">22 февраля</div>
        </div>
        <div class="from-analitiks-banners-banner-review">
          <div class="icon"></div>
          Еженедельные обзоры
        </div>
        <div class="from-analitiks-banners-banner-name">
          Фьючерсы на товарные контракты. Еженедельный обзор и тактические идеи
        </div>
        <div class="from-analitiks-banners-banner-descr">
          Результаты первого квартала текущего года оказались неоднозначными для разных видов
          сырьевых товаров.  Нефтяные котировки опустились до многомесячных минимумов, в то время
          как цены на золото и серебро застыли вблизи рекордных максимумов
        </div>
      </div>
      <div class="from-analitiks-banners-banner">
        <div class="from-analitiks-banners-banner-status">новая публикация</div>
        <div class="from-analitiks-banners-banner-category">
          <div class="icon"></div>
          <div class="name">Инвестобзоры</div>
          <div class="date">22 февраля</div>
        </div>
        <div class="from-analitiks-banners-banner-review">
          <div class="icon"></div>
          Еженедельные обзоры
        </div>
        <div class="from-analitiks-banners-banner-name">
          Фьючерсы на товарные контракты. Еженедельный обзор и тактические идеи
        </div>
        <div class="from-analitiks-banners-banner-descr">
          Результаты первого квартала текущего года оказались неоднозначными для разных видов
          сырьевых товаров.  Нефтяные котировки опустились до многомесячных минимумов, в то время
          как цены на золото и серебро застыли вблизи рекордных максимумов
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .from-analitiks {
  }

  .from-analitiks-banners {
    display: flex;
  }

  .from-analitiks-banners-banner {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    width: 461px;
    height: 230px;
    padding: 30px;

    box-sizing: border-box;
    justify-content: space-between;
    align-items: flex-start;
    flex-shrink: 0;

    border-radius: 20px;
    background: var(--Backgrounds-light-green, #e7f8f0);
    color: var(--Backgrounds-white, #000000);
  }

  .from-analitiks-banners-banner-img {
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('/tmp/analitikc-image.png');
    color: var(--Backgrounds-white, #fff);
  }

  .from-analitiks-banners-banner-status {
    position: absolute;
    right: 30px;
    padding: 4px 10px;
    color: var(--Dark-blue, #0f171f);
    font-family: 'Plus Jakarta Sans';
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    border-radius: 30px;
    background: var(--Backgrounds-white, #fff);
  }

  .from-analitiks-banners-banner-category {
    display: flex;
    .icon {
      width: 12px;
      height: 12px;
      margin-right: 6px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAANCAYAAACdKY9CAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEWSURBVHgBlVA7bsJAEN1dr8tElsgBXKdKpChlRE6QXCAilitLkXIEMAUU0NL4I+MbcAQj0SNuAC0N1P7yBgEy22BGsnd25s17b5azhhFFkSGEeBRqw/O8F7UWhmG/KIpdlmXDqwHf93tgWdKpzDzQj3O+vQwEQTBC4assy1cMdc5DdFZV9a1p2gfqLj+BpwC3UPixLGsPvyYGZwDu0DZh5dNxnPVRhZZB89+2bbfuIY7jVp7n4zRNXSmlCcIuygvOGgSW/oVahDSRSoNYqNmD5zmU21BI6hj1WU2ASZ526BCrruvdOkBi4QnONyw8AIDdClJ4xvcORoM1CMHuDLyY/AP7E3yvcJ/D1vSUG8gT5BsCIm9TfgAe3YPi9wzysAAAAABJRU5ErkJggg==);
    }

    .name {
      margin-right: 6px;
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .date {
      font-size: 8px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }

  .from-analitiks-banners-banner-review {
    display: flex;
    margin-bottom: 10px;
    font-size: 10px;
    font-style: normal;

    line-height: normal;

    .icon {
      width: 12px;
      height: 12px;
      margin-right: 6px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADGSURBVHgBpVGxDcIwELSjKHVGyAh0DMAcCEVJTcIEJBOwQBKLDdgAVmAB5JqK3pbNfeHICJuCvJT839t357cZWxLTNO2HYWgcptrHFJx+QojCGHO11hYRLck531RV9UgJYfMO6VLX9SG0exzHE9IWX5+6JtRb2LchAtYYHDqqZwI1YNlHHI6uTv0FzJJrrVd+D1j6+IOAWRpn7SLLsi5KSJLkjPPe/B4E7iQUIuRlWUpkyb5nyJFeM4GU6R1+3NJTKbVm/8QbfgdVUtppxB0AAAAASUVORK5CYII=);
    }
  }

  .from-analitiks-banners-banner-name {
    max-width: 250px;
    font-family: 'Plus Jakarta Sans';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 110%; /* 17.6px */
  }

  .from-analitiks-banners-banner-descr {
    font-family: 'Plus Jakarta Sans';
    font-size: 8px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
</style>
