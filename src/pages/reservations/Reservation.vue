<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import CreateReservation from '@/components/reservations/CreateReservation.vue'
import UpdateReservation from '@/components/reservations/UpdateReservation.vue'
import DynamicTable from '@/components/dynamics/tables/DynamicTable.vue'
import { useReservations } from '@/composables/useReservation'
import type { Reservation } from '@/types/reservations/reservation'
import type { TableColumn, TableAction } from '@/types/common/table'

const { response, loading, error, getList, remove } = useReservations()
const createDialog = ref(false)

const openCreateDialog = () => { createDialog.value = true }

const updateDialog = ref(false)
const selectedReservation = ref<Reservation | null>(null)
const openUpdateDialog = (reservation: Reservation) => {
  selectedReservation.value = reservation
  updateDialog.value = true
}

const pageSize = 10
const totalPages = ref(1)

// Define table columns for reservations
const tableColumns: TableColumn[] = [
  { key: 'id', label: 'Id', width: '80px', sortable: true },
  { key: 'ticketId', label: 'Ticket ID', sortable: true },
  { key: 'userId', label: 'User ID', sortable: true }
]

// Define table actions for reservations
const tableActions: TableAction[] = [
  {
    label: 'Edit',
    color: 'primary',
    variant: 'text',
    action: (item: Reservation) => openUpdateDialog(item)
  },
  {
    label: 'Delete',
    color: 'error',
    variant: 'text',
    action: (item: Reservation) => remove(item.id)
  }
]

const onSearch = (searchValue: string) => {  
  getList({
    search: searchValue
  })
}

async function fetchReservations(page: number = 1)  {
 await getList({ _page: page, _per_page: pageSize })
}

loading.value = true

onMounted(async () => {
  await getList()
  totalPages.value = response.value?.pages ?? 1;
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
         />
        <UpdateReservation 
          v-if="updateDialog && selectedReservation"
          v-model:dialog="updateDialog"
          :reservationData="selectedReservation"
        />
        </v-col>
           <v-spacer></v-spacer>
           <v-col>
            <SearchInputField @search="onSearch"/>
           </v-col>

    </v-row>
    
    <DynamicTable
      :items="response?.data || []"
      :columns="tableColumns"
      :actions="tableActions"
      :loading="loading"
      key-field="id"
      hover
    />
    <Pagination
      :length="totalPages"
       :total-visible="10"
       @page-change="fetchReservations"
    />

</v-container>
</template>