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
import { createField, type FormFieldConfig } from './core/createField'
defineOptions({
  name: 'CoolFormField',
  inheritAttrs: false
})

const props = withDefaults(defineProps<{
  valueType: FormFieldConfig['valueType']
}>(), {
  valueType: 'text',
})


// 使用工厂函数创建组件
const FieldComponent = computed(() => {
  return createField({
    valueType: props.valueType
  })
})

</script>

<style scoped>
/* 组件样式 */
</style>
