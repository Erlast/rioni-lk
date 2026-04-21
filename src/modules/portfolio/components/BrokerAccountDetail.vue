<script setup lang="ts"></script>

<template>
  <div class="broker-account">
    <div class="broker-account-detail">
      БС № RCGEBA1234567890 Стоимость портфеля 11218,29 USD Результат за сегодня 68,03 USD/12,31%
      Пополнить счет
    </div>
    <div class="broker-account-group">
      <div class="broker-account-block">Свободные средства 8218,47 USD</div>
      <div class="broker-account-block">Средства в пути 313,99 USD</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .broker-account {
    display: flex;
    gap: 10px;
  }

  .broker-account-detail {
    padding: 24px;
    width: 589px;
    height: 241px;
    border-radius: 30px;
    background: var(--Backgrounds-white, #fff);
  }
  .broker-account-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .broker-account-block {
    width: 345px;
    height: 113px;
    border-radius: 30px;
    background: var(--Backgrounds-choice-button, #cad9f6);
  }
</style>
