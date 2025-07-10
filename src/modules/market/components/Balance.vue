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
    background: var(
      --Background-linear,
      linear-gradient(111deg, #4a78c1 9.02%, #427cac 24.15%, #1c5ca0 57.59%, #23395b 88.3%)
    );
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 137px;
    justify-content: space-between;
    padding: 20px;
    width: 364px;
    border-radius: 10px;
  }

  .balance-indikator-name {
    align-items: center;
    color: var(--Backgrounds-white, #fff);
    display: flex;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .balance-indikator-ring {
    background: #fff;
    border-radius: 50%;
    height: 15px;
    margin-right: 5px;
    width: 15px;
  }

  .balance-indikator-currences-counts {
    color: var(--Backgrounds-white, #fff);
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .balance-indikator-currences-info {
    color: var(--Backgrounds-choice-button, #cad9f6);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
</style>
