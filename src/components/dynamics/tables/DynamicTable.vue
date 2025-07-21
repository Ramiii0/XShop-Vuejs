<script setup lang="ts">
  import type { TableAction, TableColumn } from '@/types/common/table'
  import { computed } from 'vue'

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
  <div class="dynamic-table-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <v-skeleton-loader
        class="rounded-lg elevation-1"
        type="table"
      />
    </div>

    <!-- Main Table -->
    <v-card v-else class="table-card rounded-lg elevation-2" variant="flat">
      <v-table
        class="modern-table"
        :density="dense ? 'compact' : 'default'"
        :hover="hover !== false"
      >
        <thead>
          <tr class="table-header">
            <th
              v-for="column in columns"
              :key="column.key"
              class="header-cell"
              :class="[
                `text-${column.align || 'start'}`,
                { 'sortable-header': column.sortable }
              ]"
              :style="{ width: column.width }"
            >
              <div class="header-content">
                <span class="header-text">{{ column.label }}</span>
                <v-icon
                  v-if="column.sortable"
                  class="sort-icon ml-1"
                  size="small"
                >
                  mdi-sort
                </v-icon>
              </div>
            </th>
            <th v-if="actions && actions.length > 0" class="header-cell text-center">
              <span class="header-text">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in items"
            :key="item[keyField]"
            class="table-row"
            :class="{ 'even-row': index % 2 === 1 }"
            @click="handleRowClick(item)"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="table-cell"
              :class="`text-${column.align || 'start'}`"
            >
              <div class="cell-content">
                <slot
                  :item="item"
                  :name="`item.${column.key}`"
                  :value="item[column.key]"
                >
                  <span class="cell-text">{{ item[column.key] }}</span>
                </slot>
              </div>
            </td>
            <td v-if="actions && actions.length > 0" class="table-cell actions-cell">
              <div class="actions-container">
                <template v-for="action in actions" :key="action.label">
                  <v-btn
                    v-if="isActionVisible(action, item)"
                    class="action-btn"
                    :color="action.color || 'primary'"
                    :disabled="isActionDisabled(action, item)"
                    :prepend-icon="action.icon"
                    rounded="lg"
                    size="small"
                    :variant="action.variant || 'tonal'"
                    @click.stop="handleAction(action, item)"
                  >
                    {{ action.label }}
                  </v-btn>
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>

      <!-- Empty State -->
      <div v-if="!loading && items.length === 0" class="empty-state">
        <v-icon class="mb-4" color="grey-lighten-1" size="64">
          mdi-table-remove
        </v-icon>
        <h3 class="text-h6 text-grey-darken-1 mb-2">No Data Available</h3>
        <p class="text-body-2 text-grey">There are no items to display in this table.</p>
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.dynamic-table-container {
  width: 100%;
}

.loading-container {
  padding: 16px;
}

.table-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.modern-table {
  background: transparent;
}

/* Header Styles */
.table-header {
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%);
  border-bottom: 2px solid rgba(25, 118, 210, 0.1);
}

.header-cell {
  padding: 16px 20px !important;
  font-weight: 600 !important;
  font-size: 0.875rem !important;
  color: rgba(0, 0, 0, 0.87) !important;
  border-bottom: none !important;
  position: relative;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.header-text {
  font-weight: 600;
  letter-spacing: 0.025em;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.sortable-header {
  cursor: pointer;
  transition: all 0.2s ease;
}

.sortable-header:hover {
  background: rgba(25, 118, 210, 0.08);
}

.sort-icon {
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.sortable-header:hover .sort-icon {
  opacity: 1;
}

/* Row Styles */
.table-row {
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.table-row:hover {
  background: rgba(25, 118, 210, 0.04);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.even-row {
  background: rgba(0, 0, 0, 0.02);
}

.even-row:hover {
  background: rgba(25, 118, 210, 0.04);
}

.table-cell {
  padding: 16px 20px !important;
  border-bottom: none !important;
  vertical-align: middle;
}

.cell-content {
  display: flex;
  align-items: center;
  min-height: 20px;
}

.cell-text {
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.87);
}

/* Actions */
.actions-cell {
  text-align: center;
  width: 200px;
}

.actions-container {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.action-btn {
  font-size: 0.75rem !important;
  font-weight: 500 !important;
  text-transform: none !important;
  letter-spacing: 0.025em !important;
  transition: all 0.2s ease !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15) !important;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  background: rgba(0, 0, 0, 0.01);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-cell,
  .table-cell {
    padding: 12px 16px !important;
  }

  .header-text {
    font-size: 0.7rem;
  }

  .cell-text {
    font-size: 0.8rem;
  }

  .actions-container {
    flex-direction: column;
    gap: 4px;
  }

  .action-btn {
    width: 100%;
    min-width: 80px;
  }
}

@media (max-width: 480px) {
  .table-card {
    margin: 0 -8px;
    border-radius: 0;
  }

  .header-cell,
  .table-cell {
    padding: 8px 12px !important;
  }
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .table-card {
    background: rgba(18, 18, 18, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .table-header {
    background: linear-gradient(135deg, rgba(25, 118, 210, 0.15) 0%, rgba(33, 150, 243, 0.08) 100%);
    border-bottom: 2px solid rgba(25, 118, 210, 0.2);
  }

  .header-cell {
    color: rgba(255, 255, 255, 0.9) !important;
  }

  .table-row {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .table-row:hover {
    background: rgba(25, 118, 210, 0.08);
  }

  .even-row {
    background: rgba(255, 255, 255, 0.02);
  }

  .cell-text {
    color: rgba(255, 255, 255, 0.87);
  }

  .empty-state {
    background: rgba(255, 255, 255, 0.02);
  }
}

/* Animation for loading */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.table-card {
  animation: fadeIn 0.3s ease-out;
}
</style>
