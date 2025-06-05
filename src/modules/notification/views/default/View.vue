<script setup lang="ts">
  import News from '@/components/News.vue'
  import Notification from '@/modules/notification/components/Notification.vue'
</script>

<template>
  <v-row>
    <v-col cols="2"><News></News></v-col>
    <v-col cols="9">
      <Notification></Notification>
    </v-col>
  </v-row>
</template>
