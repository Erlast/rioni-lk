<script setup lang="ts"></script>

<template>
  <div class="news-main">
    <div class="b-block"><div class="b-block__name">Главное сегодня</div></div>
    <div class="news-main-content">
      <div class="news-main-content-main news-main-content-main-news">
        <div class="news-main-content-main-news__note">Новое</div>
        <div class="news-main-content-main-data">
          <div class="news-main-content-main-news__title">Трамп в роли президента</div>
          <div class="news-main-content-main-news__desc">
            Дональд Трамп официально стал 47-м президентом США. Внимание рынков будет сосредоточено
            именно на этом событии.
          </div>
        </div>
      </div>
      <div class="news-main-content-main news-main-content-main-second">
        <div class="news-main-content-main-news__title">Другой заговок</div>
        <div class="news-main-content-main-news__desc">
          Дональд Трамп официально стал 47-м президентом США. Внимание рынков будет сосредоточено
          именно на этом событии.
        </div>
      </div>
      <div class="news-main-content-main news-main-content-main-third">
        <div class="news-main-content-main-news__title">Другой заговок</div>
        <div class="news-main-content-main-news__desc">
          Дональд Трамп официально стал 47-м президентом США. Внимание рынков будет сосредоточено
          именно на этом событии.
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .news-main-content {
    display: grid;
    grid-gap: 2ch;
  }
  .news-main-content-main {
    padding: 20px;
    border-radius: 10px;
    background: #eef3f8;
  }
  .news-main-content-main-news {
    display: flex;
    grid-column-start: 1;
    grid-column-end: 6;
    grid-row-start: 1;
    grid-row-end: 4;
    flex-direction: column;
  }
  .news-main-content-main-data {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: flex-end;
  }

  .news-main-content-main-second {
    grid-column-start: 6;
    grid-column-end: 12;
  }

  .news-main-content-main-third {
    grid-column-start: 6;
    grid-column-end: 12;
  }

  .news-main-content-main-news__note {
    padding: 4px 11px;
    align-self: flex-start;
    color: #2e4376;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 20px;
    background: #cad9f6;
  }
  .news-main-content-main-news__title {
    margin-bottom: 8px;
    color: #2a2a2a;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .news-main-content-main-news__desc {
    color: #2e4376;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
</style>
