<script setup lang="ts"></script>

<template>
  <div class="structure b-section">
    <div class="b-block">
      <div class="b-block__name">Состав портфеля</div>
    </div>

    <div class="structure-tab">
      <div class="structure-tab-li structure-tab--hover">Акции</div>
      <div class="structure-tab-li">Облигации</div>
      <div class="structure-tab-li">Валюта</div>
      <div class="structure-tab-li">Деривативы</div>
    </div>
    <div class="operation-table">
      <table>
        <thead>
          <tr>
            <th>Наименование</th>
            <th>Тикер</th>
            <th>Кол-во</th>
            <th>Усредненная цена</th>
            <th>Текущая цена</th>
            <th>Прибыль/Убыток</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NVIDIA corporation</td>
            <td>AAPl</td>
            <td>10</td>
            <td>72,11</td>
            <td>74,50</td>
            <td>72,11</td>
            <td>74,50</td>
            <td>+44 338,34></td>
          </tr>
          <tr>
            <td>NVIDIA corporation</td>
            <td>AAPl</td>
            <td>10</td>
            <td>72,11</td>
            <td>74,50</td>
            <td>72,11</td>
            <td>74,50</td>
            <td>+44 338,34></td>
          </tr>
          <tr>
            <td>NVIDIA corporation</td>
            <td>AAPl</td>
            <td>10</td>
            <td>72,11</td>
            <td>74,50</td>
            <td>72,11</td>
            <td>74,50</td>
            <td>+44 338,34></td>
          </tr>
          <tr>
            <td>NVIDIA corporation</td>
            <td>AAPl</td>
            <td>10</td>
            <td>72,11</td>
            <td>74,50</td>
            <td>72,11</td>
            <td>74,50</td>
            <td>+44 338,34></td>
          </tr>
          <tr>
            <td>NVIDIA corporation</td>
            <td>AAPl</td>
            <td>10</td>
            <td>72,11</td>
            <td>74,50</td>
            <td>72,11</td>
            <td>74,50</td>
            <td>+44 338,34></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="operation-btn">
      <div class="b-block"><div class="b-block__name">Действия</div></div>
      <div class="operation-btn-group">
        <div class="btn-b bg-color-A1">Отчетность</div>
        <div class="btn-b bg-color-A2">История операций</div>
        <div class="btn-b bg-color-A3">Аналитика</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .structure {
    margin-bottom: 30px;
  }

  .structure-tab {
    display: flex;
    color: var(--Text-Grey-text, #a7a7a7);
    font-family: 'Plus Jakarta Sans';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-bottom: 1px solid;

    .structure-tab-li {
      padding: 5px 15px;
    }

    .structure-tab--hover {
      color: black;
      border-color: black;
      border-bottom: 3px solid;
    }
  }
  table {
    margin-bottom: 30px;
  }
  thead th {
    padding: 5px 10px;
    color: #000;
    font-family: 'Plus Jakarta Sans';
    font-size: 14px;
    font-style: normal;
    font-weight: lighter;
    line-height: normal;
    text-align: center;
    text-align: center;
  }

  .operation-btn-group {
    display: flex;
  }

  .btn-b {
    margin-right: 10px;
  }
</style>
