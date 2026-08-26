<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { ref } from 'vue';
  import { useDictionaryStore } from '@/stores/dictionariesStore.ts';
  import useClipboard from 'vue-clipboard3';
  import { useNotify } from '@/stores/notifyStore.ts';
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';
  import { useDisplay } from 'vuetify';
  import TopUp from '@/assets/icons/topUp.vue';
  import CopyFields from '@/components/BaseComponents/CopyFields.vue';

  const { t } = useI18n();
  const notifyStore = useNotify();
  const dialog = ref(false);
  const previewDialog = ref(false);
  const pdfPreviewDialog = ref(false);
  const { mobile } = useDisplay();
  const isMobile = ref(false);
  const pdfBlobUrl = ref('');

  const currencyValue = ref<any>({ id: 1, title: 'USD', symbol: '$' });
  const amount = ref('');
  const iban = ref('GE01PS1234567000000000');
  const bankName = ref('JSC Paysera');
  const swiftBic = ref('PSRAGE22');
  const country = ref('Страна');
  const address = ref('Адрес');
  const paymentPurpose = ref('Пополнение брокерского счета RCGEBA1234567890');

  const dictionariesStore = useDictionaryStore();

  const checkMobile = () => {
    isMobile.value =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      mobile.value;
  };

  const openTopUp = () => {
    checkMobile();
    dialog.value = true;
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

  const getPreviewContent = () => {
    const data = getFormData();
    return {
      title: t('topUpAccount.downloadTitle'),
      date: new Date().toLocaleDateString('ru-RU'),
      currency: data.currency,
      amount: data.amount || '100',
      currencySymbol: data.currencySymbol,
      iban: data.iban,
      bankName: data.bankName,
      swiftBic: data.swiftBic,
      country: data.country || '—',
      address: data.address || '—',
      paymentPurpose: data.paymentPurpose
    };
  };

  const showPreview = () => {
    checkMobile();
    if (isMobile.value) {
      generatePDFPreview();
    } else {
      previewDialog.value = true;
    }
  };

  const generatePDFPreview = async () => {
    const data = getFormData();

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
         ${t('topUpAccount.downloadTitle')}
      </div>
      <div style="font-size: 12px; color: #666; margin-bottom: 30px;">
        ${t('topUpAccount.date')}: ${new Date().toLocaleDateString('ru-RU')}
      </div>

      <div style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
         ${t('topUpAccount.information')}
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">${t('topUpAccount.currency')}:</span> <span style="font-weight: bold;">${data.currency}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 25px;">
        <span style="color: #666;">${t('topUpAccount.amount')}:</span> <span style="font-weight: bold;">${data.amount || '100'} ${data.currencySymbol}</span>
      </div>

      <div style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ${t('topUpAccount.accountDetailsTitle')}
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">IBAN:</span> <span style="font-weight: bold; font-family: monospace;">${data.iban}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">${t('topUpAccount.bank')}:</span> <span style="font-weight: bold;">${data.bankName}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">SWIFT/BIC:</span> <span style="font-weight: bold; font-family: monospace;">${data.swiftBic}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">${t('topUpAccount.country')}:</span> <span style="font-weight: bold;">${data.country || '—'}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 25px;">
        <span style="color: #666;">${t('topUpAccount.address')}:</span> <span style="font-weight: bold;">${data.address || '—'}</span>
      </div>

      <div style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
         ${t('topUpAccount.paymentPurposeTitle')}
      </div>
      <div style="font-size: 14px; margin-bottom: 30px; line-height: 1.5;">
        ${data.paymentPurpose}
      </div>

      <div style="font-size: 11px; color: #666; border: 1px solid #d4edda; background: #f0f8f0; padding: 15px; border-radius: 5px; margin-top: 20px;">
         ${t('topUpAccount.text')}
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
      pdfBlobUrl.value = URL.createObjectURL(pdfBlob);
      pdfPreviewDialog.value = true;
    } catch (error) {
      console.error('Error generating PDF preview:', error);
      notifyStore.show(t('topUpAccount.pdfError'), '', 'error', '', 2000);
    } finally {
      document.body.removeChild(tempDiv);
    }
  };

  const downloadPDF = () => {
    const data = getFormData();
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
        ${t('topUpAccount.downloadTitle')}
      </div>
      <div style="font-size: 12px; color: #666; margin-bottom: 30px;">
        ${t('topUpAccount.date')}: ${new Date().toLocaleDateString('ru-RU')}
      </div>

      <div style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
       ${t('topUpAccount.information')}
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">${t('topUpAccount.currency')}:</span> <span style="font-weight: bold;">${data.currency}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 25px;">
        <span style="color: #666;">${t('topUpAccount.amount')}:</span> <span style="font-weight: bold;">${data.amount || '100'} ${data.currencySymbol}</span>
      </div>

      <div style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ${t('topUpAccount.accountDetailsTitle')}
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">IBAN:</span> <span style="font-weight: bold; font-family: monospace;">${data.iban}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">${t('topUpAccount.bank')}:</span> <span style="font-weight: bold;">${data.bankName}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">SWIFT/BIC:</span> <span style="font-weight: bold; font-family: monospace;">${data.swiftBic}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">${t('topUpAccount.country')}:</span> <span style="font-weight: bold;">${data.country || '—'}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 25px;">
        <span style="color: #666;">${t('topUpAccount.address')}:</span> <span style="font-weight: bold;">${data.address || '—'}</span>
      </div>

      <div style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ${t('topUpAccount.paymentPurposeTitle')}
      </div>
      <div style="font-size: 14px; margin-bottom: 30px; line-height: 1.5;">
        ${data.paymentPurpose}
      </div>

      <div style="font-size: 11px; color: #666; border: 1px solid #d4edda; background: #f0f8f0; padding: 15px; border-radius: 5px; margin-top: 20px;">
        ${t('topUpAccount.text')}
      </div>
    `;

    document.body.appendChild(tempDiv);

    html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    })
      .then(canvas => {
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
        notifyStore.show(t('topUpAccount.downloadSuccess'), '', 'success', 'app', 2000);
      })
      .catch(error => {
        console.error('Error generating PDF:', error);
        notifyStore.show(t('topUpAccount.pdfError'), '', 'error', 'app', 2000);
      })
      .finally(() => {
        document.body.removeChild(tempDiv);
      });
  };

  const sharePDF = async () => {
    const canShare = navigator.share && navigator.canShare;
    const data = getFormData();

    if (!canShare) {
      notifyStore.show(t('topUpAccount.shareNotSupported'), '', 'warn', 'app', 2000);
      downloadPDF();
      return;
    }

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
         ${t('topUpAccount.downloadTitle')}
      </div>
      <div style="font-size: 12px; color: #666; margin-bottom: 30px;">
        ${t('topUpAccount.date')}: ${new Date().toLocaleDateString('ru-RU')}
      </div>

      <div style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ${t('topUpAccount.information')}
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">${t('topUpAccount.currency')}:</span> <span style="font-weight: bold;">${data.currency}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 25px;">
        <span style="color: #666;">${t('topUpAccount.amount')}:</span> <span style="font-weight: bold;">${data.amount || '100'} ${data.currencySymbol}</span>
      </div>

      <div style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ${t('topUpAccount.accountDetailsTitle')}
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">IBAN:</span> <span style="font-weight: bold; font-family: monospace;">${data.iban}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;"> ${t('topUpAccount.bank')}:</span> <span style="font-weight: bold;">${data.bankName}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;">SWIFT/BIC:</span> <span style="font-weight: bold; font-family: monospace;">${data.swiftBic}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 8px;">
        <span style="color: #666;"> ${t('topUpAccount.city')}:</span> <span style="font-weight: bold;">${data.country || '—'}</span>
      </div>
      <div style="font-size: 14px; margin-bottom: 25px;">
        <span style="color: #666;"> ${t('topUpAccount.address')}:</span> <span style="font-weight: bold;">${data.address || '—'}</span>
      </div>

      <div style="font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        ${t('topUpAccount.paymentPurposeTitle')}
      </div>
      <div style="font-size: 14px; margin-bottom: 30px; line-height: 1.5;">
        ${data.paymentPurpose}
      </div>

      <div style="font-size: 11px; color: #666; border: 1px solid #d4edda; background: #f0f8f0; padding: 15px; border-radius: 5px; margin-top: 20px;">
         ${t('topUpAccount.text')}
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

  const closePdfPreview = () => {
    if (pdfBlobUrl.value) {
      URL.revokeObjectURL(pdfBlobUrl.value);
      pdfBlobUrl.value = '';
    }
    pdfPreviewDialog.value = false;
  };

  const sendRequisites = () => {
    showPreview();
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
            <CopyFields />
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

  <!-- Preview Dialog for Web Version -->
  <v-dialog
    v-model="previewDialog"
    :width="mobile ? 'auto' : 700"
    :min-width="mobile ? '100%' : 700"
  >
    <v-card>
      <v-sheet class="modal-window pa-4">
        <v-card-title class="d-flex justify-center align-center">
          <v-sheet class="font-semibold font-22 text-background-blue">
            {{ t('topUpAccount.previewTitle') }}
          </v-sheet>
          <v-sheet class="button-close-form position-absolute" @click="previewDialog = false">
            <v-icon icon="mdi-close" size="sm"></v-icon>
          </v-sheet>
        </v-card-title>
        <v-card-text class="mt-4">
          <v-sheet class="preview-content pa-4" style="background: white; border-radius: 8px">
            <v-sheet class="font-semibold font-18 text-background-blue mb-4" style="color: #103673">
              {{ t('topUpAccount.downloadTitle') }}
            </v-sheet>
            <v-sheet class="text-caption mb-4" style="color: #666">
              Дата: {{ getPreviewContent().date }}
            </v-sheet>

            <v-sheet
              class="font-semibold mb-2"
              style="border-bottom: 1px solid #ddd; padding-bottom: 5px"
            >
              {{ t('topUpAccount.information') }}
            </v-sheet>
            <v-sheet class="d-flex ga-4 mb-4">
              <v-sheet>
                <span style="color: #666">{{ t('topUpAccount.currency') }}:</span>
                <span class="font-weight-bold ml-2">{{ getPreviewContent().currency }}</span>
              </v-sheet>
              <v-sheet>
                <span style="color: #666">{{ t('topUpAccount.amount') }}:</span>
                <span class="font-weight-bold ml-2">
                  {{ getPreviewContent().amount || '100' }} {{ getPreviewContent().currencySymbol }}
                </span>
              </v-sheet>
            </v-sheet>

            <v-sheet
              class="font-semibold mb-2"
              style="border-bottom: 1px solid #ddd; padding-bottom: 5px"
            >
              {{ t('topUpAccount.accountDetailsTitle') }}
            </v-sheet>
            <v-sheet class="d-flex flex-column ga-1 mb-4">
              <v-sheet>
                <span style="color: #666">IBAN:</span>
                <span class="font-weight-bold font-monospace">{{ getPreviewContent().iban }}</span>
              </v-sheet>
              <v-sheet>
                <span style="color: #666">{{ t('topUpAccount.bank') }}:</span>
                <span class="font-weight-bold">{{ getPreviewContent().bankName }}</span>
              </v-sheet>
              <v-sheet>
                <span style="color: #666">SWIFT/BIC:</span>
                <span class="font-weight-bold font-monospace">
                  {{ getPreviewContent().swiftBic }}
                </span>
              </v-sheet>
              <v-sheet>
                <span style="color: #666">{{ t('topUpAccount.country') }}:</span>
                <span class="font-weight-bold">{{ getPreviewContent().country }}</span>
              </v-sheet>
              <v-sheet>
                <span style="color: #666">{{ t('topUpAccount.address') }}:</span>
                <span class="font-weight-bold">{{ getPreviewContent().address }}</span>
              </v-sheet>
            </v-sheet>

            <v-sheet
              class="font-semibold mb-2"
              style="border-bottom: 1px solid #ddd; padding-bottom: 5px"
            >
              {{ t('topUpAccount.paymentPurposeTitle') }}
            </v-sheet>
            <v-sheet class="mb-4" style="line-height: 1.5">
              {{ getPreviewContent().paymentPurpose }}
            </v-sheet>

            <v-sheet
              class="pa-3 rounded"
              style="border: 1px solid #d4edda; background: #f0f8f0; font-size: 11px; color: #666"
            >
              {{ t('topUpAccount.text') }}
            </v-sheet>
          </v-sheet>

          <v-sheet class="d-flex ga-2 mt-4">
            <v-btn
              variant="flat"
              rounded="ml"
              class="btn-custom flex-grow-1"
              @click="
                downloadPDF();
                previewDialog = false;
              "
            >
              <v-icon icon="mdi-download" class="mr-2"></v-icon>
              {{ t('topUpAccount.downloadPdf') }}
            </v-btn>
            <v-btn
              variant="outlined"
              rounded="ml"
              class="flex-grow-1"
              @click="previewDialog = false"
            >
              {{ t('topUpAccount.close') }}
            </v-btn>
          </v-sheet>
        </v-card-text>
      </v-sheet>
    </v-card>
  </v-dialog>

  <!-- PDF Preview Dialog for Mobile -->
  <v-dialog v-model="pdfPreviewDialog" :fullscreen="true">
    <v-card>
      <v-sheet
        class="d-flex justify-space-between align-center pa-2"
        style="background: #103673; color: white"
      >
        <v-sheet class="font-semibold font-18">
          {{ t('topUpAccount.pdfPreview') || 'Предпросмотр PDF' }}
        </v-sheet>
        <v-btn icon variant="text" @click="closePdfPreview">
          <v-icon icon="mdi-close" color="white"></v-icon>
        </v-btn>
      </v-sheet>
      <v-card-text class="pa-0" style="height: calc(100vh - 120px); overflow: hidden">
        <iframe
          v-if="pdfBlobUrl"
          :src="pdfBlobUrl"
          width="100%"
          height="100%"
          style="border: none"
          title="PDF Preview"
        ></iframe>
      </v-card-text>
      <v-sheet class="d-flex ga-2 pa-3" style="background: white">
        <v-btn
          variant="flat"
          rounded="ml"
          class="btn-custom flex-grow-1"
          @click="
            sharePDF();
            closePdfPreview();
          "
        >
          <v-icon icon="mdi-share-variant" class="mr-2"></v-icon>
          {{ t('topUpAccount.share') || 'Поделиться' }}
        </v-btn>
        <v-btn variant="outlined" rounded="ml" class="flex-grow-1" @click="closePdfPreview()">
          <v-icon icon="mdi-download" class="mr-2"></v-icon>
          {{ t('topUpAccount.close') }}
        </v-btn>
      </v-sheet>
    </v-card>
  </v-dialog>

  <slot name="button">
    <v-btn variant="flat" rounded="mr" @click="openTopUp" height="50" class="btn-top-up">
      <template #prepend>
        <v-sheet
          rounded="circle"
          class="d-flex align-center justify-center pa-1"
          style="background-color: white !important"
        >
          <TopUp />
        </v-sheet>
      </template>
      {{ t('portfolio.topUpBtn') }}
    </v-btn>
  </slot>
</template>

<style scoped lang="scss">
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
    align-items: center;

    .v-icon {
      width: 25px;
      height: 25px;
    }
  }

  .btn-custom {
    color: white;
    background: var(--color-Element) !important;
  }

  .font-monospace {
    font-family: monospace;
  }

  .preview-content {
    border: 1px solid #ddd;
    max-height: 60vh;
    overflow-y: auto;
  }
</style>
