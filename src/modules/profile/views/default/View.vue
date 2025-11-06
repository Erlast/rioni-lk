<script setup lang="ts">
  import Notice from '@/components/Notice.vue'
  import Profile from '@/modules/profile/components/Profile.vue'
  import Tariff from '@/modules/profile/components/Tariff.vue'
  import InvestTest from '@/modules/profile/components/InvestTest.vue'
</script>

<template>
  <v-row>
    <v-col cols="2"><Notice></Notice></v-col>
    <v-col cols="9">
      <Profile></Profile>
      <Tariff></Tariff>
      <InvestTest></InvestTest>
    </v-col>
  </v-row>
</template>
