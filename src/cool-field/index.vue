<template>
  <component 
    :is="renderedComponent"
    v-bind="componentProps"
  >
    <!-- 特殊插槽单独处理 -->
    <template v-if="$slots.readRender && mode === 'read'" #readRender="slotProps">
      <slot name="readRender" v-bind="slotProps" />
    </template>
    
    <template v-if="$slots.editRender && mode !== 'read'" #editRender="slotProps">
      <slot name="editRender" v-bind="slotProps" />
    </template>
    
    <!-- 其他插槽在 edit/update 模式下透传 -->
    <template 
      v-for="(_, name) in otherSlots" 
      #[name]="slotProps"
      :key="name"
    >
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { render } from './core'
import omit from 'lodash-es/omit'
import type { CoolFieldProps } from './types'

defineOptions({
  name: 'CoolField',
  inheritAttrs: false
})


// 定义组件 props
const props = withDefaults(defineProps<CoolFieldProps>(), {
  mode: 'read',
  valueType: 'text',
  emptyText: '-'
})

// 获取 attrs 和 slots
const attrs = useAttrs()
const slots = useSlots()

// 计算需要透传的插槽（排除特殊插槽）
const otherSlots = computed(() => {
  if (props.mode === 'read') return {}
  return omit(slots || {}, ['readRender', 'editRender'])
})

// 计算渲染组件和属性
const renderResult = computed(() => {
  // 如果是选择器，在只读模式，则透传 options, valueEnum, request, params
  let readAttrs = {}
  if (props.mode === 'read' && (props.valueType === 'select' || props.valueType === 'checkbox' || props.valueType === 'radio' || props.valueType === 'radioButton' || props.valueType === 'cascader')) {
    readAttrs = {
      options: attrs.options || [],
      valueEnum: attrs.valueEnum || {},
      request: attrs.request,
      params: attrs.params || {},
    }
  }
  return render(
    props.value,
    props.valueType,
    {
      mode: props.mode,
      emptyText: props.emptyText,
      // 在 edit/update 模式下透传 attrs（包括事件监听器）
      ...(props.mode !== 'read' ? attrs : readAttrs)
    }
  )
})

const renderedComponent = computed(() => renderResult.value.renderedComponent)
const componentProps = computed(() => renderResult.value.componentProps)
</script>

<style scoped>
:global(.cool-field-empty) {
  color: rgba(0, 0, 0, 0.25);
  font-style: italic;
}
</style> 