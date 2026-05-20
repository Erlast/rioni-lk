<script setup lang="ts"></script>

<template>
  <v-container class="pa-0" max-width="1280">
    <v-sheet class="footer pa-10">
      <v-sheet class="d-flex flex-column ga-4">
        <v-sheet class="footer-top__logo"></v-sheet>

        <v-sheet class="d-flex flex-column ga-4">
          <v-sheet class="text-white">адрес.почты@gmail.ru</v-sheet>
          <v-sheet class="d-flex flex-column">
            <v-sheet class="text-white">+995 595 43 66 55</v-sheet>
            <v-sheet class="text-type-text">(Офис) Пн-Пт 9:00-20:00</v-sheet>
          </v-sheet>
        </v-sheet>

        <v-sheet class="d-felx flex-column ga-4 mt-6">
          <v-sheet class="text-type-text mb-2">Меню</v-sheet>
          <v-sheet class="d-flex ga-2">
            <v-sheet class="d-flex flex-column ga-2 text-white" width="50%">
              <v-sheet>О нас</v-sheet>
              <v-sheet>Почему Риони</v-sheet>
              <v-sheet>Услуги</v-sheet>
              <v-sheet>Тарифы</v-sheet>
              <v-sheet>Обучение</v-sheet>
              <v-sheet>Тесты</v-sheet>
            </v-sheet>

            <v-sheet class="d-flex flex-column ga-2 text-white">
              <v-sheet>Новости</v-sheet>
              <v-sheet>Документы</v-sheet>
              <v-sheet>FAQ</v-sheet>
              <v-sheet>Карьера</v-sheet>
            </v-sheet>
          </v-sheet>
        </v-sheet>

        <v-sheet class="d-flex ga-2">
          <v-img src="/img/social/facebook.png" />
          <v-img src="/img/social/xcorp.png" />
          <v-img src="/img/social/linkedin.png" />
          <v-img src="/img/social/youtube.png" />
          <v-img src="/img/social/tiktok.png" />
          <v-img src="/img/social/instagram.png" />
        </v-sheet>
      </v-sheet>
      <v-sheet class="d-flex flex-column ga-2 mt-6">
        <v-sheet class="text-white">Есть предложения? Свяжитесь с нами</v-sheet>
        <v-form>
          <v-textarea name="text" placeholder="Комментарий"></v-textarea>
          <v-btn variant="flat" type="submit" class="bg-hard-blue text-white rounded-mg" block>
            Отправить
          </v-btn>
        </v-form>
      </v-sheet>
      <v-sheet class="mt-6 text-big" style="line-height: 1">
        <span class="text-white font-8">
          Общество с ограниченной ответственностью «Rioni Capital». ID 405664017.
          <br />
          Bloomberg LEI: 254900SE3WOGKBD2RF35. Уважаемые пользователи, обращаем ваше внимание, что
          до получения лицензии национального банка Грузии компания «RIONI CAPITAL LLC» не оказывает
          брокерские услуги на финансовом рынке.
          <br />
          Ознакомиться с информацией в отношении ООО «Rioni Capital» можно на официальном сайте
          компании в сети Интернет по адресу: (Link in progress) Получить подробную информацию об
          услугах и тарифах ООО «Rioni Capital», можно по адресу: I-й переулок - Ольги Сологашвили
          5, Тбилиси, 0131, Грузия; в сети Интернет по адресу: (Link in progress), по телефону: +995
          595436655. Ознакомиться с обучающим материалами по финансовым продуктам можно в сети
          интернет по адресу: (Link in progress). Размещенная на сайте информация носит
          исключительно информативный характер, не является индивидуальной инвестиционной
          рекомендацией, гарантией и/или обещанием эффективности деятельности (доходности вложений)
          в будущем, и финансовые инструменты либо операции, упомянутые в ней, могут не
          соответствовать вашему инвестиционному профилю и инвестиционным целям и ожиданиям. ООО
          "Rioni Capital" не гарантирует достижения ожидаемой доходности. Прежде чем начать
          инвестировать на финансовом рынке, следует внимательно ознакомиться с рисками
          сопутствующими этому процессу. Стоимость финансовых активов, в которые вы вложили свои
          средства, может увеличиваться и уменьшаться, результаты инвестирования в прошлом не
          определяют доходы в будущем, государство не гарантирует доходность ваших инвестиций.
          Взимание комиссий уменьшит доходность ваших инвестиций. Определение соответствия
          финансового инструмента либо операции вашим интересам, инвестиционным целям,
          инвестиционному горизонту и уровню допустимого риска является вашей задачей. ООО «Rioni
          Capital» не несет ответственности за возможные убытки в случае совершения операций либо
          инвестирования в финансовые инструменты, упомянутые в данной информации, и не рекомендует
          использовать указанную информацию в качестве единственного источника информации при
          принятии инвестиционного решения. Rioni Capital LLC. All rights reserved ® Tbilisi.
          Georgia.2024
        </span>
      </v-sheet>
      <v-sheet class="d-flex flex-column ga-4 text-white font-small mt-6">
        <v-sheet>Политика конфиденциальности</v-sheet>
        <v-sheet>Политика использования cookies</v-sheet>
        <v-sheet>Политика обработки персональных данных</v-sheet>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<style scoped lang="scss">
  .footer {
    background-image: url('/img/footer-mobile-bg.png');
    background-size: cover;
  }
  .footer-top__logo {
    width: 170px;
    height: 64px;
    background-image: url('/img/footer-logo.png');
  }

  .text-big {
    padding: 20px 0;
    border-bottom: 1px solid var(--color-DarkBlue);
    border-top: 1px solid var(--color-DarkBlue);
  }
</style>
