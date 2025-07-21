import type { Reservation } from '@/types/reservations/reservation'
import type { User } from '@/types/users/user'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { fetchAllReservation } from '@/apiServices/reservation'
import users from '@/constants/users'

export const useUserStore = defineStore('user', () => {
  const currentUser = reactive<User>(users[0])
  const userTicketCount = ref(0)

  async function updateUserTicketCount () {
    userTicketCount.value = await getReservationsCount()
  }

  async function getReservationsCount () {
    const res = await fetchAllReservation()
    const count = res.data.filter((reservation: Reservation) => reservation.userId === currentUser.id).length || 0
    return count
  }

  return { user: currentUser, userTicketCount, updateUserTicketCount }
})
