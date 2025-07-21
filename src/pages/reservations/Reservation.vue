<script lang="ts" setup>
  import type { TableAction, TableColumn } from '@/types/common/table'
  import type { Reservation } from '@/types/reservations/reservation'
  import { onMounted, reactive, ref } from 'vue'
  import DynamicTable from '@/components/dynamics/tables/DynamicTable.vue'
  import CreateReservation from '@/components/reservations/CreateReservation.vue'
  import UpdateReservation from '@/components/reservations/UpdateReservation.vue'
  import { useReservations } from '@/composables/useReservation'

  const { response, loading, error, getList, remove } = useReservations()
  const createDialog = ref(false)
  const updateDialog = ref(false)
  const selectedReservation = ref<Reservation | null>(null)
  const pageSize = 10
  const totalPages = ref(1)

  const tableColumns: TableColumn[] = [
    { key: 'id', label: 'Id', width: '80px', sortable: true },
    { key: 'ticketId', label: 'Ticket ID', sortable: true },
    { key: 'userId', label: 'User ID', sortable: true },
  ]

  const tableActions: TableAction[] = [
    {
      label: 'Edit',
      color: 'primary',
      variant: 'text',
      action: (item: Reservation) => openUpdateDialog(item),
    },
    {
      label: 'Delete',
      color: 'error',
      variant: 'text',
      action: (item: Reservation) => remove(item.id),
    },
  ]

  const onSearch = (searchValue: string) => {
    getList({
      search: searchValue,
    })

  }

    const openUpdateDialog = (reservation: Reservation) => {
    selectedReservation.value = reservation
    updateDialog.value = true
  }

  async function fetchReservations (page = 1) {
    await getList({ _page: page, _per_page: pageSize })
  }

  const openCreateDialog = () => {
    createDialog.value = true
  }

  onMounted(async () => {
    await getList({ _page: 1, _per_page: pageSize })
    totalPages.value = response.value?.pages ?? 1
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
          :reservation-data="selectedReservation"
        />
      </v-col>
      <v-spacer />
      <v-col>
        <SearchInputField @search="onSearch" />
      </v-col>

    </v-row>

    <DynamicTable
      :actions="tableActions"
      :columns="tableColumns"
      hover
      :items="response?.data || []"
      key-field="id"
      :loading="loading"
    />
    <Pagination
      :length="totalPages"
      :total-visible="10"
      @page-change="fetchReservations"
    />

  </v-container>
</template>
