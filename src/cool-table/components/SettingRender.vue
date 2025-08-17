<template>
  <div class="cool-table-setting">
    <a-tooltip title="刷新">
      <ReloadOutlined @click="handleReload" />
    </a-tooltip>
    <ColumnSetting
      :columns="columns"
      :columns-map="columnsMap"
      :draggable="draggable"
      :checkable="checkable"
      :show-list-item-option="showListItemOption"
      :checked-reset="checkedReset"
      @columns-change="handleColumnsChange"
      @reset="handleReset"
    />
  </div>
</template>

<script setup lang="ts">
import type { ListToolBarProps } from '../types/toolbar'
import type { ProColumns } from '../types'
import { Tooltip as ATooltip } from 'ant-design-vue'
import { ReloadOutlined } from '@ant-design/icons-vue'
import ColumnSetting from './ColumnSetting/index.vue'

export interface SettingRenderProps extends ListToolBarProps {
  /** 列配置 */
  columns?: ProColumns<any>[]
  /** 是否可拖拽 */
  draggable?: boolean
  /** 是否可勾选 */
  checkable?: boolean
  /** 是否显示列项操作 */
  showListItemOption?: boolean
  /** 是否显示重置按钮 */
  checkedReset?: boolean
  /** 列状态映射 */
  columnsMap?: Record<string, any>
  /** 刷新回调 */
  onReload?: () => void
  /** 列状态变化回调 */
  onColumnsChange?: (columnsMap: Record<string, any>) => void
  /** 重置回调 */
  onReset?: () => void
}

const props = withDefaults(defineProps<SettingRenderProps>(), {
  draggable: true,
  checkable: true,
  showListItemOption: true,
  checkedReset: true,
  columns: () => [],
  columnsMap: () => ({})
})

const emit = defineEmits<{
  'reload': []
  'columns-change': [columnsMap: Record<string, any>]
  'reset': []
}>()

// 处理刷新
const handleReload = () => {
  emit('reload')
}

// 处理列状态变化
const handleColumnsChange = (columnsMap: Record<string, any>) => {
  emit('columns-change', columnsMap)
}

// 处理重置
const handleReset = () => {
  emit('reset')
}
</script>

<style scoped lang="scss">
.cool-table-setting {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #666;
  }
}
</style>