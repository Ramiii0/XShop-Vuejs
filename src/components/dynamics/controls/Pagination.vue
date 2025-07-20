<script setup lang="ts">
  import { ref, watch } from 'vue'

  const props = defineProps({
    length: {
      type: Number,
      default: 15
    },
    totalVisible: {
      type: Number,
      default: 7
    }
  })
  const page = ref(1)
  
  const emit = defineEmits<{
  (e: 'page-change', value: number): void
}>()

watch(page, (newPage) => {
  emit('page-change', newPage)
})
  
</script>

<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="props.length"
      :total-visible="props.totalVisible"
    ></v-pagination>
  </div>
</template>