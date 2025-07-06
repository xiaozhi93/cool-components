<template>
  <template v-if="mode === 'read'">
    <slot name="readRender" :value="value" :text="displayText">
      <span class="cool-field-select">{{ displayText }}</span>
    </slot>
  </template>

  <template v-else>
    <slot 
      name="editRender" 
      :value="value" 
      :on-change="editAttrs['onUpdate:value']"
    >
      <a-select
        :value="value"
        :options="computedOptions"
        :mode="selectMode"
        v-bind="editAttrs"
      >
        <!-- 透传其他插槽给底层组件 -->
        <template v-for="(_, name) in editSlots" #[name]="slotProps" :key="name">
          <slot :name="name" v-bind="slotProps || {}" />
        </template>
      </a-select>
    </slot>
  </template>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'
import { Select as ASelect } from 'ant-design-vue'
import { useRequest } from '../../composables/useRequest'

interface FieldSelectProps {
  value?: any
  mode?: 'read' | 'edit' | 'update'
  emptyText?: string

  selectMode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE' 

  options?: Array<{ label: string; value: any; disabled?: boolean }>
  valueEnum?: Record<string | number, { label: string; value: any; disabled?: boolean; color?: string } | string>
  request?: (params?: any) => Promise<any[]>
  params?: Record<string, any>
  valueType?: string
}

defineOptions({
  name: 'CoolFieldSelect',
  inheritAttrs: false
})

const props = withDefaults(defineProps<FieldSelectProps>(), {
  mode: 'read',
  emptyText: '-',
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


// 判断是否为多选模式
const isMultiSelect = computed(() => {
  return props.selectMode === 'multiple' || props.selectMode === 'tags'
})

// 计算选项数据
const computedOptions = computed(() => {
  // 优先级：options > request > valueEnum
  if (props.options) {
    return props.options
  }

  if (requestData.value && requestData.value.length > 0) {
    return requestData.value
  }

  if (props.valueEnum) {
    return Object.entries(props.valueEnum).map(([value, config]) => ({
      label: typeof config === 'string' ? config : config.label,
      value: value,
      disabled: typeof config === 'object' ? config.disabled : undefined,
    }))
  }

  return []
})


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
    
    const labels = props.value.map(val => {
      const option = computedOptions.value.find(opt => opt.value === val)
      return option ? option.label : String(val)
    })
    return labels.join(', ')
  }
  
  // 单选模式：查找对应的选项
  const option = computedOptions.value.find(opt => opt.value === props.value)
  if (option) {
    return option.label
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
.cool-field-select {
  color: inherit;
}
</style> 