<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import DynamicForm, { type Field } from '../dynamics/forms/DynamicForm.vue'
import type { UpdateReservation } from '@/types/reservations/updateReservation'
import type { Reservation } from '@/types/reservations/reservation'
import { useReservations } from '@/composables/useReservation'
import users from '@/constants/users'
import { useTickets } from '@/composables/useTicket'

interface Props {
  dialog: boolean
  reservationData: Reservation
}

interface Emits {
  (e: 'update:dialog', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { tickets, getList: getTicketsList } = useTickets()
const { update } = useReservations()

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

const reservationId = props.reservationData.id

// Build the schema matching UpdateReservation
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
  ticketId: props.reservationData.ticketId || '',
  userId: props.reservationData.userId || ''
})

const getUpdatePayload = (): UpdateReservation => {
  return {
    ticketId: reservation.value.ticketId,
    userId: reservation.value.userId
  }
}

const updateReservation = async (): Promise<void> => {
  await update(reservationId, getUpdatePayload())
  console.log('Reservation updated:', getUpdatePayload())
  closeDialog()
}

onMounted(() => {
  getTicketsList()
})

</script>

<template>
  <v-dialog
    v-model="localDialog"
    max-width="400"
    persistent
  >
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <span>Update Reservation</span>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <DynamicForm
          v-model="reservation"
          :schema="reservationSchema"
          @submit="updateReservation"
        />
      </v-card-text>
      
    </v-card>
  </v-dialog>
</template>
