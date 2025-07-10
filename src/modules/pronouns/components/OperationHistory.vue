<script setup lang="ts"></script>

<template>
  <div class="operation b-section"></div>
  <div class="b-block"><div class="b-block__name">Операции</div></div>
  <div class="operation-btn">
    <div class="operation-btn-group">
      <div class="btn-b bg-color-A1">Пополнение счета</div>
      <div class="btn-b bg-color-A1">Торговые поручения</div>
      <div class="btn-b bg-color-A1">Вывод денежных средств</div>
    </div>
    <div class="operation-btn-group">
      <div class="btn-b bg-color-A2">Зачисление бумаг</div>
      <div class="btn-b bg-color-A2">Перевод бумаг</div>
    </div>
  </div>
  <div class="b-block"><div class="b-block__name">История операций</div></div>
  <div class="operation-table">
    <table>
      <thead>
        <tr>
          <th>№ Поручения</th>
          <th>Дата создания</th>
          <th>Дата исполнения</th>
          <th>Операция</th>
          <th>ЦБ</th>
          <th>Кол-во</th>
          <th>Сумма</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>3934920</td>
          <td>18.05.2025</td>
          <td>18.05.2025</td>
          <td>Перевод ДС</td>
          <td>-</td>
          <td>-</td>
          <td>450,04</td>
          <td><div class="color-status-processing">В обработке</div></td>
        </tr>
        <tr>
          <td>3058334</td>
          <td>17.05.2025</td>
          <td>17.05.2025</td>
          <td>Зачисление ДС</td>
          <td>-</td>
          <td>-</td>
          <td>334,51</td>
          <td>
            <div class="color-status-completed">Исполнено</div>
          </td>
        </tr>
        <tr>
          <td>4553505</td>
          <td>17.05.2025</td>
          <td>17.05.2025</td>
          <td>Списание ДС</td>
          <td>-</td>
          <td>-</td>
          <td>752,90</td>
          <td>
            <div class="color-status-refused">Отказано</div>
          </td>
        </tr>
        <tr>
          <td>2927095</td>
          <td>15.05.2025</td>
          <td>15.05.2025</td>
          <td>Зачисление ДС</td>
          <td>-</td>
          <td>-</td>
          <td>656,12</td>
          <td>
            <div class="color-status-completed">Исполнено</div>
          </td>
        </tr>
        <tr>
          <td>2758040</td>
          <td>13.05.2025</td>
          <td>13.05.2025</td>
          <td>Зачисление ДС</td>
          <td>-</td>
          <td>-</td>
          <td>118,59</td>
          <td>
            <div class="color-status-completed">Исполнено</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
  .operation-btn {
    margin-bottom: 33px;
  }

  .operation-btn-group {
    display: flex;
    margin-bottom: 13px;
    .btn-b {
      margin-right: 12px;
    }
  }

  .operation-table {
    margin-bottom: 50px;
  }

  table {
    border-collapse: collapse;
    border-radius: 10px;
    background: var(--Backgrounds-light-green, #e7f8f0);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
  }

  thead {
    color: var(--Elements-check, #4ba67c);
  }

  th {
    padding: 15px 22px;
    text-align: center;
    font-weight: 400;
  }

  th:first-child {
    padding-left: 30px;
  }

  th:last-child {
    margin-right: 30px;
  }

  td {
    padding: 15px 22px;
    text-align: center;
  }

  tbody {
    background: #fafafa;

    .color-status-processing {
      font-weight: bold;
    }

    .color-status-processing {
      font-weight: bold;
    }

    .color-status-completed {
      font-weight: bold;
      color: #4ba67c;
    }

    .color-status-refused {
      font-weight: bold;
      color: #ff5d5d;
    }
  }
</style>
