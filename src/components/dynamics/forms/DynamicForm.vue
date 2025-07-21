<script setup lang="ts">
  import { defineEmits, defineProps } from 'vue'

  export interface Field {
    label: string
    key: string
    type: 'text' | 'number' | 'email' | 'date' | 'textarea' | 'select'
    placeholder?: string
    counter?: number
    options?: Array<{ label: string, value: string | number }>
  }

  const props = defineProps<{
    schema: Field[]
    modelValue: Record<string, any>
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: Record<string, any>): void
    (e: 'submit', value: Record<string, any>): void
  }>()

  function updateField (key: string, value: any) {
    const updated = { ...props.modelValue, [key]: value }
    emit('update:modelValue', updated)
  }

  function handleSubmit () {
    emit('submit', props.modelValue)
  }
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="field in schema" :key="field.key" class="mb-4">
      <v-text-field
        v-if="field.type !== 'select' && field.type !== 'textarea'"
        v-model="props.modelValue[field.key]"
        :label="field.label"
        :placeholder="field.placeholder || ''"
        :type="field.type"
        @update:model-value="(value) => updateField(field.key, value)"
      />

      <v-textarea
        v-else-if="field.type === 'textarea'"
        v-model="props.modelValue[field.key]"
        :label="field.label"
        :placeholder="field.placeholder || ''"
        @update:model-value="(value) => updateField(field.key, value)"
      />

      <v-select
        v-else-if="field.type === 'select'"
        v-model="props.modelValue[field.key]"
        item-title="label"
        item-value="value"
        :items="field.options"
        :label="field.label"
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
