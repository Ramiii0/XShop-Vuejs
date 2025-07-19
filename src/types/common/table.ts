export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
  align?: 'start' | 'center' | 'end'
}

export interface TableAction {
  label: string
  color?: string
  variant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
  icon?: string
  action: (item: any) => void
  disabled?: (item: any) => boolean
  visible?: (item: any) => boolean
}

export interface DynamicTableProps {
  items: any[]
  columns: TableColumn[]
  loading?: boolean
  actions?: TableAction[]
  keyField?: string
  hover?: boolean
  dense?: boolean
  selectable?: boolean
  selectedItems?: any[]
}
