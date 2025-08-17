<template>
  <div class="cool-table-column-setting">
    <a-popover
      :arrow="false"
      trigger="click"
      placement="bottomRight"
      :overlay-class-name="`cool-table-column-setting-overlay`"
    >
      <template #title>
        <div :class="`cool-table-column-setting-title`">
          <a-checkbox
            v-if="checkable !== false"
            :indeterminate="indeterminate"
            :checked="isAllChecked"
            @change="handleCheckAll"
          >
            列展示
          </a-checkbox>
          <a
            v-if="checkedReset"
            :class="`cool-table-column-setting-action-rest-button`"
            @click="handleReset"
          >
            重置
          </a>
        </div>
      </template>
      
      <template #content>
        <div :class="`cool-table-column-setting-list`">
          <!-- 固定在左侧 -->
          <div v-if="leftColumns.length > 0" :class="`cool-table-column-setting-list-section`">
            <div :class="`cool-table-column-setting-list-title`">固定在左侧</div>
            <ColumnList
              :columns="leftColumns"
              :draggable="draggable"
              :checkable="checkable"
              :show-list-item-option="showListItemOption"
              :prefix-cls="prefixCls"
              @change="handleColumnChange"
            />
          </div>
          
          <!-- 不固定 -->
          <div :class="`cool-table-column-setting-list-section`">
            <div v-if="leftColumns.length > 0 || rightColumns.length > 0" :class="`cool-table-column-setting-list-title`">
              不固定
            </div>
            <ColumnList
              :columns="normalColumns"
              :draggable="draggable"
              :checkable="checkable"
              :show-list-item-option="showListItemOption"
              :prefix-cls="prefixCls"
              @change="handleColumnChange"
            />
          </div>
          
          <!-- 固定在右侧 -->
          <div v-if="rightColumns.length > 0" :class="`cool-table-column-setting-list-section`">
            <div :class="`cool-table-column-setting-list-title`">固定在右侧</div>
            <ColumnList
              :columns="rightColumns"
              :draggable="draggable"
              :checkable="checkable"
              :show-list-item-option="showListItemOption"
              @change="handleColumnChange"
            />
          </div>
        </div>
      </template>
      
      <template #default>
        <a-tooltip title="列设置">
          <SettingOutlined />
        </a-tooltip>
      </template>
    </a-popover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Checkbox as ACheckbox, Space as ASpace, Tooltip as ATooltip, Popover as APopover } from 'ant-design-vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import type { ProColumns } from '../../types'
import ColumnList from './ColumnList.vue'

export interface ColumnSettingProps {
  /** 列配置 */
  columns: ProColumns<any>[]
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
  /** 列状态变化回调 */
  onColumnsChange?: (columnsMap: Record<string, any>) => void
  /** 重置回调 */
  onReset?: () => void
}

const props = withDefaults(defineProps<ColumnSettingProps>(), {
  draggable: true,
  checkable: true,
  showListItemOption: true,
  checkedReset: true,
  columnsMap: () => ({})
})

const emit = defineEmits<{
  'columns-change': [columnsMap: Record<string, any>]
  'reset': []
}>()

// 分离不同固定位置的列
const leftColumns = computed(() => 
  props.columns.filter(col => col.fixed === 'left' && !col.hideInSetting)
)

const rightColumns = computed(() => 
  props.columns.filter(col => col.fixed === 'right' && !col.hideInSetting)
)

const normalColumns = computed(() => 
  props.columns.filter(col => !col.fixed && !col.hideInSetting)
)

// 计算全选状态
const isAllChecked = computed(() => {
  const allColumns = [...leftColumns.value, ...normalColumns.value, ...rightColumns.value]
  return allColumns.length > 0 && allColumns.every(col => {
    const key = col.key || col.dataIndex
    return props.columnsMap[key as string]?.show !== false
  })
})

const indeterminate = computed(() => {
  const allColumns = [...leftColumns.value, ...normalColumns.value, ...rightColumns.value]
  const hiddenCount = allColumns.filter(col => {
    const key = col.key || col.dataIndex
    return props.columnsMap[key as string]?.show === false
  }).length
  return hiddenCount > 0 && hiddenCount < allColumns.length
})

// 处理全选/取消全选
const handleCheckAll = (e: any) => {
  const newColumnsMap = { ...props.columnsMap }
  const allColumns = [...leftColumns.value, ...normalColumns.value, ...rightColumns.value]
  
  allColumns.forEach(col => {
    const key = col.key || col.dataIndex
    if (key) {
      newColumnsMap[key as string] = {
        ...newColumnsMap[key as string],
        show: e.target.checked
      }
    }
  })
  
  emit('columns-change', newColumnsMap)
}

// 处理列状态变化
const handleColumnChange = (newColumnsMap: Record<string, any>) => {
  emit('columns-change', newColumnsMap)
}

// 处理重置
const handleReset = () => {
  emit('reset')
}
</script>

<style scoped lang="scss">
.cool-table-column-setting {
  display: inline-block;
}

:deep(.cool-table-column-setting-overlay) {
  .cool-table-column-setting-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #f0f0f0;
    
    .cool-table-column-setting-action-rest-button {
      color: #1890ff;
      cursor: pointer;
      
      &:hover {
        color: #40a9ff;
      }
    }
  }
  
  .cool-table-column-setting-list {
    padding: 8px 0;
    max-height: 400px;
    overflow-y: auto;
    
    .cool-table-column-setting-list-section {
      margin-bottom: 16px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .cool-table-column-setting-list-title {
        padding: 8px 16px;
        font-size: 12px;
        color: #666;
        background: #fafafa;
        border-bottom: 1px solid #f0f0f0;
      }
    }
  }
}
</style>
