<script setup lang="ts">
  import AvatarUser from '@/components/AvatarUser.vue';
  import { useRouter } from 'vue-router';
  import { useAccountStore } from '@/stores/accountStore';
  import authService from '@/api/authService.ts';
  import LanguageSelect from '@/components/LanguageSelect.vue';

  const router = useRouter();
  const accountStore = useAccountStore();

  const logout = async () => {
    await authService.logout();
    await router.push('/auth');
  };
</script>

<template>
  <v-sheet class="user-menu d-flex align-center ga-4">
    <LanguageSelect />
    <v-btn icon density="compact" :to="{ name: 'notification' }">
      <v-icon icon="mdi-forum" color="middle-blue" />
    </v-btn>

    <v-icon icon="mdi-bell" color="middle-blue" />

    <v-sheet class="d-flex align-center ga-2">
      <v-sheet class="position-relative" width="48">
        <v-btn :ripple="false" icon to="profile">
          <AvatarUser ref="topMenuUserMenuAvatar" class="activator-menu" :size="48" />
        </v-btn>
      </v-sheet>

      <v-sheet
        class="font-default text-capitalize color-dark-blue cursor-pointer"
        @click="router.push({ name: 'profile' })"
      >
        {{ accountStore.data.surname }} {{ accountStore.data.name }}
      </v-sheet>
      <v-btn icon density="compact" @click="logout">
        <v-icon icon="mdi-logout" color="middle-blue" />
      </v-btn>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  #main-menu {
    z-index: 199;

    :deep(.v-btn__overlay) {
      opacity: 0;
    }
  }
</style>
