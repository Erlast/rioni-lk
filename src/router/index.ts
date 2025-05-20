import { createMemoryHistory, createRouter } from 'vue-router'
import DefaultView from '@/modules/main/views/default/MainView.vue'

import DefaultLayout from '@/modules/main/layouts/DefaultLayout.vue'
import MainDefaultView from '@/modules/main/views/default/MainView.vue'
import NotificationDefaultView from '@/modules/notification/views/default/View.vue'
import ProfileDefaultView from '@/modules/profile/views/default/View.vue'
import AnaliticsDefaultView from '@/modules/analitics/views/DefaultView.vue'

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
      }
    ]
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
