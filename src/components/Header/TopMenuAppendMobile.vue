<script setup lang="ts">
  import AvatarUser from '@/components/AvatarUser.vue';
</script>

<template>
  <v-sheet class="user-menu d-flex align-center ga-4">
    <v-sheet class="d-flex align-center ga-2">
      <v-sheet class="position-relative" width="48">
        <v-btn :ripple="false" icon to="profile">
          <AvatarUser ref="topMenuUserMenuAvatar" class="activator-menu" :size="48" />
        </v-btn>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
