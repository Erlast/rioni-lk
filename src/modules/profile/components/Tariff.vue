<script setup lang="ts">
  import { computed, inject, onMounted, ref } from 'vue';
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';
  import TariffList from '@/components/BaseComponents/TariffList.vue';
  import BaseLoaderOverlay from '@/components/BaseComponents/BaseLoaderOverlay.vue';
  import { useAccountStore } from '@/stores/accountStore.ts';
  import { ITariffModel } from '@/api/types.ts';
  import dictionariesService from '@/api/dictionariesService.ts';
  import { usePortfolioStore } from '@/stores/portfolioStore.ts';
  import dayjs from 'dayjs';
  import accountService from '@/api/accountService.ts';
  import { handleError } from '@/utils/errorHandler.ts';

  let showTariffs = inject('showTariffs');
  const { mobile } = useDisplay();
  const { t } = useI18n();
  const accountStore = useAccountStore();
  const portfolioStore = usePortfolioStore();
  const tariffId = ref<number | null>(null);
  const show = ref(false);
  const showResult = ref(false);
  const loading = ref(false);

  const tariffs = ref<ITariffModel[]>([]);

  const currentTariff = computed(() => {
    const findTariff = tariffs.value.find(item => item.id === accountStore.data.tariffId);
    if (!findTariff) return { name: '' };
    return findTariff;
  });

  const saveTariff = async () => {
    try {
      loading.value = true;
      await accountService.profileTariffSave(tariffId.value);
      await accountStore.load();
      showResult.value = true;
    } catch (error) {
      handleError(error, { silent: true, context: { source: 'tariff.save' } });
    } finally {
      loading.value = false;
    }
  };

  onMounted(async () => {
    tariffId.value = accountStore.data.tariffId;
    tariffs.value = await dictionariesService.tariffs();
  });
</script>

<template>
  <BaseLoaderOverlay v-if="loading" />
  <v-card :width="mobile ? 'auto' : 900" class="position-relative">
    <v-sheet class="modal-window overflow-y-auto overflow-x-hidden">
      <v-sheet>
        <v-card-title>
          <v-sheet class="modal-windows-label">
            {{ t('tariffs.tariffTitle') }}
            <v-sheet class="button-close" @click="showTariffs = false"></v-sheet>
          </v-sheet>
        </v-card-title>
        <v-card-text>
          <v-sheet class="d-flex flex-column ga-3">
            <v-sheet
              class="tariff-info rounded-xxl px-6 py-4 d-flex flex-column ga-5"
              :height="mobile ? 240 : 170"
            >
              <v-sheet>
                <v-sheet class="text-white font-22">
                  {{ t('tariffs.title') }} {{ currentTariff.name }}
                </v-sheet>
                <v-sheet>
                  {{ t('tariffs.accountNumTitle') }}
                  {{ portfolioStore.data.currentAccount?.accountNumber }}
                </v-sheet>
              </v-sheet>

              <v-sheet class="d-flex flex-column ga-2">
                <v-sheet>{{ t('tariffs.startDate') }}</v-sheet>
                <v-sheet
                  class="d-flex ga-2"
                  :class="{ 'flex-column': mobile, 'align-center': !mobile }"
                >
                  <v-sheet
                    class="pa-2 rounded-ml"
                    :width="mobile ? '100%' : 250"
                    style="background-color: white !important"
                  >
                    {{ dayjs(accountStore.data.tariffStartDate).format('DD.MM.YYYY') }}
                  </v-sheet>
                  <v-sheet>
                    <v-btn
                      class="btn-show-tariffs"
                      variant="flat"
                      rounded="lg"
                      bg="middle-blue"
                      color="middle-blue"
                      @click="show = !show"
                    >
                      <span class="text-white">{{ t('tariffs.showTariffsBtn') }}</span>
                    </v-btn>
                  </v-sheet>
                </v-sheet>
              </v-sheet>
            </v-sheet>
            <v-sheet v-if="show" class="d-flex flex-column ga-2">
              <v-sheet
                class="rounded-mr pa-4 text-white"
                style="background-color: var(--color-Element) !important"
              >
                {{ t('tariffs.availableTariffs') }}
              </v-sheet>
              <TariffList v-model:tariff-id="tariffId" />
              <v-sheet>
                <v-btn
                  variant="flat"
                  rounded="lg"
                  bg="middle-blue"
                  color="middle-blue"
                  @click="saveTariff"
                >
                  <span class="text-white">{{ t('tariffs.chooseTariffBtn') }}</span>
                </v-btn>
                <v-dialog v-model="showResult" width="400">
                  <v-card class="tariff-result pa-4">
                    <v-card-title>{{ t('tariffs.resultTariffTitle') }}</v-card-title>
                    <v-card-text>
                      {{ t('tariffs.resultTariffDescription') }} {{ currentTariff.name }}
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn :text="t('tariffs.closeBtn')" @click="showResult = false"></v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-sheet>
            </v-sheet>
            <v-sheet class="">
              {{ t('tariffs.officialDocument') }}
              <a
                class="text-additional-link cursor-pointer"
                target="_blank"
                rel="noreferrer"
                href="https://rioni-capital.ge/upload/iblock/df5/dv3kqkivpfirnuaol1niunnw3wfl2d72.pdf?from=hub"
              >
                {{ t('tariffs.officialDocumentLink') }}
                <v-icon icon="mdi-arrow-right" />
              </a>
            </v-sheet>
          </v-sheet>
        </v-card-text>
      </v-sheet>
    </v-sheet>
  </v-card>
</template>

<style scoped lang="scss">
  .tariff-info {
    background: url('/img/tariffs-bg.png') no-repeat center center;
    background-size: cover;
    width: 100%;
  }
  .tariff-result {
  }
</style>
