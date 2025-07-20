// src/composables/useReservations.js
import { computed, ref, reactive } from 'vue'
import * as reservationApi from '@/apiServices/reservation'
import type { Reservation } from '@/types/reservations/reservation'
import type { CreateReservation } from '@/types/reservations/createReservation'
import type { UpdateReservation } from '@/types/reservations/updateReservation'
import type { ReservationQueryParam } from '@/types/reservations/reservationQueryParams'
import type { PaginatedResponse } from '@/types/common/paginatedResponse'
import { useUserStore } from '@/stores/userStore'

// Global state - shared across all components
const response = ref<PaginatedResponse<Reservation>>()
const loading = ref(false)
const error = ref<Error | null>(null)

function getReservationsCount() {
  return computed(() => response.value?.data.filter((reservation: Reservation) => reservation.userId === useUserStore().user.id).length || 0)
}

// Composable for listing, creating, and deleting reservations
export function useReservations() {
  const userStore = useUserStore()

  // Load the full list of reservations
  async function getList(queryParam : ReservationQueryParam | null = null) {
    loading.value = true;
    error.value = null;
    try {
      const res = await reservationApi.fetchReservations(queryParam);
      response.value = res;
      
    } catch (err: unknown) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  }

  async function get(id : string) {
    loading.value = true;
    error.value   = null;
    try {
      const { data } = await reservationApi.fetchReservation(id);
      // Handle single reservation fetch if needed
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  }


  // Create a new reservation, then refresh list
  async function create(payload: CreateReservation) {
    console.log('Creating Reservation:', payload);
    
    loading.value = true;
    error.value = null;
    try {
      await reservationApi.createReservation(payload);
      await getList();
      userStore.updateUserTicketCount(getReservationsCount().value);
    } catch (err: unknown) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  }

  // Delete a reservation by ID, then refresh list
  async function remove(id: string) {
    loading.value = true;
    error.value = null;
    try {
      await reservationApi.deleteReservation(id);
      await getList();
      // Update user ticket count after deleting reservation
      userStore.updateUserTicketCount(getReservationsCount().value);
    } catch (err: unknown) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  }

  async function update(id: string, payload: UpdateReservation) {
    loading.value = true;
    error.value = null;
    try {
      await reservationApi.updateReservation(id, payload);
      await getList();
    } catch (err: unknown) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  }



  return {
    response,
    loading,
    error,
    getList,
    create,
    remove,
    get,
    update
  }
}
// (removed custom reactive stub, now using Vue's built-in reactive)

