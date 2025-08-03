<template>
  <template v-if="mode === 'read'">
    <slot name="readRender" :value="value" :text="displayText">
      <span class="cool-field-money">{{ displayText }}</span>
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
import { formatters, type MoneyFormatOptions } from '../../utils/formatters'

interface FieldMoneyProps {
  value?: number | string
  mode?: 'read' | 'edit' | 'update'
  emptyText?: string
  // 金额格式化选项
  precision?: number
  symbol?: string
  showSymbol?: boolean
  thousand?: boolean
  invalidText?: string
}

defineOptions({
  name: 'CoolFieldMoney',
  inheritAttrs: false
})

const props = withDefaults(defineProps<FieldMoneyProps>(), {
  mode: 'read',
  emptyText: '-',
  precision: 2,
  symbol: '¥',
  showSymbol: true,
  thousand: true
})

const slots = useSlots()
const attrs = useAttrs()

// 计算需要透传的插槽（排除特殊插槽）
const editSlots = computed(() => {
  if (props.mode === 'read') return {}
  
  return slots || {}
})

// 计算格式化选项
const formatOptions = computed((): MoneyFormatOptions => ({
  precision: props.precision,
  symbol: props.symbol,
  showSymbol: props.showSymbol,
  thousand: props.thousand,
  invalidText: props.invalidText || props.emptyText
}))

// 计算显示文本
const displayText = computed(() => {
  if (props.value === null || props.value === undefined) {
    return props.emptyText
  }
  
  // 使用新的格式化函数
  return formatters.money(props.value, formatOptions.value)
})

// 提取编辑模式下需要透传的属性（包括事件监听器）
const editAttrs = computed(() => {
  attrs._track; // 访问属性，强制建立以来追踪
  // 从 attrs 中获取所有属性，包含了事件监听器
  const result: any = { 
    ...attrs,
    precision: props.precision,
  }
  
  // 对于输入框，可以添加前缀
  if (props.showSymbol && props.symbol) {
    result.addonBefore = props.symbol
  }
  
  return result
})
</script>

<style lang="scss" scoped>
.cool-field-money {
  color: inherit;
  font-variant-numeric: tabular-nums;
  font-weight: 500;
}
</style> 