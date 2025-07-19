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
  mode: 'edit',
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
  return render(
    props.value,
    props.valueType,
    {
      mode: props.mode,
      emptyText: props.emptyText,
      ...attrs
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