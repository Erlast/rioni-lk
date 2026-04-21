import { createRouter, createWebHistory } from 'vue-router';

import MainDefaultView from '@/modules/main/views/default/MainView.vue';
import PortfolioDefaultView from '@/modules/portfolio/views/default/View.vue';
import PronounsDefaultView from '@/modules/pronouns/views/default/View.vue';
import AnaliticsDefaultView from '@/modules/analitics/views/default/View.vue';
import ReportsDefaultView from '@/modules/reports/views/default/View.vue';
import MarketDefaultView from '@/modules/market/views/default/View.vue';
import ProfileDefaultView from '@/modules/profile/views/default/View.vue';
import NotificationDefaultView from '@/modules/notification/views/default/View.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
const routes = [
  {
    path: '/',
    component: DefaultLayout,

    children: [
      {
        path: '',
        name: 'home',
        component: MainDefaultView
      },
      {
        path: 'portfolio',
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

export default router;
