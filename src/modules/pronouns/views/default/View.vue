<script setup lang="ts">
  import News from '@/components/News.vue'
  import BrokerAccount from '@/modules/pronouns/components/BrokerAccount.vue'
  import OperationHistory from '@/modules/pronouns/components/OperationHistory.vue'
</script>

<template>
  <v-row>
    <v-col cols="9">
      <BrokerAccount></BrokerAccount>
      <OperationHistory></OperationHistory>
    </v-col>
    <v-col cols="2"><News></News></v-col>
  </v-row>
</template>
