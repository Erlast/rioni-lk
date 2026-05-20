<script setup lang="ts">
  import News from '@/components/News.vue';
  import BrokerAccount from '@/modules/pronouns/components/BrokerAccount.vue';
  import OperationHistory from '@/modules/pronouns/components/OperationHistory.vue';
  import Notice from '@/components/Notice.vue';
</script>

<template>
  <v-sheet class="d-flex ga-5">
    <v-sheet>
      <BrokerAccount></BrokerAccount>
      <OperationHistory></OperationHistory>
    </v-sheet>
    <v-sheet width="180">
      <Notice></Notice>
    </v-sheet>
  </v-sheet>
</template>
