import i18n from './i18n';
export const formatCurrency = (
  num: number,
  withCurrencyChart: false | string = false,
  min = 0,
  max = 6
) => {
  if (!num && num !== 0) {
    return '';
  }
  if (withCurrencyChart) {
    const delimiter = withCurrencyChart === '%' ? '' : ' ';
    return (
      new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: min,
        maximumFractionDigits: max
      }).format(num) +
      delimiter +
      withCurrencyChart
    );
  }
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: min,
    maximumFractionDigits: max
  })
    .format(num)
    .replace(',', '.');
};

export const formatNumber = (num: number) => {
  if (num >= 1e9) {
    return formatCurrency(num / 1e9, false, 0, 2) + ' ' + i18n.global.t('billion');
  } else if (num >= 1e6) {
    return formatCurrency(num / 1e6, false, 0, 2) + ' ' + i18n.global.t('million');
  }
  // учитываем значения до 6 знаков после запятой
  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 6,
    minimumFractionDigits: 0
  })
    .format(num)
    .replace(',', '.');
};

export const stringToPositiveHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i); // Сдвиг и добавление ASCII-кода
    hash |= 0; // Преобразуем в 32-битное целое число
  }
  return Math.abs(hash); // Убедимся, что число положительное
};
