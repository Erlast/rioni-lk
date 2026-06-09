import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  type RouteLocationRaw
} from 'vue-router';
import i18n from '@/utils/i18n';
import PortfolioDefaultView from '@/modules/portfolio/views/default/View.vue';
import PronounsDefaultView from '@/modules/pronouns/views/default/View.vue';
import AnaliticsDefaultView from '@/modules/analitics/views/default/View.vue';
import ReportsDefaultView from '@/modules/reports/views/default/View.vue';
import MarketDefaultView from '@/modules/market/views/default/View.vue';
import ProfileDefaultView from '@/modules/profile/views/default/View.vue';
import NotificationDefaultView from '@/modules/notification/views/default/View.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { useDictionaryStore } from '@/stores/dictionariesStore';
import { useAuthStore } from '@/stores/authStore';
import AuthView from '@/views/AuthView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

type NavigationResult = RouteLocationRaw | undefined;

export async function handleNavigation(
  to: RouteLocationNormalized,
  authStore: ReturnType<typeof useAuthStore>,
  dictionaryStore: ReturnType<typeof useDictionaryStore>
): Promise<NavigationResult> {
  if (to.meta.disabled) {
    return { name: 'notfound' };
  }

  const isAuthenticated = authStore.isAuthenticated;
  const entryPoint = authStore.entryPoint;

  async function loadData() {
    await dictionaryStore.fetchDictionaries();
  }

  if (isAuthenticated) {
    await loadData();
  }

  // Установка заголовка страницы
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

  if (requiresAuth && !isAuthenticated) {
    authStore.setEntryPoint({ url: to.path, query: to.query });
    return { name: 'auth' };
  }

  // Логика редиректов для авторизованных пользователей
  if (to.name === 'auth' && isAuthenticated) {
    return { path: '/' };
  }

  if (entryPoint?.url && isAuthenticated) {
    const { url, query } = entryPoint;
    authStore.clearEntryPoint();
    return { path: url, query };
  }


  return undefined;
}

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: DefaultLayout,

    children: [
      {
        path: '',
        name: 'portfolio',
        component: PortfolioDefaultView,
        meta: { requiresAuth: true }
      },
      {
        path: 'pronouns',
        name: 'pronouns',
        component: PronounsDefaultView,
        meta: { requiresAuth: true }
      },
      {
        path: 'market',
        name: 'market',
        component: MarketDefaultView,
        meta: { requiresAuth: true }
      },
      {
        path: 'reports',
        name: 'reports',
        component: ReportsDefaultView,
        meta: { requiresAuth: true }
      },
      {
        path: 'analitics',
        name: 'analitics',
        component: AnaliticsDefaultView,
        meta: { requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfileDefaultView,
        meta: { requiresAuth: true }
      },
      {
        path: 'notification',
        name: 'notification',
        component: NotificationDefaultView,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const dictionariesStore = useDictionaryStore();
  const authStore = useAuthStore();
  try {
    const result = await handleNavigation(to, authStore, dictionariesStore);

    if (result) {
      next(result);
    } else {
      next();
    }
  } catch (error) {
    console.error('Navigation error:', error);
    next(false);
  }
});

export default router;
