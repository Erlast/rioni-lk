<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';

  const { mobile } = useDisplay();
  const { t } = useI18n();
</script>

<template>
  <v-sheet :class="{ 'd-flex flex-column ga-4 mt-6': mobile }">
    <v-sheet class="d-flex ga-2" :class="{ 'justify-space-between': mobile }">
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
        <v-sheet>
          <a href="https://rioni-capital.ge/ru/platform/" target="_blank">
            {{ t('footer.menu.dxfina') }}
          </a>
        </v-sheet>
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
        <v-sheet>
          <a href="https://rioni-capital.ge/ru/codex/" target="_blank">
            {{ t('footer.menu.codex') }}
          </a>
        </v-sheet>
        <v-sheet>
          <a href="https://rioni-capital.ge/ru/calendar/" target="_blank">
            {{ t('footer.menu.instruments') }}
          </a>
        </v-sheet>
        <v-sheet>
          <a href="https://rioni-capital.ge/ru/team/#vacancies" target="_blank">
            {{ t('footer.menu.vacancies') }}
          </a>
        </v-sheet>
      </v-sheet>

      <v-sheet class="d-flex flex-column ga-2 text-white" :width="mobile ? 'auto' : '25%'">
        <v-sheet>
          <router-link to="/education">{{ t('footer.menu.education') }}</router-link>
        </v-sheet>
        <v-sheet>
          <a href="https://rioni-capital.ge/ru/broker-documents/" target="_blank">
            {{ t('footer.menu.disclosures') }}
          </a>
        </v-sheet>
        <v-sheet>
          <a href="https://rioni-capital.ge/ru/dictionary/" target="_blank">
            {{ t('footer.menu.glossary') }}
          </a>
        </v-sheet>
        <v-sheet>
          <a href="https://rioni-capital.ge/ru/team/" target="_blank">
            {{ t('footer.menu.career') }}
          </a>
        </v-sheet>
        <v-sheet>
          <a href="https://rioni-capital.ge/ru/news/#memes" target="_blank">{{ t('footer.menu.humor')}}</a>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  a {
    color: white;
  }
</style>
