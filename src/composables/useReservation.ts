import { computed, ref, reactive } from 'vue'
import * as reservationApi from '@/apiServices/reservation'
import type { Reservation } from '@/types/reservations/reservation'
import type { CreateReservation } from '@/types/reservations/createReservation'
import type { UpdateReservation } from '@/types/reservations/updateReservation'
import type { ReservationQueryParam } from '@/types/reservations/reservationQueryParams'
import type { PaginatedResponse } from '@/types/common/paginatedResponse'
import { useUserStore } from '@/stores/userStore'

const response = ref<PaginatedResponse<Reservation>>()
const loading = ref(false)
const error = ref<Error | null>(null)
let currentPage = ref<number>(1)

export function useReservations() {
  const userStore = useUserStore()

  async function getList(queryParam : ReservationQueryParam | null = null) {
    if (queryParam?._page) {
      currentPage.value = queryParam._page;
    }
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
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  }


  async function create(payload: CreateReservation) {
    loading.value = true;
    error.value = null;
    try {
      await reservationApi.createReservation(payload);
      console.log('Current Page:', currentPage.value);
      await userStore.updateUserTicketCount();
      await getList({ _page: currentPage.value});
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
      await reservationApi.deleteReservation(id);
      await userStore.updateUserTicketCount();
      await getList({ _page: currentPage.value });
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

