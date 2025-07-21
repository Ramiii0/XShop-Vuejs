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
  <v-footer
    app
    class="d-flex align-center justify-center ga-2 flex-wrap py-3"
    color="surface"
    height="auto"
  >
    <v-btn
      v-for="link in links"
      :key="link"
      rounded
      :text="link"
      variant="text"
    />

    <div class="flex-1-0-100 text-center mt-2">
      {{ new Date().getFullYear() }} — <strong>X Shop</strong>
    </div>
  </v-footer>
</template>
