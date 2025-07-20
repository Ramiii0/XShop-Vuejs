// src/api/reservation.js
import api from './axios';
import type { Reservation } from '@/types/reservations/reservation';
import type { CreateReservation } from '@/types/reservations/createReservation';
import type { ReservationQueryParam } from '@/types/reservations/reservationQueryParams';
import type { PaginatedResponse } from '@/types/common/paginatedResponse';

export async function fetchReservations(queryParam : ReservationQueryParam | null = null) : Promise<PaginatedResponse<Reservation>> {
  const response = await api.get('/reservations', {
    params: {
      userId: queryParam?.search || null,
      _page: queryParam?._page || 1,
      _per_page: queryParam?._per_page || 10,
    }
  });
  
  return response.data;
}

export function fetchReservation(id : string) : Promise<{ data: Reservation }> {
  return api.get(`/reservations/${id}`);
}

export function createReservation(data: CreateReservation) : Promise<{ data: Reservation }> {
  return api.post('/reservations', data);
}

export function deleteReservation(id: string) {
  return api.delete(`/reservations/${id}`);
}

export function updateReservation(id: string, data: Partial<Reservation>) : Promise<{ data: Reservation }> {
  return api.put(`/reservations/${id}`, data);
}
