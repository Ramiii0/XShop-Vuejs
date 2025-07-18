import type { User } from "@/types/users/user"
import { defineStore } from "pinia"
import { computed, reactive, ref } from "vue"
import users from "@/constants/users"
import { useReservations } from "@/composables/useReservation"
import type { Reservation } from "@/types/reservations/reservation"


export const useUserStore = defineStore('user', () => {
    const { reservations, getList } = useReservations()
    getList()
  let currentUser = reactive<User>(users[0])
  let userTicketCount = computed(() => currentUser.noOfTickets)

  return { user: currentUser, userTicketCount }
})