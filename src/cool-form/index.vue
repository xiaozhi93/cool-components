<template>
  <CoolBaseForm layout="vertical" v-bind="$attrs">
    <slot />
    <template #submitter="{ Component }">
      <Component :is="Component" />
    </template>
  </CoolBaseForm>
</template>

<script setup lang="ts">
import CoolBaseForm from '../cool-base-form/index'

defineOptions({
  name: 'CoolForm',
  inheritAttrs: false
})

</script>

<style scoped lang="scss"></style>