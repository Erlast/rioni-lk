<script setup lang="ts">
  import BrokerAccount from '@/modules/pronouns/components/BrokerAccount.vue';
  import OperationHistory from '@/modules/pronouns/components/OperationHistory.vue';
  import Notice from '@/components/Notice.vue';
  import { useDisplay } from 'vuetify';
  import CurrenciesWidget from '@/components/BaseComponents/CurrenciesWidget.vue';

  const { mobile } = useDisplay();
</script>

<template>
  <v-sheet class="d-flex ga-5" width="100%">
    <v-sheet :width="mobile ? '100%' : 'auto'">
      <BrokerAccount></BrokerAccount>
      <OperationHistory></OperationHistory>
    </v-sheet>
    <v-sheet width="180" v-if="!mobile">
      <Notice></Notice>
      <CurrenciesWidget bordered />
    </v-sheet>
  </v-sheet>
</template>
