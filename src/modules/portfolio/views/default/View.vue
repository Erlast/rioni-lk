<script setup lang="ts">
  import News from '@/components/News.vue'
  import BrokerAccountDetail from '@/modules/portfolio/components/BrokerAccountDetail.vue'
  import Banner from '@/modules/portfolio/components/Banner.vue'
  import Structure from '@/modules/portfolio/components/Structure.vue'
</script>

<template>
  <v-row>
    <v-col cols="9">
      <BrokerAccountDetail></BrokerAccountDetail>
      <Banner></Banner>
      <Structure></Structure>
    </v-col>
    <v-col cols="2"><News></News></v-col>
  </v-row>
</template>
