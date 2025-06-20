<script setup lang="ts">
  import News from '@/components/News.vue'
  import BigBanner from '@/modules/reports/components/BigBanner.vue'
  import Reports from '@/modules/reports/components/Reports.vue'
</script>

<template>
  <v-row>
    <v-col cols="2"><News></News></v-col>
    <v-col cols="9">
      <BigBanner></BigBanner>
      <Reports></Reports>
    </v-col>
  </v-row>
</template>
