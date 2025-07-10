<script setup lang="ts"></script>

<template>
  <div class="broker-account-detail">
    <div class="detail">
      <div class="name">Брокерский счет D123024</div>
      <div class="currency">
        <div class="currency-info">
          <div class="currency-info-cost">
            <div class="currency-name">Стоимость в USD</div>
            <div class="currency-info-value">0,00 USD</div>
          </div>
          <div class="currency-info-result">
            <div class="currency-name">Результат за сегодня</div>
            <div class="currency-recharge-value">
              <div class="account-running-arrow arrow-up"></div>
              0 USD (0%)
            </div>
          </div>
        </div>
        <div class="currency-recharge">
          <div class="currency-recharge-name">
            Пополнить счет
            <div class="currency-recharge-bg"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="cost-portfile">
      <div class="name">Стоимость портфеля</div>
      <div class="chart">
        <div class="chart-tab">
          <div class="chart-tab-li chart-tab-li--hover">Свободные деньги</div>
          <div class="chart-tab-li">Акции</div>
          <div class="chart-tab-li">Облигации</div>
          <div class="chart-tab-li">Деривативы</div>
        </div>
        <div class="chart-data">
          <div class="chart-data-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="153"
              height="153"
              viewBox="0 0 153 153"
              fill="none"
            >
              <path
                d="M145.833 108.83C153.813 91.7171 155.182 72.2573 149.676 54.1954C144.171 36.1336 132.18 20.7459 116.011 10.9934C99.8425 1.24099 80.6381 -2.18714 62.0937 1.36873C43.5493 4.92459 26.9751 15.2132 15.5605 30.2547C4.1459 45.2963 -1.30255 64.0279 0.263592 82.8451C1.82973 101.662 10.2998 119.235 24.0439 132.183C37.788 145.131 55.835 152.538 74.7121 152.979C93.5892 153.42 111.963 146.865 126.297 134.574L121.317 128.766C108.416 139.828 91.8803 145.728 74.8909 145.331C57.9015 144.934 41.6592 138.268 29.2895 126.615C16.9198 114.962 9.29676 99.1461 7.88723 82.2106C6.47771 65.2751 11.3813 48.4166 21.6544 34.8793C31.9276 21.3419 46.8443 12.0821 63.5343 8.88186C80.2243 5.68157 97.5082 8.76689 112.06 17.5441C126.612 26.3213 137.404 40.1702 142.359 56.4259C147.313 72.6816 146.081 90.1954 138.899 105.597L145.833 108.83Z"
                fill="url(#paint0_linear_5608_32420)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_5608_32420"
                  x1="13.3004"
                  y1="15.1319"
                  x2="159.523"
                  y2="70.0716"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#4A78C1" />
                  <stop offset="0.190885" stop-color="#427CAC" />
                  <stop offset="0.612612" stop-color="#1C5CA0" />
                  <stop offset="1" stop-color="#23395B" />
                </linearGradient>
              </defs>
            </svg>
            <div class="chart-data-info-detail">
              <div class="chart-data-info-detail-currency">0,00 USD</div>
              <div class="chart-data-info-detail-desc">доступно к выводу</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .broker-account-detail {
    margin-bottom: 30px;
    display: flex;
    .name {
      margin-bottom: 12px;
      color: var(--Dark-blue, #0f171f);
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      border-radius: 10px;
    }
  }
  .detail {
    display: flex;
    flex-direction: column;
    margin-right: 24px;
  }
  .currency,
  .chart {
    display: flex;
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
  .currency-info {
    display: flex;
    flex-direction: column;

    width: 287px;
    height: 228px;
    padding: 30px;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .currency-info-cost {
    margin-bottom: 40px;
  }

  .currency-name {
    color: var(--Text-Text-color, #2a2a2a);

    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .currency-info-value {
    display: flex;
    color: var(--Text-dark-blue, #2e4376);
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .currency-info-result {
    margin-bottom: 50px;
  }
  .currency-recharge-value {
    display: flex;
    color: var(--Elements-check, #4ba67c);
    font-family: 'Plus Jakarta Sans';
    font-size: 26px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .account-running-arrow {
    margin-right: 8px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
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

  .currency-recharge {
    display: flex;
    width: 174px;
    height: 228px;
    padding: 20px 10px 10px 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 0px 10px 10px 0px;
    background: var(--Elements-check, #4ba67c);
    color: var(--Backgrounds-white, #fff);
    font-family: 'Plus Jakarta Sans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .currency-recharge-name {
    display: flex;
    flex-direction: column;
  }
  .currency-recharge-bg {
    margin: 0px auto;
    margin-top: 10px;
    border-radius: 50%;
    display: flex;
    width: 26px;
    height: 26px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
    background-color: #e6ffe6;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .currency-recharge-bg::before {
    display: block;
    content: '';
    width: 17px;
    height: 17px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIASURBVHgBrZRLSBtBGMdnZndnE5+NtCD0QRGMrYVe0tLQIEFooal9SIWWSvBaeuml0JBashsolHrotYhHX4gavYgHBQ+KEUSC4APRgy8QcTXGZ7LZndFdY4K6xij+YWdnvm++H/+ZYQaAaxI8/ruaf33DZvyPwmTsQrEmHgRcHqT3taYm1CCsT8/7IM+OydLuTqYgEovLSajWRBZXBTWqDPVU/ywDV5QOokSlOD/LYbEV5TMLWySTQkmSts+AdJuyAp9/r94El5CpIFftfOXhNC964F2Xn7gavQOXYIC80jsFr1tqSUVrbeCEI5DRglLamlre4DgchCyq1MboooJnQs3jh28dj4xySlSWaWJVaUHu0XrxZsm98aLP5RPusXoh3VyUDhKeXRIghIBSoIRnlsR0MENQVX+dT4NYSu6KgIEriENrluLbfg32ofvPp4xBnS9+/MbZ2R+bbF/8x7Gmp19F861cf6DS22FUkzq1xKYlRLree9tPT+546RHBOdIdQQLCjAlbDfKQv5FTGIvsLRsVQ8zYSVzZSzqS93crEMLBN22+KJXjQd0SoYDhWdu+FAF9f7vLbN6qB4Wl1v9HOe3mYytRVdP8QMiRdNTrrhtZGAw5Dt8Phc0xO7UP52U5WZ7fWQ1NFoO5udj9cvuTVM7sRBzDUyVqn2joGQbXqQMMmLThdzPwAgAAAABJRU5ErkJggg==);
  }

  .chart {
    padding: 14px;
    height: 228px;
    flex-direction: column;
  }
  .chart-tab {
    display: flex;
    border-radius: 12px 0px 0px 12px;
  }
  .chart-tab-li {
    padding: 10px 18px;
    border: 1px solid var(--Elements, #6794da);
    font-family: 'Plus Jakarta Sans';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .chart-tab-li:first-child {
    border-radius: 12px 0px 0px 12px;
    background: var(--Elements, #6794da);
  }
  .chart-tab-li:last-child {
    border-radius: 0px 12px 12px 0px;
  }
  .chart-tab-li--hover {
    background: var(--Elements, #6794da);
    color: var(--Backgrounds-white, #fff);
  }
  .chart-data {
    display: flex;
    justify-content: center;
    vertical-align: middle;
  }
  .chart-data-info {
    padding-top: 15px;
    position: relative;
  }
  .chart-data-info-detail {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    margin-inline: auto;
    width: fit-content;
  }
  .chart-data-info-detail-currency {
    color: var(--Text-dark-blue, #2e4376);
    font-family: 'Plus Jakarta Sans';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  .chart-data-info-detail-desc {
    color: var(--Text-dark-blue, #2e4376);
    font-family: 'Plus Jakarta Sans';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
</style>
