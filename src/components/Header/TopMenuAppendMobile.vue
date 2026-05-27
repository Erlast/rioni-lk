<script setup lang="ts">
  import AvatarUser from '@/components/AvatarUser.vue';
  import { computed, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAccountStore } from '@/stores/accountStore.ts';

  import SocialItems from '@/views/default/footer/SocialItems.vue';
  import { menuItem } from '@/utils/data.ts';
  import CloseButton from '@/components/BaseComponents/CloseButton.vue';
  import { useI18n } from 'vue-i18n';
  const menu = ref(false);
  const accountStore = useAccountStore();
  const route = useRoute();
  const { t } = useI18n();

  const menuItems = computed(() => {
    return menuItem;
  });

  const isActive = (itemName: string) => {
    return route.name === itemName;
  };
</script>

<template>
  <v-sheet class="user-menu d-flex align-center ga-4">
    <v-sheet class="d-flex align-center ga-2">
      <v-sheet>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          location="end top"
          :offset="[-100, 0]"
          height="100%"
        >
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon icon="mdi-menu" color="background-blue" />
            </v-btn>
          </template>

          <v-card
            min-width="300"
            class="bg-background-blue text-white pa-6"
            min-height="100%"
            height="100%"
          >
            <v-list class="bg-background-blue text-white">
              <v-list-item>
                <v-sheet class="d-flex justify-space-between">
                  <v-sheet class="d-flex ga-2 align-center">
                    <AvatarUser ref="topMenuUserMenuAvatar" class="activator-menu" :size="20" />
                    <v-sheet>
                      {{ accountStore.data.info.surname }} {{ accountStore.data.info.name }}
                    </v-sheet>
                  </v-sheet>
                  <v-sheet class="button-close" @click="menu = false"></v-sheet>
                </v-sheet>
              </v-list-item>
            </v-list>

            <v-list class="bg-background-blue text-white">
              <v-list-item
                v-for="item in menuItems"
                :key="item.name"
                :to="{ name: item.name }"
                :active="isActive(item.name)"
                @click="menu = false"
              >
                {{ item.title }}
              </v-list-item>
              <v-list-item>
                <v-btn variant="flat" rounded="mr" class="btn-logout">
                  <template #append>
                    <v-icon icon="mdi-logout" />
                  </template>
                  {{ t('logout') }}
                </v-btn>
              </v-list-item>
            </v-list>

            <v-card-actions class="position-absolute bottom-0">
              <v-spacer></v-spacer>

              <v-row
                align="start"
                align-content="start"
                density="compact"
                class="d-flex ga-2 justify-start"
              >
                <SocialItems :width="37" :height="37" />
              </v-row>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
      <v-sheet class="position-relative" width="48">
        <v-btn :ripple="false" icon to="profile">
          <AvatarUser ref="topMenuUserMenuAvatar" class="activator-menu" :size="48" />
        </v-btn>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  .btn-logout {
    background-color: var(--color-HardBlue);
    color: white;
  }

  .v-list-item {
    &.v-list-item--active {
      .v-list-item__overlay {
        background-color: var(--color-BackgroundBlue);
      }
    }
  }
</style>
