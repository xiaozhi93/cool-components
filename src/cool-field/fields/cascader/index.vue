<template>
  <template v-if="mode === 'read'">
    <slot name="readRender" :value="value" :text="displayText">
      <span class="cool-field-cascader">{{ displayText }}</span>
    </slot>
  </template>

  <template v-else>
    <slot 
      name="editRender" 
      :value="value" 
      :on-change="editAttrs['onUpdate:value']"
    >
      <a-cascader
        :value="value"
        :options="computedOptions"
        :field-names="fieldNames"
        :separator="separator"
        v-bind="editAttrs"
      >
        <!-- 透传其他插槽给底层组件 -->
        <template v-for="(_, name) in editSlots" #[name]="slotProps" :key="name">
          <slot :name="name" v-bind="slotProps || {}" />
        </template>
      </a-cascader>
    </slot>
  </template>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'
import { Cascader as ACascader } from 'ant-design-vue'
import { useRequest } from '../../composables/useRequest'

interface CascaderOption {
  label: string
  value: any
  disabled?: boolean
  children?: CascaderOption[]
  isLeaf?: boolean
  [key: string]: any
}

interface FieldCascaderProps {
  value?: any[]
  mode?: 'read' | 'edit' | 'update'
  emptyText?: string

  options?: CascaderOption[]
  request?: (params?: any) => Promise<CascaderOption[]>
  params?: Record<string, any>
  
  // 级联选择特有属性
  separator?: string
  fieldNames?: {
    label?: string
    value?: string
    children?: string
  }
}

defineOptions({
  name: 'CoolFieldCascader',
  inheritAttrs: false
})

const props = withDefaults(defineProps<FieldCascaderProps>(), {
  mode: 'read',
  emptyText: '-',
  separator: ' / ',
  fieldNames: () => ({
    label: 'label',
    value: 'value',
    children: 'children',
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

// 根据值路径查找对应的标签路径
const findLabelPath = (options: CascaderOption[], valuePath: any[], fieldNames = props.fieldNames): string[] => {
  if (!valuePath || valuePath.length === 0) return []
  
  const labelField = fieldNames?.label || 'label'
  const valueField = fieldNames?.value || 'value'
  const childrenField = fieldNames?.children || 'children'
  
  const result: string[] = []
  let currentOptions = options
  
  for (let i = 0; i < valuePath.length; i++) {
    const currentValue = valuePath[i]
    const option = currentOptions.find(opt => opt[valueField] === currentValue)
    
    if (option) {
      result.push(option[labelField])
      currentOptions = option[childrenField] || []
    } else {
      // 如果找不到对应选项，直接使用值
      result.push(String(currentValue))
    }
  }
  
  return result
}

// 计算显示文本
const displayText = computed(() => {
  if (!props.value || !Array.isArray(props.value) || props.value.length === 0) {
    return props.emptyText
  }
  
  const labelPath = findLabelPath(computedOptions.value, props.value)
  
  if (labelPath.length === 0) {
    return props.emptyText
  }
  
  return labelPath.join(props.separator)
})

// 提取编辑模式下需要透传的属性（包括事件监听器）
const editAttrs = computed(() => {
  return attrs
})
</script>

<style lang="scss" scoped>
.cool-field-cascader {
  color: inherit;
}
</style> 