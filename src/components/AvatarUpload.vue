x
<script setup lang="ts">
  import accountsService from '@/api/accountService';
  import { useAccountStore } from '@/stores/accountStore';
  import { useNotify } from '@/stores/notifyStore';
  import { validateFile } from '@/utils/fileSystem';
  import { ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { allowedTypes } from '@/utils/fileSystem';

  const accountStore = useAccountStore();
  const notifyStore = useNotify();
  const { t } = useI18n();
  const fileUpload = ref<File>();
  const needPreview = ref(false);
  const isLoading = ref(false);
  const dialog = ref(false);

  const cancelBlock = () => {
    dialog.value = false;
  };

  const confirmBlock = async () => {
    try {
      await accountsService.deleteAvatar();
      accountStore.data.photoUrl = '';
      dialog.value = false;
    } catch (e) {
      notifyStore.showServiceError(e);
    }
  };

  watch(
    () => fileUpload.value,
    async () => {
      if (fileUpload.value) {
        isLoading.value = true;
        const validation = validateFile(fileUpload.value);
        if (!validation.valid) {
          notifyStore.showServiceError('Ошибка при загрузке файла');
        }

        try {
          const data = await accountsService.uploadAvatar(fileUpload.value);
          accountStore.data.photoUrl = data.data.url;
        } catch (error) {
          notifyStore.showServiceError(error);
          console.log(error);
        } finally {
          isLoading.value = false;
        }
      }
    }
  );
</script>
<template>
  <v-file-upload
    v-model="fileUpload"
    :accept="allowedTypes.join(',')"
    clearable
    hide-details
    :multiple="false"
    show-size
    class="upload-content border-0 pa-0"
  >
    <template v-slot:icon>
      <v-btn
        v-if="accountStore.data.photoUrl"
        icon="mdi-close"
        variant="flat"
        class="position-absolute"
        density="compact"
        style="top: 20px; right: 5px"
        @click="dialog = true"
      />
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="text-background-blue font-semibold pa-4">
            {{ t('profile.modals.settings.confirmAvatarDeleteTitle') }}
          </v-card-title>
          <v-card-text>
            {{ t('profile.modals.settings.confirmAvatarDelete') }}
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-btn variant="text" rounded="lg" @click="cancelBlock">
              {{ t('profile.modals.settings.cancelBtn') }}
            </v-btn>
            <v-btn variant="flat" rounded="lg" color="element-check" @click="confirmBlock">
              <v-sheet class="text-white">{{ t('profile.modals.settings.okBtn') }}</v-sheet>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:browse="{ props: itemProps }">
      <v-btn :loading="isLoading" v-bind="itemProps" variant="text" rounded="lg">
        <v-icon icon="mdi-arrow-down" />
        {{ t('profile.modals.settings.uploadAvatarTitle') }}
      </v-btn>
    </template>
    <template v-slot:title>
      <v-sheet
        class="d-flex justify-center px-10 py-5 rounded-20 border-dashed border-color-element border-sm"
      >
        <v-img
          v-if="accountStore.data.photoUrl"
          width="146"
          height="146"
          :src="accountStore.data.photoUrl"
          lazy-src="/img/no-avatar.png"
        />
        <v-img v-else width="146" height="146" src="/img/no-avatar.png" />
      </v-sheet>
    </template>
    <template v-slot:divider></template>
    <template v-slot:item="{ file: fileUpload, props: itemProps }">
      <v-file-upload-item
        v-if="needPreview"
        v-bind="itemProps"
        :lines="false"
        :file="fileUpload"
        min-height="80"
        :border="false"
        elevation="01-dp"
        tag="v-sheet"
        :disabled="false"
      ></v-file-upload-item>
    </template>
  </v-file-upload>
</template>

<style scoped lang="scss">
  .upload-content {
    width: max-content;
  }
  .v-file-upload-dropzone {
    padding: 0 !important;
    &.v-sheet {
      border-width: 0 !important;
    }
  }
</style>
