<script setup lang="ts"></script>

<template>
  <div class="invest-teaching b-section">
    <div class="b-block"><div class="b-block__name">Инвест-обучение</div></div>
    <div class="invest-teaching-blocks">
      <div class="invest-teaching-block invest-teaching-bg-1">
        <div class="name">Полезные статьи</div>
        <div class="desc">
          Образовательный портал для тех, кто только начинает свой инвестиционный путь и для уже
          состоявшихся инвесторов
        </div>
      </div>
      <div class="invest-teaching-block invest-teaching-bg-2">
        <div class="name">Видео-библиотека материалов</div>
        <div class="desc">
          Доступное и понятное обучение на видео платформе со специалистами Rioni Capital  и
          мировыми лидерами
        </div>
      </div>
      <div class="invest-teaching-block invest-teaching-bg-3">
        <div class="name">Финансовый словарь</div>
        <div class="desc">
          Универсальный справочник,  в котором собраны ключевые термины из сферы финансового
          анализа, управления капиталом, налогообложения, банковского дела, инвестиций и
          макроэкономики
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .invest-teaching-blocks {
    display: flex;
  }
  .invest-teaching-block {
    display: flex;
    margin-right: 24px;
    width: 267px;
    height: 200px;
    padding: 30px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    flex-shrink: 0;
    box-sizing: border-box;
    border-radius: 30px;

    .name {
      font-family: 'Plus Jakarta Sans';
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    .desc {
      font-family: 'Plus Jakarta Sans';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  .invest-teaching-bg-1 {
    background: var(--Backgrounds-light-blue, #edf6ff);
    color: var(--Dark-blue, #0f171f);
  }

  .invest-teaching-bg-2 {
    color: var(--Backgrounds-light-blue, #edf6ff);
    background: var(
      --Background-linear,
      linear-gradient(111deg, #4a78c1 9.02%, #427cac 24.15%, #1c5ca0 57.59%, #23395b 88.3%)
    );
  }

  .invest-teaching-bg-3 {
    color: var(--Backgrounds-light-blue, #edf6ff);
    background: var(--Elements, #6794da);
  }
</style>
