<script setup lang="ts"></script>

<template>
  <div class="account">
    <div class="account-data">
      <div class="account-data-picture">
        <div class="account-data-picture-b-acc">
          <div class="account-data-picture-b-acc__name">Номер счета</div>
          <div class="account-data-picture-b-acc__number">D123024</div>
        </div>
      </div>
      <div class="account-data-total">
        <div class="account-data-total__price">Стоимость в USD</div>
        <div class="account-data-total__currency">0,00 USD</div>
        <div class="account-data-total__grow">0 USD (0%)</div>
        <div class="account-data-total__btn">
          <v-btn prepend-icon="mdi-arrow-down" stacked class="btn-std">Пополнить</v-btn>
        </div>
      </div>
      <div class="account-data-link-account-data">
        <div class="a-block">
          <div class="a-icon icon-port"></div>
          <div class="a-name">
            Портфель
            <div class="a-arrow g-arrow-a"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="account-running">
      <div class="account-running-block">
        <div class="account-running-arrow arrow-up"></div>
        <div class="account-running-data">
          <div class="account-running-data__currency">BTCUSD</div>
          <div class="account-running-data__value">60582.25/60503.86</div>
        </div>
      </div>
      <div class="account-running-block">
        <div class="account-running-arrow arrow-down"></div>
        <div class="account-running-data">
          <div class="account-running-data__currency">BTCUSD</div>
          <div class="account-running-data__value">60582.25/60503.86</div>
        </div>
      </div>
      <div class="account-running-block">
        <div class="account-running-arrow arrow-up"></div>
        <div class="account-running-data">
          <div class="account-running-data__currency">BTCUSD</div>
          <div class="account-running-data__value">60582.25/60503.86</div>
        </div>
      </div>
      <div class="account-running-block">
        <div class="account-running-arrow arrow-down"></div>
        <div class="account-running-data">
          <div class="account-running-data__currency">BTCUSD</div>
          <div class="account-running-data__value">60582.25/60503.86</div>
        </div>
      </div>
      <div class="account-running-block">
        <div class="account-running-arrow arrow-up"></div>
        <div class="account-running-data">
          <div class="account-running-data__currency">BTCUSD</div>
          <div class="account-running-data__value">60582.25/60503.86</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .account {
    position: relative;
    margin-bottom: 28px;
  }

  .account-data {
    position: relative;
    display: flex;
    padding: 30px;
    margin: auto;
    width: 752px;
    height: 132px;
    border-radius: 30px;
    border: 1px solid #edf2f8;

    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(145, 159, 185, 0.4);
    z-index: 100;
  }

  .account-data-picture {
    position: relative;
    width: 218px;
    height: 132px;
    border-radius: 10px;
    background-image: url('/img/account-map.png');
  }

  .account-data-picture-b-acc {
    padding: 8px;
    color: #fff;
  }

  .account-data-picture-b-acc__name {
    font-size: 10px;
    font-style: normal;
  }

  .account-data-total {
    margin-left: 24px;
  }
  .account-data-total__price {
    font-family: 'Plus Jakarta Sans';
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
  }

  .account-data-total__currency {
    color: #2e4376;
    font-size: 28px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .account-data-total__grow {
    color: #4ba67c;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .account-data-total__btn {
    margin-top: 21px;
  }

  .account-data-picture-1 {
    width: 218px;
    height: 132px;
    background-image: url('/img/no-picture-1.png');
  }

  .account-data-picture-b-acc__number {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
  }

  .account-data-link-account-data {
    position: absolute;
    top: 0px;
    right: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 174px;
    height: 78px;
    border-radius: 0px 30px;
    border: 1px solid #edf2f8;
  }

  .account-running {
    margin: auto;
    display: flex;
    width: 712px;
    height: 75px;
    justify-content: center;
    align-items: center;
    border-radius: 0px 0px 30px 30px;
    background: #eef3f8;
  }
  .account-running-block {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    margin-right: 20px;
    border-radius: 87.279px;
    background: #fff;
  }
  .account-running-arrow {
    margin-right: 8px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .account-running-data__currency {
    color: #000;
    font-family: Inter;
    font-size: 12.219px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .account-running-data__value {
    color: #000;
    font-family: 'Plus Jakarta Sans';
    font-size: 6.982px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .account-running-arrow {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
  }
  .account-running-arrow::before {
    display: block;
    content: '';
    width: 15px;
    height: 15px;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .arrow-up {
    background-color: #e6ffe6;
  }

  .arrow-up::before {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuNjMxOCAwLjgwNjY1NkM3LjI5MDk2IDAuNDY1ODExIDYuNzM4MzQgMC40NjU4MTEgNi4zOTc0OSAwLjgwNjY1NkwwLjg0MzEwOCA2LjM2MTA0QzAuNTAyMjY0IDYuNzAxODkgMC41MDIyNjQgNy4yNTQ1MSAwLjg0MzEwOCA3LjU5NTM1QzEuMTgzOTUgNy45MzYxOSAxLjczNjU3IDcuOTM2MTkgMi4wNzc0MiA3LjU5NTM1TDcuMDE0NjUgMi42NTgxMkwxMS45NTE5IDcuNTk1MzVDMTIuMjkyNyA3LjkzNjE5IDEyLjg0NTMgNy45MzYxOSAxMy4xODYyIDcuNTk1MzVDMTMuNTI3IDcuMjU0NTEgMTMuNTI3IDYuNzAxODkgMTMuMTg2MiA2LjM2MTA0TDcuNjMxOCAwLjgwNjY1NlpNNy44ODc0NCAxNC41MTU2TDcuODg3NDQgMS40MjM4MUg2LjE0MTg2TDYuMTQxODYgMTQuNTE1Nkg3Ljg4NzQ0WiIgZmlsbD0iIzEzOTQxNCIvPgo8L3N2Zz4K);
  }

  .arrow-down {
    background-color: #ffe7e6;
  }

  .arrow-down::before {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxMyAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuOTAxNCAxNC4xMzA4QzYuMjQyMjUgMTQuNDcxNyA2Ljc5NDg2IDE0LjQ3MTcgNy4xMzU3MSAxNC4xMzA4TDEyLjY5MDEgOC41NzY0NkMxMy4wMzA5IDguMjM1NjEgMTMuMDMwOSA3LjY4Mjk5IDEyLjY5MDEgNy4zNDIxNUMxMi4zNDkzIDcuMDAxMzEgMTEuNzk2NiA3LjAwMTMxIDExLjQ1NTggNy4zNDIxNUw2LjUxODU1IDEyLjI3OTRMMS41ODEzMiA3LjM0MjE1QzEuMjQwNDggNy4wMDEzMSAwLjY4Nzg1OSA3LjAwMTMxIDAuMzQ3MDE0IDcuMzQyMTVDMC4wMDYxNjk4IDcuNjgyOTkgMC4wMDYxNjk4IDguMjM1NjEgMC4zNDcwMTQgOC41NzY0Nkw1LjkwMTQgMTQuMTMwOFpNNS42NDU3NyAwLjQyMTg3NUw1LjY0NTc3IDEzLjUxMzdINy4zOTEzNEw3LjM5MTM0IDAuNDIxODc1TDUuNjQ1NzcgMC40MjE4NzVaIiBmaWxsPSIjRTQzQjNCIi8+Cjwvc3ZnPgo=);
  }
</style>
