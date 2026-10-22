import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  type RouteLocationRaw
} from 'vue-router';
import i18n from '@/utils/i18n';
import { useDictionaryStore } from '@/stores/dictionariesStore';
import { useAuthStore } from '@/stores/authStore';
import { useGlossaryStore } from '@/stores/glossaryStore.ts';
import { useAccountStore } from '@/stores/accountStore.ts';
import { handleError } from '@/utils/errorHandler';
import { keycloak, keycloakInit } from '@/utils/keycloak.ts';
import { routes } from '@/router/routes.ts';

type NavigationResult = RouteLocationRaw | undefined;

export async function handleNavigation(
  to: RouteLocationNormalized,
  authStore: ReturnType<typeof useAuthStore>,
  dictionaryStore: ReturnType<typeof useDictionaryStore>,
  glossaryStore: ReturnType<typeof useGlossaryStore>,
  accountStore: ReturnType<typeof useAccountStore>
): Promise<NavigationResult> {
  if (to.meta.disabled) {
    return { name: 'notfound' };
  }

  const entryPoint = authStore.entryPoint;

  async function loadData() {
    await dictionaryStore.fetchDictionaries();
    await glossaryStore.loadTerms();
    await accountStore.load();
  }

  if (keycloak.authenticated) {
    await loadData();
  }

  if (to.path) {
    let path: string;

    if (to.name === 'notfound') {
      path = 'notfound';
    } else {
      const normalizedPath = to.path.replace(/\/+$/, '') || '/';

      path =
        normalizedPath === '/'
          ? 'portfolio'
          : normalizedPath
              .replace(/^\//, '')
              .replace(/\//g, '_')
              .replace(/-/g, '_')
              .replace(/\./g, '_')
              .toLowerCase();
    }

    const titleKey = `title.${path}`;
    document.title = i18n.global.t(titleKey);
  } else {
    document.title = 'Rioni - ЛК';
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !keycloak.authenticated) {
    authStore.setEntryPoint({ url: to.path, query: to.query });
    return { name: 'auth' };
  }

  if (to.name === 'auth' && keycloak.authenticated) {
    return { path: '/' };
  }

  if (entryPoint?.url && keycloak.authenticated) {
    const { url, query } = entryPoint;
    authStore.clearEntryPoint();
    return { path: url, query };
  }

  return undefined;
}

const router = createRouter({
  history: createWebHistory(),
  // @ts-ignore
  routes
});

router.beforeEach(async (to, from, next) => {
  const dictionariesStore = useDictionaryStore();
  const authStore = useAuthStore();
  const glossaryStore = useGlossaryStore();
  const accountStore = useAccountStore();
  try {
    await keycloakInit;

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !keycloak.authenticated) {
      const cleanRedirect = window.location.origin + to.path;
      await keycloak.login({
        redirectUri: cleanRedirect,
        responseMode: 'query'
      });
      return next(false);
    }

    if (to.name === 'auth' && keycloak.authenticated) {
      return next({ path: '/' });
    }
    const result = await handleNavigation(
      to,
      authStore,
      dictionariesStore,
      glossaryStore,
      accountStore
    );

    if (result) {
      next(result);
    } else {
      next();
    }
  } catch (error) {
    handleError(error, { silent: true, context: { source: 'router.beforeEach' } });
    next(false);
  }
});

export default router;
