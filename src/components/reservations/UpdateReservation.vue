<script setup lang="ts">
  import type { Reservation } from '@/types/reservations/reservation'
  import type { UpdateReservation } from '@/types/reservations/updateReservation'
  import { computed, onMounted, ref, watch } from 'vue'
  import { useReservations } from '@/composables/useReservation'
  import { useTickets } from '@/composables/useTicket'
  import users from '@/constants/users'
  import DynamicForm, { type Field } from '../dynamics/forms/DynamicForm.vue'

  interface Props {
    dialog: boolean
    reservationData: Reservation
  }

  interface Emits {
    (e: 'update:dialog', value: boolean): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  const { response, getList: getTicketsList } = useTickets()
  const { update } = useReservations()

  const localDialog = ref(props.dialog)

  watch(() => props.dialog, newVal => {
    localDialog.value = newVal
  })

  watch(localDialog, newVal => {
    emit('update:dialog', newVal)
  })

  const closeDialog = (): void => {
    localDialog.value = false
  }

  const reservationId = props.reservationData.id

  const reservationSchema = computed((): Field[] => [
    {
      label: 'Ticket ID',
      key: 'ticketId',
      type: 'select',
      placeholder: 'Select a ticket',
      options: response.value?.data.map(ticket => ({
        label: ticket.name,
        value: ticket.id,
      })),
    },
    {
      label: 'User ID',
      key: 'userId',
      type: 'select',
      placeholder: 'Select a user',
      options: users.map(user => ({
        label: user.name,
        value: user.id,
      })),
    },
  ])

  interface ReservationForm {
    ticketId: string
    userId: string
  }

  const reservation = ref<ReservationForm>({
    ticketId: props.reservationData.ticketId || '',
    userId: props.reservationData.userId || '',
  })

  const getUpdatePayload = (): UpdateReservation => {
    return {
      ticketId: reservation.value.ticketId,
      userId: reservation.value.userId,
    }
  }

  const updateReservation = async (): Promise<void> => {
    await update(reservationId, getUpdatePayload())
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
