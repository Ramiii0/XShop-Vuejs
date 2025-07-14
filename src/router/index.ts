/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes : [
    // {
    //   path: '/',
    //   name: APP_ROUTE_NAMES.HOME,
    //   component: Home,
    // }
  ]
})

export default router
