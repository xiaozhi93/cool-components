<template>
  <template v-if="mode === 'read'">
    <slot name="readRender" :value="value" :text="displayText">
      <span class="cool-field-percent" :class="percentClass" v-html="displayHTML"></span>
    </slot>
  </template>

  <template v-else>
    <slot name="editRender" :value="value" :on-change="editAttrs['onUpdate:value']">
      <a-input-number :value="computedValue" v-bind="editAttrs" style="width: 100%" @update:value="handleValueChange">
        <!-- 后缀插槽 -->
        <template #addonAfter>{{ suffix }}</template>

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
import { formatters, type PercentFormatOptions } from '../../utils/formatters'

interface FieldPercentProps {
  /** 百分比值（0.1234 表示 12.34%） */
  value?: number
  mode?: 'read' | 'edit' | 'update'
  emptyText?: string

  // 百分比格式化选项
  /** 小数位精度，默认 2 */
  precision?: number
  /** 是否显示百分号，默认 true */
  showSymbol?: boolean
  /** 是否显示颜色（正数绿色，负数红色），默认 false */
  showColor?: boolean
  /** 自定义后缀，默认 % */
  suffix?: string
  /** 无效值时的显示文本 */
  invalidText?: string

  // 编辑模式配置
  /** 编辑时的模式：'percent'表示输入12.34代表12.34%，'decimal'表示输入0.1234代表12.34% */
  editMode?: 'percent' | 'decimal'
}

defineOptions({
  name: 'CoolFieldPercent',
  inheritAttrs: false
})

const props = withDefaults(defineProps<FieldPercentProps>(), {
  mode: 'read',
  emptyText: '-',
  precision: 2,
  showSymbol: true,
  showColor: false,
  suffix: '%',
  editMode: 'percent'
})

const slots = useSlots()
const attrs = useAttrs()

// 计算需要透传的插槽（排除特殊插槽）
const editSlots = computed(() => {
  if (props.mode === 'read') return {}

  return slots || {}
})

// 计算格式化选项
const formatOptions = computed((): PercentFormatOptions => ({
  precision: props.precision,
  showSymbol: props.showSymbol,
  showColor: props.showColor,
  suffix: props.suffix,
  invalidText: props.invalidText || props.emptyText
}))

// 计算显示文本（不带HTML）
const displayText = computed(() => {
  if (props.value === null || props.value === undefined) {
    return props.emptyText
  }

  // 使用格式化函数，但不使用HTML
  const options = { ...formatOptions.value, showColor: false }
  return formatters.percent(props.value, options)
})

// 计算显示HTML（可能包含颜色样式）
const displayHTML = computed(() => {
  if (props.value === null || props.value === undefined) {
    return props.emptyText
  }

  // 使用完整的格式化选项，包括颜色
  return formatters.percent(props.value, formatOptions.value)
})

// 计算CSS类
const percentClass = computed(() => {
  if (!props.showColor || props.value === null || props.value === undefined) {
    return ''
  }

  const value = Number(props.value)
  if (isNaN(value)) return ''

  return value > 0 ? 'cool-field-percent--positive' :
    value < 0 ? 'cool-field-percent--negative' :
      'cool-field-percent--zero'
})

// 计算编辑模式下的显示值
const computedValue = computed(() => {
  if (props.value === null || props.value === undefined) {
    return undefined
  }

  const num = Number(props.value)
  if (isNaN(num)) return undefined

  // 根据编辑模式转换值
  return props.editMode === 'percent' ? num * 100 : num
})

// 处理值变更
const handleValueChange = (newValue: any) => {
  if (newValue === null || newValue === undefined) {
    // 通过事件更新父组件的值
    const updateHandler = editAttrs.value['onUpdate:value']
    if (updateHandler) {
      updateHandler(null as any)
    }
    return
  }

  // 根据编辑模式转换值
  const actualValue = props.editMode === 'percent' ? newValue / 100 : newValue

  // 通过事件更新父组件的值
  const updateHandler = editAttrs.value['onUpdate:value']
  if (updateHandler) {
    updateHandler(actualValue)
  }
}

// 提取编辑模式下需要透传的属性（包括事件监听器）
const editAttrs = computed(() => {
  // 从 attrs 中获取所有属性，排除 onUpdate:value（我们需要特殊处理）
  const { 'onUpdate:value': updateValue, ...rest } = attrs as any

  const result: any = {
    ...rest,
    precision: props.precision,
    'onUpdate:value': updateValue, // 保留原始的更新处理器
  }

  return result
})
</script>

<style lang="scss" scoped>
.cool-field-percent {
  color: inherit;
  font-variant-numeric: tabular-nums;
  font-weight: 500;
}

.cool-field-percent--positive {
  color: #52c41a;
}

.cool-field-percent--negative {
  color: #ff4d4f;
}

.cool-field-percent--zero {
  color: #666;
}
</style>