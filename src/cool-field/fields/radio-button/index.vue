<template>
  <!-- 只读模式 -->
  <template v-if="mode === 'read'">
    <slot name="readRender" :value="value" :text="displayText">
      <a-tag 
        :color="displayItem?.color || 'blue'"
        class="cool-field-radio-button"
      >
        {{ displayText }}
      </a-tag>
    </slot>
  </template>

  <!-- 编辑模式 -->
  <template v-else>
    <slot 
      name="editRender" 
      :value="value" 
      :on-change="editAttrs['onUpdate:value']"
    >
      <a-radio-group
        :value="value"
        button-style="solid"
        v-bind="editAttrs"
      >
        <a-radio-button
          v-for="option in computedOptions"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </a-radio-button>

        <!-- 透传其他插槽给底层组件 -->
        <template v-for="(_, name) in editSlots" #[name]="slotProps" :key="name">
          <slot :name="name" v-bind="slotProps || {}" />
        </template>
      </a-radio-group>
    </slot>
  </template>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'
import { RadioGroup as ARadioGroup, RadioButton as ARadioButton, Tag as ATag } from 'ant-design-vue'
import { useRequest } from '../../composables'

interface FieldRadioButtonProps {
  /** 字段值 */
  value?: string | number
  /** 组件模式 */
  mode?: 'read' | 'edit' | 'update'
  /** 空值显示文本 */
  emptyText?: string
  /** 选项配置 */
  options?: Array<{ label: string; value: any; disabled?: boolean }>
  /** 值枚举映射 */
  valueEnum?: Record<string | number, { label: string; value: any; disabled?: boolean; color?: string } | string>
  /** 异步请求函数 */
  request?: (...args: any[]) => Promise<any[]>
  /** 请求参数 */
  params?: Record<string, any>
}

defineOptions({
  name: 'CoolFieldRadioButton',
  inheritAttrs: false
})

const props = withDefaults(defineProps<FieldRadioButtonProps>(), {
  mode: 'read',
  emptyText: '-'
})

const slots = useSlots()
const attrs = useAttrs()

// 异步数据加载
const { data: requestData, loading } = useRequest(props.request, props.params)

// 计算选项
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

// 计算需要透传的插槽
const editSlots = computed(() => {
  if (props.mode === 'read') return {}
  return slots || {}
})

// 计算当前显示项
const displayItem = computed(() => {
  if (props.value === null || props.value === undefined) {
    return null
  }

  // 从选项中查找
  const option = computedOptions.value.find(opt => opt.value == props.value)
  if (option) {
    return option
  }

  // 从 valueEnum 中查找
  if (props.valueEnum && props.valueEnum[props.value]) {
    const enumItem = props.valueEnum[props.value]
    return {
      value: props.value,
      label: typeof enumItem === 'string' ? enumItem : enumItem.label,
      color: typeof enumItem === 'object' ? enumItem.color : undefined
    }
  }

  // 默认返回值本身
  return {
    value: props.value,
    label: String(props.value)
  }
})

// 计算显示文本
const displayText = computed(() => {
  if (props.value === null || props.value === undefined) {
    return props.emptyText
  }

  return displayItem.value?.label || String(props.value)
})

// 计算透传属性
const editAttrs = computed(() => {
  const result: any = { ...attrs }
  
  if (loading.value) {
    result.loading = true
  }

  return result
})
</script>

<style lang="scss" scoped>
.cool-field-radio-button {
  font-size: 12px;
  border-radius: 4px;
  padding: 4px 12px;
}
</style> 