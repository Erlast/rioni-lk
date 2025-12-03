<script setup lang="ts">
  import User from '@/modules/profile/components/user/User.vue';
  import UserBanksRequisite from '@/modules/profile/components/user/UserBanksRequisite.vue';
  import { inject, ref } from 'vue';

  const showAnketa = inject('showAnketa');
</script>

<template>
  <v-card>
    <div class="modal-window">
      <div class="form">
        <v-card-title>
          <div class="modal-windows-label">
            Анкета
            <div class="button-close" @click="showAnketa = false"></div>
          </div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <User></User>
          <UserBanksRequisite></UserBanksRequisite>
        </v-card-text>
        <v-divider></v-divider>
      </div>
    </div>
  </v-card>
</template>

<style scoped lang="scss"></style>
