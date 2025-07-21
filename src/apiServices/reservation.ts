import type { PaginatedResponse } from '@/types/common/paginatedResponse'
import type { CreateReservation } from '@/types/reservations/createReservation'
import type { Reservation } from '@/types/reservations/reservation'
import type { ReservationQueryParam } from '@/types/reservations/reservationQueryParams'
import api from './axios'

export async function fetchReservations (queryParam: ReservationQueryParam | null = null): Promise<PaginatedResponse<Reservation>> {
  const response = await api.get('/reservations', {
    params: {
      userId: queryParam?.search || null,
      _page: queryParam?._page || null,
      _per_page: queryParam?._per_page || null,
    },
  })

  return response.data
}

export function fetchReservation (id: string): Promise<{ data: Reservation }> {
  return api.get(`/reservations/${id}`)
}

export function fetchAllReservation (): Promise<{ data: Reservation[] }> {
  return api.get(`/reservations`)
}

export function createReservation (data: CreateReservation): Promise<{ data: Reservation }> {
  return api.post('/reservations', data)
}

export function deleteReservation (id: string) {
  return api.delete(`/reservations/${id}`)
}

export function updateReservation (id: string, data: Partial<Reservation>): Promise<{ data: Reservation }> {
  return api.put(`/reservations/${id}`, data)
}
