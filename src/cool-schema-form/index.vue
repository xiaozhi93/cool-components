<template>
  <component :is="FormRenderComponents" v-bind="$attrs" :model="formModel">
    <CoolSchemaNode 
      :columns="props.columns"
      :form-model="formModel"
      :context="context"
      :components="components"
    />
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
import { getFieldProp } from "./core"
import CoolSchemaNode from "./components/CoolSchemaNode.vue"
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

defineExpose({
  setFieldsValue,
  getFieldsValue
})
</script>