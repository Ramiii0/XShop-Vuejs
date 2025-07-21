interface PaginatedResponse<T> {
  first: number
  prev: number
  next: number | null
  last: number
  pages: number
  items: number
  data: T[]
}
export type { PaginatedResponse }
