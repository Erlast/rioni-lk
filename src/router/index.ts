import { createMemoryHistory, createRouter } from 'vue-router'

import MainDefaultView from '@/modules/main/views/default/MainView.vue'
import NotificationDefaultView from '@/modules/notification/views/default/View.vue'
import ProfileDefaultView from '@/modules/profile/views/default/View.vue'
import AnaliticsDefaultView from '@/modules/analitics/views/default/View.vue'
import ReportsDefaultView from '@/modules/reports/views/default/View.vue'
import MarketDefaultView from '@/modules/market/views/default/View.vue'

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        component: MainDefaultView
      },
      {
        path: 'notification',
        component: NotificationDefaultView
      },
      {
        path: 'profile',
        component: ProfileDefaultView
      },
      {
        path: 'analitics',
        component: AnaliticsDefaultView
      },
      {
        path: 'reports',
        component: ReportsDefaultView
      },
      {
        path: 'market',
        component: MarketDefaultView
      }
    ]
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
