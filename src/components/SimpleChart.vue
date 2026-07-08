<script setup lang="ts">
  import { onMounted, ref, nextTick, computed, watch } from 'vue';
  import { TimeframeType, useAccountChartCostStore } from '@/stores/accountChartCostStore';
  import { usePortfolioStore } from '@/stores/portfolioStore';
  import { useI18n } from 'vue-i18n';
  import { englishMonths, monthsByLocale } from '@/utils/data.ts';

  const accountChartCostStore = useAccountChartCostStore();
  const portfolioStore = usePortfolioStore();

  const { t, locale } = useI18n();
  const loading = ref<boolean>(true);
  const series = ref<any[]>([]);
  const chart = ref<any>(null);

  interface TimeframeTypes {
    value: TimeframeType;
    name: string;
  }
  const timeFrameTypes = computed<TimeframeTypes[]>(() => [
    {
      name: t('portfolio.chart.timeframes.week'),
      value: 'week'
    },
    {
      name: t('portfolio.chart.timeframes.month'),
      value: 'month'
    },
    {
      name: t('portfolio.chart.timeframes.sixMonths'),
      value: 'sixMonths'
    },
    {
      name: t('portfolio.chart.timeframes.year'),
      value: 'year'
    },
    {
      name: t('portfolio.chart.timeframes.fromYear'),
      value: 'fromYear'
    },
    {
      name: t('portfolio.chart.timeframes.all'),
      value: 'allPeriod'
    }
  ]);

  const changeTimeframe = async (e: TimeframeType) => {
    const finding = timeFrameTypes.value.find(item => item.value === e);
    accountChartCostStore.timeframe = finding ? finding.value : 'week';
    loading.value = true;
    await accountChartCostStore.load();
    await nextTick();
    await loadChart();
    await nextTick();
    if (chart.value) {
      await updateChartData();
    }
  };

  watch(
    () => accountChartCostStore.timeframe,
    async () => {
      await loadChart();
      await nextTick();
      if (chart.value) {
        await updateChartData();
      }
    },
    { immediate: false }
  );

  watch(
    () => portfolioStore.data.currentAccount,
    async newAccount => {
      if (newAccount) {
        loading.value = true;
        await accountChartCostStore.load();
        await nextTick();
        await loadChart();
        await nextTick();
        if (chart.value) {
          await updateChartData();
        }
      }
    }
  );

  const period = computed(() => {
    const currentLocale = locale.value;
    if (!accountChartCostStore.data || accountChartCostStore.data.length === 0) return '';

    const startDate = new Date(accountChartCostStore.data[0].time * 1000);
    const endDate = new Date(
      accountChartCostStore.data[accountChartCostStore.data.length - 1].time * 1000
    );

    const formatDate = (date: Date, includeYear: boolean): string => {
      const day = date.getDate();
      const months = monthsByLocale[currentLocale] || englishMonths;
      const month = months[date.getMonth()];
      return includeYear
        ? `${day} ${month} ${date.getFullYear()}${currentLocale === 'ru' ? 'г' : ''}`
        : `${day} ${month}`;
    };

    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    if (startYear === endYear) {
      return `${formatDate(startDate, false)} - ${formatDate(endDate, true)}`;
    }
    return `${formatDate(startDate, true)} - ${formatDate(endDate, true)}`;
  });

  function calcAxisBounds(dataMin: number, dataMax: number) {
    const absMax = Math.max(Math.abs(dataMin), Math.abs(dataMax));
    if (absMax === 0) return { min: -1, max: 1 };

    const roughStep = absMax / 5;
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
    const normalized = roughStep / magnitude;

    let niceStep: number;
    if (normalized <= 1.5) niceStep = 1;
    else if (normalized <= 3.5) niceStep = 2;
    else if (normalized <= 7) niceStep = 5;
    else niceStep = 10;
    niceStep *= magnitude;

    let yMin: number, yMax: number;
    if (dataMin >= 0) {
      yMin = 0;
      yMax = Math.ceil(dataMax / niceStep) * niceStep;
    } else if (dataMax <= 0) {
      yMin = -Math.ceil(Math.abs(dataMin) / niceStep) * niceStep;
      yMax = 0;
    } else {
      yMin = -Math.ceil(Math.abs(dataMin) / niceStep) * niceStep;
      yMax = Math.ceil(dataMax / niceStep) * niceStep;
    }

    return { min: yMin, max: yMax };
  }

  const chartOptions = computed<any>(() => {
    void locale.value;
    const data = accountChartCostStore.data;
    const values = data.length > 0 ? data.map(d => d.value) : [0];
    const dataMax = Math.max(...values);
    const dataMin = Math.min(...values);
    const { min: yMin, max: yMax } = calcAxisBounds(dataMin, dataMax);

    return {
      chart: {
        type: 'area',
        animations: {
          enabled: false
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      stroke: {
        curve: 'straight',
        width: 2
      },
      colors: ['#4BA67C'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.8,
          opacityTo: 0.1,

          colorStops: [
            { offset: 0, color: '#4BA67C', opacity: 0.9 },
            { offset: 50, color: '#4BA67C', opacity: 0.5 },
            { offset: 100, color: '#ffffff', opacity: 0 }
          ]
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false,
          offsetX: 15,
          formatter: (value: number) => {
            const date = new Date(value);
            const currentLocale = locale.value;
            const months = monthsByLocale[currentLocale] || englishMonths;
            const month = months[date.getMonth()];
            const day = date.getDate();
            const year = date.getFullYear();
            if (accountChartCostStore.timeframe === 'allPeriod') {
              return currentLocale === 'ru'
                ? `${day} ${month} ${year}`
                : `${month} ${day}, ${year}`;
            }
            return `${month} ${day}`;
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        tickAmount: 5,
        min: yMin,
        max: yMax,
        labels: {
          formatter: (value: number) => {
            if (Math.abs(value) >= 10000) {
              return Math.round(value / 1000) + t('suffix');
            }
            return value;
          }
        }
      },
      grid: {
        borderColor: '#99abbd',
        strokeDashArray: 10,
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
        padding: {
          left: 10,
          right: 10
        }
      },
      tooltip: {
        x: {
          formatter: (value: number) => {
            const date = new Date(value);
            const currentLocale = locale.value;
            const months = monthsByLocale[currentLocale] || englishMonths;
            const month = months[date.getMonth()];
            const day = date.getDate();
            const year = date.getFullYear();
            return `${month} ${day}, ${year}`;
          }
        },
        y: {
          formatter: (value: number) => {
            if (dataMax > 10000) {
              return Math.round(value / 1000) + t('suffix');
            }
            return value;
          }
        }
      },
      theme: {
        mode: 'light'
      }
    };
  });

  const loadChart = async () => {
    loading.value = true;

    const chartData = accountChartCostStore.data.map(item => ({
      x: item.time * 1000,
      y: item.value
    }));

    series.value = [
      {
        name: t('portfolio.chart.cost'),
        data: chartData
      }
    ];
    loading.value = false;
  };

  function updateChartData() {
    if (!chart.value) return;

    const chartData = accountChartCostStore.data.map(item => ({
      x: item.time * 1000,
      y: item.value
    }));

    const values =
      accountChartCostStore.data.length > 0 ? accountChartCostStore.data.map(d => d.value) : [0];
    const dataMax = Math.max(...values);
    const dataMin = Math.min(...values);
    const { min: yMin, max: yMax } = calcAxisBounds(dataMin, dataMax);

    const updatedOptions = {
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false,
          offsetX: 15,
          formatter: (value: number) => {
            const date = new Date(value);
            const currentLocale = locale.value;
            const months = monthsByLocale[currentLocale] || englishMonths;
            const month = months[date.getMonth()];
            const day = date.getDate();
            const year = date.getFullYear();
            if (accountChartCostStore.timeframe === 'allPeriod') {
              return currentLocale === 'ru'
                ? `${day} ${month} ${year}`
                : `${month} ${day}, ${year}`;
            }
            return currentLocale === 'ru' ? `${day} ${month}` : `${month} ${day}`;
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        tickAmount: 5,
        min: yMin,
        max: yMax,
        labels: {
          formatter: (value: number) => {
            if (Math.abs(value) >= 10000) {
              return Math.round(value / 1000) + t('suffix');
            }
            return value.toLocaleString();
          }
        }
      }
    };

    chart.value.updateOptions(updatedOptions, true, true);
    chart.value.updateSeries(
      [
        {
          name: t('portfolio.chart.cost'),
          data: chartData
        }
      ],
      true
    );
  }

  onMounted(async () => {
    if (!portfolioStore.data.currentAccount) {
      await portfolioStore.load();
      portfolioStore.setCurrentAccount();
    }
    await accountChartCostStore.load();
    await nextTick();
    await loadChart();
    await nextTick();

    while (!chart.value) {
      await nextTick();
    }
    await nextTick();
    if (chart.value) {
      await updateChartData();
    }
  });
</script>

<template>
  <div class="simple-chart chart-view ga-0 flex-1-1-100">
    <v-skeleton-loader v-if="loading" width="100%" type="heading"></v-skeleton-loader>
    <v-sheet v-else class="" width="100%">
      <v-sheet class="d-flex justify-space-between align-center">
        <v-chip-group
          v-model="accountChartCostStore.timeframe"
          variant="flat"
          selected-class="timeframe-selected bg-element text-white"
          class="pa-0"
          mandatory
          @update:model-value="changeTimeframe"
        >
          <v-chip
            v-for="(item, idx) in timeFrameTypes"
            :key="idx"
            :value="item.value"
            size="compact"
            variant="flat"
            class="px-4 py-1 font-smaller bg-transparent ma-0"
          >
            {{ item.name }}
          </v-chip>
        </v-chip-group>
        <v-sheet class="font-smaller text-common">{{ period }}</v-sheet>
      </v-sheet>
      <apexchart
        ref="chart"
        :key="locale"
        class="simple-chart"
        :options="chartOptions"
        :series="series"
        type="area"
        height="350"
      ></apexchart>
    </v-sheet>
  </div>
</template>

<style scoped lang="scss">
  .simple-chart {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
