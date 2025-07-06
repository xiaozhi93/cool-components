<template>
  <template v-if="mode === 'read'">
    <slot name="readRender" :value="value" :text="displayText">
      <span class="cool-field-tree-select">{{ displayText }}</span>
    </slot>
  </template>

  <template v-else>
    <slot 
      name="editRender" 
      :value="value" 
      :on-change="editAttrs['onUpdate:value']"
    >
      <a-tree-select
        :value="value"
        :tree-data="computedOptions"
        :field-names="fieldNames"
        :multiple="multiple"
        :tree-checkable="treeCheckable"
        :separator="separator"
        v-bind="editAttrs"
      >
        <!-- 透传其他插槽给底层组件 -->
        <template v-for="(_, name) in editSlots" #[name]="slotProps" :key="name">
          <slot :name="name" v-bind="slotProps || {}" />
        </template>
      </a-tree-select>
    </slot>
  </template>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'
import { TreeSelect as ATreeSelect } from 'ant-design-vue'
import { useRequest } from '../../composables/useRequest'

interface TreeSelectOption {
  title: string
  value: any
  key?: string
  disabled?: boolean
  selectable?: boolean
  children?: TreeSelectOption[]
  [key: string]: any
}

interface FieldTreeSelectProps {
  value?: any
  mode?: 'read' | 'edit' | 'update'
  emptyText?: string

  options?: TreeSelectOption[]
  request?: (params?: any) => Promise<TreeSelectOption[]>
  params?: Record<string, any>
  
  // TreeSelect 特有属性
  multiple?: boolean
  treeCheckable?: boolean
  separator?: string
  fieldNames?: {
    label?: string
    value?: string
    children?: string
    key?: string
  }
}

defineOptions({
  name: 'CoolFieldTreeSelect',
  inheritAttrs: false
})

const props = withDefaults(defineProps<FieldTreeSelectProps>(), {
  mode: 'read',
  emptyText: '-',
  multiple: false,
  treeCheckable: false,
  separator: ', ',
  fieldNames: () => ({
    label: 'title',
    value: 'value',
    children: 'children',
    key: 'key',
  })
})

const slots = useSlots()
const attrs = useAttrs()

// 计算需要透传的插槽（排除特殊插槽）
const editSlots = computed(() => {
  if (props.mode === 'read') return {}
  
  return slots || {}
})

// 异步数据加载
const { data: requestData } = useRequest(props.request, props.params)

// 计算选项数据
const computedOptions = computed(() => {
  // 优先级：options > request
  if (props.options) {
    return props.options
  }

  if (requestData.value && requestData.value.length > 0) {
    return requestData.value
  }

  return []
})

// 判断是否为多选模式
const isMultiSelect = computed(() => {
  return props.multiple || props.treeCheckable
})

// 递归查找选项的标题
const findOptionTitle = (options: TreeSelectOption[], targetValue: any, fieldNames = props.fieldNames): string | null => {
  const titleField = fieldNames?.label || 'label'
  const valueField = fieldNames?.value || 'value'
  const childrenField = fieldNames?.children || 'children'
  
  for (const option of options) {
    if (option[valueField] === targetValue) {
      return option[titleField]
    }
    
    if (option[childrenField] && option[childrenField].length > 0) {
      const childResult = findOptionTitle(option[childrenField], targetValue, fieldNames)
      if (childResult) {
        return childResult
      }
    }
  }
  
  return null
}

// 计算显示文本
const displayText = computed(() => {
  if (props.value === null || props.value === undefined) {
    return props.emptyText
  }
  
  // 多选模式：值是数组
  if (isMultiSelect.value && Array.isArray(props.value)) {
    if (props.value.length === 0) {
      return props.emptyText
    }
    
    const titles = props.value.map(val => {
      const title = findOptionTitle(computedOptions.value, val)
      return title || String(val)
    })
    return titles.join(props.separator)
  }
  
  // 单选模式：查找对应的选项
  const title = findOptionTitle(computedOptions.value, props.value)
  if (title) {
    return title
  }
  
  // 如果没找到对应选项，直接显示值
  return String(props.value)
})

// 提取编辑模式下需要透传的属性（包括事件监听器）
const editAttrs = computed(() => {
  return attrs
})
</script>

<style lang="scss" scoped>
.cool-field-tree-select {
  color: inherit;
}
</style> 