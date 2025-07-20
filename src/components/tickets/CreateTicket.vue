<script setup lang="ts">
import { ref, watch } from 'vue'
import DynamicForm, { type Field } from '../dynamics/forms/DynamicForm.vue'
import type { CreateTicket } from '@/types/tickets/createTicket'
import { useTickets } from '@/composables/useTicket'

interface Props {
  dialog: boolean
}

interface Emits {
  (e: 'update:dialog', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localDialog = ref(props.dialog)

watch(() => props.dialog, (newVal) => {
  localDialog.value = newVal
})

watch(localDialog, (newVal) => {
  emit('update:dialog', newVal)
})

const closeDialog = (): void => {
  localDialog.value = false
}

const { create } = useTickets()

const ticketSchema: Field[] = [
  { 
    label: 'Name', 
    key: 'name', 
    type: 'text', 
    placeholder: 'Ticket name' 
  },
  { 
    label: 'Description', 
    key: 'description', 
    type: 'textarea', 
    placeholder: 'Describe the issue' 
  },
  { 
    label: 'Destination', 
    key: 'destination', 
    type: 'text', 
    placeholder: 'Where to go' 
  },
  { 
    label: 'Time', 
    key: 'time', 
    type: 'date' 
  }
]

interface TicketForm {
  name: string
  description: string
  destination: string
  time: string
}

const ticket = ref<TicketForm>({
  name: '',
  description: '',
  destination: '',
  time: ''
})

const getTicketPayload = (): CreateTicket => {
  return {
    name: ticket.value.name || '',
    description: ticket.value.description || '',
    destination: ticket.value.destination || '',
    time: ticket.value.time ? new Date(ticket.value.time) : new Date()
  }
}

const saveTicket = async (): Promise<void> => {
  await create(getTicketPayload())
  closeDialog()
}
</script>

<template>
  <v-dialog
    v-model="localDialog"
    max-width="400"
    persistent
  >
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <span>Create Ticket</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <DynamicForm
          v-model="ticket"
          :schema="ticketSchema"
          @submit="saveTicket"
        />
      </v-card-text>
      
    </v-card>
  </v-dialog>
</template>