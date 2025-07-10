<script setup lang="ts">
  import News from '@/components/News.vue'
  import FromAnalitiks from '@/modules/analitics/components/FromAnalitiks.vue'
  import InvestTeaching from '@/modules/analitics/components/InvestTeaching.vue'
  import InvestCalendar from '@/modules/analitics/components/InvestCalendar.vue'
</script>

<template>
  <v-row>
    <v-col cols="9">
      <FromAnalitiks></FromAnalitiks>
      <InvestTeaching></InvestTeaching>
      <InvestCalendar></InvestCalendar>
    </v-col>
    <v-col cols="2"><News></News></v-col>
  </v-row>
</template>
