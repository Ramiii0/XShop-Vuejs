import type { PaginatedResponse } from '@/types/common/paginatedResponse'
import type { CreateTicket } from '@/types/tickets/createTicket'
import type { Ticket } from '@/types/tickets/ticket'
import type { TicketQueryParam } from '@/types/tickets/ticketQueryParams'
import type { UpdateTicket } from '@/types/tickets/updateTicket'
import { ref } from 'vue'
import * as ticketApi from '@/apiServices/ticket'

const response = ref<PaginatedResponse<Ticket>>()
const loading = ref(false)
const error = ref<Error | null>(null)
const ticket = ref<Ticket | null>(null)

export function useTickets () {
  async function getList (queryParam: TicketQueryParam | null = null) {
    loading.value = true
    error.value = null
    try {
      const res = await ticketApi.fetchTickets(queryParam)
      response.value = res
    } catch (error_: unknown) {
      error.value = error_ as Error
    } finally {
      loading.value = false
    }
  }

  async function get (id: string) {
    loading.value = true
    error.value = null
    try {
      const data = await ticketApi.fetchTicket(id)
      ticket.value = data
    } catch (error_) {
      error.value = error_ as Error
    } finally {
      loading.value = false
    }
  }

  async function create (payload: CreateTicket) {
    loading.value = true
    error.value = null
    try {
      await ticketApi.createTicket(payload)
      await getList()
    } catch (error_: unknown) {
      error.value = error_ as Error
    } finally {
      loading.value = false
    }
  }

  async function remove (id: string) {
    loading.value = true
    error.value = null
    try {
      await ticketApi.deleteTicket(id)
      await getList()
    } catch (error_: unknown) {
      error.value = error_ as Error
    } finally {
      loading.value = false
    }
  }

  async function update (id: string, payload: UpdateTicket) {
    loading.value = true
    error.value = null
    try {
      await ticketApi.updateTicket(id, payload)
      await getList()
    } catch (error_: unknown) {
      error.value = error_ as Error
    } finally {
      loading.value = false
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
    update,
  }
}
