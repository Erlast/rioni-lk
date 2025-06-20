<script setup lang="ts"></script>

<template>
  <div class="market-table b-section">
    <div class="market-table-content">
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"><div class="desc-column">За ед.</div></div>
      <div class="cell">
        <div class="desc-column">Всего</div>
      </div>
      <div class="cell">
        <div class="desc-column">Bid</div>
      </div>
      <div class="cell">
        <div class="desc-column">Ask</div>
      </div>
      <div class="cell">
        <div class="desc-column">Цена в USD</div>
      </div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"><div class="icon-favorite"></div></div>

      <div class="cell">1</div>
      <div class="cell cell-name">
        <div class="ring"></div>
        <b>NVIDIA corporation</b>
      </div>
      <div class="cell">AAPl</div>
      <div class="cell bg-green">72,11</div>
      <div class="cell">74,50</div>
      <div class="cell">72,11</div>
      <div class="cell bg-red">74,50</div>
      <div class="cell">+44 338,34</div>
      <div class="cell"><div class="buy">купить</div></div>
      <div class="cell"><div class="sell">продать</div></div>
      <div class="cell"><div class="add-star"></div></div>

      <div class="cell">2</div>
      <div class="cell cell-name">
        <div class="ring"></div>
        <b>Paypal Holdings Inc</b>
      </div>
      <div class="cell">AAPl</div>
      <div class="cell bg-green">72,11</div>
      <div class="cell">74,50</div>
      <div class="cell">72,11</div>
      <div class="cell bg-red">74,50</div>
      <div class="cell">+44 338,34</div>
      <div class="cell"><div class="buy">купить</div></div>
      <div class="cell"><div class="sell">продать</div></div>
      <div class="cell"><div class="star"></div></div>

      <div class="cell">3</div>
      <div class="cell cell-name">
        <div class="ring"></div>
        <b>Apple Inc</b>
      </div>
      <div class="cell">AAPl</div>
      <div class="cell bg-green">72,11</div>
      <div class="cell">74,50</div>
      <div class="cell">72,11</div>
      <div class="cell bg-red">74,50</div>
      <div class="cell">+44 338,34</div>
      <div class="cell"><div class="buy">купить</div></div>
      <div class="cell"><div class="sell">продать</div></div>
      <div class="cell"><div class="star"></div></div>

      <div class="cell">4</div>
      <div class="cell cell-name">
        <div class="ring"></div>
        <b>Alphabet Inc class</b>
      </div>
      <div class="cell">AAPl</div>
      <div class="cell green">72,11</div>
      <div class="cell">74,50</div>
      <div class="cell">72,11</div>
      <div class="cell red">74,50</div>
      <div class="cell">+44 338,34</div>
      <div class="cell"><div class="buy">купить</div></div>
      <div class="cell"><div class="sell">продать</div></div>
      <div class="cell"><div class="add-star"></div></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .market-table {
    margin-top: 25px;
  }

  .market-table-content {
    display: grid;
    grid-template-columns: 1fr 5fr 3fr 2fr 2fr 2fr 2fr 3fr 2fr 2fr 2fr;
    grid-template-rows: repeat(2, 1fr);
    border-radius: 12px;
    padding: 2em;

    align-items: center;
  }
  .cell-name {
    place-self: c;
  }

  .cell {
    display: flex;
    align-items: center;
    color: var(--Dark-blue, #0f171f);
    font-family: 'Plus Jakarta Sans';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    background: var(--Backgrounds-light-blue, #ffffff);
  }
  .ring {
    margin-right: 5px;
    width: 16px;
    height: 16px;
    background-size: contain;
    background-repeat: no-repeat;
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjgiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl80OTg0XzIwMDApIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNDk4NF8yMDAwIiB4MT0iMS4zOTA4OSIgeTE9IjEuNTgyNDIiIHgyPSIxNi42ODIyIiB5Mj0iNy4zMjc3NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjNEE3OEMxIi8+CjxzdG9wIG9mZnNldD0iMC4xOTA4ODUiIHN0b3AtY29sb3I9IiM0MjdDQUMiLz4KPHN0b3Agb2Zmc2V0PSIwLjYxMjYxMiIgc3RvcC1jb2xvcj0iIzFDNUNBMCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyMzM5NUIiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K);
  }
  .desc-column {
    color: #b6b6b6;
    font-family: 'Plus Jakarta Sans';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .buy {
    padding: 3px;
    border-radius: 6px;
    background: var(--Backgrounds-light-green, #e7f8f0);
    color: var(--Green-total, #0c342c);
    font-family: 'Plus Jakarta Sans';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .sell {
    padding: 3px;
    border-radius: 6px;
    background: #ff8b8b;
    color: var(--Backgrounds-white, #fff);
    font-family: 'Plus Jakarta Sans';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .star {
    width: 16px;
    height: 16px;
    background-size: contain;
    background-repeat: no-repeat;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGsSURBVHgBpZRLKERhGIbf/xzGpRkiBiM7QlZChBSNnbIxFpOFXIY0CzuScllZKcrCwt5lhxWRrZKyQLlEisk1xkzDzJzzOTPN5PzTnLnwbs75+t7/+d6+/n4gjl7v+vvosncK/1FpKdLIYSPa7yZ7e6YplpfFatLL8Dd8sg7n75B0eE5pXjdqeYUYHAFeBRKS6EO+pVqfj2QTkWPICSJD0KEkCny/RHJktGyYok9VyWzOyb4/tprfr3uXgpAIpUus6Omga/FksbGrqTyP6zPP/eBeeqrYBr8MzcyhRFElMDx9uHcYPQ5LkGTtXcUDBT0MwsTslhEEGX+VcnZ0frswOKemBplHm7ZPZaqQVCKZ5IahjZzDKzjVbZEebF5EXgktEDG5yr6WcXYGb9jGHVNgciIg1rouBjKFa2766kJtFRLU6XxdpbrmQJ099RYkKKFAb9UEed9c3UhQxuJciyYoy2io4Nwio9tX9xhK9DPKTedauTpdmbpO4boeX+iHweX3LxtMKyP4Xeg0XQ9M49Y5qYwX4Zd4slrkso9/3vQtI/arAOexde5it4Pb0Q/vSJXUmoQHawAAAABJRU5ErkJggg==);
  }
  .add-star {
    width: 16px;
    height: 16px;
    background-size: contain;
    background-repeat: no-repeat;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADvSURBVHgBlVJBDoIwENyt3sTEz4g349mLT/AHxA9oA/gAEz8gT9CEcPUMnyFBj7BuaSBNEQhzaGbb3c60uwgGVju5ggHkbz9vOKrFWV89QLoRUIwgyv5SOvDifdLzvQ4dNyTeRBiFFI4bVIoJbY+eLE5WFgLZl/kVAcaqRmgH2FFbroPjwg2P9j5nakUYAnZctJjbqQtW0lRslVmOazff9ByZF9mFhgX9X22Mw4pUZJeHIvzGJo700aVHYCJqRdNRgyLjN8G/1hofxgNQgZTj6lINQEitIjf65CTzEjbhq6+Gx3GGCeyZerWueThlyH+/I0yGbUmAKwAAAABJRU5ErkJggg==);
  }
  .bg-green {
    background: #d6ffec;
  }

  .bg-red {
    background: #ffe1e1;
  }
  .color-green {
    background: #d6ffec;
  }

  .color-red {
    background: #ffe1e1;
  }
</style>
