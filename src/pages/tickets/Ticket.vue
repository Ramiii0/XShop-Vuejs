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

<BaseTablePage>
  <template v-slot:ActionButtons>
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
  </template>

  <template v-slot:SearchInput>
    <SearchInputField @search="onSearch" />
  </template>

  <template v-slot:Table>
    <DynamicTable
      :actions="tableActions"
      :columns="tableColumns"
      hover
      :items="response?.data || []"
      key-field="id"
      :loading="loading"
    />
  </template>

  <template v-slot:Pagination>
    <Pagination
      :length="totalPages"
      :total-visible="10"
      @page-change="fetchTickets"
    />
  </template>

</BaseTablePage>
</template>