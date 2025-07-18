// src/api/reservation.js
import api from './axios';
import type { Reservation } from '@/types/reservations/reservation';
import type { CreateReservation } from '@/types/reservations/createReservation';

export function fetchReservations() : Promise<{ data: Reservation[] }> {
  return api.get('/reservations');
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
