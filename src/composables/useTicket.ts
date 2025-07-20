import { ref } from 'vue'
import * as ticketApi from '@/apiServices/ticket'
import type { Ticket } from '@/types/tickets/ticket'
import type { CreateTicket } from '@/types/tickets/createTicket'
import type { UpdateTicket } from '@/types/tickets/updateTicket'
import type { TicketQueryParam } from '@/types/tickets/ticketQueryParams'
import type { PaginatedResponse } from '@/types/common/paginatedResponse'

const response = ref<PaginatedResponse<Ticket>>()
const loading = ref(false)
const error = ref<Error | null>(null)
const ticket = ref<Ticket | null>(null)

export function useTickets() {
  
  async function getList(queryParam : TicketQueryParam | null = null) {
    loading.value = true;
    error.value = null;
    try {
      const res = await ticketApi.fetchTickets(queryParam);
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
      const data = await ticketApi.fetchTicket(id);
      ticket.value = data;
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  }


  async function create(payload: CreateTicket) {
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
