<script setup lang="ts"></script>

<template>
  <div class="notification">
    <div class="notification-header">Сортировать</div>
    <div class="notification-body">
      <div class="notification-body-checker">
        <v-checkbox
          label="Все уведомления"
          true-icon="rioni:checkOn"
          false-icon="rioni:checkOff"
          hide-details
          class="checkbox"
        ></v-checkbox>
        <v-checkbox
          label="Алерты"
          true-icon="rioni:checkOn"
          false-icon="rioni:checkOff"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Корпоративные действия"
          true-icon="rioni:checkOn"
          false-icon="rioni:checkOff"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Аналитика"
          true-icon="rioni:checkOn"
          false-icon="rioni:checkOff"
          hide-details
        ></v-checkbox>
        <v-checkbox
          label="Новости"
          true-icon="rioni:checkOn"
          false-icon="rioni:checkOff"
          hide-details
        ></v-checkbox>
      </div>
      <div class="notification-body-messages">
        <div class="notification-body-messages-block">
          <div class="col__1"><div class="h-text">Сегодня</div></div>
          <div class="col__2"><div class="h-text">Дата</div></div>
          <div class="col__3"><div class="h-text">Время</div></div>

          <div class="col__1">
            <div class="list-mark list-mark--shoow"></div>
            Уведомление по операции или любое другое
          </div>
          <div class="col__2"><div class="h-text-date">8 дек</div></div>
          <div class="col__3"><div class="h-text-date">19:50</div></div>

          <div class="col__1">
            <div class="list-mark list-mark--shoow"></div>
            Уведомление по операции или любое другое
          </div>
          <div class="col__2"><div class="h-text-date">8 дек</div></div>
          <div class="col__3"><div class="h-text-date">16:43</div></div>

          <div class="col__1">
            <div class="list-mark"></div>
            Уведомление по операции или любое другое
          </div>
          <div class="col__2"><div class="h-text-date">8 дек</div></div>
          <div class="col__3"><div class="h-text-date">12:24</div></div>
          <div class="col__1">
            <div class="list-mark"></div>
            Уведомление по операции или любое другое
          </div>
          <div class="col__2"><div class="h-text-date">8 дек</div></div>
          <div class="col__3"><div class="h-text-date">12:24</div></div>
          <div class="col__1">
            <div class="list-mark"></div>
            Уведомление по операции или любое другое
          </div>
          <div class="col__2"><div class="h-text-date">8 дек</div></div>
          <div class="col__3"><div class="h-text-date">12:24</div></div>
          <div class="col__1">
            <div class="list-mark"></div>
            Уведомление по операции или любое другое
          </div>
          <div class="col__2"><div class="h-text-date">8 дек</div></div>
          <div class="col__3"><div class="h-text-date">12:24</div></div>
        </div>
        <div class="notification-body-messages-block">
          <div class="col__1"><div class="h-text">Вчера</div></div>
          <div class="col__2"><div class="h-text">Дата</div></div>
          <div class="col__3"><div class="h-text">Время</div></div>

          <div class="col__1">
            <div class="list-mark list-mark--shoow"></div>
            Уведомление по операции или любое другое
          </div>
          <div class="col__2"><div class="h-text-date">8 дек</div></div>
          <div class="col__3"><div class="h-text-date">19:50</div></div>

          <div class="col__1">
            <div class="list-mark list-mark--shoow"></div>
            Уведомление по операции или любое другое
          </div>
          <div class="col__2"><div class="h-text-date">8 дек</div></div>
          <div class="col__3"><div class="h-text-date">16:43</div></div>

          <div class="col__1">
            <div class="list-mark"></div>
            Уведомление по операции или любое другое
          </div>
          <div class="col__2"><div class="h-text-date">8 дек</div></div>
          <div class="col__3"><div class="h-text-date">12:24</div></div>
          <div class="col__1">
            <div class="list-mark"></div>
            Уведомление по операции или любое другое
          </div>
          <div class="col__2"><div class="h-text-date">8 дек</div></div>
          <div class="col__3"><div class="h-text-date">12:24</div></div>
          <div class="col__1">
            <div class="list-mark"></div>
            Уведомление по операции или любое другое
          </div>
          <div class="col__2"><div class="h-text-date">8 дек</div></div>
          <div class="col__3"><div class="h-text-date">12:24</div></div>
          <div class="col__1">
            <div class="list-mark"></div>
            Уведомление по операции или любое другое
          </div>
          <div class="col__2"><div class="h-text-date">8 дек</div></div>
          <div class="col__3"><div class="h-text-date">12:24</div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .notification-header {
    padding: 15px 50px;
    border-radius: 10px 10px 0px 0px;
    background-color: #cad9f6;
  }
  .notification-body {
    background-color: #edf6ff;
  }

  .notification-body-checker,
  .notification-body-messages {
    padding: 25px 30px;
  }

  .notification-body {
    display: flex;
  }

  .notification-body-messages-block {
    display: grid;
    grid-template-columns: 130% 15% 15%;
    grid-template-rows: 2;
    margin-bottom: 20px;

    .h-text {
      color: #2e4376;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .h-text-date {
      color: #2e4376;
      font-family: 'Plus Jakarta Sans';
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .list-mark {
      margin-right: 14px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #6794da;
    }

    .list-mark--shoow {
      background: #2c4d90;
    }

    .col__1,
    .col__2,
    .col__3 {
      margin-bottom: 8px;
      display: flex;
      justify-content: start;
      align-items: center;
      color: #0f171f;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .col__1 {
    }

    .col__2 {
    }

    .col__3 {
    }
  }
</style>
