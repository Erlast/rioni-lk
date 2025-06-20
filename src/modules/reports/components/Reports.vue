<script setup lang="ts"></script>

<template>
  <div class="reports b-section">
    <div class="broker-reports">
      Брокерский отчет
      <div class="icon"></div>
    </div>
    <div class="calendar">
      <div class="calendar-head">
        <div class="calendar-top-how">Сегодня</div>
        <div class="calendar-top-icon-outside"><div class="calendar-top-icon"></div></div>
        <div class="calendar-top-arrow-left"></div>
        <div class="calendar-top-arrow-right"></div>
        <div class="calendar-top-arrow-dates">31 марта – 6 апреля 2025г</div>
        <div class="lang-block">
          <div class="lang-block__icon"></div>
          RU
          <div class="lang-block__icon-arrow-down"></div>
        </div>
      </div>

      <div class="calendar-tags">
        <div class="tag tag-bg-hover">Полный отчет</div>
        <div class="tag">Краткий отчет</div>
        <div class="button">Сформировать отчет</div>
      </div>
    </div>
    <div class="big-banner-upload">
      <div class="big-banner-upload__image"></div>
      <div class="big-banner-upload__text">За выбранный период операции отсутствуют</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .calendar-head {
    display: flex;
    margin-bottom: 6px;
    align-items: center;
  }
  .broker-reports {
    display: flex;

    margin-bottom: 10px;
    padding: 10px 20px;
    border-radius: 8px;
    background: var(--Backgrounds-light-blue, #edf6ff);
    color: #000;
    font-family: 'Plus Jakarta Sans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    .icon {
      width: 20px;
      height: 20px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjUzMDMgNC40Njk1N0MxMC4yMzc0IDQuMTc2NjggOS43NjI1NiA0LjE3NjY4IDkuNDY5NjcgNC40Njk1N0w0LjY5NjcgOS4yNDI1NEM0LjQwMzgxIDkuNTM1NDMgNC40MDM4MSAxMC4wMTAzIDQuNjk2NyAxMC4zMDMyQzQuOTg5NTkgMTAuNTk2MSA1LjQ2NDQ3IDEwLjU5NjEgNS43NTczNiAxMC4zMDMyTDEwIDYuMDYwNTZMMTQuMjQyNiAxMC4zMDMyQzE0LjUzNTUgMTAuNTk2MSAxNS4wMTA0IDEwLjU5NjEgMTUuMzAzMyAxMC4zMDMyQzE1LjU5NjIgMTAuMDEwMyAxNS41OTYyIDkuNTM1NDMgMTUuMzAzMyA5LjI0MjU0TDEwLjUzMDMgNC40Njk1N1pNMTAuNzUgNVY0Ljk5OTlIOS4yNVY1SDEwLjc1WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==);
    }
  }
  .calendar-top-how {
    display: flex;
    margin-right: 5px;
    padding: 5px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: var(--Backgrounds-light-green, #e7f8f0);
  }

  .calendar-top-icon-outside {
    display: flex;

    padding: 5px;
    justify-content: center;
    align-items: center;

    border-radius: 8px;
    background: var(--Backgrounds-light-green, #e7f8f0);
  }

  .calendar-top-icon {
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADISURBVHgB7ZRNDoJADIUrGl240pXMSTyDBzF6MrcexUO4MtGFK+PP4KsppBYYw8iCBS95AdL2a/krUbwGTZKf8CoQ38LXqsDIdFzI0cNL+FDNoyk8gZ00P2kIK5FAfp3R71vyUpfnj4Xx0QveKQgnrwOwDfxQQ+3hm07gDqkpCk2YmHgqjNIztE3q5Ouaa+CM4jW35IzaUTEpAx3FywmjeO2tqQd2B1j67I6kNkaELvCZT/S2ucNDihMvF942X79kow1s9E9tWG9e3yE3nFvo+gAAAABJRU5ErkJggg==);
  }
  .calendar-top-arrow-left {
    margin-right: 24px;
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(data:image/png;base64,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);
  }
  .calendar-top-arrow-right {
    margin-right: 24px;
    width: 20px;
    height: 20px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(data:image/png;base64,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);
  }
  .calendar-top-arrow-dates {
    color: var(--Dark-blue, #0f171f);
    font-family: 'Plus Jakarta Sans';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .calendar-top-arrow-times {
    margin-left: auto;
    display: flex;
    .icon {
      margin-right: 6px;
      width: 20px;
      height: 20px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFNSURBVHgBpZU9TsNAEIWfI6RURuLnAJzCSEFpkUPPeYhCRUVqUnEBQBwAGhASZRoqKo4BiXnPno0ie3fjxE/6Cnt3386OZ9ZAWKfkixQ15mREErSQJp2RJVmQdzIkR+SA5OTRjDXnPGbWIzMzmqAZQf15TH7J1NY2NLVdU8/YM3nxvO/bmrv6QG679eHXq+HTPqpTDdyLxHa5QlgxQ+naPMq0XKBKMjoYuqAyJfOGPKGbFNAHuXcPObpFKKm8Cve5PyMT3XE2SU2AvbVFPqMT8o3qFJeIa7WpJg8DO6ocHhAo3JpG5lUufEMzuh+07FeTPqz6HBnWaqiDCouylAwn2F1jM1wFpbZRvlJsL7Wr2rZx8+imWSLczz6ltubWN9izgT/E+1rS0Vz/zrAh/wrd3c76ckr0ITlGVV6qiIWZDdBSiRnN0fwFqMyy0MJ/oA1U6Zm9ylAAAAAASUVORK5CYII=);
    }
  }
  .calendar-days {
    display: flex;
    margin-bottom: 15px;
  }
  .calendar-day {
    display: flex;
    margin-right: 10px;
    width: 114px;
    height: 108px;
    padding: 12px;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 12px;
    background: var(--Backgrounds-white, #fff);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    flex-shrink: 0;

    .name {
      margin-bottom: 10px;
      color: var(--Dark-blue, #0f171f);
      font-family: 'Plus Jakarta Sans';
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    .stat {
      display: flex;
      justify-content: space-between;
    }
    .stat__name {
      margin-bottom: 4px;
      color: var(--Dark-blue, #0f171f);
      font-family: 'Plus Jakarta Sans';
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .stat__count {
      color: var(--Dark-blue, #0f171f);
      font-family: 'Plus Jakarta Sans';
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
  .calendar-tags {
    display: flex;
    margin-bottom: 15px;
    .tag {
      margin-right: 8px;
      padding: 7px 17px;

      font-family: 'Plus Jakarta Sans';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      border-radius: 20px;
      background: var(--Backgrounds-light-blue, #edf6ff);
      color: var(--Elements, #6794da);
    }
    .tag-bg-hover {
      color: var(--Backgrounds-white, #fff);
      background: var(--Elements, #6794da);
    }
    .button {
      margin-left: auto;
      padding: 7px 17px;
      justify-content: center;
      color: var(--Backgrounds-white, #fff);
      font-family: 'Plus Jakarta Sans';
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      border-radius: 20px;
      background: var(--Backgrounds-Blue, #2c4d90);
    }
  }

  .big-banner-upload {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    height: 244px;

    border-radius: 10px;
    background: #f9f9f9;

    .big-banner-upload__image {
      width: 135px;
      height: 135px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(data:image/png;base64,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);
    }

    .big-banner-upload__text {
      color: var(--Text-Grey-text, #a7a7a7);
      font-family: 'Plus Jakarta Sans';
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  .lang-block {
    display: flex;
    margin-left: auto;
    color: var(--Dark-blue, #0f171f);

    font-size: 16px;

    .lang-block__icon {
      margin-right: 5px;
      width: 20px;
      height: 20px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHvSURBVHgBrZTPSxtBFMffzCRbd021abe59dyDf0DsobS1hR6a5NZ70Kviv+FZchTJwYPgMSIIUUEQf5xEVPQgiAlEYkjUbNzNj9nnTDAxP3Y1C34v8/Yt7zNv5r15AM4imUwmnM/nzyqVChaLRSyVSmhaFl5dXh6vLC9HwC2w9zuXy/3QNG3Ttm3iGMF5c1E1DTfS6di/WGzVDcgKhcICpTROiDOrF9o0ARK6rs8K0+4EEgGbZ4xNwyDqAD5BkwI6KUyk0pFKpSIDw5rbd5+AIsblVbUzNE0TLcuCgWWL0yF2QxnD0WCQ+ZZExTLXd+BJSAAbvNdLstlsmIT/J4+BKmPgQbJo5dJDn19V359Tpox4gr0k0adfaaNugneho5fzGlB4Q8kKiz72g2e5NL5PUYEOaeo5vJGwdn9KHqJ/xm/urF1PgbZoGbPc599TlKjMnRS+j/O62zBwAvIGgGV0+QJik5GjCyKLguXRDxMIHlTre1WY/hiKSqM9HPJ/Jxa5YcRhkAyNooh4bhDlnT+h75/MSLvlxdD65pRfHUq8SpMVbsEIQd+wlhSw2dbvzj609fT2zN5wIBaAl7K7ba5+RrGqh36Fdg7l2LLb+7kFLv3+GflWNec+UzJmPA0ChVehTuGsEfwU/7K2dQAOT+YRJkTAnnqsE4UAAAAASUVORK5CYII=);
    }

    .lang-block__icon-arrow-down {
      margin-left: 5px;
      margin-bottom: 2px;
      width: 17px;
      background-repeat: no-repeat;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjUzMDMgNC40Njk1N0MxMC4yMzc0IDQuMTc2NjggOS43NjI1NiA0LjE3NjY4IDkuNDY5NjcgNC40Njk1N0w0LjY5NjcgOS4yNDI1NEM0LjQwMzgxIDkuNTM1NDMgNC40MDM4MSAxMC4wMTAzIDQuNjk2NyAxMC4zMDMyQzQuOTg5NTkgMTAuNTk2MSA1LjQ2NDQ3IDEwLjU5NjEgNS43NTczNiAxMC4zMDMyTDEwIDYuMDYwNTZMMTQuMjQyNiAxMC4zMDMyQzE0LjUzNTUgMTAuNTk2MSAxNS4wMTA0IDEwLjU5NjEgMTUuMzAzMyAxMC4zMDMyQzE1LjU5NjIgMTAuMDEwMyAxNS41OTYyIDkuNTM1NDMgMTUuMzAzMyA5LjI0MjU0TDEwLjUzMDMgNC40Njk1N1pNMTAuNzUgNVY0Ljk5OTlIOS4yNVY1SDEwLjc1WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==);
      transform: rotate(180deg);
    }
  }
</style>
