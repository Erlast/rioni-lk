<script setup lang="ts">
  import { computed, inject, onMounted, reactive, Ref, ref } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { requiredIf, helpers } from '@vuelidate/validators';
  import { useI18n } from 'vue-i18n';
  import { countries, itemsFlags } from '@/utils/data';
  import { IBankAccountModel } from '@/api/types';
  import accountsService from '@/api/accountService';
  import { useAccountStore } from '@/stores/accountStore';
  import { useNotify } from '@/stores/notifyStore';

  const accountStore = useAccountStore();
  const notifyStore = useNotify();
  const { t } = useI18n();
  const isSending = ref(false);
  const showAnketa = inject<Ref<boolean>>('showAnketa', ref(false));
  const showBlockDialog = ref(false);
  const blockedAccountIndex = ref<number | null>(null);

  const state = reactive({
    bankAccounts: [] as IBankAccountModel[]
  });

  const activeBankAccounts = computed(() => state.bankAccounts.filter(acc => !acc.isBlocked));
  const blockedBankAccounts = computed(() => state.bankAccounts.filter(acc => acc.isBlocked));

  const rules = {
    bankAccounts: {
      $each: helpers.forEach({
        country: {
          required: helpers.withMessage(
            t('validations.requiredField'),
            requiredIf((_, vm: any) => {
              return !!vm.bankName || !!vm.iban || !!vm.swift;
            })
          )
        },
        bankName: {
          required: helpers.withMessage(
            t('validations.requiredField'),
            requiredIf((_, vm) => {
              return !!vm.country || !!vm.iban || !!vm.swift;
            })
          )
        },
        iban: {
          required: helpers.withMessage(
            t('validations.requiredField'),
            requiredIf((_, vm) => {
              return !!vm.country || !!vm.bankName || !!vm.swift;
            })
          )
        },
        swift: {
          required: helpers.withMessage(
            t('validations.requiredField'),
            requiredIf((_, vm) => {
              return !!vm.country || !!vm.bankName || !!vm.iban;
            })
          )
        }
      })
    }
  };

  const v$ = useVuelidate(rules, state);

  const addBankAccount = () => {
    state.bankAccounts.push({
      id: 0,
      country: null,
      bankName: '',
      iban: '',
      swift: '',
      isMain: false,
      isBlocked: false,
      isConfirmed: false
    });
  };

  const blockBankAccount = async (index: number) => {
    const account = activeBankAccounts.value[index];
    if (account) {
      const wasMain = account.isMain;
      account.isBlocked = true;
      if (wasMain) {
        const firstActive = activeBankAccounts.value.find(acc => !acc.isBlocked);
        if (firstActive) {
          firstActive.isMain = true;
        }
      }
      try {
        await accountsService.profileBankAccountsSave(accountStore.data.id, state.bankAccounts);
      } catch (error) {
        notifyStore.showServiceError(error);
      }
    }
  };

  const openBlockDialog = (index: number) => {
    blockedAccountIndex.value = index;
    showBlockDialog.value = true;
  };

  const confirmBlock = async () => {
    if (blockedAccountIndex.value !== null) {
      await blockBankAccount(blockedAccountIndex.value);
    }
    showBlockDialog.value = false;
    blockedAccountIndex.value = null;
  };

  const cancelBlock = () => {
    showBlockDialog.value = false;
    blockedAccountIndex.value = null;
  };

  const setMainAccount = (index: number) => {
    activeBankAccounts.value.forEach((acc, i) => {
      acc.isMain = i === index;
    });
  };

  const handleFormSubmit = async () => {
    isSending.value = true;
    try {
      const result = await v$.value.$validate();
      if (!result) {
        return;
      }
      const filteredBankAccounts = state.bankAccounts.filter(
        item =>
          (item.id !== 0 && item.isBlocked) ||
          item.country ||
          item.swift ||
          item.bankName ||
          item.iban
      );

      await accountsService.profileBankAccountsSave(accountStore.data.id, filteredBankAccounts);

      showAnketa.value = false;
    } catch (error) {
      notifyStore.showServiceError(error);
    } finally {
      isSending.value = false;
    }
  };

  onMounted(async () => {
    state.bankAccounts = await accountsService.profileBankAccounts(accountStore.data.id);
    if (!state.bankAccounts.length) {
      state.bankAccounts.push({
        id: 0,
        country: null,
        bankName: '',
        iban: '',
        swift: '',
        isBlocked: false,
        isConfirmed: false,
        isMain: true
      });
    }
  });
</script>

<template>
  <v-form ref="anketa" @submit.prevent="handleFormSubmit">
    <v-sheet
      class="pa-8 d-flex flex-column ga-4"
      rounded="xxl"
      style="background-color: var(--color-MainBackground) !important"
    >
      <v-sheet class="d-flex flex-column ga-2">
        <v-sheet class="text-background-blue font-20 font-semibold">
          {{ t('profile.modals.anketa.bankAccountsTitle') }}
        </v-sheet>
        <v-sheet v-for="(bankAccount, index) in activeBankAccounts" class="d-flex flex-column ga-2">
          <v-sheet class="d-flex justify-space-between align-center">
            <v-sheet v-if="bankAccount.isConfirmed" class="text-element-check font-smaller">
              {{ t('profile.modals.anketa.isConfirmed') }}
            </v-sheet>
            <v-sheet v-else class="text-type-text font-smaller">
              {{ t('profile.modals.anketa.isNotConfirmed') }}
            </v-sheet>
            <v-checkbox
              :model-value="bankAccount.isMain"
              @update:model-value="setMainAccount(index)"
              :label="t('profile.modals.anketa.bankAccountIsMain')"
              class="checkbox-bank-account"
              hide-details
              true-icon="rioni:formCheckOn"
              false-icon="rioni:formCheckOff"
            ></v-checkbox>
          </v-sheet>
          <v-sheet class="d-flex ga-2">
            <v-sheet width="50%">
              <v-autocomplete
                v-model="bankAccount.country"
                variant="solo"
                flat
                density="compact"
                :items="countries"
                hide-details="auto"
                :label="t('profile.modals.anketa.countryTitle')"
                :error="v$.bankAccounts.$each.$response.$errors[index]?.country?.$invalid"
                :error-messages="
                  v$.bankAccounts.$each.$response.$errors[index]?.country?.length
                    ? (v$.bankAccounts.$each.$response.$errors[index].country[0]
                        ?.$message as string)
                    : ''
                "
              />
            </v-sheet>
            <v-sheet width="50%">
              <v-text-field
                v-model="bankAccount.bankName"
                variant="solo"
                density="compact"
                flat
                hide-details="auto"
                :label="t('profile.modals.anketa.bankNameTitle')"
                :error="v$.bankAccounts.$each.$response.$errors[index]?.bankName?.$invalid"
                :error-messages="
                  v$.bankAccounts.$each.$response.$errors[index]?.bankName?.length
                    ? (v$.bankAccounts.$each.$response.$errors[index].bankName[0]
                        ?.$message as string)
                    : ''
                "
              ></v-text-field>
            </v-sheet>
          </v-sheet>
          <v-sheet class="d-flex ga-2">
            <v-sheet width="50%">
              <v-text-field
                v-model="bankAccount.iban"
                variant="solo"
                density="compact"
                flat
                hide-details="auto"
                label="IBAN"
                required
                :error="v$.bankAccounts.$each.$response.$errors[index]?.iban?.$invalid"
                :error-messages="
                  v$.bankAccounts.$each.$response.$errors[index]?.iban?.length
                    ? (v$.bankAccounts.$each.$response.$errors[index].iban[0]?.$message as string)
                    : ''
                "
              ></v-text-field>
            </v-sheet>
            <v-sheet width="50%">
              <v-text-field
                v-model="bankAccount.swift"
                variant="solo"
                density="compact"
                flat
                hide-details="auto"
                label="SWIFT"
                :error="v$.bankAccounts.$each.$response.$errors[index]?.swift?.$invalid"
                :error-messages="
                  v$.bankAccounts.$each.$response.$errors[index]?.swift?.length
                    ? (v$.bankAccounts.$each.$response.$errors[index].swift[0]?.$message as string)
                    : ''
                "
              ></v-text-field>
            </v-sheet>
          </v-sheet>
          <v-sheet
            class="d-flex justify-end text-type-text font-smaller cursor-pointer"
            @click="openBlockDialog(index)"
          >
            {{ t('profile.modals.anketa.blockBtn') }}
          </v-sheet>
        </v-sheet>
        <v-sheet class="text-type-text font-smaller cursor-pointer" @click="addBankAccount">
          {{ t('profile.modals.anketa.addBtn') }}
        </v-sheet>
      </v-sheet>
      <v-sheet>
        <v-btn
          :loading="isSending"
          variant="flat"
          rounded="lg"
          bg="element-check"
          color="element-check"
          type="submit"
        >
          <v-sheet class="text-white">
            {{ t('profile.modals.settings.contactInformationSaveBtn') }}
          </v-sheet>
        </v-btn>
      </v-sheet>
      <v-sheet
        v-for="(bankAccount, index) in blockedBankAccounts"
        class="d-flex flex-column ga-2 mt-4"
      >
        <v-sheet class="d-flex justify-start align-center">
          <v-sheet class="text-additional-error font-smaller">
            {{ t('profile.modals.anketa.blockedAccount') }}
          </v-sheet>
        </v-sheet>
        <v-sheet class="d-flex ga-2">
          <v-sheet width="50%">
            <v-autocomplete
              v-model="bankAccount.country"
              variant="solo"
              flat
              density="compact"
              :items="countries"
              hide-details="auto"
              :label="t('profile.modals.anketa.countryTitle')"
              disabled
            />
          </v-sheet>
          <v-sheet width="50%">
            <v-text-field
              v-model="bankAccount.bankName"
              variant="solo"
              density="compact"
              flat
              hide-details="auto"
              :label="t('profile.modals.anketa.bankNameTitle')"
              disabled
            ></v-text-field>
          </v-sheet>
        </v-sheet>
        <v-sheet class="d-flex ga-2">
          <v-sheet width="50%">
            <v-text-field
              v-model="bankAccount.iban"
              variant="solo"
              density="compact"
              flat
              hide-details="auto"
              label="IBAN"
              disabled
            ></v-text-field>
          </v-sheet>
          <v-sheet width="50%">
            <v-text-field
              v-model="bankAccount.swift"
              variant="solo"
              density="compact"
              flat
              hide-details="auto"
              label="SWIFT"
              disabled
            ></v-text-field>
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <v-dialog v-model="showBlockDialog" max-width="400">
      <v-card>
        <v-card-title class="text-background-blue font-semibold pa-4">
          {{ t('profile.modals.anketa.confirmBlockTitle') }}
        </v-card-title>
        <v-card-text>
          {{ t('profile.modals.anketa.confirmBlockText') }}
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-btn variant="text" rounded="lg" @click="cancelBlock">
            {{ t('profile.modals.anketa.cancelBtn') }}
          </v-btn>
          <v-btn variant="flat" rounded="lg" color="element-check" @click="confirmBlock">
            <v-sheet class="text-white">{{ t('profile.modals.anketa.okBtn') }}</v-sheet>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<style scoped lang="scss">
  .checkbox-bank-account:has(.v-selection-control) {
    :deep(.v-label) {
      color: var(--color-TypeText) !important;
    }
  }
</style>
