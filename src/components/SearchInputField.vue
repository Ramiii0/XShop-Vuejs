<template>
      <v-text-field
        v-model="search"
        :loading="loading"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Type a name"
        variant="solo"
        hide-details
        single-line
        @click:append-inner="onClick"
      ></v-text-field>
</template>
<script setup>
  import { ref } from 'vue'

  const loaded = ref(false)
  const loading = ref(false)
  const search = ref('')
  const emit = defineEmits(['search'])

  function onClick () {
    emit('search', search.value)
    loading.value = true
    console.log('Search value:', search.value)
    setTimeout(() => {
      loading.value = false
      loaded.value = true
    }, 2000)
  }
</script>