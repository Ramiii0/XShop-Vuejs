<script lang="ts" setup>
import { useTickets } from '@/composables/useTicket'
import type { Ticket } from '@/types/tickets/ticket'
import { onMounted, ref } from 'vue'
import CreateTicket from './CreateTicket.vue'
import UpdateTicket from './UpdateTicket.vue'

const { tickets, loading, error, getList, remove } = useTickets()
console.log('tickets', tickets)

const createDialog = ref(false)
const openCreateDialog = () => { createDialog.value = true }

const updateDialog = ref(false)
const selectedTicket = ref<Ticket | null>(null)
const openUpdateDialog = (ticket: Ticket) => {
  selectedTicket.value = ticket
  updateDialog.value = true
}

const handleTicketChange = async () => {
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
            <v-btn @click="openCreateDialog">Add new ticket</v-btn>
        <CreateTicket
        v-if="createDialog"
         v-model:dialog="createDialog"
         @ticket-created="handleTicketChange" />
        <UpdateTicket 
          v-if="updateDialog && selectedTicket"
          v-model:dialog="updateDialog"
          :ticketData="selectedTicket"
          @ticket-updated="handleTicketChange"
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
          Name
        </th>
         <th class="text-left">
          Time
        </th>
         <th class="text-left">
          Destination
        </th>
        <th class="text-left">
          Description
        </th>
        <th class="text-left">
          Crud
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in tickets"
        :key="item.name"
      >
       <td>{{ item.id }}</td>
       <td>{{ item.name }}</td>
        <td>{{ item.time }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.destination }}</td>

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