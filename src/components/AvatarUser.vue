<script setup lang="ts">
  import BaseAvatar from '@/components/BaseComponents/BaseAvatar.vue';
  import { useDisplay, useTheme } from 'vuetify';
  import CloseButton from '@/components/BaseComponents/CloseButton.vue';
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useAccountStore } from '@/stores/accountStore';
  import accountsService from '@/api/accountService';

  interface IProps {
    size?: number;
    showDeleteIcon?: boolean;
    classNames?: string;
  }

  const accountStore = useAccountStore();
  const theme = useTheme();
  const dialog = ref(false);
  const { t } = useI18n();
  const { mobile } = useDisplay();

  withDefaults(defineProps<IProps>(), {
    size: 124,
    showDeleteIcon: false,
    classNames: ''
  });

  const deleteAvatar = () => {
    dialog.value = true;
  };

  const handleDialogConfirm = async () => {
    try {
      await accountsService.deleteAvatar(accountStore.data.id);
      accountStore.data.info.photoUrl = '';
      dialog.value = false;
    } catch (err) {
      console.log(err);
    }
  };
</script>

<template>
    <v-sheet v-if="accountStore.data.info.photoUrl" :class="classNames">
      <v-img
        class="user-avatar"
        :width="size"
        :height="size"
        :max-width="size"
        cover
        :src="`${accountStore.data.info.photoUrl}`"
        :alt="`${accountStore.data.info.surname} ${accountStore.data.info.name}`"
      />
      <v-btn
        v-if="showDeleteIcon && !mobile"
        label="Удалить"
        variant="outlined"
        @click="deleteAvatar"
      >
        <template #[`icon`]>
          <v-icon icon="mdi-delete" color="primary" />
        </template>
      </v-btn>
      <v-btn v-if="showDeleteIcon && mobile" icon variant="plain" @click="deleteAvatar">
        <v-icon icon="mdi-delete" color="middle-blue"/>
      </v-btn>
      <v-dialog v-model="dialog" max-width="480" class="confirm-dialog">
        <template #default="{ isActive }">
          <v-card
            class="pa-6 rounded-lg dialog-content"
            :class="[theme.global.current.value.dark ? 'elevation-40-dp' : '']"
          >
            <CloseButton @click="isActive.value = false" />
            <v-card-text class="pa-0">
              <v-sheet class="d-flex justify-space-between align-center ga-6 body-b1 pr-8">
                Удалить текущий аватар?
              </v-sheet>
              <v-sheet class="flex-1-0 d-flex justify-start ga-6 mt-6">
                <v-btn
                  ref="favorite-star-confirm"
                  type="button"
                  :label="t('trading.favoriteInstrument.deleteBtnText')"
                  @click="handleDialogConfirm"
                >
                  <template #[`prepend`]>
                    <v-icon icon="mdi-delete" color="rgb(255,255,255)" />
                  </template>
                </v-btn>
                <v-btn
                  type="button"
                  label="Отмена"
                  variant="outlined"
                  @click="isActive.value = false"
                />
              </v-sheet>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-sheet>
    <v-sheet v-else :class="{ 'py-4 d-flex justify-center': showDeleteIcon }">
      <BaseAvatar :full-name="`${accountStore.data.info.surname} ${accountStore.data.info.name}`" />
    </v-sheet>
  
</template>

<style scoped lang="scss">
  .user-avatar {
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    &.user-avatar-light {
      border: 2px solid var(--color-BlackDisabled);
    }

    &.user-avatar-dark {
      border: 2px solid var(--color-WhiteDisabled);
    }
  }

  .user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
