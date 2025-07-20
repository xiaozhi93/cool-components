<template>
  <component :is="FormRenderComponents" v-bind="formProps" :model="formModel">
    <template #default>
      <component :is="FormItemComponents"></component>
    </template>
    <template v-for="(_, name) in otherSlots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, h, Fragment, reactive, watch, useAttrs, type VNode, useSlots } from "vue"
import type { CoolSchemaFormProps, FormLayoutType } from "./types"
import { SchemaFormLayout } from "./core"
import { genFormItems } from "./valueType"
import { omit } from "lodash-es"
defineOptions({
  name: "CoolSchemaForm",
  inheritAttrs: false
})
const attrs = useAttrs()
const slots = useSlots()
const props = withDefaults(defineProps<CoolSchemaFormProps>(), {
  layoutType: 'CoolForm',
  columns: () => []
})

const formProps = computed(() => {
  return {
    ...attrs,
  }
})
const formModel = reactive<Record<string, any>>({})
const FormRenderComponents = computed(() => {
  return SchemaFormLayout[props.layoutType as FormLayoutType]
})

// 表单项组件
const FormItemComponents = computed(() => {
  let formItemNodes: VNode[] = []
  formItemNodes = genFormItems(props.columns)
  return () => h(Fragment, formItemNodes)
})

// 监听columns变化，更新formModel
watch(props.columns, () => {
  if(props.columns?.length > 0) {
    props.columns.forEach(item => {
      formModel[item.name] = item.initialValue
    })
  }
}, {
  immediate: true
})

const setFormValues = (values: any) => {
  Object.assign(formModel, values)
}

// 其他插槽
const otherSlots = computed(() => {
  return omit(slots, ['default']) || {}
})

defineExpose({
  setFormValues
})
</script>