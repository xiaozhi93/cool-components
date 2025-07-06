<template>
  <template v-if="mode === 'read'">
    <slot name="readRender" :value="value" :text="displayText">
      <span class="cool-field-digit">{{ displayText }}</span>
    </slot>
  </template>

  <template v-else>
    <slot 
      name="editRender" 
      :value="value" 
      :on-change="editAttrs['onUpdate:value']"
    >
      <a-input-number
        :value="value"
        v-bind="editAttrs"
        style="width: 100%"
      >
        <!-- 透传其他插槽给底层组件 -->
        <template v-for="(_, name) in editSlots" #[name]="slotProps" :key="name">
          <slot :name="name" v-bind="slotProps || {}" />
        </template>
      </a-input-number>
    </slot>
  </template>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'
import { InputNumber as AInputNumber } from 'ant-design-vue'
import { formatters, type NumberFormatOptions } from '../../utils/formatters'

interface FieldDigitProps {
  value?: number
  mode?: 'read' | 'edit' | 'update'
  emptyText?: string
  // 数字格式化选项
  precision?: number
  thousand?: boolean
  invalidText?: string
}

defineOptions({
  name: 'CoolFieldDigit',
  inheritAttrs: false
})

const props = withDefaults(defineProps<FieldDigitProps>(), {
  mode: 'read',
  emptyText: '-',
  thousand: false
})

const slots = useSlots()
const attrs = useAttrs()

// 计算需要透传的插槽（排除特殊插槽）
const editSlots = computed(() => {
  if (props.mode === 'read') return {}
  
  return slots || {}
})

// 计算格式化选项
const formatOptions = computed((): NumberFormatOptions => ({
  precision: props.precision,
  thousand: props.thousand,
  invalidText: props.invalidText || props.emptyText
}))

// 计算显示文本
const displayText = computed(() => {
  if (props.value === null || props.value === undefined) {
    return props.emptyText
  }
  
  // 使用新的格式化函数
  return formatters.number(props.value, formatOptions.value)
})

// 提取编辑模式下需要透传的属性（包括事件监听器）
const editAttrs = computed(() => {
  // 从 attrs 中获取所有属性，包含了事件监听器
  const result: any = { ...attrs }
  
  // 如果有精度设置，添加到透传属性中
  if (props.precision !== undefined) {
    result.precision = props.precision
  }
  
  return result
})
</script>

<style lang="scss" scoped>
.cool-field-digit {
  color: inherit;
  font-variant-numeric: tabular-nums;
}
</style> 