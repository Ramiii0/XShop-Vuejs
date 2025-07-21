import { createRouter, createWebHistory } from 'vue-router/auto'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import Home from '@/pages/Home.vue'
import Reservation from '@/pages/reservations/Reservation.vue'
import Ticket from '@/pages/tickets/Ticket.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    },
  ],
})

export default router
