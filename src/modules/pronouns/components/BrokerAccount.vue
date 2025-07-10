<script setup lang="ts"></script>

<template>
  <div class="broker-account">
    <div class="broker-account-data">
      <div class="cell cell-row">
        <div class="name">Брокерский счет</div>
        <div class="value">D123024</div>
      </div>
      <div class="cell cell-col">
        <div class="name">Стоимость в USD</div>
        <div class="value value-currency">0,00 USD</div>
      </div>
      <div class="cell cell-col">
        <div class="name">Свободные деньги</div>
        <div class="value value-free-currency">0,00 USD</div>
      </div>
    </div>
    <div class="broker-account-bg"></div>
  </div>
</template>

<style scoped lang="scss">
  .broker-account {
    display: flex;
    position: relative;

    .broker-account-data {
      width: 291px;
      height: 235px;
      padding: 30px;
      box-sizing: border-box;
      flex-shrink: 0;
      border-radius: 30px;
      border: 2px solid var(--Elements, #6794da);

      .cell {
        display: flex;
        margin-bottom: 24px;

        &.cell-row {
          .value {
            margin-left: 5px;
          }
        }

        &.cell-col {
          flex-direction: column;
        }

        .name {
          color: var(--Text-Text-color, #2a2a2a);
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }

        .value {
          color: var(--Text-Text-color, #2a2a2a);
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;

          &.value-currency {
            color: var(--Text-dark-blue, #2e4376);
            font-size: 20px;
            font-weight: 600;
          }

          &.value-free-currency {
            @extend .value-currency;
            color: var(--Elements-check, #4ba67c);
          }
        }
      }
    }

    .broker-account-bg {
      margin-left: 25px;
      width: 631px;
      height: 235px;
      border-radius: 30px;
      background: #e9e9e9;
      background-image: url('/img/broker-accaunt-portfolio-bg.png');
      background-size: cover;
      pointer-events: none;
    }
  }
</style>
