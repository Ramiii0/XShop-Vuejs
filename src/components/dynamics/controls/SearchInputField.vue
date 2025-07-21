<script setup>
  import { ref } from 'vue'

  const loaded = ref(false)
  const loading = ref(false)
  const search = ref('')
  const emit = defineEmits(['search'])

  function onClick () {
    emit('search', search.value)
    loading.value = true
    loading.value = false
    loaded.value = true
  }
</script>

<template>
  <v-text-field
    v-model="search"
    append-inner-icon="mdi-magnify"
    density="compact"
    hide-details
    label="Type a name"
    :loading="loading"
    single-line
    variant="solo"
    @click:append-inner="onClick"
  />
</template>
