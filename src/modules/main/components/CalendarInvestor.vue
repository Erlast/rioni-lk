<script setup lang="ts"></script>

<template>
  <div class="calendar-investor">
    <div class="b-block">
      <div class="b-block__name">Календарь инвестора</div>
    </div>
    <div class="calendar-investor-content">
      <div class="calendar-investor-content-block">
        <div class="calendar-investor-content-block__title">Здесь добавить раздел</div>

        <div class="calendar-investor-content-block__describe">
          Обязательно с кнопкой , этот раздел может изменяться в будущем относительно приоритетности
        </div>
        <div class="calendar-investor-content-block__button">Открыть календарь</div>
      </div>
      <div class="calendar-investor-image"></div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .calendar-investor-content {
    display: flex;
    margin-bottom: 28px;
    padding: 18px 30px;

    justify-content: space-between;
    gap: 10px;
    align-self: stretch;
    border-radius: 10px;
    border: 1px solid #edf2f8;
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(145, 159, 185, 0.4);
  }
  .calendar-investor-content-block {
    display: flex;
    width: 237px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .calendar-investor-content-block__title {
    margin-bottom: 12px;
    color: #2e4376;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .calendar-investor-content-block__describe {
    margin-bottom: 12px;
    color: #2e4376;
    font-family: 'Plus Jakarta Sans';
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .calendar-investor-content-block__button {
    color: #2e4376;
    font-family: 'Plus Jakarta Sans';
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    padding: 6px 12px;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    border-radius: 20px;
    background: #eef3f8;
  }

  .calendar-investor-image {
    width: 131px;
    height: 116px;
    flex-shrink: 0;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('/img/no-picture-1.png');
  }
</style>
