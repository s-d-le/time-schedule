import { createRouter, createWebHistory } from 'vue-router'
import CalendarView from '../views/CalendarView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CalendarView
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsFormView.vue')
    }
  ]
})

export default router
