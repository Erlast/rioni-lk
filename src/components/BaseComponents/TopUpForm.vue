<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { ref } from 'vue';
  import { useDictionaryStore } from '@/stores/dictionariesStore.ts';
  import useClipboard from 'vue-clipboard3';
  import { useNotify } from '@/stores/notifyStore.ts';
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';
  import { useDisplay } from 'vuetify';

  const { t } = useI18n();
  const notifyStore = useNotify();
  const dialog = ref(false);
  const { toClipboard } = useClipboard();
  const { mobile } = useDisplay();
  const isMobile = ref(false);

  // Form fields refs
  const currencyValue = ref<any>({ id: 1, title: 'USD', symbol: '$' });
  const amount = ref('');
  const iban = ref('GE01PS1234567000000000');
  const bankName = ref('JSC Paysera');
  const swiftBic = ref('PSRAGE22');
  const country = ref('Страна');
  const address = ref('Адрес');
  const paymentPurpose = ref('Пополнение брокерского счета RCGEBA1234567890');

  const dictionariesStore = useDictionaryStore();

  // Check if mobile device
  const checkMobile = () => {
    isMobile.value =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      mobile.value;
  };

  const openTopUp = () => {
    checkMobile();
    dialog.value = true;
  };

  const copy = async (text: string) => {
    await toClipboard(text);
    notifyStore.show(t('topUpAccount.textCopied'), '', 'info', 'copy', 2000);
  };

  const getFormData = () => {
    return {
      currency: currencyValue.value?.title || 'USD',
      currencySymbol: currencyValue.value?.symbol || '$',
      amount: amount.value,
      iban: iban.value,
      bankName: bankName.value,
      swiftBic: swiftBic.value,
      country: country.value,
      address: address.value,
      paymentPurpose: paymentPurpose.value
    };
  };

  const generatePDFFromHTML = async () => {
    const data = getFormData();

    // Create a temporary div with the content styled for PDF
    const tempDiv = document.createElement('div');
    tempDiv.style.cssText = `
      position: absolute;
      left: -9999px;
      top: 0;
      width: 595px;
      padding: 40px;
      font-family: Arial, sans-serif;
      background: white;
      color: #000;
      box-sizing: border-box;
    `;

    tempDiv.innerHTML = `
      <div style="font-size: 24px; color: #103673; margin-bottom: 20px; font-weight: bold;">
        Rioni Capital — Реквизиты для пополнения
      </div>
      <div style="font-size: 12px; color: #666; margin-bottom: 30px;">
        Дата: ${new Date().toLocaleDateString('ru-RU')}
      </div>
      
      <div style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        Информация о платеже
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">Валюта:</span> <span style="font-weight: bold;">${data.currency}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 25px;">
        <span style="color: #666;">Сумма зачислений:</span> <span style="font-weight: bold;">${data.amount || '100'} ${data.currencySymbol}</span>
      </div>
      
      <div style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        Реквизиты Rioni Capital
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">IBAN:</span> <span style="font-weight: bold; font-family: monospace;">${data.iban}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">Банк:</span> <span style="font-weight: bold;">${data.bankName}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">SWIFT/BIC:</span> <span style="font-weight: bold; font-family: monospace;">${data.swiftBic}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">Страна:</span> <span style="font-weight: bold;">${data.country || '—'}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 25px;">
        <span style="color: #666;">Адрес:</span> <span style="font-weight: bold;">${data.address || '—'}</span>
      </div>
      
      <div style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        Назначение платежа
      </div>
      <div style="font-size: 14px; margin-bottom: 30px; line-height: 1.5;">
        ${data.paymentPurpose}
      </div>
      
      <div style="font-size: 11px; color: #666; border: 1px solid #d4edda; background: #f0f8f0; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <strong>Внимание!</strong> При пополнении счета с реквизитов не указанных в личном кабинете, процесс пополнения счета может занять больше времени из-за дополнительной проверки.
      </div>
    `;

    document.body.appendChild(tempDiv);

    try {
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('rioni-capital-requisites.pdf');
      notifyStore.show('PDF успешно скачан', '', 'success', '', 2000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      notifyStore.show('Ошибка при генерации PDF', '', 'error', '', 2000);
    } finally {
      document.body.removeChild(tempDiv);
    }
  };

  const shareOnMobile = async () => {
    const canShare = navigator.share && navigator.canShare;
    const data = getFormData();

    if (!canShare) {
      notifyStore.show(
        'Функция share не поддерживается на этом устройстве',
        '',
        'warn',
        'app',
        2000
      );
      generatePDFFromHTML();
      return;
    }

    // Create temp div for sharing
    const tempDiv = document.createElement('div');
    tempDiv.style.cssText = `
      position: absolute;
      left: -9999px;
      top: 0;
      width: 595px;
      padding: 40px;
      font-family: Arial, sans-serif;
      background: white;
      color: #000;
      box-sizing: border-box;
    `;

    tempDiv.innerHTML = `
      <div style="font-size: 24px; color: #103673; margin-bottom: 20px; font-weight: bold;">
        Rioni Capital — Реквизиты для пополнения
      </div>
      <div style="font-size: 12px; color: #666; margin-bottom: 30px;">
        Дата: ${new Date().toLocaleDateString('ru-RU')}
      </div>
      
      <div style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        Информация о платеже
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">Валюта:</span> <span style="font-weight: bold;">${data.currency}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 25px;">
        <span style="color: #666;">Сумма зачислений:</span> <span style="font-weight: bold;">${data.amount || '100'} ${data.currencySymbol}</span>
      </div>
      
      <div style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        Реквизиты Rioni Capital
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">IBAN:</span> <span style="font-weight: bold; font-family: monospace;">${data.iban}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">Банк:</span> <span style="font-weight: bold;">${data.bankName}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">SWIFT/BIC:</span> <span style="font-weight: bold; font-family: monospace;">${data.swiftBic}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">Страна:</span> <span style="font-weight: bold;">${data.country || '—'}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 25px;">
        <span style="color: #666;">Адрес:</span> <span style="font-weight: bold;">${data.address || '—'}</span>
      </div>
      
      <div style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        Назначение платежа
      </div>
      <div style="font-size: 14px; margin-bottom: 30px; line-height: 1.5;">
        ${data.paymentPurpose}
      </div>
      
      <div style="font-size: 11px; color: #666; border: 1px solid #d4edda; background: #f0f8f0; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <strong>Внимание!</strong> При пополнении счета с реквизитов не указанных в личном кабинете, процесс пополнения счета может занять больше времени из-за дополнительной проверки.
      </div>
    `;

    document.body.appendChild(tempDiv);

    try {
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const pdfBlob = pdf.output('blob');
      const file = new File([pdfBlob], 'rioni-capital-requisites.pdf', { type: 'application/pdf' });

      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: t('topUpAccount.accountDetailsTitle'),
            text: `${t('topUpAccount.accountDetails')}:\nIBAN: ${data.iban}\n${t('topUpAccount.bank')}: ${data.bankName}`,
            files: [file]
          });
          notifyStore.show(
            t('topUpAccount.accountDetailsDownloadSuccess'),
            '',
            'success',
            'app',
            2000
          );
        } catch (err: any) {
          if (err.name !== 'AbortError') {
            notifyStore.show(t('errors.downloadError'), '', 'error', 'app', 2000);
          }
        }
      } else {
        notifyStore.show(t('errors.pdfNotAvailableForDownload'), '', 'warn', 'app', 2000);
        pdf.save('rioni-capital-requisites.pdf');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      notifyStore.show(t('errors.pdfGenerateError'), '', 'error', 'app', 2000);
    } finally {
      document.body.removeChild(tempDiv);
    }
  };

  const sendRequisites = () => {
    if (isMobile.value) {
      shareOnMobile();
    } else {
      generatePDFFromHTML();
    }
  };

  defineExpose({
    openTopUp
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
            {{ t('topUpAccount.topUpTitle') }}
          </v-sheet>
          <v-sheet class="button-close-form position-absolute" @click="dialog = false">
            <v-icon icon="mdi-close" size="sm"></v-icon>
          </v-sheet>
        </v-card-title>
        <v-card-text>
          <v-sheet class="d-flex flex-column ga-2 mt-4">
            <v-sheet class="d-flex ga-2">
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
              <v-sheet class="d-flex flex-column ga-2" width="50%">
                <v-sheet class="font-smaller text-type-text">
                  {{ t('topUpAccount.amount') }}
                </v-sheet>
                <v-text-field
                  v-model="amount"
                  :placeholder="`100${currencyValue?.symbol || '$'}`"
                  variant="solo"
                  density="compact"
                  flat
                  hide-details="auto"
                  label=""
                />
              </v-sheet>
            </v-sheet>
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
                    <v-icon
                      icon="mdi-content-copy"
                      color="common"
                      size="x-small"
                      @click="copy(iban)"
                    />
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
                  v-model="swiftBic"
                  variant="solo"
                  density="compact"
                  flat
                  readonly
                  hide-details="auto"
                  placeholder="PSRAGE22"
                >
                  <template v-slot:append-inner>
                    <v-icon
                      icon="mdi-content-copy"
                      color="common"
                      size="x-small"
                      @click="copy(swiftBic)"
                    />
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
                    <v-icon
                      icon="mdi-content-copy"
                      color="common"
                      size="x-small"
                      @click="copy(country)"
                    />
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
                    <v-icon
                      icon="mdi-content-copy"
                      color="common"
                      size="x-small"
                      @click="copy(address)"
                    />
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
            <v-sheet
              class="rounded-ml px-6 py-4 font-small"
              style="background-color: var(--color-LightGreen) !important"
            >
              {{ t('topUpAccount.text') }}
            </v-sheet>
            <v-sheet>
              <v-btn variant="flat" rounded="ml" class="btn-custom" @click="sendRequisites">
                {{ t('topUpAccount.sendBtn') }}
              </v-btn>
            </v-sheet>
          </v-sheet>
        </v-card-text>
      </v-sheet>
    </v-card>
  </v-dialog>
  <slot name="button">
    <v-btn variant="flat" rounded="mr" @click="openTopUp" height="50" class="btn-top-up">
      <template #prepend>
        <v-img width="26" src="/img/topUp-btn-icon.png" />
      </template>
      {{ t('portfolio.topUpBtn') }}
    </v-btn>
  </slot>
</template>

<style scoped lang="scss">
  .modal-window {
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
  .btn-top-up {
    padding: 0 30px;
    font-size: 16px;
    color: white;
    background: linear-gradient(67deg, #103673 40.45%, #4a77c1 81.54%) !important;
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
    /* justify-content: center; */
    align-items: center;

    .v-icon {
      width: 25px;
      height: 25px;
      /* display: flex; */
      // margin-top: -7px;
      // margin-left: 0.1rem;
    }
  }

  .btn-custom {
    //padding: 0 30px;
    //font-size: 16px;
    color: white;
    //height: 72px;
    //width: 33%;
    background: var(--color-Element) !important;
  }
</style>
