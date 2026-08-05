<script setup lang="ts">
  import BigBanner from '@/modules/reports/components/BigBanner.vue';
  import Reports from '@/modules/reports/components/Reports.vue';
  import Notice from '@/components/Notice.vue';
  import { useDisplay } from 'vuetify';
  import CurrenciesWidget from '@/components/BaseComponents/CurrenciesWidget.vue';

  const { mobile } = useDisplay();
</script>

<template>
  <v-sheet class="d-flex ga-5" width="100%">
    <v-sheet width="180" v-if="!mobile">
      <Notice></Notice>
      <CurrenciesWidget />
    </v-sheet>
    <v-sheet width="100%">
      <BigBanner></BigBanner>
      <Reports></Reports>
    </v-sheet>
  </v-sheet>
</template>
