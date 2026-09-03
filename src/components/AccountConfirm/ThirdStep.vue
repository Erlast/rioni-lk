<script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useAccountStore } from '@/stores/accountStore.ts';
  import accountsService from '@/api/accountService';
  import AddressesForm from '@/components/BaseComponents/AddressesForm.vue';

  const accountStore = useAccountStore();
  const { t } = useI18n();
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
    <v-sheet class="font-18 text-hard-blue">Подтвердите адрес</v-sheet>
  </v-card-title>
  <v-card-text class="d-flex flex-column ga-2 py-0 px-2">
    <v-sheet
      class="d-flex ga-1 font-smaller cursor-pointer text-additional-link mt-4"
      @click="backToStart()"
    >
      <v-icon icon="mdi-arrow-left" />
      <v-sheet>{{ t('auth.back') }}</v-sheet>
    </v-sheet>
    <v-sheet class="d-flex flex-column ga-4" style="line-height: 20px">
      <v-sheet>
        <v-sheet>
          Для завершения верификации необходимо
          <span class="text-element-check">
            загрузить документ подтверждающий адрес вашего проживания.
          </span>
        </v-sheet>
        <v-sheet>
          Документ должен содержать ваши ФИО и полный адрес проживания. Загрузите документ из
          допустимого перечня:
        </v-sheet>
      </v-sheet>
      <v-sheet>
        <ul>
          <li>банковская выписка;</li>
          <li>счёт за коммунальные услуги;</li>
          <li>официальный документ государственного органа;</li>
          <li>
            другие документы из
            <span class="text-additional-link">утверждённого перечня.</span>
          </li>
        </ul>
      </v-sheet>
      <AddressesForm ref="addressesFormRef" />
    </v-sheet>
    <v-sheet class="">
      <v-btn variant="flat" rounded="mr" color="ocean-blue" @click="confirmAddress">
        <v-sheet class="text-white">Подтвердить адрес</v-sheet>
      </v-btn>
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
