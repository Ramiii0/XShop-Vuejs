<script setup lang="ts">
import { computed } from 'vue'
import type { TableColumn, TableAction } from '@/types/common/table'

const props = defineProps<{
  items: any[]
  columns: TableColumn[]
  loading?: boolean
  actions?: TableAction[]
  keyField?: string
  hover?: boolean
  dense?: boolean
}>()

const emit = defineEmits(['row-click', 'action'])

const keyField = computed(() => props.keyField || 'id')

const handleAction = (action: TableAction, item: any) => {
  action.action(item)
  emit('action', { action: action.label, item })
}

const handleRowClick = (item: any) => {
  emit('row-click', item)
}

const isActionVisible = (action: TableAction, item: any) => {
  return action.visible ? action.visible(item) : true
}

const isActionDisabled = (action: TableAction, item: any) => {
  return action.disabled ? action.disabled(item) : false
}
</script>

<template>
  <div v-if="loading">
    <v-skeleton-loader type="table"></v-skeleton-loader>
  </div>
  <div v-else>
    <v-table 
      :hover="hover !== false" 
      :density="dense ? 'compact' : 'default'"
    >
      <thead>
        <tr>
          <th 
            v-for="column in columns" 
            :key="column.key"
            class="text-left"
            :style="{ width: column.width }"
          >
            {{ column.label }}
          </th>
          <th v-if="actions && actions.length > 0" class="text-left">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="item[keyField]"
          @click="handleRowClick(item)"
          style="cursor: pointer;"
        >
          <td 
            v-for="column in columns" 
            :key="column.key"
          >
            <slot 
              :name="`item.${column.key}`" 
              :item="item" 
              :value="item[column.key]"
            >
              {{ item[column.key] }}
            </slot>
          </td>
          <td v-if="actions && actions.length > 0">
            <template v-for="action in actions" :key="action.label">
              <v-btn
                v-if="isActionVisible(action, item)"
                :color="action.color || 'primary'"
                :variant="action.variant || 'text'"
                :prepend-icon="action.icon"
                :disabled="isActionDisabled(action, item)"
                @click.stop="handleAction(action, item)"
                class="mr-2"
              >
                {{ action.label }}
              </v-btn>
            </template>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>