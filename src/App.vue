<script setup lang="ts">
  import BaseNotification from '@/components/BaseComponents/BaseNotification.vue';
  import AccountConfirm from '@/components/AccountConfirm/Index.vue';
</script>

<template>
  <v-app>
    <BaseNotification />
    <RouterView />
  </v-app>
</template>
