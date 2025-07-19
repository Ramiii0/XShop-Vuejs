import type { User } from "@/types/users/user"
import { defineStore } from "pinia"
import { computed, reactive, ref } from "vue"
import users from "@/constants/users"
import { useReservations } from "@/composables/useReservation"
import type { Reservation } from "@/types/reservations/reservation"


export const useUserStore = defineStore('user', () => {
    const { reservations, getList } = useReservations()
  let currentUser = reactive<User>(users[0])
  let userTicketCount = ref(0)

  function updateUserTicketCount(number: number) {
    userTicketCount.value = number
  }

  // Initialize user ticket count based on reservations
  async function initializeUserTicketCount() {
    await getList()
    const userReservationsCount = reservations.value.filter((reservation: Reservation) => reservation.userId === currentUser.id).length
    console.log('User Reservations Count:', userReservationsCount)
    userTicketCount.value = userReservationsCount
  }

  return { user: currentUser, userTicketCount, updateUserTicketCount, initializeUserTicketCount }
})