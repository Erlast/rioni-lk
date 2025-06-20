<script setup lang="ts">
  import News from '@/components/News.vue'
  import Balance from '@/modules/market/components/Balance.vue'
  import MarketTable from '@/modules/market/components/MarketTable.vue'
</script>

<template>
  <v-row>
    <v-col cols="2"><News></News></v-col>
    <v-col cols="9">
      <Balance></Balance>
      <MarketTable></MarketTable>
    </v-col>
  </v-row>
</template>
