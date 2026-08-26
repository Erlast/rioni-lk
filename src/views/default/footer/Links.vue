<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';
  import { computed } from 'vue';

  const { mobile } = useDisplay();
  const { t, locale } = useI18n();

  const link1 = computed(() => {
    switch (locale.value) {
      case 'en':
        return 'https://rioni-capital.ge/upload/medialibrary/ce3/sl2xarih40z0q36gfghdcxulntagsewz.pdf';
      case 'ru':
        return 'https://rioni-capital.ge/upload/iblock/689/ubzwqvl1wfnq77pa05glkd16h8pytm2z.pdf';
      case 'ge':
        return 'https://rioni-capital.ge/upload/iblock/148/wa3xh8gbxs2rlw10i2a3vwrz3e8i2kwj.pdf';
      default:
        return 'https://rioni-capital.ge/upload/medialibrary/ce3/sl2xarih40z0q36gfghdcxulntagsewz.pdf';
    }
  });

  const link2 = computed(() => {
    switch (locale.value) {
      case 'en':
        return 'https://rioni-capital.ge/upload/medialibrary/ce3/tt5yatvlw071spn6hsds02t3s44qzo6u.pdf';
      case 'ru':
        return 'https://rioni-capital.ge/upload/medialibrary/443/zkopp5nbi77mrd9flrgftfu5mik3wz4i.pdf ';
      case 'ge':
        return 'https://rioni-capital.ge/upload/medialibrary/2dd/8g7dnk7ik0qj5abzpqv0h212us0irj4h.pdf';
      default:
        return 'https://rioni-capital.ge/upload/medialibrary/ce3/tt5yatvlw071spn6hsds02t3s44qzo6u.pdf';
    }
  });

  const link3 = computed(() => {
    switch (locale.value) {
      case 'en':
        return 'https://rioni-capital.ge/upload/medialibrary/e97/3an8ul3vhrrstfjlda6d4bq12l91dcwy.pdf';
      case 'ru':
        return 'https://rioni-capital.ge/upload/iblock/b0e/bjwcboh6dvqzgv03syu9tg2qmo41xp4g.pdf';
      case 'ge':
        return 'https://rioni-capital.ge/upload/iblock/06d/ak99r2fcsw8gexkqul8ftxiwol73ulk4.pdf';
      default:
        return 'https://rioni-capital.ge/upload/medialibrary/e97/3an8ul3vhrrstfjlda6d4bq12l91dcwy.pdf';
    }
  });
</script>

<template>
  <v-sheet
    class="d-flex ga-4 text-white font-small mt-6 pb-6"
    :class="{ 'flex-column': mobile, 'justify-space-between': !mobile }"
  >
    <v-sheet class="d-flex ga-4" :class="{ 'flex-column': mobile }">
      <v-sheet>
        <a :href="link1" target="_blank" rel="noreferrer">
          {{ t('footer.link1') }}
        </a>
      </v-sheet>
      <v-sheet>
        <a :href="link2" target="_blank" rel="noreferrer">{{ t('footer.link2') }}</a>
      </v-sheet>
    </v-sheet>
    <v-sheet>
      <a :href="link3" target="_blank" rel="noreferrer">{{ t('footer.link3') }}</a>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  a {
    color: white;
  }
</style>
