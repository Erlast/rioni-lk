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

type NavigationResult = RouteLocationRaw | undefined;

export async function handleNavigation(
  to: RouteLocationNormalized,
  dictionaryStore: ReturnType<typeof useDictionaryStore>
): Promise<NavigationResult> {
  if (to.meta.disabled) {
    return { name: 'notfound' };
  }

  await dictionaryStore.fetchDictionaries();

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

  return undefined;
}

const routes = [
  {
    path: '/',
    component: DefaultLayout,

    children: [
      {
        path: '',
        name: 'portfolio',
        component: PortfolioDefaultView
      },
      {
        path: 'pronouns',
        name: 'pronouns',
        component: PronounsDefaultView
      },
      {
        path: 'market',
        name: 'market',
        component: MarketDefaultView
      },
      {
        path: 'reports',
        name: 'reports',
        component: ReportsDefaultView
      },
      {
        path: 'analitics',
        name: 'analitics',
        component: AnaliticsDefaultView
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfileDefaultView
      },
      {
        path: 'notification',
        name: 'notification',
        component: NotificationDefaultView
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const dictionariesStore = useDictionaryStore()

  try {
    const result = await handleNavigation(to, dictionariesStore);

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
