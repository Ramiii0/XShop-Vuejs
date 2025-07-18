/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import Home from '@/pages/Home.vue'
import Ticket from '@/pages/tickets/Ticket.vue'
import Reservation from '@/pages/reservations/Reservation.vue'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes : [
    {
      path: '/',
      name: 'home',
      component: Ticket,
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: Ticket,
    },
    {
      path: '/reservations',
      name: 'reservations',
      component: Reservation,
    }
  ]
})

export default router
