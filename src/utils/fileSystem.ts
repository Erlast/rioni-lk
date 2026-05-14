const allowedExtensions = ['.png', '.jpg', '.jpeg', '.pdf', '.heic', '.heif', '.avif'];
export const allowedTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'application/pdf',
  'image/heic',
  'image/heif',
  'image/avif'
];

export const validateFile = (file: File, allowedFileTypes: string[] = allowedTypes) => {
  const isTypeAllowed =
    allowedFileTypes.includes(file.type) ||
    allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
  const isSizeValid = file.size <= 5 * 1024 * 1024; // 5MB

  if (!isTypeAllowed) {
    return { valid: false, message: 'Недопустимый формат файла.' };
  }
  if (!isSizeValid) {
    return { valid: false, message: 'Файл не должен превышать 5 мб.' };
  }
  return { valid: true, message: '' };
};
