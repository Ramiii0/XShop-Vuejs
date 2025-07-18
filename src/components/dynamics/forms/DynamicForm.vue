<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

export interface Field {
  label: string;
  key: string;
  type: 'text' | 'number' | 'email' | 'date' | 'textarea';
  placeholder?: string;
  counter?: number;
}

const props = defineProps<{
  schema: Field[];
  modelValue: Record<string, any>;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Record<string, any>): void;
  (e: 'submit', value: Record<string, any>): void;
}>();

function updateField(key: string, value: any) {
  const updated = { ...props.modelValue, [key]: value };
  emit('update:modelValue', updated);
}

function handleSubmit() {
  emit('submit', props.modelValue);
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="field in schema" :key="field.key" class="mb-4">
      <v-text-field
        v-model="props.modelValue[field.key]"
        :label="field.label"
        :type="field.type"
        :placeholder="field.placeholder || ''"
        @update:model-value="(value) => updateField(field.key, value)"
      />
    </div>

    <div class="d-flex justify-center mt-4">
      <v-btn class="me-4" type="submit">
        Submit
      </v-btn>
    </div>
  </form>
</template>
