<script setup lang="ts"></script>
<template>
  <v-container class="pa-0" max-width="1280">
    <div class="footer">
      <div class="footer-top">
        <div class="footer-top__logo"></div>
        <div class="footer-top-social">
          <div class="footer-top-social-element">
            <div class="footer-top-social-element__img mini-img-f"></div>
          </div>
          <div class="footer-top-social-element">
            <div class="footer-top-social-element__img mini-img-x"></div>
          </div>
          <div class="footer-top-social-element">
            <div class="footer-top-social-element__img mini-img-in"></div>
          </div>
          <div class="footer-top-social-element">
            <div class="footer-top-social-element__img mini-img-y"></div>
          </div>
          <div class="footer-top-social-element">
            <div class="footer-top-social-element__img mini-img-t"></div>
          </div>
          <div class="footer-top-social-element">
            <div class="footer-top-social-element__img mini-img-i"></div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-bottom-item">
          <div class="footer-bottom-block">
            <div class="footer-bottom-block__name">Меню</div>
            <div class="footer-bottom-block__body">
              <div class="footer-group-menu">
                <ul class="footer-menu">
                  <li class="footer-menu__item">О нас</li>
                  <li class="footer-menu__item">Почему Риони</li>
                  <li class="footer-menu__item">Услуги</li>
                  <li class="footer-menu__item">Тарифы</li>
                  <li class="footer-menu__item">Обучение</li>
                  <li class="footer-menu__item">Тесты</li>
                </ul>
                <ul class="footer-menu">
                  <li class="footer-menu__item">Новости</li>
                  <li class="footer-menu__item">Документы</li>
                  <li class="footer-menu__item">FAQ</li>
                  <li class="footer-menu__item">Карьера</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom-item">
          <div class="footer-bottom-block">
            <div class="footer-bottom-block__name">Контакты</div>
            <div class="footer-bottom-block__body">
              +995 595 43 66 55
              <span style="color: #99abbd">(Офис) Пн-Пт 9:00-20:00</span>
            </div>
          </div>
          <div class="footer-bottom-block">
            <div class="footer-bottom-block__name">Почта</div>
            <div class="footer-bottom-block__body">адрес.почты@gmail.ru</div>
          </div>

          <v-sheet class="d-flex flex-column ga-2">
            <v-sheet class="text-white">Есть предложения? Свяжитесь с нами</v-sheet>
            <v-form>
              <v-textarea name="text" placeholder="Комментарий" class="text-black" />
              <v-btn variant="flat" type="submit" class="bg-hard-blue text-white rounded-mg" block>
                Отправить
              </v-btn>
            </v-form>
          </v-sheet>
        </div>
      </div>
      <div class="footer-bottom-text">
        <span class="footer-spcial-text">
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
      </div>
      <div class="footer-politics">
        <div class="footer-politics__item">Политика конфиденциальности</div>
        <div class="footer-politics__item">Политика использования cookies</div>
        <div class="footer-politics__item">Политика обработки персональных данных</div>
      </div>
    </div>
  </v-container>
</template>
<style scoped lang="scss">
  .footer {
    padding: 34px 70px 0 70px;
    background-image: url('/img/footer-bg.png');
  }
  .footer-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    padding-bottom: 24px;
    width: 100%;
    border-bottom: 1px solid #1a3472;
  }
  .footer-top__logo {
    width: 170px;
    height: 64px;
    background-image: url('/img/footer-logo.png');
  }
  .footer-top-social {
    display: flex;
  }
  .footer-top-social-element {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
    border-radius: 16px;
    width: 80px;
    height: 80px;

    background-repeat: no-repeat;
    background: #1a3472;
    cursor: pointer;
  }

  .footer-top-social-element__img {
    width: 25px;
    height: 25px;
  }

  .mini-img-f {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEzSURBVHgB7ZXNSsNQEIXPtBZTTMWCuyKoD+HWB3Al7lz4GG7d6su4d1GfpYuCC0FKE/MjjcepEE1jr5mEUkT6bZL5uwdm7iTAmhDUhORemOJKWjjhOwbFmL+NMxGJltVtoQZxzOPXFEN9PVSRH4SqpY+lQi0YiSIOMsGQKoIGmIVmwGVTkTn21rVxDi661JzokF9EEJN4nowRuMrNl2GacKrJvaJvRhz1uzKy1JuFguRz/FIojHxPdqz15hmVoSCrk++cke7LfviG029HOQGdIOVFbupehX5HHlznOVsXJrzWs+9gZ9zz5MAVbNy6MlIx75UJsSK+MqEqnJchS3Hf8tD9chA3WGxPotZtbujSjvALjfdo/lXY9aRvrV9b6zZCG6F/LGT/lROPuq7t3BTiCX+RD4jBV7JbvWBRAAAAAElFTkSuQmCC);
  }

  .mini-img-x {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPSSURBVHgBrZZZSJRRFMfv9zkuDcaMLxEENkXRQ1AT2UsQOSOuqBSU0E4LVA+hPrRQaDMVGdFi9hDRhrQ8Raa5i42g1osPhb0UtEIEBeZUmutMvxPzyTDN4mgHztzznbv8z3bPHa2jo8OilCpTEWhiYqI2Pz//g4qT2traDuu6bjb2m7Kzs70orZqmhQUzmUzrGZwqDuK8M5x3YnJy8rRhpC4/SUlJFQwv4EGfz2dPSEiwCbO4y+/3O1pbW8viAHEJCOKTvLy8SkP/F8jhcPxicieihfFkVlbWR2G+d8FfCMHJlpYW2zRA9sh+jHtPyLYHz+mGQAj7WeSGN7LhYED3CfcPIFoBexANpL6+fglrLgLygag4CwoKfgTPayHrNYrjKYvtAKwy4tve3l7NUIr+TG5ubkUoiHhLqD2Ic8bGxtYWFha+C12jh3z7sWaPCBTBHUOZmJjoEkvx9hj5Whe8wePxWFn7FNEGHwwHEg5IYfF7wNwcnMmhR0VHDgcZtgk+lt+oqalJNtbjwSPWLoJdOTk5dSoC6eGUVEu1VBwxdzU1NdkDBjwjnBc4cBl0TnSBMnYgnmLeraKQFmmioaEhPSUl5SUHf/N6vStLSkp+9/X1mQcGBrqYXgM/hjcw/xCQzSoG6ZEmiouLP3HIcSxearFYzoouIyNjmHzsQPQGQF7h5V41DdKjTWLpNYAeSdegGjNF53Q6X5NDl8joO0PLeEZAQqOjo/sYvmL9nbq6OqvoJIcMXXAppZ+jpkExgSjX79xyCZctNTW1xtBTfXLzpRrvdnd3p80aSIjwtMs9gndwOfeLjhb1mfwcQpw3PDx8+78AkZ/L5MOGOIgn54y+R+e4B/hV5jYQwgOzApJuzGFl8H3pg6isgE11DTp/pXiLWIVB6TMCam5uPiTdGLGfW7+TJtvFtxRCpvF0SNfgYu8WAwCsjRsIT1ZzZ6rEWnJRDIBP9OPj48cY3vB9AbDlogtnwLSAJAdsfAjIT+6MI/gppzBGmdsL+/HkXk9Pz1zRp6WlHWF4IW9XY2Pj4phAnZ2dCwItfyFAJeH+L+BBD0MVbB8aGvrb4+ga41yDTRhgSk5OvhUViIN1Fjci2vCknIvZrSIQOZMieM7B5UQgM+DtW8JcIZ0fnSsiEFVziY12afmAXFExCGO2sl5Kvja4a6DzoKsEbMU/QFLGDKXw9Vgt3yAJK2CnENPNZvOUYVzgLQxeef55GFNFpwVADmPFecT+3t5eu9vt9qk4KPD8O8LNoa/G8HINRBN5kb9HamRk5GZRUdFnFSdxxnzO2B9lSfUf8erzLyBSfwEAAAAASUVORK5CYII=);
  }

  .mini-img-i {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPLSURBVHgBrVa9bxxFFH9v1iSxz7bsInZIItgIyxH0NFDELmixRAOVnYiIMpGoECDFlqCiAkoouPwBCEFJ4YCUFClSRYriSLlLE50/JMe3H2ff7s3Lb2Z273PXkZw8693Mvpl5v/nNe/M8TAUiIjMUBFeIvLPEah6mMTeiqKTVJLRNTFswbXGFnw/75AGAg4MFUt5v6C6NTBHO+q9SK/9Qh27wLNdHgCQM10DlV5imchP+nqHdAavYTpXhZSoH8KBgzot9LlPodZ7mao9Jq+UDKIEKtCZBsIzjm6ATiDRlRQ6khlagWg7lvd5gFP3dBdnbu0AnFAAs2DaWC31gm25wd/c8gEQiAMXx53RCkSDZkCDFZjs1efjwlOzLcgYk6M+wtIIlErVpzp8rFT7WWbP5MXne+wi0ItZbPDV1pzsWJvfh40MbI+Wdp4CaNCEBvo3PFcQn+goKNuHj8t0GN3GsO+54o0xjnEKrJq32mgM6/ETC9gMAft3bmMbxacPq+hgp3BMx6cTbJSDr2NStPlM9G/HBwKdO5w8JWos8eeY7GP8dXK134NfH+nmTn8qyYxzIMEgYXu0DuQ09x5OVS0YpaV/CWNXmPNO3EhzeGNklS+zuhB5TYESlkoNofZsnJ9egXdY8O1vnyvhVOMrA5PtiJ+7yqcwheoN5YJOEcTTG3OncKt1MHH3jnMlZZO1HoyCWUQ7U/emJVotuTNXM7stweG6uQTZuYorkB0NOqMdIZSDDif0WCqXNTDk25Z2/sjkDjNQoiJFUHrkyxj4yb45KxJQvuHjXOlTqSTFYt84bRoNJwRMTdxG3XQum1E9UykZvZL06j4//Vww0EKMi4R/s8Xm8ijJVtbvPlwuCH4ZVdFYz03ohCDtGuLAo59pkHY2PwJw684scHc2i3KyTR6vGqbTiur3gceT3/MmPKEfVUSDtORZamwA1bF9knoo4nT69gfFrYFbPmPtWXaLsYd1NgJTcIZp3saMGS3q0ghj8ZWCJx6aYOS5ZRJIkV0jSRTsXyYI43qNjRIIw+1cpy/Z9IBrlXSfoyhK9IcHl/cwAWY2it51Rp5sOLK2hjF+k1xRs+CKc1zKQP/sGDhcA0nRgbYClX9AJRBqNin0GGJDQghzJ/r5vxnqPE0nxOKHfyT6tuq+QLeg2ItLp2kTnC1yrTelBxppkEnoHHyqbKki2azw9XR0Ayij7qKA/Y8qnPcfZT1Gbg4lkSrn9DqXplzwz8zT3XXhVAXgOzWWi5DLumEn7vrKhXa3sftqPFC+uBulkl1rt/1GEXwz7fAn4BUD83RD1IwAAAABJRU5ErkJggg==);
  }

  .mini-img-y {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFhSURBVHgB7ZW9SgNBEMfnNl8kIoY02sUP0voGFoKgndhILBTttNIXyQsIgpJCtBMbC8F3sBVM7BQsFD3ui7vzt0IgafRuzYGB/GCY22Pn/rszO3siY/47Vv/A87wt3KZlWYtxHCsxgNhP7IX4drFYPBsQ4uVkEARX+GUZLje2bTdrtdr796oRaWUgolmrVCot/WA5jjOrlOpIhoRhWFe5XG5VMoaNbChSNvPbRIp7i52KIcRWE52sKIoeOEF7+DlTwVRHuFwud7UgNs+wnSbWtFc6pVJph7Q32OVFkhgjoR6IvVLoxyRz82IAO6n6vn+EHTKsJolJJeS67gLuAIF9/ESa2ERCpKfBPaiL3xTDLORJwxvF/XESc1bkDxD/rK+gOivuSobo/lP0xhM7OpGM4NvHuv96v4kpbvBr/JIMEUTuCoXCOv5joDikcZeX2zxO41Odqj4i7B67pM/OZczI8AVM84FiC+rkswAAAABJRU5ErkJggg==);
  }

  .mini-img-t {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIgSURBVHgBvVXPSwJBFJ5dUxAPSkK3wpMEdSiIoou55E+6ZFSXDuWl+hO65a1Lh25Bh+gSQRHWQcQfoFh4LzoESVh/QSB6MbVvwJV1WncmMT+YnTc78+Z77+17+yTSBxKJxILFYgmpa0mSnnw+352RzgjpAyCZb7VaMXUN+RGTIZFMBoPpeDzuIEMgcthstj0yBCKKg2w26yZDIHI0m81MMplc09vsKxkMMGEymW7T6XQe8mWj0SiFw+H8fxCp8NIBUipL9DGo0H3xDgyECAWbwKAF/NbrTM/QZTIZLwpxHeIKZjvm72AwOKZ3FvtyIBBIQXSnUikPSJcxPNr7fxHRwkNNnEB5W2Mx4TmlCjCmgKlAjDxCHTiRovR3MkkMgDMSQ879BDJzwTGPpAe4LneI4M0iph3tJsJXhuWr9XrdheVs51bGHSy5HnVCB292WRJZlpf8fv9n+9WHwT3iHsGqGWYvpiHpVpK7HYCRf/pG48xlz72UaDozZ8U9gnKVuWzUQM/OrKtElAihe2f2tvQUisWiVVtjFAjdCxElgnKS2Yuiyg+1L2gxVyqVU4guhuiKcNCJbS6XcyCNSxCdzBmaffcwxAp5EzPbsi/w+4kSUSIK9JENTNdEELQE4I2CnlPmne3KHlh2g2a1TwTQJgmJkFDopiXasQvhOkeCKDrbtPecmc3mI0VRuH3IkIghnMOYwrIGD15rtdpDJBIRJlDxA3MpzN5Wvw56AAAAAElFTkSuQmCC);
  }

  .mini-img-in {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHASURBVHgB7VTPSwJBFJ5ZRwMx6NQxjA4FduisRJT562J4rUP1h4QWHforhA4dRfCQuhIZUYdOQXjOCINuXnYLbHf7RhS2YbI1F0Hwg9mZee+b972ZN7OEjAmUf2q12ja6E9M0VyilL2insVisQFwELZfLQY/H8yw6DMPYTKVSdeISFMbYvszh9XrXiYtQLMtqyxzY0TtxUwiZn0OsaTfyOeqlEhfRvQy9Ou1guIb2pGlaPpPJtMkkgpZKJT8QEh26rjfS6bTOx5VKJYRL47f7cbSteDz+ls1mWSQS2cJxhxVFYXB9or43yWTy1s5nXASLHkQhn8+3iq7BxzjWAjjLPzKkNIcELhCc13IRc17brg82Uq1W77FmD0+k2bURB0CAjsQWRMArLiJbA+EwEryG4PwwQqbEfIC28MdSnsyZYyGQjQHuR7RL8Yn0AftusVicY8QBcNYWr4EkSC6RSBz356qq5tEdCrSZQCCw4WhHEJEdXd0uwoGaHMnWI6ElR0Kk97AF8TvRFo1GW+heJdxZp0IyXucXruE0wCi8kQNMhf4XALdmPEJ4B5OzI4Zsv9Brg0jgfIgc2R+9B20Irvv4BhVtrougF5bqAAAAAElFTkSuQmCC);
  }

  .footer-bottom,
  .footer-bottom-text {
    display: flex;
    margin-bottom: 24px;
    padding-bottom: 0;
    width: 100%;
    border-bottom: 1px solid #1a3472;
    color: #fff;
  }

  .footer-bottom-text {
    padding-bottom: 24px;
  }

  .footer-bottom-block {
    width: 590px;
    margin-bottom: 30px;
  }
  .footer-bottom-block__name {
    margin-bottom: 10px;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: #99abbd;
  }

  .footer-group-menu {
    display: flex;
  }

  .footer-menu__item {
    margin-right: 60px;
    margin-bottom: 10px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .footer-spcial-text {
    font-size: 8px;
  }

  .footer-politics {
    display: flex;
    justify-content: flex-start;
    font-size: 10px;
    color: #fff;
    padding-bottom: 24px;
  }

  .footer-politics__item {
    margin-right: 50px;
  }

  .footer-politics__item:last-of-type {
    margin: 0px;
    margin-left: auto;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
</style>
