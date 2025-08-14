<template>
  <div class="cool-table">
    <div class="cool-table-query">
      <slot name="query" />
    </div>
    <slot name="toolbar"></slot>
    <slot name="alert"></slot>
    <a-table
      v-bind="computedTableProps"
    />
  </div>
</template>

<script setup lang="ts" generic="T, U, ValueType">
import { computed } from 'vue';
import type { CoolTableProps } from '../types/index';
import { Table as ATable } from 'ant-design-vue';

// 表格支持是否可编辑，如果可编辑，则需要cool-form包裹
const props = defineProps<CoolTableProps<T, U, ValueType>>()

const computedTableProps = computed(() => {
  return {
    ...props
  }
})
</script>

<style scoped lang="scss">
</style>  