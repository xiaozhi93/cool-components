import { provide, inject, ref, computed } from 'vue'
import type { CoolTableProps, ProColumns } from '../types'
import { useLocalStorage } from '@vueuse/core'

export interface CoolTableContext {
  columns: ProColumns<any>[]
  columnsMap: Record<string, {
    show: boolean
    fixed: boolean
    disable: boolean
  }>
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
export const useCoolTable= (props: CoolTableProps<any, any>) => {
  const actionRef = ref<ActionType | undefined>(undefined)

  const defaultColumnKeyMap = computed(() => {
    const columnKeyMap = {} as Record<string, any>;
    props.columns?.forEach(({ key, dataIndex, fixed }, index) => {
      const columnKey = (key ?? dataIndex) as string || `column-${index}`
      if (columnKey) {
        columnKeyMap[columnKey as string] = {
          show: true,
          fixed,
          disable: false,
        };
      }
    });
    return columnKeyMap;
  })
  // 还需要一个排序的columns
  const columnsMap = useLocalStorage('cool-table-columns-map', defaultColumnKeyMap.value)
  provide(CoolTableProviderKey, {
    actionRef,
    setAction: (newAction?: ActionType) => {
      actionRef.value = newAction;
    },
    columns: props.columns || [],
    defaultColumnKeyMap,
    columnsMap,
  })
  return {
    actionRef,
    setAction: (newAction?: ActionType) => {
      actionRef.value = newAction;
    },
    columns: props.columns || [],
    defaultColumnKeyMap,
    columnsMap,
  }
}

export const useCoolTableContext = () => {
  return inject(CoolTableProviderKey) as CoolTableContext
}