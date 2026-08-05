import { phoneCountriesSorted } from '@/utils/data';

export const phoneValidator = (value: string): boolean => {
  if (!value) return false;

  const cleaned = value.replace(/[^\d+]/g, '');
  if (!cleaned.startsWith('+')) return false;

  const digits = cleaned.slice(1);

  for (const country of phoneCountriesSorted) {
    if (country.code && digits.startsWith(country.code)) {
      const localDigits = digits.slice(country.code.length);

      return localDigits.length >= 7;
    }
  }
  return false;
};
