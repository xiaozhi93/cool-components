<template>
  <TableRender v-bind="computedTableProps">
    <template #query>
      <FormRender v-bind="search" :columns="columns || []" />
    </template>
    <template #toolbar>
      <ToolbarRender v-bind="toolbar">
        <SettingRender v-bind="settings" />
      </ToolbarRender>
    </template>
  </TableRender>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import TableRender from './components/TableRender.vue'
import { CoolTableProps } from './types'
import FormRender from './components/FormRender.vue'
import ToolbarRender from './components/ToolbarRender.vue'
import SettingRender from './components/SettingRender.vue'
import { onMounted } from 'vue';

const props = withDefaults(defineProps<CoolTableProps<any, any, any>>(), {
})
const attrs = useAttrs()
const computedTableProps = computed(() => {
  return {
    ...props,
    ...attrs
  }
})

const settings = computed(() => {
  return [
  ]
})

onMounted(() => {
  if (props.actionRef) {
    Object.assign(props.actionRef, {
      reload: () => {
        console.log('reload')
      }
    })
  }
})
</script>

<style scoped lang="scss">
</style>