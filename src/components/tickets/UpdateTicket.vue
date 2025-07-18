<script setup lang="ts">
import { ref, watch } from 'vue'
import DynamicForm, { type Field } from '../dynamics/forms/DynamicForm.vue'
import type { UpdateTicket } from '@/types/tickets/updateTicket'
import type { Ticket } from '@/types/tickets/ticket'
import { useTickets } from '@/composables/useTicket'

interface Props {
  dialog: boolean
  ticketData: Ticket
}

interface Emits {
  (e: 'update:dialog', value: boolean): void
  (e: 'ticket-updated'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Create a local ref that syncs with the prop
const localDialog = ref(props.dialog)

// Watch for prop changes
watch(() => props.dialog, (newVal) => {
  localDialog.value = newVal
})

// Watch for local changes and emit to parent
watch(localDialog, (newVal) => {
  emit('update:dialog', newVal)
})

const closeDialog = (): void => {
  localDialog.value = false
}

const { update } = useTickets()

const ticketId = props.ticketData.id

// Build the schema matching UpdateTicket
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
  name: props.ticketData.name || '',
  description: props.ticketData.description || '',
  destination: props.ticketData.destination || '',
  time: props.ticketData.time ? new Date(props.ticketData.time).toISOString().split('T')[0] : new Date().toISOString().split('T')[0] // Default to today
})

const getUpdatePayload = (): UpdateTicket => {
  return {
    name: ticket.value.name,
    description: ticket.value.description,
    destination: ticket.value.destination,
    time: new Date(ticket.value.time || Date.now())
  }
}

const updateTicket = async (): Promise<void> => {
  await update(ticketId, getUpdatePayload())
  console.log('Ticket updated:', getUpdatePayload())
  emit('ticket-updated')
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
        <span>Update Ticket</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <DynamicForm
          v-model="ticket"
          :schema="ticketSchema"
          @submit="updateTicket"
        />
      </v-card-text>
      
    </v-card>
  </v-dialog>
</template>