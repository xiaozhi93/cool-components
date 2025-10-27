<template>
  <component ref="formRef" :is="FormRenderComponents" v-bind="$attrs" :model="formModel">
    <template v-if="props.columns?.length">
      <CoolSchemaNode 
        v-for="(column, index) in props.columns"
        :key="column.name"
        :column="column"
        :form-model="formModel"
        :context="context"
        :components="components"
      />
    </template>
    <template v-for="(_, name) in otherSlots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, useAttrs, useSlots } from "vue"
import type { CoolSchemaFormProps, FormLayoutType, CoolFormColumnsType } from "./types"
import { SchemaFormLayout } from "./core"
import { omit } from "lodash-es"
import { generateDefaultValues } from "./core"
import CoolSchemaNode from "./components/CoolSchemaNode.vue"
import { useFormExpose } from '../cool-base-form/composables/useFormExpose'

defineOptions({
  name: "CoolSchemaForm",
  inheritAttrs: false
})
const slots = useSlots()
const emit = defineEmits<{
  (e: 'update:value', value: Record<string, any>): void
}>()
// 最好先columns和value有值，然后coolSchemaForm组件才能渲染；
const props = withDefaults(defineProps<CoolSchemaFormProps>(), {
  layoutType: 'CoolForm',
  columns: () => [] as CoolFormColumnsType[], // 渲染之前就需要有
  components: () => ({}),
  context: () => ({}), // 上下文数据,提供给子组件使用，比如请求方法，数据格式化，全局数据等
  value: () => ({})
})

const formModel = reactive<Record<string, any>>(props.value ?? {})
const FormRenderComponents = computed(() => {
  return SchemaFormLayout[props.layoutType as FormLayoutType]
})

// 监听columns变化，更新formModel（最好columns有值，然后coolSchemaForm组件才能渲染）
watch(() => props.columns, () => {
  if(props.columns?.length > 0) {
    Object.assign(formModel, generateDefaultValues(props.columns, props.value ?? {}, props.context ?? {}))
  }
}, {
  immediate: true
})

// 通过属性将值同步到外部
watch(() => formModel, () => {
  emit('update:value', formModel)
}, {
  deep: true
})
// 通过方法获取表单值
const getFieldsValue = () => {
  return formModel
}

// 设置表单值（需要在columns初始化完毕后才能调用，才能覆盖默认值）
const setFieldsValue = (values: any) => {
  Object.assign(formModel, values)
}

// 其他插槽
const otherSlots = computed(() => {
  return omit(slots, ['default']) || {}
})

const formRef = ref<any>()
useFormExpose(formRef, {
  setFieldsValue,
  getFieldsValue
})
</script>