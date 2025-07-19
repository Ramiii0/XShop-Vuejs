<script lang="ts" setup>
import { useTickets } from '@/composables/useTicket'
import type { Ticket } from '@/types/tickets/ticket'
import type { TableColumn, TableAction } from '@/types/common/table'
import { onMounted, ref } from 'vue'
import CreateTicket from '@/components/tickets/CreateTicket.vue'
import UpdateTicket from '@/components/tickets/UpdateTicket.vue'
import DynamicTable from '@/components/dynamics/tables/DynamicTable.vue'

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

// Search state
const searchQuery = ref('')

const onSearch = (searchValue: string) => {
  searchQuery.value = searchValue
  // Note: We're now using client-side search instead of server-side
  // If you want server-side search, you can still call getList(searchValue)
}

const handleTicketChange = async () => {
  await getList()
}

const tableColumns: TableColumn[] = [
  { key: 'id', label: 'Id', width: '80px', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'time', label: 'Time', sortable: true },
  { key: 'destination', label: 'Destination', sortable: true },
  { key: 'description', label: 'Description', sortable: false }
]

// Define which fields to search in
const searchFields = ['name', 'destination', 'description']

const tableActions: TableAction[] = [
  {
    label: 'Edit',
    color: 'primary',
    variant: 'text',
    action: (item: Ticket) => openUpdateDialog(item)
  },
  {
    label: 'Delete',
    color: 'error',
    variant: 'text',
    action: (item: Ticket) => remove(item.id)
  }
]

loading.value = true

onMounted(() => {
  getList()
})
</script>

<template>
<v-container fluid>
    <v-row class="align-center pb-4">
        <v-col>
            <v-btn @click="openCreateDialog">Add ticket</v-btn>
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
            <SearchInputField @search="onSearch"></SearchInputField>
           </v-col>

    </v-row>
    
    <DynamicTable
      :items="tickets"
      :columns="tableColumns"
      :actions="tableActions"
      :loading="loading"
      key-field="id"
      hover
      :items-per-page="10"
      :multi-sort="false"
      :must-sort="false"
      :search="searchQuery"
      :search-fields="searchFields"
    />

</v-container>
</template>