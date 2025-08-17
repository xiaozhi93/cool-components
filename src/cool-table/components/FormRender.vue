<template>
  <div class="cool-table-search">
    <CoolSchemaForm layout-type="CoolQueryFilter" v-bind="search" :columns="formColumns" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CoolSchemaForm from '../../cool-schema-form/index.vue'
import type { SearchConfig } from '../types/form'
import type { ProColumns } from '../types'
import { genProColumnsToFormColumns } from '../core'

const props = defineProps<{
  search?: SearchConfig
  columns: ProColumns<any>[]
}>()

const formModel = ref<Record<string, any>>({})

const formColumns = computed(() => {
  return genProColumnsToFormColumns(props.columns)
})
</script>

<style scoped>
.cool-table-search {
  padding: 16px 0;
}
</style>