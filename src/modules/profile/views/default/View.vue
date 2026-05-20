<script setup lang="ts">
  import Notice from '@/components/Notice.vue';
  import Profile from '@/modules/profile/components/Profile.vue';
  import Action from '@/modules/profile/components/Action.vue';
  import Requirements from '@/modules/profile/components/Requirements.vue';
  import { useDisplay } from 'vuetify';

  const { mobile } = useDisplay();
</script>

<template>
  <v-sheet class="d-flex ga-5" :class="{ 'flex-column': mobile }">
    <v-sheet v-if="!mobile" width="180"><Notice></Notice></v-sheet>
    <v-sheet class="d-flex flex-column ga-4">
      <Profile></Profile>
      <Action></Action>
      <Requirements></Requirements>
    </v-sheet>
  </v-sheet>
</template>
