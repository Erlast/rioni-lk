import { createMemoryHistory, createRouter } from 'vue-router'

import MainDefaultView from '@/modules/main/views/default/MainView.vue'
import PortfolioDefaultView from '@/modules/portfolio/views/default/View.vue'
import PronounsDefaultView from '@/modules/pronouns/views/default/View.vue'
import AnaliticsDefaultView from '@/modules/analitics/views/default/View.vue'
import ReportsDefaultView from '@/modules/reports/views/default/View.vue'
import MarketDefaultView from '@/modules/market/views/default/View.vue'
import ProfileDefaultView from '@/modules/profile/views/default/View.vue'
import NotificationDefaultView from '@/modules/notification/views/default/View.vue'
const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        component: MainDefaultView
      },
      {
        path: 'portfolio',
        component: PortfolioDefaultView
      },
      {
        path: 'pronouns',
        component: PronounsDefaultView
      },
      {
        path: 'market',
        component: MarketDefaultView
      },
      {
        path: 'reports',
        component: ReportsDefaultView
      },
      {
        path: 'analitics',
        component: AnaliticsDefaultView
      },
      {
        path: 'profile',
        component: ProfileDefaultView
      },
      {
        path: 'notification',
        component: NotificationDefaultView
      }
    ]
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
