<template>
  <TableRender v-bind="$attrs" :pagination="false" :loading="loading" :data-source="data?.data || $attrs.dataSource || []">
    <template #search>
      <FormRender v-if="search !== false" v-bind="search || {}" />
    </template>
    <template #toolbar>
      <ToolbarRender v-bind="toolbar">
        <template #toolbar>
          <slot name="toolbar" />
        </template>
        <SettingRender v-bind="settings" />
      </ToolbarRender>
    </template>
  </TableRender>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import TableRender from './components/TableRender.vue'
import { CoolTableProps } from './types'
import FormRender from './components/FormRender.vue'
import ToolbarRender from './components/ToolbarRender.vue'
import SettingRender from './components/SettingRender.vue'
import { useCoolTable } from './provider'
import { useFetchData } from './composables/useFetchData'
const props = withDefaults(defineProps<CoolTableProps<any, any, any>>(), {
  search: undefined,
})

const settings = computed(() => {
  return [
  ]
})
const action = useFetchData({
  request: props.request as any,
  requestOptions: props.requestOptions as any,
})
const { data, loading, total, current, pageSize } = action
useCoolTable(props, {
  action: {
    ...action,
    fullScreen: () => {},
  } as any,
})
</script>

<style scoped lang="scss">
</style>