<template>
  <template v-if="mode === 'read'">
    <slot name="readRender" :value="value" :text="displayText">
      <span class="cool-field-date">{{ displayText }}</span>
    </slot>
  </template>

  <template v-else>
    <slot 
      name="editRender" 
      :value="value" 
      :on-change="editAttrs['onUpdate:value']"
    >
      <!-- 普通日期选择器 -->
      <a-date-picker
        :value="datePickerValue"
        :show-time="showTime"
        :format="displayFormat"
        v-bind="editAttrs"
      >
        <!-- 透传其他插槽给底层组件 -->
        <template v-for="(_, name) in editSlots" #[name]="slotProps" :key="name">
          <slot :name="name" v-bind="slotProps" />
        </template>
      </a-date-picker>
    </slot>
  </template>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'
import { DatePicker as ADatePicker } from 'ant-design-vue'
import dayjs, { type Dayjs } from 'dayjs'

// 支持的日期值类型
type DateValue = string | number | Date | Dayjs | null | undefined

interface FieldDateProps {
  /** 日期值：可以是字符串、时间戳、Date对象、Dayjs对象等 */
  value?: DateValue
  mode?: 'read' | 'edit' | 'update'
  emptyText?: string
  // 日期相关配置
  format?: string
  showTime?: boolean
}

defineOptions({
  name: 'CoolFieldDate',
  inheritAttrs: false
})

const props = withDefaults(defineProps<FieldDateProps>(), {
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

// 计算显示格式
const displayFormat = computed(() => {
  if (props.format) return props.format
  
  // 根据 showTime 决定默认格式
  return props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
})

// 检查值是否为空
const isEmpty = (value: DateValue): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && value.trim() === '') return true
  return false
}

// 标准化日期值 - 将各种类型转换为 Dayjs 对象
const normalizedValue = computed(() => {
  if (isEmpty(props.value)) return null
  
  try {
    const dayjsInstance = dayjs(props.value)
    return dayjsInstance.isValid() ? dayjsInstance : null
  } catch (error) {
    console.warn('[FieldDate] Invalid date value:', props.value, error)
    return null
  }
})

// 计算显示文本
const displayText = computed(() => {
  if (isEmpty(props.value)) {
    return props.emptyText
  }

  const normalized = normalizedValue.value
  if (!normalized) {
    // 如果无法标准化，显示原始值的字符串形式
    return String(props.value) || props.emptyText
  }

  try {
    return normalized.format(displayFormat.value)
  } catch (error) {
    console.warn('[FieldDate] Format error:', error)
    return String(props.value) || props.emptyText
  }
})

// 计算传递给 DatePicker 的值
const datePickerValue = computed(() => {
  // DatePicker 需要 Dayjs 对象或 undefined
  return normalizedValue.value || undefined
})

// 提取编辑模式下需要透传的属性（包括事件监听器）
const editAttrs = computed(() => {
  return { ...attrs }
})
</script>

<style lang="scss" scoped>
.cool-field-date {
  color: inherit;
}
</style> 