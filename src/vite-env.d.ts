/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_HOST: string;
  readonly VITE_SENTRY_DSN?: string;
  readonly VITE_API_CMS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
