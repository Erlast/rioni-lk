import axios, { AxiosError } from 'axios';
import { useNotify } from '@/stores/notifyStore';
import i18n from '@/utils/i18n';

export type ErrorCategory =
  | 'info'
  | 'warning'
  | 'silent'
  | 'network'
  | 'auth'
  | 'validation'
  | 'server'
  | 'client'
  | 'critical';

export type NotifyGroup = 'system' | 'app' | 'session' | 'promote' | 'copy';

export interface SentryLike {
  captureException: (error: unknown, context?: Record<string, unknown>) => void;
  captureMessage: (message: string, level?: string) => void;
}

declare global {
  interface Window {
    Sentry?: SentryLike;
  }
}

export interface HandleErrorOptions {
  category?: ErrorCategory;
  message?: string;
  description?: string;
  group?: NotifyGroup;
  silent?: boolean;
  context?: Record<string, unknown>;
}

interface NormalizedError {
  message: string;
  code?: string;
  status?: number;
  data?: unknown;
  original: unknown;
}

function readStatus(error: unknown): number | undefined {
  if (!error || typeof error !== 'object') return undefined;
  const e = error as { status?: number; response?: { status?: number } };
  if (typeof e.status === 'number') return e.status;
  if (e.response && typeof e.response.status === 'number') return e.response.status;
  return undefined;
}

function readCode(error: unknown): string | undefined {
  if (!error || typeof error !== 'object') return undefined;
  const e = error as { code?: string };
  return typeof e.code === 'string' ? e.code : undefined;
}

function readMessage(error: unknown): string {
  if (error instanceof Error) return error.message || error.name;
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object') {
    const e = error as { message?: string; statusText?: string };
    if (typeof e.message === 'string') return e.message;
    if (typeof e.statusText === 'string') return e.statusText;
  }
  return 'Unknown error';
}

function readData(error: unknown): unknown {
  if (!error || typeof error !== 'object') return undefined;
  const e = error as { response?: { data?: unknown }; data?: unknown };
  return e.response?.data ?? e.data;
}

function normalize(error: unknown): NormalizedError {
  return {
    message: readMessage(error),
    code: readCode(error),
    status: readStatus(error),
    data: readData(error),
    original: error
  };
}

function categoryFromStatus(status: number | undefined): ErrorCategory {
  if (status === undefined) return 'network';
  if (status === 401 || status === 403) return 'auth';
  if (status >= 400 && status < 500) return 'validation';
  if (status >= 500) return 'server';
  return 'client';
}

function categoryFromError(error: unknown): ErrorCategory {
  if (axios.isAxiosError(error)) {
    if (error.code === AxiosError.ERR_NETWORK) return 'network';
    return categoryFromStatus(error.response?.status);
  }
  if (error instanceof TypeError) return 'client';
  return 'client';
}

function notifyTypeFor(category: ErrorCategory): 'info' | 'success' | 'warn' | 'error' {
  switch (category) {
    case 'info':
      return 'info';
    case 'warning':
      return 'warn';
    case 'silent':
      return 'info';
    case 'validation':
      return 'warn';
    case 'auth':
      return 'warn';
    case 'network':
    case 'server':
    case 'client':
    case 'critical':
      return 'error';
    default:
      return 'error';
  }
}

function groupFor(category: ErrorCategory): NotifyGroup {
  if (category === 'auth') return 'session';
  if (category === 'network' || category === 'server') return 'system';
  return 'app';
}

function reportToSentry(error: unknown, context?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.Sentry) {
    try {
      window.Sentry.captureException(error, context);
      return;
    } catch {
      // fall through to console
    }
  }
  // Fallback: structured console output (consistent across the app).
  // eslint-disable-next-line no-console
  console.error('[errorHandler]', context ?? '', error);
}

function defaultMessageFor(category: ErrorCategory): string {
  const key = `errors.errorHandler.${category}.message`;
  const exists = i18n.global.te(key);
  if (exists) return i18n.global.t(key);
  return i18n.global.t('errors.errorHandler.fallback.message');
}

function defaultDescriptionFor(category: ErrorCategory): string {
  const key = `errors.errorHandler.${category}.description`;
  const exists = i18n.global.te(key);
  if (exists) return i18n.global.t(key);
  return i18n.global.t('errors.errorHandler.fallback.description');
}

export function handleError(error: unknown, options: HandleErrorOptions = {}): void {
  const normalized = normalize(error);
  const category: ErrorCategory =
    options.category ?? (axios.isAxiosError(error) ? categoryFromError(error) : categoryFromError(error));

  const context = {
    category,
    code: normalized.code,
    status: normalized.status,
    data: normalized.data,
    ...options.context
  };

  reportToSentry(normalized.original, context);

  if (options.silent || category === 'silent') {
    return;
  }

  try {
    const notify = useNotify();
    const type = notifyTypeFor(category);
    const message = options.message ?? defaultMessageFor(category);
    const description = options.description ?? defaultDescriptionFor(category);
    const group = options.group ?? groupFor(category);
    notify.show(message, description, type, group);
  } catch {
    // notify store not yet available (e.g. outside Pinia context)
    // eslint-disable-next-line no-console
    console.warn('[errorHandler] notify store unavailable; notification skipped');
  }
}

// Specialized helpers for the most common cases used across the codebase.

export function handleNetworkError(error: unknown, options: Omit<HandleErrorOptions, 'category'> = {}): void {
  handleError(error, { ...options, category: 'network' });
}

export function handleAuthError(error: unknown, options: Omit<HandleErrorOptions, 'category'> = {}): void {
  handleError(error, { ...options, category: 'auth' });
}

export function handleValidationError(
  error: unknown,
  options: Omit<HandleErrorOptions, 'category'> = {}
): void {
  handleError(error, { ...options, category: 'validation' });
}

export function handleCriticalError(
  error: unknown,
  options: Omit<HandleErrorOptions, 'category'> = {}
): void {
  handleError(error, { ...options, category: 'critical' });
}

export function registerSentry(sentry: SentryLike): void {
  if (typeof window !== 'undefined') {
    window.Sentry = sentry;
  }
}

export default {
  handleError,
  handleNetworkError,
  handleAuthError,
  handleValidationError,
  handleCriticalError,
  registerSentry
};
