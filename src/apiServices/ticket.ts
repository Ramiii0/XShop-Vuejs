import api from './axios';
import type { Ticket } from '@/types/tickets/ticket';
import type { CreateTicket } from '@/types/tickets/createTicket';
import type { TicketQueryParam } from '@/types/tickets/ticketQueryParams';
import type { PaginatedResponse } from '@/types/common/paginatedResponse';

export async function fetchTickets(queryParam : TicketQueryParam | null = null) : Promise<PaginatedResponse<Ticket>> {
  const response = await api.get('/tickets', {
    params: {
      name : queryParam?.search || null,
      _page: queryParam?._page || 1,
      _per_page: queryParam?._per_page || 10
    }
  });
  
  return response.data;
}

export function fetchTicket(id : string) : Promise<Ticket> {
  return api.get(`/tickets/${id}`).then(response => response.data);
}

export function createTicket(data: CreateTicket) : Promise<Ticket> {
  return api.post('/tickets', data).then(response => response.data);
}

export function deleteTicket(id: string) {
  return api.delete(`/tickets/${id}`);
}

export function updateTicket(id: string, data: Partial<Ticket>) : Promise<Ticket> {
  return api.put(`/tickets/${id}`, data).then(response => response.data);
}
