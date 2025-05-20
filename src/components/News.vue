<template>
  <div class="gr-block-a">
    <div class="gr-block-a-name">
      Новости
      <div class="gr-block-a-arrow g-arrow-a"></div>
    </div>
    <div class="news-block gr-block-a-content bg-color-1">
      <div class="news-block__img"><img src="/tmp/image-news.png" alt="" /></div>
      <div class="news-block-bottom">
        <div class="news-block-bottom__text">
          Плоды «чудовищной ошибки»: что творится на рынке люкса — The Economist
        </div>
        <div class="news-block-bottom-nav">
          <div class="news-block-bottom-nav__time">Только что</div>
          <div class="news-block-bottom-nav__arrow g-arrow-b"></div>
        </div>
      </div>
    </div>
    <div class="news-block gr-block-a-content">
      <div class="news-block-bottom">
        <div class="news-block-bottom__text">
          Рантье: кто это такой, чем занимается и как им стать
        </div>
        <div class="news-block-bottom-nav">
          <div class="news-block-bottom-nav__time">2 часа назад</div>
          <div class="news-block-bottom-nav__arrow g-arrow-b"></div>
        </div>
      </div>
    </div>
    <div class="news-block gr-block-a-content">
      <div class="news-block-bottom">
        <div class="news-block-bottom__text">
          ВТБ снизил ставки по вкладам через неделю после заседания ЦБ
        </div>
        <div class="news-block-bottom-nav">
          <div class="news-block-bottom-nav__time">3 часа назад</div>
          <div class="news-block-bottom-nav__arrow g-arrow-b"></div>
        </div>
      </div>
    </div>
    <div class="news-block gr-block-a-content">
      <div class="news-block-bottom">
        <div class="news-block-bottom__text">
          Российский рынок акций, рубль и редомициляция Ozon: дайджест
        </div>
        <div class="news-block-bottom-nav">
          <div class="news-block-bottom-nav__time">5 часов назад</div>
          <div class="news-block-bottom-nav__arrow g-arrow-b"></div>
        </div>
      </div>
    </div>
    <div class="news-block gr-block-a-content">
      <div class="news-block-bottom">
        <div class="news-block-bottom__text">ЦБ понизил официальные курсы доллара США и евро</div>
        <div class="news-block-bottom-nav">
          <div class="news-block-bottom-nav__time">10 часов назад</div>
          <div class="news-block-bottom-nav__arrow g-arrow-b"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .news-block {
    width: 170px;
    margin-bottom: 8px;
    border-radius: 6px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  }
  .news-block--color-1 {
    background-color: #e7f8f0;
  }
  .news-block-bottom {
    padding: 10px 12px 12px 12px;
  }
  .news-block-bottom__text {
    color: #2a2a2a;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .news-block-bottom-nav {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
    align-items: center;
  }
  .news-block-bottom-nav__time {
    color: #a7a7a7;
    font-size: 8px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .news-block-bottom-nav__arrow {
    width: 12px;
    height: 10px;
  }
</style>
