<script setup lang="ts">
  let items = [
    {
      name: 'Foo',
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABESURBVHgB3dBBDQAgDEPRlqABCzhBACoRgAREEFQsQQCI2E59Apr0A1JoZg9OCQFCRvI6F15En0JNOEpz3+FGFWoi5gOIOgx7TIafAQAAAABJRU5ErkJggg=='
    },
    {
      name: 'Foo1',
      image:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABESURBVHgB3dBBDQAgDEPRlqABCzhBACoRgAREEFQsQQCI2E59Apr0A1JoZg9OCQFCRvI6F15En0JNOEpz3+FGFWoi5gOIOgx7TIafAQAAAABJRU5ErkJggg=='
    }
  ];
</script>

<template>
  <div class="form-inside">
    <div class="form-inside-block">
      <div class="form-inside-contact-info-label">Контактная информация</div>
      <div class="form-inside-inputs">
        <div class="d-flex align-center">
          <v-col cols="9" class="pa-0">
            <div class="form-inside-inputs-grid justify-space-between align-center">
              <span class="form-inside-text-2">E-mail</span>
              <v-checkbox
                label="Использовать для авторизации"
                class="form-inside-text-2 v-hide-input__details"
                true-icon="rioni:formCheckOn"
                false-icon="rioni:formCheckOff"
              ></v-checkbox>
            </div>
            <div class="d-flex">
              <v-text-field hide-details="auto" class="form-inside-text-3"></v-text-field>
            </div>
          </v-col>
          <v-col cols="3" class="pa-0 d-flex justify-center">
            <div class="contact-info-status">Подтвержден</div>
          </v-col>
        </div>
        <div class="d-flex align-center">
          <v-col cols="9" class="pa-0">
            <div class="form-inside-inputs-grid justify-end align-center">
              <v-checkbox
                label="Использовать для авторизации"
                class="form-inside-text-2 v-hide-input__details"
                true-icon="rioni:formCheckOn"
                false-icon="rioni:formCheckOff"
              ></v-checkbox>
            </div>
            <div class="form-inside-inputs-grid">
              <v-text-field hide-details="auto" class="form-inside-text-3"></v-text-field>
            </div>
          </v-col>
          <v-col cols="3" class="pa-0 d-flex justify-center">
            <div class="contact-info-button-confirm">Подтвердить</div>
          </v-col>
        </div>
        <div class="d-flex align-center">
          <v-col cols="9" class="pa-0">
            <div class="form-inside-inputs-grid justify-space-between align-center">
              <span class="form-inside-text-2">Телефон</span>
              <v-checkbox
                label="Использовать для авторизации"
                class="form-inside-text-2 v-hide-input__details"
                true-icon="rioni:formCheckOn"
                false-icon="rioni:formCheckOff"
              ></v-checkbox>
            </div>
            <div class="form-inside-inputs-grid justify-space-between">
              <v-col cols="2" class="pa-0">
                <v-select density="compact" :items="items">
                  <template v-slot:item="{ props: itemProps, item }">
                       <img v-bind="itemProps" :src="item.raw.image" class="flag-img"> 
                       <br ></br>
                  </template>
                  <template v-slot:selection="{ item, index }">
                       <img  :src="item.raw.image" ></img>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="9" class="pa-0">
                <v-text-field hide-details="auto" class="form-inside-text-3"></v-text-field>
              </v-col>
            </div>
          </v-col>
          <v-col cols="3" class="pa-0 d-flex justify-center">
            <div class="contact-info-status">Подтвержден</div>
          </v-col>
        </div>
      </div>
    </div>

    <div class="form-inside-block">
      <div class="form-inside-label">Вид на жительство и аналоги документа</div>
      <div class="form-inside-inputs">
        <div class="form-inside-inputs-label form-inside-text-1">
          Выберите все страны, где имеется вид на жительство
        </div>
        <div class="form-inside-inputs-grid">
          <v-select
            label="Кем выдан"
            density="compact"
            :items="['Данные 1', 'Данные 2', 'Данные 4']"
          ></v-select>
        </div>
        <div class="form-inside-inputs-grid">
          <v-text-field hide-details="auto" label="Номер документа"></v-text-field>
          <v-text-field hide-details="auto" label="Срок пребывания"></v-text-field>
        </div>
        <div class="form-inside-inputs-grid justify-space-between">
          <v-checkbox
            label="Вида на жительства (или аналога) в государстве, отличном от гражданства, не имею"
            class="form-inside-text-1"
            true-icon="rioni:formCheckOn"
            false-icon="rioni:formCheckOff"
          ></v-checkbox>
        </div>
      </div>
    </div>
    <div class="form-inside-block">
      <div class="form-inside-label">Место работы</div>
    </div>
    <div class="form-inside-inputs">
      <div class="form-inside-inputs-grid">
        <v-text-field hide-details="auto" label="Название компании"></v-text-field>
        <v-text-field hide-details="auto" label="Должность"></v-text-field>
      </div>
      <div class="form-inside-inputs-grid">
        <div class="with-50-percent">
          <v-text-field hide-details="auto" label="Отрасль"></v-text-field>
        </div>
        <div class="d-flex ga-2 with-50-percent">
          <v-text-field hide-details="auto" label="Номер телефона"></v-text-field>
          <v-text-field hide-details="auto" label="Сайт"></v-text-field>
        </div>
      </div>
      <v-checkbox
        label="Состою в некомерческой организации (НКО)"
        class="form-inside-text-1"
        true-icon="rioni:formCheckOn"
        false-icon="rioni:formCheckOff"
      ></v-checkbox>
      <v-checkbox
        label="Состою в неправительственной организации (НПО)"
        class="form-inside-text-1"
        true-icon="rioni:formCheckOn"
        false-icon="rioni:formCheckOff"
      ></v-checkbox>
      <v-checkbox
        label="Статус самозанятого"
        class="form-inside-text-1"
        true-icon="rioni:formCheckOn"
        false-icon="rioni:formCheckOff"
      ></v-checkbox>
      <v-checkbox
        label="Не работаю"
        class="form-inside-text-1"
        true-icon="rioni:formCheckOn"
        false-icon="rioni:formCheckOff"
      ></v-checkbox>
    </div>
    <div class="form-save">Сохранить измменения</div>
  </div>
</template>

<style scoped lang="scss">
  .flag-img {
    display:block;
    margin-left:30px;
  
  }


  .form-inside-contact-info-label {
    color: var(--Text-Text-color, #2a2a2a);

    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  .contact-info-status {
    margin-top: 50px;
    color: var(--Elements-check, #4ba67c);

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .contact-info-button-confirm {
    margin-top: 40px;
    display: inline-flex;
    padding: 8px 14px 10px 14px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: var(--Elements, #6794da);
    color: var(--Backgrounds-white, #fff);

    font-size: 14px;
  }
</style>
