import { ErrorObject } from '@vuelidate/core';

export default interface IDatePickerProps {
  label?: string;
  errorMessages?: ErrorObject[];
  density?: 'comfortable' | 'compact' | 'default';
  maxDate?: Date | string;
  disabled?: boolean;
  variant?: 'solo' | 'outlined';
}
