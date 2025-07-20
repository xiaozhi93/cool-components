<template>
  <CoolBaseForm layout="vertical" v-bind="$attrs">
    <slot />
  </CoolBaseForm>
</template>

<script setup lang="ts">
import CoolBaseForm from '../cool-base-form/index.vue'

defineOptions({
  name: 'CoolForm',
  inheritAttrs: false
})

</script>

<style scoped lang="scss"></style>