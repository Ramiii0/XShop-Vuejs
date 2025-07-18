<script setup lang="ts">
import { ref, watch, onMounted, computed, reactive } from 'vue'
import DynamicForm, { type Field } from '../dynamics/forms/DynamicForm.vue'
import type { CreateReservation } from '@/types/reservations/createReservation'
import { useReservations } from '@/composables/useReservation'
import { useTickets } from '@/composables/useTicket'
import users from '@/constants/users'
import { useUserStore } from '@/stores/userStore'


interface Props {
  dialog: boolean
}

interface Emits {
  (e: 'update:dialog', value: boolean): void
  (e: 'reservation-created'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { tickets, getList: getTicketsList } = useTickets()
const userStore = useUserStore()


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

const { create } = useReservations()

// Load tickets when component mounts
onMounted(() => {
  getTicketsList()
})

// Build the schema matching CreateReservation
const reservationSchema = computed((): Field[] => [
  {
    label: 'Ticket ID',
    key: 'ticketId',
    type: 'select',
    placeholder: 'Select a ticket',
    options: tickets.value.map(ticket => ({
      label: ticket.name,
      value: ticket.id
    }))
  },
  {
    label: 'User ID',
    key: 'userId',
    type: 'select',
    placeholder: 'Select a user',
    options: users.map(user => ({
      label: user.name,
      value: user.id
    }))
  }
])

interface ReservationForm {
  ticketId: string
  userId: string
}

const reservation = ref<ReservationForm>({
  ticketId: '',
  userId: '',
})

const getReservationPayload = (): CreateReservation => {
  return {
    ticketId: reservation.value.ticketId || '',
    userId: reservation.value.userId || ''
  }
}

const saveReservation = async (): Promise<void> => {
  await create(getReservationPayload())
  emit('reservation-created')
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
        <span>Create Reservation</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <DynamicForm
          v-model="reservation"
          :schema="reservationSchema"
          @submit="saveReservation"
        />
      </v-card-text>
      
    </v-card>
  </v-dialog>
</template>
