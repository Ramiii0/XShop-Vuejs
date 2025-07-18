// src/composables/useReservations.js
import { ref } from 'vue'
import * as reservationApi from '@/apiServices/reservation'
import type { Reservation } from '@/types/reservations/reservation'
import type { CreateReservation } from '@/types/reservations/createReservation'
import type { UpdateReservation } from '@/types/reservations/updateReservation'

// Global state - shared across all components
const reservations = ref<Reservation[]>([])
const loading = ref(false)
const error = ref<Error | null>(null)

// Composable for listing, creating, and deleting reservations
export function useReservations() {

  // Load the full list of reservations
  async function getList() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await reservationApi.fetchReservations();
      reservations.value = data;
      
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
      reservations.value.push(data);
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
    reservations,
    loading,
    error,
    getList,
    create,
    remove,
    get,
    update
  }
}
