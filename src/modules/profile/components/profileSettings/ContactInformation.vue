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
  <div>
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

       <div class="form-inside-warning-message">Внимание! При изменении адреса, Вам необходимо сразу предоставить подтверждающие документы, в противном случае операции по вашему счету будут временно недосутпны</div>

        <div class="d-flex align-center">
          <v-col cols="12" class="pa-0">
            <div class="form-inside-inputs-grid justify-space-between align-center">
              <span class="form-inside-text-2">Адрес регистрации</span>
              <v-checkbox
                label="Использовать  как почтовый"
                class="form-inside-text-2 v-hide-input__details"
                true-icon="rioni:formCheckOn"
                false-icon="rioni:formCheckOff"
              >
            </v-checkbox>
            </div>
            <div class="form-inside-inputs-grid justify-space-between">
              <v-col cols="4" class="pa-0">
                   <v-select
            label="Страна"
            density="compact"
            :items="['Данные 1', 'Данные 2', 'Данные 4']">   </v-select>
              </v-col>
           <v-col cols="3" class="pa-0">
                  <v-text-field hide-details="auto" class="form-inside-text-3" label="Город"></v-text-field>
              </v-col>
              <v-col cols="4" class="pa-0">
                <v-text-field hide-details="auto" class="form-inside-text-3" label="Индекс"></v-text-field>
              </v-col>
            </div>
                  <div class="form-inside-inputs-grid justify-space-between">
              <v-col cols="12" class="pa-0">
                <v-text-field hide-details="auto" class="form-inside-text-3" label="Адрес"></v-text-field>
              </v-col>
            </div>
          </v-col>

        </div>
       <div class="d-flex align-center">
          <v-col cols="12" class="pa-0">
            <div class="form-inside-inputs-grid justify-space-between align-center">
              <span class="form-inside-text-2">Фактический адрес</span>
              <v-checkbox
                label="Использовать  как почтовый"
                class="form-inside-text-2 v-hide-input__details"
                true-icon="rioni:formCheckOn"
                false-icon="rioni:formCheckOff"
              >
            </v-checkbox>
            </div>
            <div class="form-inside-inputs-grid justify-space-between">
              <v-col cols="4" class="pa-0">
                   <v-select
            label="Страна"
            density="compact"
            :items="['Данные 1', 'Данные 2', 'Данные 4']">   </v-select>
              </v-col>
           <v-col cols="3" class="pa-0">
                  <v-text-field hide-details="auto" class="form-inside-text-3" label="Город"></v-text-field>
              </v-col>
              <v-col cols="4" class="pa-0">
                <v-text-field hide-details="auto" class="form-inside-text-3" label="Индекс"></v-text-field>
              </v-col>
            </div>
                  <div class="form-inside-inputs-grid justify-space-between">
              <v-col cols="12" class="pa-0">
                <v-text-field hide-details="auto" class="form-inside-text-3" label="Адрес"></v-text-field>
              </v-col>
            </div>
          </v-col>

        </div>
<div > <span class="form-inside-text-2">Для подтверждения данного адреса, вам необходимо  </span> <span class="form-inside-text-4">загрузить документы сюда</span></div>

      </div>
    </div>
  
  </div> 
  
  
  <div class="form-save">Сохранить изменения</div></div>
</template>

<style scoped lang="scss"> .flag-img {
    display:block;
    margin-left:30px;
}


  .form-inside-warning-message{
    display: flex;
  width: 511px;
 


  padding: 14px 23px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
    border-radius: 8px;
  background: var(--Backgrounds-light-green, #E7F8F0);
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
  }</style>
