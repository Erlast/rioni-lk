<script setup lang="ts">
  import accountsService from '@/api/accountService';
  import ContactInformation from '@/modules/profile/components/profileSettings/ContactInformation.vue';
  import Profile from '@/modules/profile/components/profileSettings/Profile.vue';
  import { useAccountStore } from '@/stores/accountStore';
  import { useNotify } from '@/stores/notifyStore';
  import { inject, ref, Ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const isSending = ref(false);
  const accountStore = useAccountStore();
  const showProfileSettings = inject<Ref<boolean>>('showProfileSettings', ref(false));
  const notifyStore = useNotify();

  const contactRef = ref<InstanceType<typeof ContactInformation> | null>(null);
  const profileRef = ref<InstanceType<typeof Profile> | null>(null);

  const handleFormSubmit = async () => {
    isSending.value = true;

    const profileValid = await profileRef.value?.v$.$validate();
    const contactsValid = await contactRef.value?.validateAll();

    if (!contactsValid || !profileValid) {
      isSending.value = false;
      return;
    }

    contactRef.value?.syncAddressesToStore();
    contactRef.value?.syncEmailsToStore();

    const profile = profileRef.value?.state;

    try {
      const payload = {
        nickname: profile?.nickname,
        login: profile?.login
      };

      await accountsService.profileSave(accountStore.data.id, payload);
      const contactsToSave = accountStore.data.info.contacts.filter((c: any) => c.value);
      if (contactsToSave.length > 0) {
        await accountsService.profileContactsSave(accountStore.data.id, contactsToSave);
      }

      const addressesToSave = accountStore.data.info.addresses.filter(
        (a: any) => a.country || a.city || a.postcode || a.address
      );

      await accountsService.profileAddressesSave(
        accountStore.data.id,
        addressesToSave
      );
      await accountStore.load();
      showProfileSettings.value = false;
    } catch (error) {
      notifyStore.showServiceError(error);
    } finally {
      isSending.value = false;
    }
  };
</script>

<template>
  <v-card width="900">
    <v-sheet class="modal-window">
      <v-sheet>
        <v-card-title>
          <v-sheet class="modal-windows-label">
            {{ t('profile.modals.settings.title') }}
            <v-sheet class="button-close" @click="showProfileSettings = false"></v-sheet>
          </v-sheet>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" @submit.prevent="handleFormSubmit">
            <v-sheet class="d-flex flex-column ga-2">
              <v-sheet class="d-flex ga-3">
                <ContactInformation ref="contactRef"></ContactInformation>
                <Profile ref="profileRef"></Profile>
              </v-sheet>
              <v-sheet>
                <v-btn
                  :loading="isSending"
                  type="submit"
                  variant="flat"
                  rounded="lg"
                  bg="element-check"
                  color="element-check"
                >
                  <v-sheet class="text-white">
                    {{ t('profile.modals.settings.contactInformationSaveBtn') }}
                  </v-sheet>
                </v-btn>
              </v-sheet>
            </v-sheet>
          </v-form>
        </v-card-text>
      </v-sheet>
    </v-sheet>
  </v-card>
</template>

<style scoped lang="scss">
  .modal-window {
    .modal-windows-label {
      background: linear-gradient(67deg, #103673 40.45%, #4a77c1 81.54%) !important;
    }
  }
</style>
