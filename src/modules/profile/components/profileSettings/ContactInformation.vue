<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const item = ref();
  const items = [
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

  onMounted(() => {
    item.value = items[0];
  });
</script>

<template>
  <v-sheet class="d-flex flex-column ga-3">
    <v-sheet
      class="pa-8"
      rounded="xxl"
      style="background-color: var(--color-MainBackground) !important"
    >
      <v-sheet class="text-common font-medium">
        {{ t('profile.modals.settings.contactInformationTitle') }}
      </v-sheet>
      <v-sheet class="d-flex flex-column ga-3">
        <v-sheet class="d-flex align-center">
          <v-col cols="9" class="pa-0">
            <v-sheet class="d-flex justify-space-between align-center my-3">
              <v-sheet class="">{{ t('profile.modals.settings.emailTitle') }}</v-sheet>
              <v-checkbox
                :label="t('profile.modals.settings.useForAuthentificationTitle')"
                hide-details
                true-icon="rioni:formCheckOn"
                false-icon="rioni:formCheckOff"
              ></v-checkbox>
            </v-sheet>
            <v-sheet class="d-flex">
              <v-text-field
                variant="solo"
                flat
                hide-details="auto"
                class="form-inside-text-3"
              ></v-text-field>
            </v-sheet>
          </v-col>
          <v-col cols="3" class="pa-0 d-flex justify-center">
            <v-sheet>{{ t('profile.modals.settings.confirmedTitle') }}</v-sheet>
          </v-col>
        </v-sheet>
        <v-sheet class="d-flex align-center">
          <v-col cols="9" class="pa-0">
            <v-sheet class="d-flex justify-end align-center">
              <v-checkbox
                :label="t('profile.modals.settings.useForAuthentificationTitle')"
                hide-details
                true-icon="rioni:formCheckOn"
                false-icon="rioni:formCheckOff"
              ></v-checkbox>
            </v-sheet>
            <v-sheet>
              <v-text-field
                variant="solo"
                flat
                hide-details="auto"
                class="form-inside-text-3"
              ></v-text-field>
            </v-sheet>
          </v-col>
          <v-col cols="3" class="pa-0 d-flex justify-center">
            <v-sheet>{{ t('profile.modals.settings.confirmedTitle') }}</v-sheet>
          </v-col>
        </v-sheet>
        <v-sheet class="d-flex align-center">
          <v-col cols="9" class="pa-0">
            <v-sheet class="d-flex justify-space-between align-center">
              <span class="form-inside-text-2">{{ t('profile.modals.settings.phoneTitle') }}</span>
              <v-checkbox
                :label="t('profile.modals.settings.useForAuthentificationTitle')"
                hide-details
                true-icon="rioni:formCheckOn"
                false-icon="rioni:formCheckOff"
              ></v-checkbox>
            </v-sheet>
            <v-sheet class="d-flex justify-space-between">
              <v-col cols="2" class="pa-0">
                <v-select variant="solo" flat density="compact" :items="items" v-model="item">
                  <template v-slot:item="{ props: itemProps, item }">
                    <img v-bind="itemProps" :src="item.raw.image" class="flag-img" />
                  </template>
                  <template v-slot:selection="{ item, index }">
                    <img :src="item.raw.image" />
                  </template>
                </v-select>
              </v-col>

              <v-col cols="9" class="pa-0">
                <v-text-field
                  variant="solo"
                  flat
                  hide-details="auto"
                  class="form-inside-text-3"
                ></v-text-field>
              </v-col>
            </v-sheet>
          </v-col>
          <v-col cols="3" class="pa-0 d-flex justify-center">
            <v-sheet>{{ t('profile.modals.settings.confirmedTitle') }}</v-sheet>
          </v-col>
        </v-sheet>

        <v-sheet>
          Внимание! При изменении адреса, Вам необходимо сразу предоставить подтверждающие
          документы, в противном случае операции по вашему счету будут временно недосутпны
        </v-sheet>

        <div class="d-flex align-center">
          <v-col cols="12" class="pa-0">
            <div class="form-inside-inputs-grid justify-space-between align-center">
              <span class="form-inside-text-2">Адрес регистрации</span>
              <v-checkbox
                label="Использовать  как почтовый"
                class="form-inside-text-2 v-hide-input__details"
                true-icon="rioni:formCheckOn"
                false-icon="rioni:formCheckOff"
              ></v-checkbox>
            </div>
            <div class="form-inside-inputs-grid justify-space-between">
              <v-col cols="4" class="pa-0">
                <v-select
                  variant="solo"
                  flat
                  label="Страна"
                  density="compact"
                  :items="['Данные 1', 'Данные 2', 'Данные 4']"
                ></v-select>
              </v-col>
              <v-col cols="3" class="pa-0">
                <v-text-field
                  variant="solo"
                  flat
                  hide-details="auto"
                  class="form-inside-text-3"
                  label="Город"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="pa-0">
                <v-text-field
                  variant="solo"
                  flat
                  hide-details="auto"
                  class="form-inside-text-3"
                  label="Индекс"
                ></v-text-field>
              </v-col>
            </div>
            <div class="form-inside-inputs-grid justify-space-between">
              <v-col cols="12" class="pa-0">
                <v-text-field
                  variant="solo"
                  flat
                  hide-details="auto"
                  class="form-inside-text-3"
                  label="Адрес"
                ></v-text-field>
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
              ></v-checkbox>
            </div>
            <div class="form-inside-inputs-grid justify-space-between">
              <v-col cols="4" class="pa-0">
                <v-select
                  variant="solo"
                  flat
                  label="Страна"
                  density="compact"
                  :items="['Данные 1', 'Данные 2', 'Данные 4']"
                ></v-select>
              </v-col>
              <v-col cols="3" class="pa-0">
                <v-text-field
                  variant="solo"
                  flat
                  hide-details="auto"
                  class="form-inside-text-3"
                  label="Город"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="pa-0">
                <v-text-field
                  variant="solo"
                  flat
                  hide-details="auto"
                  class="form-inside-text-3"
                  label="Индекс"
                ></v-text-field>
              </v-col>
            </div>
            <div class="form-inside-inputs-grid justify-space-between">
              <v-col cols="12" class="pa-0">
                <v-text-field
                  variant="solo"
                  flat
                  hide-details="auto"
                  class="form-inside-text-3"
                  label="Адрес"
                ></v-text-field>
              </v-col>
            </div>
          </v-col>
        </div>
        <div>
          <span class="form-inside-text-2">Для подтверждения данного адреса, вам необходимо</span>
          <span class="form-inside-text-4">загрузить документы сюда</span>
        </div>
      </v-sheet>
    </v-sheet>
    <v-btn variant="flat" rounded="lg" bg="element-check" color="element-check">
      <v-sheet class="text-white">
        {{ t('profile.modals.settings.contactInformationSaveBtn') }}
      </v-sheet>
    </v-btn>
  </v-sheet>
</template>

<style scoped lang="scss">
  .flag-img {
    display: block;
    margin-left: 30px;
  }

  .form-inside-warning-message {
    display: flex;
    width: 511px;

    padding: 14px 23px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    border-radius: 8px;
    background: var(--Backgrounds-light-green, #e7f8f0);
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
