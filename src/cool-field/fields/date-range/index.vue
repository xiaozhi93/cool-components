<template>
  <template v-if="mode === 'read'">
    <slot name="readRender" :value="value" :text="displayText">
      <span class="cool-field-date-range">{{ displayText }}</span>
    </slot>
  </template>

  <template v-else>
    <slot 
      name="editRender" 
      :value="value" 
      :on-change="editAttrs['onUpdate:value']"
    >
      <!-- 日期范围选择器 -->
      <a-range-picker
        :value="rangePickerValue"
        :show-time="showTime"
        :format="displayFormat"
        v-bind="editAttrs"
      >
        <!-- 透传其他插槽给底层组件 -->
        <template v-for="(_, name) in editSlots" #[name]="slotProps" :key="name">
          <slot :name="name" v-bind="slotProps" />
        </template>
      </a-range-picker>
    </slot>
  </template>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'
import { RangePicker as ARangePicker } from 'ant-design-vue'
import dayjs, { type Dayjs } from 'dayjs'

// 支持的日期值类型
type DateValue = string | number | Date | Dayjs | null | undefined
type DateRangeValue = [DateValue, DateValue] | null | undefined

interface FieldDateRangeProps {
  /** 日期范围值：数组格式 [startDate, endDate] */
  value?: DateRangeValue
  mode?: 'read' | 'edit' | 'update'
  emptyText?: string
  // 日期相关配置
  format?: string
  showTime?: boolean
  separator?: string
}

defineOptions({
  name: 'CoolFieldDateRange',
  inheritAttrs: false
})

const props = withDefaults(defineProps<FieldDateRangeProps>(), {
  mode: 'read',
  emptyText: '-',
  separator: ' ~ ',
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

// 检查单个日期值是否为空
const isEmpty = (value: DateValue): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && value.trim() === '') return true
  return false
}

// 检查日期范围值是否为空
const isRangeEmpty = (value: DateRangeValue): boolean => {
  if (!value || !Array.isArray(value)) return true
  return value.length !== 2 || isEmpty(value[0]) || isEmpty(value[1])
}

// 标准化单个日期值 - 将各种类型转换为 Dayjs 对象
const normalizeDateValue = (value: DateValue): Dayjs | null => {
  if (isEmpty(value)) return null
  
  try {
    const dayjsInstance = dayjs(value)
    return dayjsInstance.isValid() ? dayjsInstance : null
  } catch (error) {
    console.warn('[FieldDateRange] Invalid date value:', value, error)
    return null
  }
}

// 标准化日期范围值
const normalizedValue = computed(() => {
  if (isRangeEmpty(props.value)) return null
  
  const [startDate, endDate] = props.value as [DateValue, DateValue]
  const normalizedStart = normalizeDateValue(startDate)
  const normalizedEnd = normalizeDateValue(endDate)
  
  if (!normalizedStart || !normalizedEnd) return null
  
  return [normalizedStart, normalizedEnd] as [Dayjs, Dayjs]
})

// 计算显示文本
const displayText = computed(() => {
  if (isRangeEmpty(props.value)) {
    return props.emptyText
  }

  const normalized = normalizedValue.value
  if (!normalized) {
    // 如果无法标准化，尝试显示原始值
    if (Array.isArray(props.value)) {
      const [start, end] = props.value
      return `${String(start || '')}${props.separator}${String(end || '')}`
    }
    return props.emptyText
  }

  try {
    const [start, end] = normalized
    const startText = start.format(displayFormat.value)
    const endText = end.format(displayFormat.value)
    return `${startText}${props.separator}${endText}`
  } catch (error) {
    console.warn('[FieldDateRange] Format error:', error)
    return props.emptyText
  }
})

// 计算传递给 RangePicker 的值
const rangePickerValue = computed(() => {
  // RangePicker 需要 [Dayjs, Dayjs] 或 undefined
  return normalizedValue.value || undefined
})

// 提取编辑模式下需要透传的属性（包括事件监听器）
const editAttrs = computed(() => {
  attrs._track; // 访问属性，强制建立以来追踪
  return { ...attrs }
})
</script>

<style lang="scss" scoped>
.cool-field-date-range {
  color: inherit;
}
</style> 