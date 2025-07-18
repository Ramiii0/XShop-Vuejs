<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()

// Navigation
const goToTickets = () => router.push(APP_ROUTE_NAMES.TICKETS)
const goToReservations = () => router.push(APP_ROUTE_NAMES.RESERVATION)
</script>

<template>
  <v-app-bar
    color="primary"
    dark
    elevation="3"
    height="64"
    class="px-4"
  >
    <!-- Brand Section -->
    <div class="d-flex align-center">
      <v-avatar
        color="white"
        size="40"
        class="mr-3"
      >
        <v-icon color="primary" size="24">mdi-ticket-account</v-icon>
      </v-avatar>
      <v-toolbar-title class="text-h6 font-weight-bold">
        Ticket Management
      </v-toolbar-title>
    </div>

    <v-spacer />

    <!-- Navigation Buttons -->
    <div class="d-flex align-center ga-2 mr-6">
      <v-btn
        variant="text"
        @click="goToTickets"
        class="text-white"
      >
        <v-icon class="mr-2">mdi-ticket</v-icon>
        Tickets
      </v-btn>
      
      <v-btn
        variant="text"
        @click="goToReservations"
        class="text-white"
      >
        <v-icon class="mr-2">mdi-calendar-check</v-icon>
        Reservations
      </v-btn>
    </div>

    <!-- User Section -->
    <div class="d-flex align-center ga-3">
      <!-- User Profile -->
      <div class="d-flex align-center">
        <v-avatar
          size="36"
          class="mr-3"
        >
          <v-icon color="white">mdi-account-circle</v-icon>
        </v-avatar>
        
        <div class="d-flex flex-column">
          <span class="text-white font-weight-medium text-body-2">
            {{ userStore.user.name }}
          </span>
          <span class="text-grey-lighten-2 text-caption">
            {{ userStore.userTicketCount }} Tickets
          </span>
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped>
.v-btn {
  transition: all 0.2s ease;
}

.v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.v-badge {
  transition: transform 0.2s ease;
}

.v-badge:hover {
  transform: scale(1.05);
}
</style>