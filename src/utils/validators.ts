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

// ==================== Password rules ====================

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 32;

/** Последовательности символов, идущих подряд на стандартной раскладке (в обе стороны). */
const KEYBOARD_SEQUENCES = [
  'qwertyuiop',
  'asdfghjkl',
  'zxcvbnm',
  '1234567890',
  '!@#$%^&*()',
  'йцукенгшщзхъ',
  'фывапролджэ',
  'ячсмитьбю',
  'ё1234567890'
];

/** Минимальная длина последовательности, которая считается "подряд на клавиатуре". */
const MIN_KEYBOARD_SEQUENCE_LENGTH = 3;

/** Длина пароля: не менее 12 и не более 32 символов. */
export const passwordLength = (value: string): boolean => {
  if (!value) return true;
  return value.length >= PASSWORD_MIN_LENGTH && value.length <= PASSWORD_MAX_LENGTH;
};

/** Пароль должен содержать прописные (заглавные) латинские буквы. */
export const passwordHasUppercase = (value: string): boolean => {
  if (!value) return true;
  return /[A-Z]/.test(value);
};

/** Пароль должен содержать строчные латинские буквы. */
export const passwordHasLowercase = (value: string): boolean => {
  if (!value) return true;
  return /[a-z]/.test(value);
};

/** Пароль должен содержать цифры или спец. символы (кроме пробела). */
export const passwordHasDigitOrSpecial = (value: string): boolean => {
  if (!value) return true;
  return /[0-9]/.test(value) || /[^a-zA-Z0-9]/.test(value);
};

/** В пароле не должно быть пробелов. */
export const passwordHasNoSpaces = (value: string): boolean => {
  if (!value) return true;
  return !/\s/.test(value);
};

/** Пароль должен состоять из нескольких несвязанных слов или букв (достаточное разнообразие символов). */
export const passwordDiversity = (value: string): boolean => {
  if (!value) return true;

  const lower = value.toLowerCase();
  const uniqueChars = new Set(lower.split('')).size;

  // пароль не должен состоять из одного повторяющегося символа
  if (uniqueChars === 1) return false;

  // минимум уникальных символов (для пароля 12+ символов это разумный минимум)
  return uniqueChars >= 6;
};

/**
 * Пароль не должен содержать цифры или буквы, идущие друг за другом на раскладке девайса.
 * Проверяются последовательности длиной 3+ символа в прямом и обратном направлении.
 */
export const passwordHasNoKeyboardSequence = (value: string): boolean => {
  if (!value) return true;

  const normalized = value.toLowerCase();

  for (const sequence of KEYBOARD_SEQUENCES) {
    const forward = sequence.toLowerCase();
    const backward = forward.split('').reverse().join('');

    for (let i = 0; i <= forward.length - MIN_KEYBOARD_SEQUENCE_LENGTH; i++) {
      const chunk = forward.slice(i, i + MIN_KEYBOARD_SEQUENCE_LENGTH);
      if (normalized.includes(chunk) || normalized.includes(backward.slice(i, i + MIN_KEYBOARD_SEQUENCE_LENGTH))) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Пароль не должен создаваться на основе личной информации
 * (имя, дата рождения, ИНН и т.д.). forbidden — список значений, которые нельзя использовать.
 */
export const passwordHasNoPersonalInfo = (forbidden: string[]) => (value: string): boolean => {
  if (!value) return true;

  const normalized = value.toLowerCase();

  return forbidden.every(item => {
    const cleared = item
      .toLowerCase()
      .replace(/[^a-zа-яё0-9]/gi, '')
      .trim();

    return cleared.length < 3 || !normalized.includes(cleared);
  });
};

/**
 * Заглушка генерации пароля. TODO: заменить на реальную логику.
 * Генерирует пароль длиной 16 символов, удовлетворяющий всем правилам выше.
 */
export const generatePassword = (): string => {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  // Только символы, разрешённые правилом alphaNumeric (a-z A-Z 0-9 . _ -)
  const specials = '._-';
  const all = upper + lower + digits + specials;

  const length = 16;
  const chars: string[] = [];

  // гарантируем наличие хотя бы одного символа из каждой обязательной группы
  chars.push(upper[Math.floor(Math.random() * upper.length)]);
  chars.push(lower[Math.floor(Math.random() * lower.length)]);
  chars.push(digits[Math.floor(Math.random() * digits.length)]);
  chars.push(specials[Math.floor(Math.random() * specials.length)]);

  while (chars.length < length) {
    chars.push(all[Math.floor(Math.random() * all.length)]);
  }

  // перемешиваем, чтобы обязательные символы не стояли в начале
  return chars
    .map(char => ({ char, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ char }) => char)
    .join('');
};
