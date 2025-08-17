<template>
  <div :class="`cool-table-column-setting-list-item`">
    <div :class="`cool-table-column-setting-list-item-title`">
      <a-typography-text
        :style="{ width: 80 }"
        :ellipsis="{ tooltip: columnTitle }"
      >
        {{ columnTitle }}
      </a-typography-text>
    </div>
    
    <div v-if="showListItemOption" :class="`cool-table-column-setting-list-item-option`">
      <!-- 固定在左侧 -->
      <a-tooltip title="固定在列首">
        <span
          :class="`cool-table-column-setting-list-item-option-btn`"
          :data-active="currentFixed === 'left'"
          @click="handleFixedChange('left')"
        >
          <VerticalAlignTopOutlined />
        </span>
      </a-tooltip>
      
      <!-- 不固定 -->
      <a-tooltip title="不固定">
        <span
          :class="`cool-table-column-setting-list-item-option-btn`"
          :data-active="!currentFixed"
          @click="handleFixedChange(undefined)"
        >
          <VerticalAlignMiddleOutlined />
        </span>
      </a-tooltip>
      
      <!-- 固定在右侧 -->
      <a-tooltip title="固定在列尾">
        <span
          :class="`cool-table-column-setting-list-item-option-btn`"
          :data-active="currentFixed === 'right'"
          @click="handleFixedChange('right')"
        >
          <VerticalAlignBottomOutlined />
        </span>
      </a-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  VerticalAlignTopOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons-vue'
import type { ProColumns } from '../../types'

export interface ColumnItemProps {
  /** 列配置 */
  column: ProColumns<any>
  /** 列键 */
  columnKey: string
  /** 是否显示列项操作 */
  showListItemOption?: boolean
  /** 当前固定状态 */
  currentFixed?: 'left' | 'right'
}

const props = withDefaults(defineProps<ColumnItemProps>(), {
  showListItemOption: true
})

const emit = defineEmits<{
  'change': [columnKey: string, changes: any]
}>()

// 计算列标题
const columnTitle = computed(() => {
  return props.column.title || props.column.dataIndex || '未命名列'
})

// 处理固定状态变化
const handleFixedChange = (fixed: 'left' | 'right' | undefined) => {
  emit('change', props.columnKey, { fixed })
}
</script>

<style scoped lang="scss">
.cool-table-column-setting-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  width: 100%;
  
  .cool-table-column-setting-list-item-title {
    flex: 1;
    min-width: 0;
  }
  
  .cool-table-column-setting-list-item-option {
    display: flex;
    gap: 4px;
    margin-left: 8px;
    
    .cool-table-column-setting-list-item-option-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: 2px;
      cursor: pointer;
      color: #999;
      transition: all 0.2s;
      
      &:hover {
        color: #666;
        background-color: #f5f5f5;
      }
      
      &[data-active="true"] {
        color: #1890ff;
        background-color: #e6f7ff;
      }
    }
  }
}
</style>
