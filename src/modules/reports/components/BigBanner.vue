<script setup lang="ts"></script>

<template>
  <div class="big-banner b-section">
    <div class="b-block"></div>
    <div class="big-banner-content big-banner-content-bg">
      <div class="big-banner-content-name">Отчеты брокера</div>
      <div class="big-banner-content-desc">
        Следите за прошедшими сделками и анализируйте резульаты в удобном для вас формате
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .big-banner-content {
    display: flex;
    flex-direction: column;
    justify-content: end;
    box-sizing: border-box;
    height: 243px;
    padding: 40px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
  }
  .big-banner-content-bg {
    background-image: url('/tmp/big-banner.png');
  }
  .big-banner-content-name {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    color: var(--Backgrounds-white, #fff);
    font-family: 'Plus Jakarta Sans';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .big-banner-content-desc {
    width: 260px;
    color: var(--Backgrounds-white, #fff);
    font-family: 'Plus Jakarta Sans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
</style>
