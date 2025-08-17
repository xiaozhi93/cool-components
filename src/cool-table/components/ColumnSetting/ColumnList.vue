<template>
  <div :class="`cool-table-column-setting-list-container`">
    <a-tree
      v-if="treeData.length > 0"
      :tree-data="treeData"
      :draggable="draggable && treeData.length > 1"
      :checkable="checkable"
      :checked-keys="checkedKeys"
      :block-node="true"
      :show-line="false"
      item-height="24"
      @check="handleCheck"
      @drop="handleDrop"
    >
      <template #title="{ node }">
        <ColumnItem
          :column="node.column"
          :column-key="node.key"
          :show-list-item-option="showListItemOption"
          @change="handleColumnItemChange"
        />
      </template>
    </a-tree>
    
    <div v-else :class="`cool-table-column-setting-list-empty`">
      暂无列配置
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { ProColumns } from '../../types'
import ColumnItem from './ColumnItem.vue'

export interface ColumnListProps {
  /** 列配置 */
  columns: ProColumns<any>[]
  /** 是否可拖拽 */
  draggable?: boolean
  /** 是否可勾选 */
  checkable?: boolean
  /** 是否显示列项操作 */
  showListItemOption?: boolean
  /** 列状态映射 */
  columnsMap?: Record<string, any>
}

const props = withDefaults(defineProps<ColumnListProps>(), {
  draggable: true,
  checkable: true,
  showListItemOption: true,
  columnsMap: () => ({})
})

const emit = defineEmits<{
  'change': [columnsMap: Record<string, any>]
}>()

// 构建树形数据
const treeData = computed(() => {
  return props.columns.map((column, index) => {
    const key = column.key || column.dataIndex || `column-${index}`
    const config = props.columnsMap[key] || { show: true }
    
    return {
      key,
      title: column.title || column.dataIndex,
      column,
      selectable: false,
      disabled: config.disable === true,
      disableCheckbox: typeof config.disable === 'boolean' 
        ? config.disable 
        : config.disable?.checkbox,
      children: column.children?.map((child, childIndex) => {
        const childKey = child.key || child.dataIndex || `${key}-child-${childIndex}`
        const childConfig = props.columnsMap[childKey] || { show: true }
        
        return {
          key: childKey,
          title: child.title || child.dataIndex,
          column: child,
          selectable: false,
          disabled: childConfig.disable === true,
          disableCheckbox: typeof childConfig.disable === 'boolean'
            ? childConfig.disable
            : childConfig.disable?.checkbox,
        }
      })
    }
  })
})

// 计算选中的键
const checkedKeys = computed(() => {
  const keys: string[] = []
  
  const traverse = (nodes: any[]) => {
    nodes.forEach(node => {
      const config = props.columnsMap[node.key] || { show: true }
      if (config.show !== false) {
        keys.push(node.key)
      }
      if (node.children) {
        traverse(node.children)
      }
    })
  }
  
  traverse(treeData.value)
  return keys
})

// 处理勾选变化
const handleCheck = (checkedKeys: string[], info: any) => {
  const newColumnsMap = { ...props.columnsMap }
  
  // 处理当前节点
  const node = info.node
  const config = newColumnsMap[node.key] || {}
  config.show = info.checked
  newColumnsMap[node.key] = config
  
  // 处理子节点
  if (node.children) {
    node.children.forEach((child: any) => {
      const childConfig = newColumnsMap[child.key] || {}
      childConfig.show = info.checked
      newColumnsMap[child.key] = childConfig
    })
  }
  
  emit('change', newColumnsMap)
}

// 处理拖拽
const handleDrop = (info: any) => {
  const { dragNode, dropNode, dropPosition } = info
  
  // 这里可以实现列排序逻辑
  // 由于 Vue 的 Tree 组件拖拽功能相对简单，这里只是示例
  console.log('拖拽:', { dragNode, dropNode, dropPosition })
}

// 处理列项变化
const handleColumnItemChange = (columnKey: string, changes: any) => {
  const newColumnsMap = { ...props.columnsMap }
  newColumnsMap[columnKey] = {
    ...newColumnsMap[columnKey],
    ...changes
  }
  emit('change', newColumnsMap)
}
</script>

<style scoped lang="scss">
.cool-table-column-setting-list-container {
  .cool-table-column-setting-list-empty {
    padding: 16px;
    text-align: center;
    color: #999;
    font-size: 12px;
  }
}
</style>
