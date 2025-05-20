<script setup lang="ts">
  import News from '@/components/News.vue'
  import MarketToday from '@/components/MarketToday.vue'
  import Account from '@/modules/main/components/Account.vue'
  import Recommendation from '@/modules/main/components/Recommendation.vue'
  import CalendarInvestor from '@/modules/main/components/CalendarInvestor.vue'
  import NewsMain from '@/modules/main/components/NewsMain.vue'
</script>

<template>
  <v-row>
    <v-col cols="2"><News></News></v-col>
    <v-col cols="7">
      <Account></Account>
      <Recommendation></Recommendation>
      <CalendarInvestor></CalendarInvestor>
      <NewsMain></NewsMain>
    </v-col>
    <v-col><MarketToday></MarketToday></v-col>
  </v-row>
</template>
