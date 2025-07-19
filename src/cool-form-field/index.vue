<template>
  <component 
    :is="FieldComponent"
    v-bind="$attrs"
  >
    <!-- 透传所有插槽 -->
    <template v-for="(_, name) in $slots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createTypedField, type FormFieldConfig } from './core/createField'
import { omit } from 'lodash-es'
defineOptions({
  name: 'CoolFormField',
  inheritAttrs: false
})

const props = withDefaults(defineProps<FormFieldConfig>(), {
  mode: 'edit',
  valueType: 'text',
  emptyText: '-',
  disabled: false,
  required: false
})


// 使用工厂函数创建组件
const FieldComponent = computed(() => {
  return createTypedField(props.valueType)({
    ...omit(props, ['valueType'])
  })
})

</script>

<style scoped>
/* 组件样式 */
</style>
