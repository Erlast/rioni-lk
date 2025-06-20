<script setup lang="ts"></script>

<template>
  <div class="invest-calendar b-section">
    <div class="b-block"><div class="b-block__name">Инвест-календарь</div></div>

    <div class="calendar">
      <div class="calendar-head">
        <div class="calendar-top-how">Сегодня</div>
        <div class="calendar-top-icon"></div>
        <div class="calendar-top-arrow-left"></div>
        <div class="calendar-top-arrow-right"></div>
        <div class="calendar-top-arrow-dates">31 марта – 6 апреля 2025г</div>
        <div class="calendar-top-arrow-times">
          <div class="icon"></div>
          10:53 (UTS+7)
        </div>
      </div>
      <div class="calendar-days">
        <div class="calendar-day">
          <div class="name">Пн 31</div>
          <div class="stat">
            <div class="stat__name">Новости</div>
            <div class="stat__count">12</div>
          </div>
          <div class="stat">
            <div class="stat__name">Прибыль</div>
            <div class="stat__count">189</div>
          </div>
          <div class="stat">
            <div class="stat__name">Дивиденды</div>
            <div class="stat__count">211</div>
          </div>
        </div>
        <div class="calendar-day">
          <div class="name">Вт 1</div>
          <div class="stat">
            <div class="stat__name">Новости</div>
            <div class="stat__count">12</div>
          </div>
          <div class="stat">
            <div class="stat__name">Прибыль</div>
            <div class="stat__count">189</div>
          </div>
          <div class="stat">
            <div class="stat__name">Дивиденды</div>
            <div class="stat__count">211</div>
          </div>
        </div>
        <div class="calendar-day">
          <div class="name">Ср 2</div>
          <div class="stat">
            <div class="stat__name">Новости</div>
            <div class="stat__count">12</div>
          </div>
          <div class="stat">
            <div class="stat__name">Прибыль</div>
            <div class="stat__count">189</div>
          </div>
          <div class="stat">
            <div class="stat__name">Дивиденды</div>
            <div class="stat__count">211</div>
          </div>
        </div>
        <div class="calendar-day">
          <div class="name">Чт 3</div>
          <div class="stat">
            <div class="stat__name">Новости</div>
            <div class="stat__count">12</div>
          </div>
          <div class="stat">
            <div class="stat__name">Прибыль</div>
            <div class="stat__count">189</div>
          </div>
          <div class="stat">
            <div class="stat__name">Дивиденды</div>
            <div class="stat__count">211</div>
          </div>
        </div>
        <div class="calendar-day">
          <div class="name">Пт 4</div>
          <div class="stat">
            <div class="stat__name">Новости</div>
            <div class="stat__count">12</div>
          </div>
          <div class="stat">
            <div class="stat__name">Прибыль</div>
            <div class="stat__count">189</div>
          </div>
          <div class="stat">
            <div class="stat__name">Дивиденды</div>
            <div class="stat__count">211</div>
          </div>
        </div>
        <div class="calendar-day">
          <div class="name">Сб 5</div>
          <div class="stat">
            <div class="stat__name">Новости</div>
            <div class="stat__count">12</div>
          </div>
          <div class="stat">
            <div class="stat__name">Прибыль</div>
            <div class="stat__count">189</div>
          </div>
          <div class="stat">
            <div class="stat__name">Дивиденды</div>
            <div class="stat__count">211</div>
          </div>
        </div>
        <div class="calendar-day">
          <div class="name">Вс 6</div>
          <div class="stat">
            <div class="stat__name">Новости</div>
            <div class="stat__count">12</div>
          </div>
          <div class="stat">
            <div class="stat__name">Прибыль</div>
            <div class="stat__count">189</div>
          </div>
          <div class="stat">
            <div class="stat__name">Дивиденды</div>
            <div class="stat__count">211</div>
          </div>
        </div>
      </div>
      <div class="calendar-tags">
        <div class="tag tag-bg-hover">Новости экономики</div>
        <div class="tag">Прибыль</div>
        <div class="tag">Вырочка</div>
        <div class="tag">Дивиденды</div>
      </div>
    </div>
    <div class="calendar-table">
      <div class="header cell-1">четверг, 3 апреля</div>

      <div class="header cell-5">Текущий</div>
      <div class="header cell-6">Прогноз</div>
      <div class="header cell-7">Предыдущий</div>

      <div class="cell time">18:20</div>
      <div class="cell"><div class="icon city-turk"></div></div>
      <div class="cell"><div class="icon-graf graf-1"></div></div>
      <div class="cell">Balance of Trade</div>
      <div class="cell">-</div>
      <div class="cell">-</div>
      <div class="cell">97,07 B $</div>

      <div class="cell time">19:30</div>
      <div class="cell"><div class="icon city-itali"></div></div>
      <div class="cell"><div class="icon-graf graf-1"></div></div>
      <div class="cell">IPCA mid-month CPI MoM</div>
      <div class="cell">-</div>
      <div class="cell">– 1,1 B $</div>
      <div class="cell">97,07 B $</div>

      <div class="cell time">18:20</div>
      <div class="cell"><div class="icon city-brazil"></div></div>
      <div class="cell"><div class="icon-graf graf-2"></div></div>
      <div class="cell">Average Weekly Earnings YoY</div>
      <div class="cell">– 5,5%</div>
      <div class="cell">-</div>
      <div class="cell">–4, 558 B $</div>

      <div class="cell time">20:00</div>
      <div class="cell"><div class="icon city-canada"></div></div>
      <div class="cell"><div class="icon-graf graf-3"></div></div>
      <div class="cell">Continuing Jobless Ckaims</div>
      <div class="cell">-</div>
      <div class="cell">-</div>
      <div class="cell">5,9%</div>

      <div class="cell time">18:20</div>
      <div class="cell"><div class="icon city-usa"></div></div>
      <div class="cell"><div class="icon-graf graf-2"></div></div>
      <div class="cell">Average Weekly Earnings YoY</div>
      <div class="cell">-</div>
      <div class="cell">-</div>
      <div class="cell">97,07 B $</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .calendar-head {
    display: flex;
    margin-bottom: 6px;
  }
  .calendar-top-how {
    display: flex;
    margin-right: 5px;
    padding: 5px 24px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: var(--Backgrounds-light-blue, #edf6ff);
  }
  .calendar-top-icon {
    margin-right: 20px;
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
  }

  .calendar-table {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 4fr 1fr 1fr 1fr;
    grid-template-rows: repeat(2, 1fr);
    border-radius: 12px;
    background: var(--Backgrounds-light-blue, #edf6ff);
    align-items: center;

    .header,
    .cell {
      padding: 17px;
    }

    .cell {
      color: var(--Dark-blue, #0f171f);

      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      background: var(--Backgrounds-light-blue, #ffffff);
    }

    .cell-1 {
      grid-column: span 4;
    }
    .time {
      color: var(--Text-type-text, #99abbd);
      font-family: 'Plus Jakarta Sans';
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .icon {
      width: 24px;
      height: 24px;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .city-turk {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAT9SURBVHgBjVZbbFRVFF333DsznXbGuVPKoyBkDIpUNDyU+KOxJn7IB4IGIhZjLDEGfJYPP/ww0yZEEjFCTURiAjQaPyBRWgVLQisDKCDxAUEDCYGZVlrKDDOd9+M+3ecwQ2GmRc7H3Nxz9ll777XX3nck3GXZtq1amtahh688UxwKB8zkeMAqFcHc9UlHU9PZupZFvY6ZzX2SJEWmwpCmAA7Y2czeRN93renBI9Bj1yEpCllLE1csiwwt1M1/CL4VK3vue7q1S3K7I//rgMA7Uv0Hg7E9u1Rb18E8XkiyjCmzLJVg5rJwzp6bnP72u12exY/vmNIBgXde+/TjYOboIOTGRkiM4d6WBKtUgJ3Pw/9qe9f0l9d3otoBj3x0a9f27MkTUBqn3XZXgm2agKELc8nhKFM1WTo29Oh1NL6xcfOMtW0iE1YGDyT2fxvM/nIMyrSmMjCjqCj98YTg2zHvASjNc2BrtJdK0lOrdUTvjhkzMP717mDh1KkA31L4jz46ErzxTY+qNE0XUXBDMx6Fq+Ux+DdsokLOJ0uF4qczyqYYGcb43l3QrlyC5HRWOWFg9Q3q2O6de+ntWYlHP/bJlnD2zGmwhgbKicGMjkFta0fj+tdgkUNLsyC7ZJSujiB//GeYxLXib0T22ACsRByoFgEFaNyIwblmpV+x0ulVmdMnIXu94oxT4lmxSoAbJVPscfDYzs+RPXSAApAhuVxUEwPMe18teLkWzOMB++PC+0r6+NHVdrEIcAf8oMGDpjffgaHdBFcIPPpFNzIHD0CZOesmhVXLKhSIlvo7zlidG9pQuJUVw5eXiENumM/B89zzYE6lrBiGQngI6d79U4JzVXlXvEA1i8HKZkRmlSwsJgUU4/qYKlLmDqhh3MuehFnGYUxCduAnyKpaC87lS0oyRv6F+tmXlEUergcXIE+1LP1zrlL8ADMz6VudapN32e+nKG6CcREaY6Nk7KqlhWZS3aOLMWfPPqDeg1lvvUe1caNw5tcJZREMI/CIaCQOSAW0cjkq3IS+mc8PWzdqHDCiRh+OYLznK0i6Ruq1oFAP3N79RECS0TSM8JkjNkimxb/PoWLDqWp4qpWUFZ+kqagRiwUUz5+FkUpheMMryBzqhfORRYIJkYAknWWuuYGQTcUVd0hBuYF+VPKzdQsNy5bBvXQ5rHSq1gnVRfGpiAY/AA+y8Ptv0CPhiXFiWb2Mzb6/uxIyT0+noqV+6IXslMWIMKkezVu2wRGYD2N0RBSWRyiypnOLRgenlYNysUgOp3DM7Uwm94mQhjdvOqpdu9YqisO7kAbWzK5t8Cx/gmacJciUqS7ZE8eRHTwMM52GY85caJErsJIJoHrq8lGTTPQs6DvSLhyM9/cHoju2/qXMalYrcjRuROF7cR18a9vg8Hm5IMRk5Be0fAGp7/chc/hHIYwa6kwjqcUTS1sOhyK3ToY++rBDO//nduYra57PpERCpO5csBDOeQFBi351GNqliwJUjIpJmk+PxTsW9g92A1UfnMttLwXpG9wphl7lIn8S1zbpXkTqqqMHm/xjy+mNxzsfPjjQdWur2ubS+jUdyOeCzOtVca+LO7atpB6LdS7sD3XfcTSZfbhjY6B08UJQUf2v18z7qsXztHO5EEXe3hI6HanxfbfLF9atC8j5+CqiaDX9Y1hCElSFYiwzQpRFrFwhlC+ie2kolJwK4z+/c1ahCC4cGQAAAABJRU5ErkJggg==);
    }
    .city-itali {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANhSURBVHgBrVVdaBRXFP7uzJ3Zze7GjNXWSBucUOqLUg2UQmnB+GYfivogrdUWS+lj6ZYWoU+760NboaCxL7WWZgvFFio0Wmh8KE1oS4NoXCOiIEgGiRpF3Jl14+z83euZjYo/O2ui+eCyd+8953znnHvOGYY2kFIaYSjyAFsnJEwphUl7KAw2Y+wU52yIxA7T3sJ8cKU6aZZPHBiRQsqGFyUutxFJ+pHOf/8MutWq2cqW8vDBn2eP5D8b/rgyPjXWT862BaN7lSzMnJ7YMfXRe5X62TP5tgT7x74tHji+b09Gyxk5vRNzhZrLQbi3jEs783ucf0eKLQkOVgbzw+eHCss6u8kzhnlBSih6CtwwMP3VrkJ9opJ/gKByZcz8/cyvhWW57vhh8cRQFKhdBq5+82XBdV3zHsHP4z8VsqlOAwsApusIHdu4Wf5+sEkwMjlsTt64sCOlprAgoAxwisL5+69+WakYyvjFExtzqdxcNMHikqE04HFppDeUDRe1KesT5dy105s61EyyrK6AabR0FdH0BOTMNFhKbZ5BU5L10mnUjv3fzxu+tzab1qjk2SNekNMIjn8HtqgHEAL+8IdQnnkJ2rqvId3rQOiCr3m3NQHXEFyeNvmtYMbIpRNqPuYM6vB/ewtscW/TOEQA/8hWSK+G1JY/kiPgHOKmbfJIitYSd/Ksvf45WOY5+CM7AV6jc5LXOpB++yhY9+pmlK0ZGITvg2uqbtFfM0GMPI3A+94nBQXi6skmAV+1bdZ4EAH0Ni31oghKNmvzjJ6xqLnMxO6NK8ILoa7ZDs62zyrHQcfG2w2riHSWLD2ldHV0jSbHeZeEqiUQkP7sQijaGycIP0B25aohZcmiFQNOw8GCIo7a96Ct7D2slNaXbEVho1hACM+D/vwL5cVvbraanfLy8tUf2I2qzTDPKZpEUHPs9IYNpXjfJPhi/W6rU+8qNcIGngqUmtCuIvPKq8Xlm7da9whi/LDll731sF70Qw9PFAkZj8g4X/pssWfX7oG7xw8Mk0Pbjpaovz51PMee10eHlILr12xtRW/+xR8Plu6/emRald85tNfM9PQ5Xq2MOSAuWBEEox2vvdHXu2//wMP3rL1j0vQ8sVFCbqJhvZaKz7ijYtGtRfN7NK1jgKK1k2zcBmuVb+w7w17tAAAAAElFTkSuQmCC);
    }
    .city-brazil {
      background-image: url(data:image/png;base64,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);
    }
    .city-canada {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPASURBVHgBnVZNbBtFFP52dv2TpIm3adWkcLFbKCBBVU5ceoiEOEAFyQG4Fk5giaiOBIciFTuVkBBCagOXXiA+9AA3QKpEixoSWlFxgcIN0chuk9RpsONN7Nj7NzO8Wcco+K9JnzW2Z3be9733vTdjAz1MSmlyLjNCyJ/oM+f7XKrBuSirNXp+hkYcezXlpABcj0vb4bJuNz53juZag1DO7prIXVtNOWWrXHdEG2jXwaWsrdwvc9dNteKxnZP63cXMvcl3Lng122QMuzZdA2p//mEufzB5QTpOpiOBfTeXWpp6Ly3qNWiREPZiUgHt20ckt3Hv7FR6ZyYBgdKvcP5cWjNCYNHotsseTUoY+4fh3Pkbq59/lm7WJCD459IXadLeZJFId3ApoBm0nWk9SAR0Iqle/9Gs/nprNiCo53Jx6+qVtxR7L9NCBryVFcitGh6WCYvFULr81Zhqc1b7+fo4BO/poGkadAq++Ol5VK5dAQvTROueiVLCyeeoJr+dMTZvLEzosf0dNypgSTjSc1BfKsBZ/Au8XELs5VO0rgdAUsjOQYUjqMzNjTF/wzrRLRLVUYx03frlJu4nT8M4NBpEnn/zFLC1CVGrolvNtHAYdu5OnPHaltmWrvJRze3ZWHzxBWh9UUSfOwHpexCOjdirr6NyYwHLp99AOKwTWjsBMwzw9VKcgRza2JkObm1gJfUujJHDKJH2fL0ITTfA+gcoowVsXP6SCH0sZz6EpmRqPZk0F9UKtalu5NEmoQAbHMLIR59Q5MehUVcosKa+6qXqNvjKOA4kU42CC9EKogKyGOvry6tJq0ZUXoSfOIpD75+Dt7wEv7jWALdt+KsFgAo8kpyEPnywYxXoBgQbGrpt6NG+eYpgrH1LQ1j3wSoOTp2FYQ5jPXsJkWPP4MDYS/Cpm5yNKrSBAXQy6bkIHXnyW4NFzRm/VsqwaF/7JpcjHE8gciQRHPnq3A+IHn8egydPQgkiPIpd6a+3VJkkE44D4/H4dyyRzVp8szLfqRPURukLCFfAt308lv4Y5msTwXe11i7tdmB0cPVQKHs4mcwHpY+Mjr4tbMdCL6Ou8AiUK+Bed7mK3rIs/dlj04Gbektkv85TW05v78CjG2XsOtD7+zOJ6Yv5/wiUPX11/qL/oJBpbnwUk9SqvFTMHP3m+5nm2v9yferazWm3WJwiAgt7sCAcwS2xtpZSGA91KBcK8borZ3f9m0x/EMq3fo93Je9m9bqMa5oYp+M1QTeruhTN7Ud5uuvzVND5aJjN0LOuGf8LiiVHmkdTHzIAAAAASUVORK5CYII=);
    }
    .city-usa {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATYSURBVHgBrVVdbBRVFP7md3fb7XYGarBtjFMEEeUBDD4RdYGAEjX8JDz4gGkTg9FoXDQEjcFdYoJRCUVjgiQmgBEkGkQMBoPWFqFqFNIVKxSwdLWlLbt2/3dnd3ZmrmemKJguFZWTvZvcO3POd77vnHOHwyS2szOl9A4boZO/le8v6pZ2MWVpXomDV+LTJb8afTX97idLGhIH1Rdfi10rBl/tsGdA1+ZvjHUeO6+n9nyTC1smC45kbG3NggAkEVD9vOL1yUFDr2zLH+8eOPfIkp0DG0LadQH0j5ZCT78X71m7sD64vXUaPnqmEXVeHpGVUxBeORW71zaisV6AZZMzz0FQVWe1Vs783HP+0VWhSQH0shX5/kKpfThlKsm8BVniKRBD34iBX0Yr8Mo8RA44O1KBIDgezP2BMQiKqnC22X7mwWCkKsDx0/nQ0teHwn3k7PfxGCOA5VuHcLRPdxnoFRurtl3EoWgBNR4eHLkyw4BdKMAu0irkwSwLgiyG+5Yt+osJ5/yldKbNWd/fs3K+X9l/Io/ZTTJODxtYfY8fH58oYFaj5LJYcbcfh37MQ5sqIVEAtjwsY+kdPAjninEcbMNIi4HaeT5Vjbln7YdTO7d8NsZIInbwZI4te2OQ7ehIsULJYoejefbQlkH29pEkyxUt1tGbZ6vfGmIznutnh08VmWXbrGxOXLphd7oS6ZT9rmPp1jqv4Gosk7ZOtjnddqUI+Dh3H89arnQNfgHnRp0aEHnbduQHsycujiHIGFPE7l/15dmijcExA2u2j7jy1BJQIm/isXeGcWeTBzW0L5RttO6g580ynFkoGxZ4rwyOOomv2uwAKfcs98qBROeBk4VgPGti6ZwaHOkt4vabZcrSwJK7avDlaR0zpknov1TBwtk+HD2r49YpIsYkFRuL+7DIOAWd81QFsLKZLnEwac6t83Jou09F2731IDDs+zaLdQ+oeDxYj89/KmBPdw5PLa7HEwsVAiji/e4sLhkSzEQclbHzMHhfVQAzm9H4TNFWcjqDU4NaWs4QOa0qkcaBGoE6RsQZqoFJuiqk/0xicyFBNSCROYHGWiaZrrVEURMd/UQqbH/cwPq9cTTUCfCQxsPpCjZ8kMBNAQEyTZczeC/si2NavQiBdB9v8MnNeUVUa4SYJJpaR68Om1qCoz5uVkUcO1uirMf3TYoImnBULOa6BaibdI6HXSKfbBa2UKleg3w2LU6/WY6RrtqUWgHC5bRKNLUOM5m/siccl4nbHSZDuZyHZ85c1PkUCLZUNX0rk4ly1Kvhiski3HVQ/ps5bEViMflbIQdAKRt2CjfYmHsJGi0iaZw2K2aXKQhBHjfOmG3v8oi+GDeOxrRsNNpjFYsKL0n4f+YWP83d0jBPbZkdE50jYhHL//DdpuGXnm8XAnU0/v+RCxXSyucgBdTIbfsPxdyjq58XurvDQ5tfjrggsueykP8ieDYDTpIjMz/8dNMVPldZ7YIFm5o3b11HL6WtVNKRznX8p8DOh8b8PZ6WtOmhq4NPYPCnsVRKG927O5z/6otWVjHA++iuEUWSThgPSNc0KCgzTdh60flcdgmLF7e1tD0Zm4CPSUwfGNCKp6LLc193rLCTyblmKqkwowzO442JUxtiUlNzl9ky682Wtrb0tWL8AUKBZEPA/3ZBAAAAAElFTkSuQmCC);
    }

    .icon-graf {
      width: 17px;
      height: 17px;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .graf-1 {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxNyAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeT0iOS41IiB3aWR0aD0iNSIgaGVpZ2h0PSI4IiByeD0iMSIgZmlsbD0iIzY3OTREQSIvPgo8cmVjdCB4PSI2IiB5PSI1LjUiIHdpZHRoPSI1IiBoZWlnaHQ9IjEyIiByeD0iMSIgZmlsbD0iI0RFREVERSIvPgo8cmVjdCB4PSIxMiIgeT0iMC41IiB3aWR0aD0iNSIgaGVpZ2h0PSIxNyIgcng9IjEiIGZpbGw9IiNERURFREUiLz4KPC9zdmc+Cg==);
    }

    .graf-2 {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxNyAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeT0iOS41IiB3aWR0aD0iNSIgaGVpZ2h0PSI4IiByeD0iMSIgZmlsbD0iIzY3OTREQSIvPgo8cmVjdCB4PSI2IiB5PSI1LjUiIHdpZHRoPSI1IiBoZWlnaHQ9IjEyIiByeD0iMSIgZmlsbD0iIzY3OTREQSIvPgo8cmVjdCB4PSIxMiIgeT0iMC41IiB3aWR0aD0iNSIgaGVpZ2h0PSIxNyIgcng9IjEiIGZpbGw9IiM2Nzk0REEiLz4KPC9zdmc+Cg==);
    }

    .graf-3 {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxNyAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeT0iOS41IiB3aWR0aD0iNSIgaGVpZ2h0PSI4IiByeD0iMSIgZmlsbD0iIzY3OTREQSIvPgo8cmVjdCB4PSI2IiB5PSI1LjUiIHdpZHRoPSI1IiBoZWlnaHQ9IjEyIiByeD0iMSIgZmlsbD0iIzY3OTREQSIvPgo8cmVjdCB4PSIxMiIgeT0iMC41IiB3aWR0aD0iNSIgaGVpZ2h0PSIxNyIgcng9IjEiIGZpbGw9IiNERURFREUiLz4KPC9zdmc+Cg==);
    }
  }
</style>
