<template>
  <template v-if="mode === 'read'">
    <slot name="readRender" :value="value" :text="displayText">
      <span class="cool-field-time-range">{{ displayText }}</span>
    </slot>
  </template>

  <template v-else>
    <slot 
      name="editRender" 
      :value="value" 
      :on-change="editAttrs['onUpdate:value']"
    >
      <!-- 时间范围选择器 -->
      <a-time-range-picker
        :value="timeRangePickerValue"
        :format="displayFormat"
        v-bind="editAttrs"
      >
        <!-- 透传其他插槽给底层组件 -->
        <template v-for="(_, name) in editSlots" #[name]="slotProps" :key="name">
          <slot :name="name" v-bind="slotProps" />
        </template>
      </a-time-range-picker>
    </slot>
  </template>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'
import { TimeRangePicker as ATimeRangePicker } from 'ant-design-vue'
import dayjs, { type Dayjs } from 'dayjs'

// 支持的时间值类型
type TimeValue = string | number | Date | Dayjs | null | undefined
type TimeRangeValue = [TimeValue, TimeValue] | null | undefined

interface FieldTimeRangeProps {
  /** 时间范围值：数组格式 [startTime, endTime] */
  value?: TimeRangeValue
  mode?: 'read' | 'edit' | 'update'
  emptyText?: string
  // 时间相关配置
  format?: string
  use12Hours?: boolean
  separator?: string
}

defineOptions({
  name: 'CoolFieldTimeRange',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<FieldTimeRangeProps>(), {
  mode: 'read',
  emptyText: '-',
  use12Hours: false,
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
  
  // 根据 use12Hours 决定默认格式
  return props.use12Hours ? 'h:mm:ss A' : 'HH:mm:ss'
})

// 检查单个时间值是否为空
const isEmpty = (value: TimeValue): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && value.trim() === '') return true
  return false
}

// 检查时间范围值是否为空
const isRangeEmpty = (value: TimeRangeValue): boolean => {
  if (!value || !Array.isArray(value)) return true
  return value.length !== 2 || isEmpty(value[0]) || isEmpty(value[1])
}

// 标准化单个时间值 - 将各种类型转换为 Dayjs 对象
const normalizeTimeValue = (value: TimeValue): Dayjs | null => {
  if (isEmpty(value)) return null
  
  try {
    let dayjsInstance: Dayjs
    
    // 如果是纯时间字符串（如 "14:30:00"），需要添加日期部分
    if (typeof value === 'string' && /^\d{1,2}:\d{2}(:\d{2})?(\s?(AM|PM))?$/i.test(value.trim())) {
      // 纯时间格式，添加今天的日期
      const today = dayjs().format('YYYY-MM-DD')
      dayjsInstance = dayjs(`${today} ${value}`)
    } else {
      dayjsInstance = dayjs(value)
    }
    
    return dayjsInstance.isValid() ? dayjsInstance : null
  } catch (error) {
    console.warn('[FieldTimeRange] Invalid time value:', value, error)
    return null
  }
}

// 标准化时间范围值
const normalizedValue = computed(() => {
  if (isRangeEmpty(props.value)) return null
  
  const [startTime, endTime] = props.value as [TimeValue, TimeValue]
  const normalizedStart = normalizeTimeValue(startTime)
  const normalizedEnd = normalizeTimeValue(endTime)
  
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
    console.warn('[FieldTimeRange] Format error:', error)
    return props.emptyText
  }
})

// 计算传递给 TimeRangePicker 的值
const timeRangePickerValue = computed(() => {
  // TimeRangePicker 需要 [Dayjs, Dayjs] 或 undefined
  return normalizedValue.value || undefined
})

// 提取编辑模式下需要透传的属性（包括事件监听器）
const editAttrs = computed(() => {
  return { ...attrs }
})
</script>

<style lang="scss" scoped>
.cool-field-time-range {
  color: inherit;
}
</style> 