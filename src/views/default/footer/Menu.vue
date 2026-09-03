<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';

  const { mobile } = useDisplay();
  const { t } = useI18n();
</script>

<template>
  <v-sheet :class="{ 'd-flex flex-column ga-4 mt-6': mobile }">
    <v-sheet class="d-flex ga-2" :class="{'justify-space-between': mobile}">
      <v-sheet class="d-flex flex-column ga-2 text-white" :width="mobile ? 'auto' : '25%'">
        <v-sheet>
          <a href="https://rioni-capital.ge/ru/about/" target="_blank">
            {{ t('footer.menu.about') }}
          </a>
        </v-sheet>
        <v-sheet>
          <a href="https://rioni-capital.ge/ru/services/" target="_blank">
            {{ t('footer.menu.services') }}
          </a>
        </v-sheet>
        <v-sheet>{{ t('footer.menu.tariffs') }}</v-sheet>
        <v-sheet>{{ t('footer.menu.market') }}</v-sheet>
        <v-sheet>{{ t('footer.menu.dxfina') }}</v-sheet>
      </v-sheet>

      <v-sheet class="d-flex flex-column ga-2 text-white" :width="mobile ? 'auto' : '25%'">
        <v-sheet>
          <a href="https://rioni-capital.ge/ru/news/" target="_blank">
            {{ t('footer.menu.news') }}
          </a>
        </v-sheet>
        <v-sheet>
          <a href="https://rioni-capital.ge/ru/documents/" target="_blank">
            {{ t('footer.menu.documents') }}
          </a>
        </v-sheet>
        <v-sheet>Ценности</v-sheet>
        <v-sheet>Инструменты</v-sheet>
        <v-sheet>Вакансии</v-sheet>
      </v-sheet>

      <v-sheet class="d-flex flex-column ga-2 text-white" :width="mobile ? 'auto' : '25%'">
        <v-sheet>
          <router-link to="/education">{{ t('footer.menu.education') }}</router-link>
        </v-sheet>
        <v-sheet>Лицензии</v-sheet>
        <v-sheet>Словарь</v-sheet>
        <v-sheet>
          <a href="https://rioni-capital.ge/ru/team/" target="_blank">
            {{ t('footer.menu.career') }}
          </a>
        </v-sheet>
        <v-sheet>Юмор</v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  a {
    color: white;
  }
</style>
