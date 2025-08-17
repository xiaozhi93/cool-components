<template>
  <div class="cool-table-column-setting-list">
    <a-tree
      v-if="treeData.length > 0"
      :tree-data="treeData as any"
      :checkable="true"
      :checked-keys="checkedKeys"
      @check="handleCheck"
      :show-line="false"
      :item-height="24"
    >
    </a-tree>
    
    <div v-else class="cool-table-column-setting-list-empty">
      暂无列配置
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Tree as ATree } from 'ant-design-vue'
import type { ProColumns } from '../../types'
import { useCoolTableContext } from '../../provider'

export interface ColumnListProps {
  /** 列配置 */
  columns: ProColumns<any>[]
}

const props = withDefaults(defineProps<ColumnListProps>(), {
  columns: () => [],
})

const { columnsMap } = useCoolTableContext()

// 构建树形数据
const treeData = computed(() => {
  return props.columns.map((column, index) => {
    const key = column.key || column.dataIndex || `column-${index}`
    const config = columnsMap.value[key as string] || { show: true }
    
    return {
      key,
      title: column.title || column.dataIndex,
      disabled: config.disable === true
    }
  })
})

// 计算选中的键
const checkedKeys = computed(() => {
  const keys: string[] = []
  
  const traverse = (nodes: any[]) => {
    nodes.forEach(node => {
      const config = columnsMap.value[node.key] || { show: true }
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
const handleCheck = (_: any, info: any) => {
  const newColumnsMap = columnsMap.value
  
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
