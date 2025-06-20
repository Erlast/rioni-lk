<script setup lang="ts"></script>

<template>
  <div class="balance">
    <div class="b-block"><div class="b-block__name"></div></div>
    <div class="balance-indikator">
      <div class="balance-indikator-name">
        <div class="balance-indikator-ring"></div>
        Свободные средства
      </div>
      <div class="balance-indikator-currences">
        <div class="balance-indikator-currences-counts">36 120,54$</div>
        <div class="balance-indikator-currences-info">3 167, 75$ обязательства</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .balance-indikator {
    display: flex;
    width: 364px;
    height: 137px;
    padding: 20px;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    border-radius: 10px;
    background: var(
      --Background-linear,
      linear-gradient(111deg, #4a78c1 9.02%, #427cac 24.15%, #1c5ca0 57.59%, #23395b 88.3%)
    );
  }
  .balance-indikator-name {
    display: flex;
    color: var(--Backgrounds-white, #fff);
    font-family: 'Plus Jakarta Sans';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    align-items: center;
  }
  .balance-indikator-ring {
    margin-right: 5px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #fff;
  }

  .balance-indikator-currences-counts {
    color: var(--Backgrounds-white, #fff);
    font-family: 'Plus Jakarta Sans';
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .balance-indikator-currences-info {
    color: var(--Backgrounds-choice-button, #cad9f6);
    font-family: 'Plus Jakarta Sans';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
</style>
