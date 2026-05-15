<script setup lang="ts">
  import { onMounted, onUnmounted, ref, nextTick, computed, watch } from 'vue';
  import { TimeframeType, useAccountChartCostStore } from '@/stores/accountChartCostStore';
  import { useI18n } from 'vue-i18n';
  import { russianMonths } from '@/utils/data.ts';

  const accountChartCostStore = useAccountChartCostStore();

  const { t } = useI18n();
  const loading = ref<boolean>(true);
  const series = ref<any[]>([]);
  const chart = ref<any>(null);

  interface TimeframeTypes {
    value: TimeframeType;
    name: string;
  }
  const timeFrameTypes: TimeframeTypes[] = [
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
      value: '6months'
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
      value: 'all'
    }
  ];

  const changeTimeframe = async (e: TimeframeType) => {
    const finding = timeFrameTypes.find(item => item.value === e);
    accountChartCostStore.timeframe = finding ? finding.value : 'week';
    await accountChartCostStore.load();
    await loadChart();
  };

  // Watch for timeframe changes to reload chart
  watch(
    () => accountChartCostStore.timeframe,
    async () => {
      await loadChart();
    }
  );

  const period = computed(() => {
    if (!accountChartCostStore.data || accountChartCostStore.data.length === 0) return '';

    const startDate = new Date(accountChartCostStore.data[0].time);
    const endDate = new Date(
      accountChartCostStore.data[accountChartCostStore.data.length - 1].time
    );

    const formatDate = (date: Date, includeYear: boolean): string => {
      const day = date.getDate();
      const month = russianMonths[date.getMonth()];
      return includeYear ? `${day} ${month} ${date.getFullYear()}г` : `${day} ${month}`;
    };

    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    if (startYear === endYear) {
      return `${formatDate(startDate, false)} - ${formatDate(endDate, true)}`;
    }
    return `${formatDate(startDate, true)} - ${formatDate(endDate, true)}`;
  });

  const chartOptions = computed<any>(() => {
    const data = accountChartCostStore.data;
    const values = data.length > 0 ? data.map(d => d.value) : [0];
    const dataMax = Math.max(...values);
    const dataMin = Math.min(...values);

    // Calculate Y-axis range with 6 lines (5 intervals)
    const absMax = Math.max(Math.abs(dataMin), Math.abs(dataMax));
    
    // Find a nice step value
    const roughStep = absMax / 3;
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
    const normalized = roughStep / magnitude;
    let niceStep;
    if (normalized <= 1) niceStep = 1;
    else if (normalized <= 2) niceStep = 2;
    else if (normalized <= 5) niceStep = 5;
    else niceStep = 10;
    niceStep *= magnitude;
    
    // Calculate min/max ensuring 0 line exists and 6 grid lines
    let yMin, yMax;
    if (dataMin >= 0) {
      // All positive - 0 line at bottom
      yMin = 0;
      yMax = niceStep * 5;
    } else if (dataMax <= 0) {
      // All negative - 0 line at top
      yMin = -niceStep * 5;
      yMax = 0;
    } else {
      // Spans both - 0 in middle, calculate symmetric range
      const maxAbsValue = Math.max(Math.abs(dataMin), Math.abs(dataMax));
      const rangeStep = Math.ceil(maxAbsValue / 2.5); // ~2.5 gives us 5 intervals with headroom
      const niceRangeStep = Math.ceil(rangeStep / magnitude) * magnitude;
      yMin = -niceRangeStep * 2;
      yMax = niceRangeStep * 3;
    }

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
          format: 'MMM dd'
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
              return Math.round(value / 1000) + 'k';
            }
            return value.toLocaleString();
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
          format: 'MMM dd, yyyy'
        },
        y: {
          formatter: (value: number) => {
            if (dataMax > 10000) {
              return Math.round(value / 1000) + 'k';
            }
            return value.toLocaleString();
          }
        }
      },
      theme: {
        mode: 'light'
      }
    };
  });

  let timer: ReturnType<typeof setInterval> | null = null;

  const loadChart = async () => {
    loading.value = true;

    const chartData = accountChartCostStore.data.map(item => ({
      x: item.time,
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
    const chartData = accountChartCostStore.data.map(item => ({
      x: item.time,
      y: item.value
    }));

    const values =
      accountChartCostStore.data.length > 0 ? accountChartCostStore.data.map(d => d.value) : [0];
    const dataMax = Math.max(...values);
    const dataMin = Math.min(...values);

    const absMax = Math.max(Math.abs(dataMin), Math.abs(dataMax));
    const roughStep = absMax / 3;
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
    const normalized = roughStep / magnitude;
    let niceStep;
    if (normalized <= 1) niceStep = 1;
    else if (normalized <= 2) niceStep = 2;
    else if (normalized <= 5) niceStep = 5;
    else niceStep = 10;
    niceStep *= magnitude;

    let yMin, yMax;
    if (dataMin >= 0) {
      yMin = 0;
      yMax = niceStep * 5;
    } else if (dataMax <= 0) {
      yMin = -niceStep * 5;
      yMax = 0;
    } else {
      const maxAbsValue = Math.max(Math.abs(dataMin), Math.abs(dataMax));
      const rangeStep = Math.ceil(maxAbsValue / 2.5);
      const niceRangeStep = Math.ceil(rangeStep / magnitude) * magnitude;
      yMin = -niceRangeStep * 2;
      yMax = niceRangeStep * 3;
    }

    chart.value.updateOptions(
      {
        xaxis: {
          categories: accountChartCostStore.data.map(item => item.time)
        },
        yaxis: {
          min: yMin,
          max: yMax
        }
      },
      false,
      true
    );

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

  function startAutoUpdate(interval: number) {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      updateChartData();
    }, interval);
  }

  onMounted(async () => {
    await accountChartCostStore.load();
    accountChartCostStore.startAutoUpdate(5000);

    await nextTick();
    await loadChart();

    startAutoUpdate(1000);
  });

  onUnmounted(() => {
    accountChartCostStore.stopAutoUpdate();
    if (timer) {
      clearInterval(timer);
      timer = null;
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
