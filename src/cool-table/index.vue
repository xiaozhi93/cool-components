<template>
  <TableRender v-bind="$attrs">
    <template #search>
      <FormRender v-bind="search" :columns="columns || []" />
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
import { useCoolTable, ActionType } from './provider'
const props = withDefaults(defineProps<CoolTableProps<any, any, any>>(), {
})

const settings = computed(() => {
  return [
  ]
})
// 设置actionRef
const actionRef = ref<ActionType | undefined>(undefined)
const { setAction } = useCoolTable(props)
setAction(actionRef.value)
</script>

<style scoped lang="scss">
</style>