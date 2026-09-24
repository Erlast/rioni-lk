<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useAccountStore } from '@/stores/accountStore.ts';
  import accountsService from '@/api/accountService';
  import AddressesForm from '@/components/BaseComponents/AddressesForm.vue';
  import { useDisplay } from 'vuetify';

  const accountStore = useAccountStore();
  const { t } = useI18n();
  const { mobile } = useDisplay();
  const addressesFormRef = ref<InstanceType<typeof AddressesForm> | null>(null);

  const backToStart = () => {
    accountStore.accountConfirmStep = 0;
  };

  const confirmAddress = async () => {
    addressesFormRef.value?.syncAddresses();
    await accountsService.profileAddressesSave(accountStore.data.addresses);

    const selectedDocuments = addressesFormRef.value?.selectedDocuments || [];
    const selectedDocuments2 = addressesFormRef.value?.selectedDocuments2 || [];

    if (selectedDocuments.length) {
      await accountsService.uploadFiles(selectedDocuments, '/documents/addresses/actual');
    }
    if (selectedDocuments2.length) {
      await accountsService.uploadFiles(selectedDocuments2, '/documents/addresses/registration');
    }

    backToStart();
  };
</script>

<template>
  <v-card-title
    class="d-flex flex-column justify-end align-center position-relative"
    style="min-height: 50px"
  >
    <v-sheet class="font-18 text-hard-blue">{{ t('accountConfirm.addressConfirmTitle') }}</v-sheet>
  </v-card-title>
  <v-card-text class="d-flex flex-column ga-2 px-0 pb-0">
    <v-sheet
      v-if="!mobile"
      class="d-flex ga-1 font-smaller cursor-pointer text-additional-link"
      @click="backToStart()"
    >
      <v-icon icon="mdi-arrow-left" />
      <v-sheet>{{ t('accountConfirm.back') }}</v-sheet>
    </v-sheet>
    <v-sheet class="d-flex flex-column ga-4" :class="{ 'font-smaller': mobile }">
      <v-sheet :class="{ 'text-center': mobile }">
        <v-sheet>
          <span>{{ t('accountConfirm.addressConfirmDescription.text1') }}</span>
          <span class="text-element-check">
            {{ t('accountConfirm.addressConfirmDescription.text2') }}
          </span>
          <span>{{ t('accountConfirm.addressConfirmDescription.text3') }}</span>
          <br />
          <span>{{ t('accountConfirm.addressConfirmDescription.text4') }}</span>
        </v-sheet>
      </v-sheet>
      <v-sheet>
        <ul>
          <li>{{ t('accountConfirm.addressConfirmDescription.list.marker1') }}</li>
          <li>{{ t('accountConfirm.addressConfirmDescription.list.marker2') }}</li>
          <li>{{ t('accountConfirm.addressConfirmDescription.list.marker3') }}</li>
          <li>
            {{ t('accountConfirm.addressConfirmDescription.list.marker4part1') }}
            <span class="text-additional-link">
              {{ t('accountConfirm.addressConfirmDescription.list.marker4part2') }}
            </span>
          </li>
        </ul>
      </v-sheet>
      <AddressesForm
        class="confirm-address-form"
        ref="addressesFormRef"
        :show-confirm-buttons="false"
      />
    </v-sheet>
    <v-sheet class="">
      <v-btn variant="flat" rounded="mr" color="ocean-blue" :block="mobile" @click="confirmAddress">
        <v-sheet class="text-white">
          {{ t('accountConfirm.addressConfirmBtn') }}
        </v-sheet>
      </v-btn>
    </v-sheet>
    <v-sheet
      v-if="mobile"
      class="d-flex ga-1 font-smaller justify-center cursor-pointer text-additional-link mt-6"
      @click="backToStart()"
    >
      <v-icon icon="mdi-arrow-left" />
      <v-sheet>{{ t('accountConfirm.back') }}</v-sheet>
    </v-sheet>
  </v-card-text>
</template>

<style scoped lang="scss">
  ul {
    list-style: none;
    padding-left: 0;
  }

  ul li {
    padding-left: 20px;
    position: relative;
  }

  ul li::before {
    content: '-';
    position: absolute;
    left: 0;
    top: 0;
    color: #333;
    font-weight: bold;
  }

  ul li.space::before {
    content: '- ';
  }
</style>
