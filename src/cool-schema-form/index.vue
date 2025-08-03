<template>
  <component :is="FormRenderComponents" v-bind="$attrs" :model="formModel">
    <template v-for="item in props.columns" :key="item.name">
      <component 
        :is="getComponent(item.component)" 
        v-if="item.valueType === 'custom' && getFieldProp(item, 'visible', formModel) !== false" 
        :name="item.name"
        v-bind="getFieldProps(item, formModel, context)" 
        v-model:value="formModel[item.name]" 
      />
      <CoolFormField 
        v-else 
        v-if="getFieldProp(item, 'visible', formModel) !== false" 
        :name="item.name" 
        v-bind="getFieldProps(item, formModel, context)" 
        v-model:value="formModel[item.name]" 
      />
    </template>
    <template v-for="(_, name) in otherSlots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, reactive, watch, useAttrs, useSlots } from "vue"
import type { CoolSchemaFormProps, FormLayoutType, CoolFormColumnsType } from "./types"
import { SchemaFormLayout } from "./core"
import { omit } from "lodash-es"
import CoolFormField from "../cool-form-field/index"
import { getFieldProp, getFieldProps } from "./core"
import type { Component } from "vue"
defineOptions({
  name: "CoolSchemaForm",
  inheritAttrs: false
})
const attrs = useAttrs()
const slots = useSlots()
const props = withDefaults(defineProps<CoolSchemaFormProps>(), {
  layoutType: 'CoolForm',
  columns: () => [] as CoolFormColumnsType[], // 渲染之前就需要有
  components: () => ({})
})

const formModel = reactive<Record<string, any>>({
})
const FormRenderComponents = computed(() => {
  return SchemaFormLayout[props.layoutType as FormLayoutType]
})

// 监听columns变化，更新formModel
watch(() => props.columns, () => {
  if(props.columns?.length > 0) {
    props.columns.forEach(item => {
      formModel[item.name] = getFieldProp(item, 'initialValue', {}, props.context)
    })
  }
}, {
  immediate: true
})
const getFieldsValue = () => {
  return formModel
}
const setFieldsValue = (values: any) => {
  Object.assign(formModel, values)
}

// 其他插槽
const otherSlots = computed(() => {
  return omit(slots, ['default']) || {}
})

// 获取组件函数，支持字符串和组件对象
const getComponent = (component: Component | string | undefined): Component | string => {
  if (!component) return ''
  
  // 如果是字符串，从注册的组件中查找
  if (typeof component === 'string') {
    // 优先从 props.components 中查找
    if (props.components && props.components[component]) {
      return props.components[component]
    }
    // 如果没找到，返回原字符串，Vue 会自动从全局注册的组件中查找
    return component
  }
  
  // 如果是组件对象，直接返回
  return component
}

defineExpose({
  setFieldsValue,
  getFieldsValue
})
</script>