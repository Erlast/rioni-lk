<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useAccountStore } from '@/stores/accountStore.ts';

  const accountStore = useAccountStore();
  const { t } = useI18n();

  const backToStart = () => {
    accountStore.accountConfirmStep = 0;
  };

  const confirmAddress = async () => {
    await accountStore.load();
    backToStart();
  };
</script>

<template>
  <v-card-title
    class="d-flex flex-column justify-end align-center position-relative"
    style="min-height: 50px"
  >
    <v-sheet class="font-18 text-hard-blue">Подтвердите адрес</v-sheet>
  </v-card-title>
  <v-card-text class="d-flex flex-column ga-2 py-0 px-2">
    <v-sheet
      class="d-flex ga-1 font-smaller cursor-pointer text-additional-link mt-4"
      @click="backToStart()"
    >
      <v-icon icon="mdi-arrow-left" />
      <v-sheet>{{ t('auth.back') }}</v-sheet>
    </v-sheet>
    <v-sheet class="d-flex flex-column ga-4" style="line-height: 20px">
      <v-sheet>
        <v-sheet>
          Для завершения верификации необходимо
          <span class="text-element-check">
            загрузить документ подтверждающий адрес вашего проживания.
          </span>
        </v-sheet>
        <v-sheet>
          Документ должен содержать ваши ФИО и полный адрес проживания. Загрузите документ из
          допустимого перечня:
        </v-sheet>
      </v-sheet>
      <v-sheet>
        <ul>
          <li>банковская выписка;</li>
          <li>счёт за коммунальные услуги;</li>
          <li>официальный документ государственного органа;</li>
          <li>
            другие документы из
            <span class="text-additional-link">утверждённого перечня.</span>
          </li>
        </ul>
      </v-sheet>
      <v-sheet>
        При наличии документа подтверждающего адрес, вы можете
        <span class="text-additional-link">загрузить его здесь</span>
      </v-sheet>
      <v-sheet>
        Либо вы можете подготовить необходимые документы и перейти к подтверждению
        <span class="text-element-check">в Настройках профиля</span>
        после подтверждения двух предыдущих шагов
      </v-sheet>
    </v-sheet>
    <v-sheet class="mt-6">
      <v-btn variant="flat" rounded="mr" color="ocean-blue" @click="confirmAddress">
        <v-sheet class="text-white">Подтвердить адрес</v-sheet>
      </v-btn>
    </v-sheet>
  </v-card-text>
</template>

<style scoped lang="scss">
  ul {
    list-style: none; /* Убираем стандартные маркеры (точки, кружки) */
    padding-left: 0; /* Убираем отступ слева, если нужен */
  }

  ul li {
    padding-left: 20px; /* Отступ для текста от маркера */
    position: relative; /* Для позиционирования псевдоэлемента */
    margin-bottom: 5px; /* Отступ между пунктами */
  }

  /* Добавляем тире через псевдоэлемент ::before */
  ul li::before {
    content: '-'; /* Сам маркер — тире */
    position: absolute;
    left: 0; /* Прижимаем к левому краю li */
    top: 0; /* Выравниваем по верхнему краю строки */
    color: #333; /* Цвет маркера (можно изменить) */
    font-weight: bold; /* Можно сделать жирным */
  }

  /* Альтернативный вариант — если нужно тире с пробелом */
  ul li.space::before {
    content: '- '; /* Тире с пробелом */
  }
</style>
