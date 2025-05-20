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
      <div class="account-data-total"></div>
      <div class="account-data-link-account-data"></div>
    </div>
    <div class="account-running"></div>
  </div>
</template>

<style scoped lang="scss">
  .account-data {
    padding: 30px;
    width: 752px;
    height: 132px;
    border-radius: 30px;
    border: 1px solid #edf2f8;

    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(145, 159, 185, 0.4);
  }

  .account-data-picture {
    position: relative;
    width: 218px;
    height: 120px;
    background-image: url('/img/account-map.png');
  }

  .account-data-picture-b-acc {
    padding: 8px;
    color: #fff;
  }

  .account-data-picture-b-acc__name {
  }

  .account-data-picture-1 {
    width: 218px;
    height: 132px;
    background-image: url('/img/no-picture-1.png');
  }

  .icon-port {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD5SURBVHgBrZI9TsNQEIRnnx8RgghqDsAFaGiCKOAOtDR2h8QJQOQUEIQ4SLokl8gVktaKoijeyT5FjvLznCL2VPbup90de4AGJLHi1f3rrbbOurtVGlu85cP/6T7vY0O05ceHC8Krf0FksYCUi8cs2xoBR/dtmz9UZFJWHeTO2EwhKYRJyc4Gfz/SfkiJOiLUoa4Erv4QBKt2TmU39EizSx4/xtTuZJ+xZj7qfZXPFYzkTzfd8GGLdQYOI5MPfzd2jdPYqUEhJ64ic7jspM/iuYQmZkulwkg8bBtE0EcRQD2GoaG/08gQsl5iTf6cej2XpIcTxQXf0YRWLTpLZ0xxHp8AAAAASUVORK5CYII=);
  }

  .icon-green-arrow {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuNjMxOCAwLjgwNjY1NkM3LjI5MDk2IDAuNDY1ODExIDYuNzM4MzQgMC40NjU4MTEgNi4zOTc0OSAwLjgwNjY1NkwwLjg0MzEwOCA2LjM2MTA0QzAuNTAyMjY0IDYuNzAxODkgMC41MDIyNjQgNy4yNTQ1MSAwLjg0MzEwOCA3LjU5NTM1QzEuMTgzOTUgNy45MzYxOSAxLjczNjU3IDcuOTM2MTkgMi4wNzc0MiA3LjU5NTM1TDcuMDE0NjUgMi42NTgxMkwxMS45NTE5IDcuNTk1MzVDMTIuMjkyNyA3LjkzNjE5IDEyLjg0NTMgNy45MzYxOSAxMy4xODYyIDcuNTk1MzVDMTMuNTI3IDcuMjU0NTEgMTMuNTI3IDYuNzAxODkgMTMuMTg2MiA2LjM2MTA0TDcuNjMxOCAwLjgwNjY1NlpNNy44ODc0NCAxNC41MTU2TDcuODg3NDQgMS40MjM4MUg2LjE0MTg2TDYuMTQxODYgMTQuNTE1Nkg3Ljg4NzQ0WiIgZmlsbD0iIzEzOTQxNCIvPgo8L3N2Zz4K);
  }

  .icon-red-arrow {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxMyAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuOTAxNCAxNC4xMzA4QzYuMjQyMjUgMTQuNDcxNyA2Ljc5NDg2IDE0LjQ3MTcgNy4xMzU3MSAxNC4xMzA4TDEyLjY5MDEgOC41NzY0NkMxMy4wMzA5IDguMjM1NjEgMTMuMDMwOSA3LjY4Mjk5IDEyLjY5MDEgNy4zNDIxNUMxMi4zNDkzIDcuMDAxMzEgMTEuNzk2NiA3LjAwMTMxIDExLjQ1NTggNy4zNDIxNUw2LjUxODU1IDEyLjI3OTRMMS41ODEzMiA3LjM0MjE1QzEuMjQwNDggNy4wMDEzMSAwLjY4Nzg1OSA3LjAwMTMxIDAuMzQ3MDE0IDcuMzQyMTVDMC4wMDYxNjk4IDcuNjgyOTkgMC4wMDYxNjk4IDguMjM1NjEgMC4zNDcwMTQgOC41NzY0Nkw1LjkwMTQgMTQuMTMwOFpNNS42NDU3NyAwLjQyMTg3NUw1LjY0NTc3IDEzLjUxMzdINy4zOTEzNEw3LjM5MTM0IDAuNDIxODc1TDUuNjQ1NzcgMC40MjE4NzVaIiBmaWxsPSIjRTQzQjNCIi8+Cjwvc3ZnPgo=);
  }
</style>
