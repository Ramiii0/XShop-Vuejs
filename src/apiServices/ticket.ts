// src/api/user.js
import api from './axios';
import type { Ticket } from '@/types/tickets/ticket';
import type { CreateTicket } from '@/types/tickets/createTicket';

export function fetchTickets(name : string | null = null) : Promise<{ data: Ticket[] }> {
  return api.get('/tickets', {
    params: {
      name
    }
  });
}

export function fetchTicket(id : string) : Promise<{ data: Ticket }> {
  return api.get(`/tickets/${id}`);
}

export function createTicket(data: CreateTicket) : Promise<{ data: Ticket }> {
  return api.post('/tickets', data);
}

export function deleteTicket(id: string) {
  return api.delete(`/tickets/${id}`);
}

export function updateTicket(id: string, data: Partial<Ticket>) : Promise<{ data: Ticket }> {
  return api.put(`/tickets/${id}`, data);
}
