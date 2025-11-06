<script setup lang="ts">
  import Notice from '@/components/Notice.vue';
  import Profile from '@/modules/profile/components/Profile.vue';
  import Action from '@/modules/profile/components/Action.vue';
  import Requirements from '@/modules/profile/components/Requirements.vue';
</script>

<template>
  <v-row>
    <v-col cols="2"><Notice></Notice></v-col>
    <v-col cols="9">
      <Profile></Profile>
      <Action></Action>
      <Requirements></Requirements>
    </v-col>
  </v-row>
</template>
