<script setup lang="ts">
  import { ref } from 'vue'

  const links = ref([
    'About',
    'Contact',
    'Privacy Policy',
    'Terms of Service',
  ])
</script>

<template>
  <v-footer class="d-flex align-center justify-center ga-2 flex-wrap flex-grow-1 py-3" color="surface">
    <v-btn
      v-for="link in links"
      :key="link"
      rounded
      :text="link"
      variant="text"
    />

    <div class="flex-1-0-100 text-center mt-2">
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </div>
  </v-footer>
</template>
