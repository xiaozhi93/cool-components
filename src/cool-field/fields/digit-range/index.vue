<template>
  <!-- 只读模式 -->
  <template v-if="mode === 'read'">
    <slot name="readRender" :value="value" :text="displayText">
      <span class="cool-digit-range-field">{{ displayText }}</span>
    </slot>
  </template>

  <!-- 编辑模式 -->
  <template v-else>
    <slot name="editRender" :value="value" :on-change="handleRangeChange">
      <div class="cool-digit-range-input-group">
        <!-- 最小值输入 -->
        <a-input-number
          :value="minValue"
          v-bind="minInputAttrs"
          class="cool-digit-range-min"
        />
        
        <!-- 分隔符 -->
        <span class="cool-digit-range-separator">{{ separator }}</span>
        
        <!-- 最大值输入 -->
        <a-input-number
          :value="maxValue"
          v-bind="maxInputAttrs"
          class="cool-digit-range-max"
        />
      </div>
    </slot>
  </template>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { InputNumber as AInputNumber } from 'ant-design-vue'
import type { CoolFieldMode } from '../../types'

defineOptions({
  name: 'CoolDigitRangeField',
  inheritAttrs: false
})

interface CoolDigitRangeFieldProps {
  /** 字段值 - 核心功能属性 [min, max] */
  value?: [number, number] | null | undefined
  /** 组件模式 - 需要默认值 */
  mode?: CoolFieldMode
  /** 空值显示文本 - 需要默认值 */
  emptyText?: string
  /** 分隔符 - 组件功能扩展属性 */
  separator?: string
  /** 最小值占位符 - 组件功能扩展属性 */
  minPlaceholder?: string
  /** 最大值占位符 - 组件功能扩展属性 */
  maxPlaceholder?: string
  /** 是否验证区间有效性 - 组件功能扩展属性 */
  validateRange?: boolean
}

const props = withDefaults(defineProps<CoolDigitRangeFieldProps>(), {
  mode: 'read',
  emptyText: '-',
  separator: ' ~ ',
  minPlaceholder: '最小值',
  maxPlaceholder: '最大值',
  validateRange: true
})

const attrs = useAttrs()

// 计算当前的最小值和最大值
const minValue = computed<any>(() => {
  if (!Array.isArray(props.value) || props.value.length < 2) {
    return undefined
  }
  return props.value[0]
})

const maxValue = computed(() => {
  if (!Array.isArray(props.value) || props.value.length < 2) {
    return undefined
  }
  return props.value[1]
})

// 显示文本计算
const displayText = computed(() => {
  if (!Array.isArray(props.value) || props.value.length < 2) {
    return props.emptyText
  }
  
  const [min, max] = props.value
  if (min === undefined || min === null || max === undefined || max === null) {
    return props.emptyText
  }
  
  return `${Math.floor(min)}${props.separator}${Math.floor(max)}`
})

// 计算透传给最小值输入框的属性
const minInputAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { 'onUpdate:value': _, onChange: __,  ...rest } = attrs

  return {
    ...rest,
    placeholder: props.minPlaceholder,
    parser: (value: string) => value.replace(/\D/g, ''), // 只允许整数
    precision: 0, // 确保是整数
    max: props.validateRange && maxValue.value !== undefined ? maxValue.value : undefined,
    'onUpdate:value': (value: any) => {
      handleMinChange(value)
    }
  }
})

// 计算透传给最大值输入框的属性
const maxInputAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { 'onUpdate:value': _, onChange: __, ...rest } = attrs

  return {
    ...rest,
    placeholder: props.maxPlaceholder,
    parser: (value: string) => value.replace(/\D/g, ''), // 只允许整数
    precision: 0, // 确保是整数
    min: props.validateRange && minValue.value !== undefined ? minValue.value : undefined,
    'onUpdate:value': (value: any) => {
      handleMaxChange(value)
    }
  }
})

// 处理最小值变化
const handleMinChange = (value: number) => {
  const newValue: [number, number] = [value, maxValue.value ?? value]
  emitChange(newValue)
}

// 处理最大值变化
const handleMaxChange = (value: number) => {
  const newValue: [number, number] = [minValue.value ?? value, value]
  emitChange(newValue)
}

// 处理区间变化
const handleRangeChange = (value: [number, number]) => {
  emitChange(value)
}

// 发出变化事件
const emitChange = (value: [number, number]) => {
  // 确保都是整数
  const intValue: [number, number] = [
    Math.floor(value[0] || 0),
    Math.floor(value[1] || 0)
  ]
  
  // 验证区间有效性
  if (props.validateRange && intValue[0] > intValue[1]) {
    // 如果最小值大于最大值，自动调整
    intValue[1] = intValue[0]
  }
  
  // 透传事件
  const updateValueFn = attrs['onUpdate:value'] as ((value: [number, number]) => void) | undefined
  const changeFn = attrs.onChange as ((value: [number, number]) => void) | undefined
  
  updateValueFn?.(intValue)
  changeFn?.(intValue)
}
</script>

<style lang="scss" scoped>
.cool-digit-range-field {
  display: inline-block;
}

.cool-digit-range-input-group {
  display: flex;
  align-items: center;
  gap: 8px;
  
  .cool-digit-range-min,
  .cool-digit-range-max {
    flex: 1;
    min-width: 80px;
  }
  
  .cool-digit-range-separator {
    color: #666;
    font-size: 14px;
    white-space: nowrap;
    user-select: none;
  }
}
</style> 