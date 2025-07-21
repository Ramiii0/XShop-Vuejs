import type { BaseQueryParamsWithSearch } from '@/types/common/baseQueryParams'

interface ReservationQueryParam extends BaseQueryParamsWithSearch {
  userId?: string
}

export type { ReservationQueryParam }
