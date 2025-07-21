<script lang="ts" setup>
  import type { TableAction, TableColumn } from '@/types/common/table'
  import type { Ticket } from '@/types/tickets/ticket'
  import { onMounted, ref } from 'vue'
  import DynamicTable from '@/components/dynamics/tables/DynamicTable.vue'
  import CreateTicket from '@/components/tickets/CreateTicket.vue'
  import UpdateTicket from '@/components/tickets/UpdateTicket.vue'
  import { useTickets } from '@/composables/useTicket'

  const { response, loading, error, getList, remove } = useTickets()

  const createDialog = ref(false)
  const pageSize = 5
  const totalPages = ref(1)
  const updateDialog = ref(false)
  const selectedTicket = ref<Ticket | null>(null)

  const tableColumns: TableColumn[] = [
    { key: 'id', label: 'Id', width: '80px', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'time', label: 'Time', sortable: true },
    { key: 'destination', label: 'Destination', sortable: true },
    { key: 'description', label: 'Description', sortable: false },
  ]

  const tableActions: TableAction[] = [
    {
      label: 'Edit',
      color: 'primary',
      variant: 'text',
      action: (item: Ticket) => openUpdateDialog(item),
    },
    {
      label: 'Delete',
      color: 'error',
      variant: 'text',
      action: (item: Ticket) => remove(item.id),
    },
  ]
  async function fetchTickets (page = 1) {
    await getList({ _page: page, _per_page: pageSize })
  }

  const openUpdateDialog = (ticket: Ticket) => {
    selectedTicket.value = ticket
    updateDialog.value = true
  }

  const openCreateDialog = () => {
    createDialog.value = true
  }

  const onSearch = (searchValue: string) => {
    getList({
      search: searchValue,
    })
  }

  onMounted(async () => {
    loading.value = true
    await getList({ _page: 1, _per_page: pageSize })
    totalPages.value = response.value?.pages ?? 1
  })
</script>

<template>
  <v-container class="pa-4" fluid>
    <v-row class="align-center pb-4">
      <v-col>
        <v-btn @click="openCreateDialog">Add ticket</v-btn>
        <CreateTicket
          v-if="createDialog"
          v-model:dialog="createDialog"
        />
        <UpdateTicket
          v-if="updateDialog && selectedTicket"
          v-model:dialog="updateDialog"
          :ticket-data="selectedTicket"
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
      @page-change="fetchTickets"
    />

  </v-container>
</template>
