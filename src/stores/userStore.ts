import type { User } from "@/types/users/user"
import { defineStore } from "pinia"
import { computed, reactive, ref } from "vue"
import users from "@/constants/users"
import type { Reservation } from "@/types/reservations/reservation"
import { fetchAllReservation } from "@/apiServices/reservation"


export const useUserStore = defineStore('user', () => {
  let currentUser = reactive<User>(users[0])
  let userTicketCount = ref(0)
  

  async function updateUserTicketCount() {
    userTicketCount.value = await getReservationsCount();
  }

async function getReservationsCount() {
  const res = await fetchAllReservation();
  const count = res.data.filter((reservation: Reservation) => reservation.userId === currentUser.id).length || 0;
  return count;
}

  return { user: currentUser, userTicketCount, updateUserTicketCount }
})