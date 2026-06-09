<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';
  import useClipboard from 'vue-clipboard3';
  import { useNotify } from '@/stores/notifyStore.ts';
  import { useDictionaryStore } from '@/stores/dictionariesStore.ts';
  import { usePortfolioStore } from '@/stores/portfolioStore.ts';
  import { countries } from '@/utils/data.ts';

  const { mobile } = useDisplay();
  const { toClipboard } = useClipboard();
  const notifyStore = useNotify();
  const dictionariesStore = useDictionaryStore();
  const portfolioStore = usePortfolioStore();
  const { t } = useI18n();
  const dialog = ref(false);
  const currencyValue = ref<any>({ id: 1, title: 'USD', symbol: '$' });
  const amount = ref('');
  const withdrawalSum = ref('');
  const country = ref();
  const bankName = ref();
  const iban = ref();
  const swift = ref();

  const copy = async (text: string) => {
    await toClipboard(text);
    notifyStore.show(t('topUpAccount.textCopied'), '', 'info', 'copy', 2000);
  };

  const withdrawalHandle = () => {};

  onMounted(async () => {
    await portfolioStore.load();

    portfolioStore.setCurrentAccount();
  });
</script>

<template>
  <v-dialog
    v-model="dialog"
    :width="mobile ? 'auto' : 600"
    :min-width="mobile ? '100%' : 600"
    persistent
  >
    <v-card>
      <v-sheet class="modal-window">
        <v-card-title class="d-flex justify-center">
          <v-sheet class="font-semibold font-22 text-background-blue" :class="{ 'mt-4': mobile }">
            {{ t('withdrawal.title') }}
          </v-sheet>
          <v-sheet class="button-close-form position-absolute" @click="dialog = false">
            <v-icon icon="mdi-close" size="sm"></v-icon>
          </v-sheet>
        </v-card-title>
        <v-card-text>
          <v-sheet class="d-flex flex-column ga-2 mt-4">
            <v-sheet class="custom-inputs d-flex ga-2">
              <v-sheet class="d-flex flex-column ga-2" width="50%">
                <v-sheet class="font-smaller text-type-text">
                  {{ t('withdrawal.amount') }}
                </v-sheet>
                <v-text-field
                  v-model="amount"
                  :placeholder="`${portfolioStore.data.currentAccount && portfolioStore.data.currentAccount.tradingFunds ? portfolioStore.data.currentAccount.tradingFunds : 0}`"
                  variant="solo"
                  density="compact"
                  flat
                  readonly
                  hide-details="auto"
                  label=""
                  persistent-placeholder
                  :prefix="currencyValue?.symbol || '$'"
                />
              </v-sheet>
              <v-sheet class="d-flex flex-column ga-2" width="50%">
                <v-sheet class="font-smaller text-type-text">
                  {{ t('topUpAccount.currency') }}
                </v-sheet>
                <v-autocomplete
                  v-model="currencyValue"
                  variant="solo"
                  density="compact"
                  flat
                  hide-details="auto"
                  :items="dictionariesStore.currencies"
                  item-title="title"
                  item-value="id"
                  label=""
                />
              </v-sheet>
            </v-sheet>
            <v-sheet class="custom-inputs d-flex flex-column ga-2">
              <v-sheet class="font-smaller text-type-text">
                {{ t('withdrawal.sum') }}
              </v-sheet>
              <v-sheet class="d-flex ga-2">
                <v-sheet width="50%">
                  <v-text-field
                    v-model="withdrawalSum"
                    variant="solo"
                    density="compact"
                    flat
                    hide-details="auto"
                    persistent-placeholder
                    :prefix="currencyValue?.symbol || '$'"
                    :placeholder="`${portfolioStore.data.currentAccount && portfolioStore.data.currentAccount.tradingFunds ? portfolioStore.data.currentAccount.tradingFunds : 0}`"
                  />
                </v-sheet>
                <v-sheet width="50%">
                  <v-btn
                    block
                    variant="flat"
                    rounded="ml"
                    class="btn-send"
                    @click="withdrawalHandle"
                  >
                    Вывести всю сумму
                  </v-btn>
                </v-sheet>
              </v-sheet>
              <v-sheet class="font-smaller text-type-text">
                Обратите внимание, что может взиматься комиссия
              </v-sheet>
            </v-sheet>
            <v-sheet class="d-flex flex-column ga-2">
              <v-sheet class="font-smaller text-type-text">
                {{ t('withdrawal.accountDetailsTitle') }}
              </v-sheet>
              <v-sheet class="d-flex ga-2">
                <v-autocomplete
                  v-model="country"
                  variant="solo"
                  flat
                  density="compact"
                  :items="countries"
                  hide-details="auto"
                  persistent-placeholder
                  :placeholder="t('withdrawal.countryTitle')"
                />
                <v-text-field
                  v-model="bankName"
                  variant="solo"
                  density="compact"
                  flat
                  hide-details="auto"
                  placeholder="Наименование банка"
                >
                  <template v-slot:append-inner>
                    <v-icon
                      icon="mdi-content-copy"
                      color="common"
                      size="x-small"
                      @click="copy(bankName)"
                    />
                  </template>
                </v-text-field>
              </v-sheet>
              <v-sheet class="d-flex ga-2">
                <v-text-field
                  v-model="swift"
                  variant="solo"
                  density="compact"
                  flat
                  hide-details="auto"
                  placeholder="SWIFT"
                >
                  <template v-slot:append-inner>
                    <v-icon
                      icon="mdi-content-copy"
                      color="common"
                      size="x-small"
                      @click="copy(swift)"
                    />
                  </template>
                </v-text-field>
                <v-text-field
                  v-model="iban"
                  variant="solo"
                  density="compact"
                  flat
                  hide-details="auto"
                  :placeholder="t('withdrawal.iban')"
                >
                  <template v-slot:append-inner>
                    <v-icon
                      icon="mdi-content-copy"
                      color="common"
                      size="x-small"
                      @click="copy(iban)"
                    />
                  </template>
                </v-text-field>
              </v-sheet>
            </v-sheet>
            <v-sheet class="font-smaller text-type-text">
              {{ t('withdrawal.text') }}
              <span class="text-additional-link">{{ t('withdrawal.addDetails') }}</span>
            </v-sheet>
            <v-sheet class="d-flex flex-column ga-2 mt-6">
              <v-sheet>
                <v-btn variant="flat" rounded="ml" class="btn-send" @click="withdrawalHandle">
                  {{ t('withdrawal.withdrawalBtn') }}
                </v-btn>
              </v-sheet>
              <v-sheet class="font-smaller text-type-text">
                Комиссия вывода сотавит 2% от общей суммы = $56
              </v-sheet>
            </v-sheet>
          </v-sheet>
        </v-card-text>
      </v-sheet>
    </v-card>
  </v-dialog>
  <v-btn
    variant="flat"
    rounded="mr"
    class="btn-custom"
    :width="mobile ? '100%' : '33%'"
    @click="dialog = true"
  >
    {{ t('pronounce.withdrawalBtn') }}
  </v-btn>
</template>

<style scoped lang="scss">
  .modal-window {
    .v-input {
      :deep(.v-field__overlay) {
        background-color: var(--color-LightBlue);
      }
    }

    .custom-inputs {
      :deep(.v-field__field) {
        align-items: center;
        --v-disabled-opacity: 1;
        --v-high-emphasis-opacity: 1;
      }
    }

    :deep(.v-field__field) {
      font-size: 14px;
    }
  }
  .button-close-form {
    cursor: pointer;
    width: 23px;
    height: 23px;
    background-color: var(--color-LightBlue) !important;
    border-radius: 50%;
    right: 16px;
    top: 16px;
    display: flex;
    align-items: center;

    .v-icon {
      width: 25px;
      height: 25px;
    }
  }
  .btn-custom {
    padding: 0 30px;
    font-size: 16px;
    color: white;
    height: 72px;
    background: var(--color-MiddleBlue) !important;
  }

  .btn-send {
    color: white;
    background: var(--color-Element) !important;
  }
</style>
