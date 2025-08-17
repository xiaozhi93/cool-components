<template>
  <div class="cool-table-search">
    <CoolSchemaForm layout-type="CoolQueryFilter" v-bind="search" :onFinish="onFinish" :onReset="onReset" :columns="formColumns" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CoolSchemaForm from '../../cool-schema-form/index.vue'
import type { SearchConfig } from '../types/form'
import { genProColumnsToFormColumns } from '../core'
import { useCoolTableContext } from '../provider'

const { columns, actionRef: { run, current, pageSize } } = useCoolTableContext()

defineProps<{
  search?: SearchConfig
}>()

const formColumns = computed(() => {
  return genProColumnsToFormColumns(columns || []) as any
})

const onFinish = (values: any) => {
  // current.value = 1
  run({
    ...values,
    current: 1,
    pageSize: pageSize.value,
    ...values
  })
}

const onReset = (values: any) => {
  run({
    ...values,
    current: 1,
    pageSize: pageSize.value,
  })
}
</script>

<style scoped>
.cool-table-search {
  padding: 16px 0;
}
</style>