<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import CreateReservation from '@/components/reservations/CreateReservation.vue'
import UpdateReservation from '@/components/reservations/UpdateReservation.vue'
import { useReservations } from '@/composables/useReservation'
import type { Reservation } from '@/types/reservations/reservation'

const { reservations, loading, error, getList, remove } = useReservations()
console.log('reservations', reservations)
const createDialog = ref(false)

const openCreateDialog = () => { createDialog.value = true }

const updateDialog = ref(false)
const selectedReservation = ref<Reservation | null>(null)
const openUpdateDialog = (reservation: Reservation) => {
  selectedReservation.value = reservation
  updateDialog.value = true
}

const handleReservationChange = async () => {
  await getList()
}

loading.value = true

onMounted(() => {
  getList()
})
</script>

<template>
<v-container fluid>
    <v-row class="align-center pb-4">
        <v-col>
            <v-btn @click="openCreateDialog">Add reservation</v-btn>
        <CreateReservation
        v-if="createDialog"
         v-model:dialog="createDialog"
         @reservation-created="handleReservationChange" />
        <UpdateReservation 
          v-if="updateDialog && selectedReservation"
          v-model:dialog="updateDialog"
          :reservationData="selectedReservation"
          @reservation-updated="handleReservationChange"
        />
        </v-col>
           <v-spacer></v-spacer>
           <v-col>
            <SearchInputField></SearchInputField>
           </v-col>

    </v-row>
    <div v-if="loading">
      <!-- TODO: select type skeleton loader -->
                <v-skeleton-loader type="table"></v-skeleton-loader>
    </div>
    <div v-else>
            <v-table hover>
    <thead>
      <tr>
        <th class="text-left">
          Id
        </th>
        <th class="text-left">
          TicketId
        </th>
         <th class="text-left">
          UserId
        </th>
        <th class="text-left">
          Crud
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in reservations"
        :key="item.id"
      >
       <td>{{ item.id }}</td>
       <td>{{ item.ticketId }}</td>
       <td>{{ item.userId }}</td>

        <td>
          <v-btn color="primary" variant="text" @click="openUpdateDialog(item)">Edit</v-btn>
          <v-btn color="error" variant="text" @click="remove(item.id)">Delete</v-btn>
        </td>

      </tr>
    </tbody>
  </v-table>
    </div>

</v-container>
</template>