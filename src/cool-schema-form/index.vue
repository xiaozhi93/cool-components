<template>
  <component :is="FormRenderComponents" v-bind="formProps" :model="formModel">
    <template v-for="item in props.columns" :key="item.name">
      <CoolFormField :key="item.name" v-if="getFieldProp(item, 'visible', formModel) !== false" :name="item.name" v-bind="getFieldProps(item, formModel)" v-model:value="formModel[item.name]" />
    </template>
    <template v-for="(_, name) in otherSlots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, reactive, watch, useAttrs, useSlots } from "vue"
import type { CoolSchemaFormProps, FormLayoutType } from "./types"
import { SchemaFormLayout } from "./core"
import { omit } from "lodash-es"
import CoolFormField from "../cool-form-field/index"
import { getFieldProp, getFieldProps } from "./core"
defineOptions({
  name: "CoolSchemaForm",
  inheritAttrs: false
})
const attrs = useAttrs()
const slots = useSlots()
const props = withDefaults(defineProps<CoolSchemaFormProps>(), {
  layoutType: 'CoolForm',
  columns: () => [] // 渲染之前就需要有
})

const formProps = computed(() => {
  return {
    ...attrs,
  }
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
      formModel[item.name] = item.initialValue
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

defineExpose({
  setFieldsValue,
  getFieldsValue
})
</script>