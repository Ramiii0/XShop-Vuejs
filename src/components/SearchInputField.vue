<template>
      <v-text-field
        :loading="loading"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Search templates"
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

  function onClick () {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      loaded.value = true
    }, 2000)
  }
</script>