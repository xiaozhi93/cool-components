<template>
  <!-- 只读模式 -->
  <template v-if="mode === 'read'">
    <slot name="readRender" :value="value" :text="displayText">
      <span class="cool-text-field">{{ displayText }}</span>
    </slot>
  </template>

  <!-- 编辑模式 -->
  <template v-else>
    <slot name="editRender" :value="value" :on-change="editAttrs['onUpdate:value']">
      <component
        :is="componentType"
        :value="value"
        v-bind="editAttrs"
        class="cool-text-field"
      >
        <!-- 透传插槽 -->
        <template v-for="(_, name) in editSlots" #[name]="slotProps" :key="name">
          <slot :name="name" v-bind="slotProps || {}" />
        </template>
      </component>
    </slot>
  </template>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'
import { Input } from 'ant-design-vue'
import type { CoolFieldMode } from '../../types'

defineOptions({
  name: 'CoolTextField',
  inheritAttrs: false
})

// ✅ 正确：只定义需要默认值或特殊处理的 Props
interface CoolTextFieldProps {
  /** 字段值 - 核心功能属性 */
  value?: string
  /** 组件模式 - 需要默认值 */
  mode?: CoolFieldMode
  /** 空值显示文本 - 需要默认值 */
  emptyText?: string
  /** 文本类型 - 组件功能扩展属性，决定渲染组件类型 */
  valueType?: 'text' | 'password' | 'textarea'
}

const props = withDefaults(defineProps<CoolTextFieldProps>(), {
  mode: 'read',
  emptyText: '-',
  valueType: 'text'
})

const attrs = useAttrs()
const slots = useSlots()

// 显示文本计算
const displayText = computed(() => {
  if (props.value === undefined || props.value === null || props.value === '') {
    return props.emptyText
  }
  return String(props.value)
})

// 根据valueType确定组件类型
const componentType = computed(() => {
  switch (props.valueType) {
    case 'password':
      return Input.Password
    case 'textarea':
      return Input.TextArea
    default:
      return Input
  }
})

// 计算透传属性
const editAttrs = computed(() => {
  // 从 attrs 中获取所有属性，这里包含了事件监听器
  return attrs
})


// 计算插槽透传
const editSlots = computed(() => {
  if (props.mode === 'read') return {}
  return slots || {}
})
</script>

<style lang="scss" scoped>
.cool-text-field {
  width: 100%;
}
</style>