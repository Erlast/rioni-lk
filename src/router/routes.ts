import AuthLayout from '@/layouts/AuthLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import PortfolioDefaultView from '@/modules/portfolio/views/default/View.vue';
import PronounsDefaultView from '@/modules/pronouns/views/default/View.vue';
import AnalyticsDefaultView from '../modules/analytics/views/default/View.vue';
import ReportsDefaultView from '@/modules/reports/views/default/View.vue';
import MarketDefaultView from '@/modules/market/views/default/View.vue';
import ProfileDefaultView from '@/modules/profile/views/default/View.vue';
import NotificationDefaultView from '@/modules/notification/views/default/View.vue';
import UnderConstruct from '@/views/UnderConstruct.vue';
import EducationView from '@/views/EducationView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import TestsView from '@/modules/tests/views/View.vue';

export const routes = [
  {
    path: '/auth',
    component: AuthLayout
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
        path: 'analytics',
        name: 'analytics',
        component: AnalyticsDefaultView,
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
      },
      {
        path: 'education',
        name: 'education',
        component: EducationView,
        redirect: '/under-construct',
        meta: { requiresAuth: true }
      },
      {
        path: 'under-construct',
        name: 'underConstruct',
        component: UnderConstruct,
        meta: { requiresAuth: true }
      },
      {
        path: 'tests',
        name: 'tests',
        component: TestsView,
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