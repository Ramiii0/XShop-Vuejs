// src/composables/useTickets.js
import { ref } from 'vue'
import * as ticketApi from '@/apiServices/ticket'
import type { Ticket } from '@/types/tickets/ticket'
import type { CreateTicket } from '@/types/tickets/createTicket'
import type { UpdateTicket } from '@/types/tickets/updateTicket'

// Global state - shared across all components
const tickets = ref<Ticket[]>([])
const loading = ref(false)
const error = ref<Error | null>(null)

// Composable for listing, creating, and deleting tickets
export function useTickets() {

  // Load the full list of tickets
  async function getList() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await ticketApi.fetchTickets();
      tickets.value = data;
      
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
      const { data } = await ticketApi.fetchTicket(id);
      tickets.value.push(data);
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  }


  // Create a new ticket, then refresh list
  async function create(payload: CreateTicket) {
    console.log('Creating Ticket:', payload);
    
    loading.value = true;
    error.value = null;
    try {
      await ticketApi.createTicket(payload);
      await getList();
    } catch (err: unknown) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  }

  // Delete a ticket by ID, then refresh list
  async function remove(id: string) {
    loading.value = true;
    error.value = null;
    try {
      await ticketApi.deleteTicket(id);
      await getList();
    } catch (err: unknown) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  }

  async function update(id: string, payload: UpdateTicket) {
    loading.value = true;
    error.value = null;
    try {
      await ticketApi.updateTicket(id, payload);
      await getList();
    } catch (err: unknown) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  }



  return {
    tickets,
    loading,
    error,
    getList,
    create,
    remove,
    get,
    update
  }
}
