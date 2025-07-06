<template>
  <template v-if="mode === 'read'">
    <slot name="readRender" :value="value" :text="displayText">
      <span class="cool-field-time">{{ displayText }}</span>
    </slot>
  </template>

  <template v-else>
    <slot 
      name="editRender" 
      :value="value" 
      :on-change="editAttrs['onUpdate:value']"
    >
      <!-- 时间选择器 -->
      <a-time-picker
        :value="timePickerValue"
        :format="displayFormat"
        v-bind="editAttrs"
      >
        <!-- 透传其他插槽给底层组件 -->
        <template v-for="(_, name) in editSlots" #[name]="slotProps" :key="name">
          <slot :name="name" v-bind="slotProps" />
        </template>
      </a-time-picker>
    </slot>
  </template>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'
import { TimePicker as ATimePicker } from 'ant-design-vue'
import dayjs, { type Dayjs } from 'dayjs'

// 支持的时间值类型
type TimeValue = string | number | Date | Dayjs | null | undefined

interface FieldTimeProps {
  /** 时间值：可以是字符串、时间戳、Date对象、Dayjs对象等 */
  value?: TimeValue
  mode?: 'read' | 'edit' | 'update'
  emptyText?: string
  // 时间相关配置
  format?: string
  use12Hours?: boolean
}

defineOptions({
  name: 'CoolFieldTime',
  inheritAttrs: false
})

const props = withDefaults(defineProps<FieldTimeProps>(), {
  mode: 'read',
  emptyText: '-',
  use12Hours: false,
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

// 检查值是否为空
const isEmpty = (value: TimeValue): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && value.trim() === '') return true
  return false
}

// 标准化时间值 - 将各种类型转换为 Dayjs 对象
const normalizedValue = computed(() => {
  if (isEmpty(props.value)) return null
  
  try {
    let dayjsInstance: Dayjs
    
    // 如果是纯时间字符串（如 "14:30:00"），需要添加日期部分
    if (typeof props.value === 'string' && /^\d{1,2}:\d{2}(:\d{2})?(\s?(AM|PM))?$/i.test(props.value.trim())) {
      // 纯时间格式，添加今天的日期
      const today = dayjs().format('YYYY-MM-DD')
      dayjsInstance = dayjs(`${today} ${props.value}`)
    } else {
      dayjsInstance = dayjs(props.value)
    }
    
    return dayjsInstance.isValid() ? dayjsInstance : null
  } catch (error) {
    console.warn('[FieldTime] Invalid time value:', props.value, error)
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
    console.warn('[FieldTime] Format error:', error)
    return String(props.value) || props.emptyText
  }
})

// 计算传递给 TimePicker 的值
const timePickerValue = computed(() => {
  // TimePicker 需要 Dayjs 对象或 undefined
  return normalizedValue.value || undefined
})

// 提取编辑模式下需要透传的属性（包括事件监听器）
const editAttrs = computed(() => {
  return { ...attrs }
})
</script>

<style lang="scss" scoped>
.cool-field-time {
  color: inherit;
}
</style> 