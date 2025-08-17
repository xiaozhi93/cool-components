import { provide, inject, ref, computed, type Ref } from 'vue'
import type { CoolTableProps, ProColumns } from '../types'
import { useLocalStorage } from '@vueuse/core'
import { cloneDeep } from 'lodash-es'
export interface CoolTableContext {
  actionRef: Ref<ActionType | undefined>
  setAction: (newAction?: ActionType) => void
  columns: ProColumns<any>[]
  defaultColumnKeyMap: Record<string, {
    show: boolean
    fixed: boolean
    disable: boolean
  }>
  columnsMap: Ref<Record<string, {
    show: boolean
    fixed: boolean
    disable: boolean
  }>>
  resetColumnsMap: () => void
}

export type PageInfo = {
  current: number
  pageSize: number
}

export type ActionType = {
  reload: () => void
  setPageInfo: (pageInfo: PageInfo) => void
  fullScreen: () => void
}

export const CoolTableProviderKey = Symbol('CoolTableProvider')

export const useCoolTable = (props: CoolTableProps<any, any>) => {
  const actionRef = ref<ActionType | undefined>(undefined)

  const defaultColumnKeyMap = computed(() => {
    const columnKeyMap: Record<string, {
      show: boolean
      fixed: boolean
      disable: boolean
    }> = {}
    
    props.columns?.forEach(({ key, dataIndex, fixed }, index) => {
      const columnKey = (key ?? dataIndex) as string || `column-${index}`
      if (columnKey) {
        columnKeyMap[columnKey] = {
          show: true,
          fixed: !!fixed,
          disable: false,
        }
      }
    })
    return columnKeyMap
  })

  // `useLocalStorage` 返回的是 Ref，已经是响应式的
  const columnsMap = useLocalStorage(
    'cool-table-columns-map',
    defaultColumnKeyMap.value
  )

  // 提供给子组件的数据
  const context: CoolTableContext = {
    actionRef,
    setAction: (newAction?: ActionType) => {
      actionRef.value = newAction
    },
    columns: props.columns || [],
    defaultColumnKeyMap: defaultColumnKeyMap.value,
    columnsMap, // 已经是 Ref，保持响应式
    resetColumnsMap: () => {
      // 重置 columnsMap 到默认值
      columnsMap.value = cloneDeep(defaultColumnKeyMap.value)
    },
  }

  provide(CoolTableProviderKey, context)

  return context
}

export const useCoolTableContext = () => {
  return inject(CoolTableProviderKey) as CoolTableContext
}