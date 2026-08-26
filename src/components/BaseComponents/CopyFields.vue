<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { ref } from 'vue';
  import { useNotify } from '@/stores/notifyStore.ts';
  import useClipboard from 'vue-clipboard3';

  const { t } = useI18n();
  const notifyStore = useNotify();
  const { toClipboard } = useClipboard();

  const iban = ref('GE01PS1234567000000000');
  const bankName = ref('JSC Paysera');
  const swiftBic = ref('PSRAGE22');
  const country = ref('Страна');
  const address = ref('Адрес');
  const paymentPurpose = ref('Пополнение брокерского счета RCGEBA1234567890');

  const copy = async (text: string) => {
    await toClipboard(text);
    notifyStore.show(t('topUpAccount.textCopied'), '', 'info', 'copy', 2000);
  };
</script>

<template>
  <v-sheet class="copy-fields">
    <v-sheet class="d-flex flex-column ga-2">
      <v-sheet class="font-smaller text-type-text">
        {{ t('topUpAccount.accountDetailsTitle') }}
      </v-sheet>
      <v-sheet class="d-flex ga-2">
        <v-text-field
          v-model="iban"
          variant="solo"
          density="compact"
          flat
          hide-details="auto"
          readonly
          placeholder="GE01PS1234567000000000"
        >
          <template v-slot:append-inner>
            <v-icon icon="mdi-content-copy" color="common" size="x-small" @click="copy(iban)" />
          </template>
        </v-text-field>
        <v-text-field
          v-model="bankName"
          variant="solo"
          density="compact"
          flat
          readonly
          hide-details="auto"
          placeholder="JSC Paysera"
        >
          <template v-slot:append-inner>
            <v-icon icon="mdi-content-copy" color="common" size="x-small" @click="copy(bankName)" />
          </template>
        </v-text-field>
      </v-sheet>
      <v-sheet class="d-flex ga-2">
        <v-text-field
          v-model="swiftBic"
          variant="solo"
          density="compact"
          flat
          readonly
          hide-details="auto"
          placeholder="PSRAGE22"
        >
          <template v-slot:append-inner>
            <v-icon icon="mdi-content-copy" color="common" size="x-small" @click="copy(swiftBic)" />
          </template>
        </v-text-field>
        <v-text-field
          v-model="country"
          variant="solo"
          density="compact"
          readonly
          flat
          hide-details="auto"
          :placeholder="t('topUpAccount.country')"
        >
          <template v-slot:append-inner>
            <v-icon icon="mdi-content-copy" color="common" size="x-small" @click="copy(country)" />
          </template>
        </v-text-field>
      </v-sheet>
      <v-sheet class="d-flex ga-2">
        <v-text-field
          v-model="address"
          variant="solo"
          density="compact"
          flat
          readonly
          hide-details="auto"
          :placeholder="t('topUpAccount.address')"
        >
          <template v-slot:append-inner>
            <v-icon icon="mdi-content-copy" color="common" size="x-small" @click="copy(address)" />
          </template>
        </v-text-field>
      </v-sheet>
    </v-sheet>
    <v-sheet class="d-flex flex-column ga-2">
      <v-sheet class="font-smaller text-type-text">
        {{ t('topUpAccount.paymentPurposeTitle') }}
      </v-sheet>
      <v-sheet class="d-flex ga-2">
        <v-text-field
          v-model="paymentPurpose"
          variant="solo"
          density="compact"
          flat
          readonly
          hide-details="auto"
          :placeholder="t('topUpAccount.paymentPurpose')"
        >
          <template v-slot:append-inner>
            <v-icon
              icon="mdi-content-copy"
              color="common"
              size="x-small"
              @click="copy(paymentPurpose)"
            />
          </template>
        </v-text-field>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  .copy-fields {
    .v-input {
      :deep(.v-field__overlay) {
        background-color: var(--color-LightBlue);
      }
    }

    :deep(.v-field__field) {
      --v-disabled-opacity: 1;
      --v-high-emphasis-opacity: 1;
      font-size: 14px;
    }
  }
</style>
