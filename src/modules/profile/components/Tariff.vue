<script setup lang="ts">
  import { computed, inject, onMounted, ref } from 'vue';
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';
  import TariffList from '@/components/BaseComponents/TariffList.vue';
  import { useAccountStore } from '@/stores/accountStore.ts';
  import { ITariffModel } from '@/api/types.ts';
  import dictionariesService from '@/api/dictionariesService.ts';
  import { usePortfolioStore } from '@/stores/portfolioStore.ts';
  import dayjs from 'dayjs';
  import accountService from '@/api/accountService.ts';

  let showTariffs = inject('showTariffs');
  const { mobile } = useDisplay();
  const { t } = useI18n();
  const accountStore = useAccountStore();
  const portfolioStore = usePortfolioStore();
  const tariffId = ref<number | null>(null);
  const show = ref(false);

  const tariffs = ref<ITariffModel[]>([]);

  const currentTariff = computed(() => {
    const findTariff = tariffs.value.find(item => item.id === accountStore.data.tariffId);
    if (!findTariff) return { name: '' };
    return findTariff;
  });

  const saveTariff = async () => {
    await accountService.profileTariffSave(tariffId.value);
    await accountStore.load();
  };

  onMounted(async () => {
    tariffId.value = accountStore.data.tariffId;
    tariffs.value = await dictionariesService.tariffs();
  });
</script>

<template>
  <v-card :width="mobile ? 'auto' : 900">
    <v-sheet class="modal-window">
      <v-sheet>
        <v-card-title>
          <v-sheet class="modal-windows-label">
            {{ t('profile.modals.tariff.tariffTitle') }}
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
                <v-sheet class="text-white font-22">Тариф {{ currentTariff.name }}</v-sheet>
                <v-sheet>№ БС: {{ portfolioStore.data.currentAccount?.accountNumber }}</v-sheet>
              </v-sheet>

              <v-sheet class="d-flex flex-column ga-2">
                <v-sheet>Дата подключения</v-sheet>
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
                      <span class="text-white">Изменить тарифный план</span>
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
                Доступные тарифы
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
                  <span class="text-white">Выбрать тариф</span>
                </v-btn>
              </v-sheet>
            </v-sheet>
            <v-sheet class="">
              Ознакомится с официальным документом&nbsp;
              <span class="text-additional-link cursor-pointer">
                о тарифных планах брокера, можно здесь
                <v-icon icon="mdi-arrow-right" />
              </span>
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
</style>
