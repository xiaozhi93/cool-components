<template>
  <CoolBaseForm ref="baseFormRef" layout="vertical" v-bind="$attrs">
    <template #default="{ Component }">
      <slot />
      <Component :is="Component" />
    </template>
  </CoolBaseForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CoolBaseForm from '../cool-base-form/index'
import { useFormExpose } from '../cool-base-form/composables/useFormExpose'

defineOptions({
  name: 'CoolForm',
  inheritAttrs: false
})

// 创建对 CoolBaseForm 的引用
const baseFormRef = ref<any>()
useFormExpose(baseFormRef)

</script>

<style scoped lang="scss"></style>