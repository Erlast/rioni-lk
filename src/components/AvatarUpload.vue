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
          const data = await accountsService.uploadAvatar(accountStore.data.id, fileUpload.value);
          accountStore.data.info.photoUrl = data.data.url;
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
    <template v-slot:icon></template>
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
          v-if="accountStore.data.info.photoUrl"
          width="146"
          height="146"
          :src="accountStore.data.info.photoUrl"
        />
        <v-img v-else width="146" height="146" src="/img/avatar-default.png" />
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
