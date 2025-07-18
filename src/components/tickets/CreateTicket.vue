<script setup lang="ts">
import { ref, watch } from 'vue'
import DynamicForm, { type Field } from '../dynamics/forms/DynamicForm.vue';
import type  { CreateTicket } from '@/types/tickets/createTicket';
import { useTickets } from '@/composables/useTicket';
import { APP_ROUTE_NAMES } from '@/constants/routeNames';
import router from '@/router';

const props = defineProps({
  dialog: Boolean,
});

const emit = defineEmits(['update:dialog']);

// Create a local ref that syncs with the prop
const localDialog = ref(props.dialog);

// Watch for prop changes
watch(() => props.dialog, (newVal) => {
  localDialog.value = newVal;
});

// Watch for local changes and emit to parent
watch(localDialog, (newVal) => {
  emit('update:dialog', newVal);
});

const closeDialog = () => {
  localDialog.value = false;
};
const { create } = useTickets();


// Build the schema matching CreateTicket
const ticketSchema: Field[] = [
  { label: 'Name',        key: 'name',        type: 'text',    placeholder: 'Ticket name' },
  { label: 'Description', key: 'description', type: 'textarea', placeholder: 'Describe the issue' },
  { label: 'Destination', key: 'destination', type: 'text',    placeholder: 'Where to go' },
  { label: 'Time',        key: 'time',        type: 'date' }
];

const ticket = ref({
  name: '',
  description: '',
  destination: '',
  time: ''
});

function getCreatePayload() : CreateTicket {
  return {
    name: ticket.value.name || '',
    description: ticket.value.description || '',
    destination: ticket.value.destination || '',
    time: ticket.value.time ? new Date(ticket.value.time) : new Date()
  } as CreateTicket;
}
async function saveTicket() {

  await create(getCreatePayload());
  console.log('Ticket saved:', getCreatePayload());
  closeDialog();
  router.push({ name: APP_ROUTE_NAMES.HOME });
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