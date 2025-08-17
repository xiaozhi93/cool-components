<template>
  <div class="cool-table">
    <div class="cool-table-query">
      <slot name="search" />
    </div>
    <slot name="toolbar"></slot>
    <slot name="alert"></slot>
    <a-table
      v-bind="$attrs"
      :columns="columns"
    />
  </div>
</template>

<script setup lang="ts" generic="T, U, ValueType">
import { computed } from 'vue';
import type { CoolTableProps } from '../types/index';
import { Table as ATable } from 'ant-design-vue';
import { useCoolTableContext } from '../provider';
// 表格支持是否可编辑，如果可编辑，则需要cool-form包裹
const props = defineProps<Omit<CoolTableProps<T, U, ValueType>, 'columns'>>()

const { columns: propsColumns, columnsMap } = useCoolTableContext()

const columns = computed(() => {
  const loopFilter = (column: any[]): any[] => {
      return column
        .map((item) => {
          // 删掉不应该显示的
          const columnKey = item.key || item.dataIndex || `column-${item.index}`;
          const config = columnsMap[columnKey as string];
          if (config && config.show === false) {
            return false;
          }
          if (item.children) {
            return {
              ...item,
              children: loopFilter(item.children),
            };
          }
          return item;
        })
        .filter(Boolean);
    };
    return loopFilter(propsColumns || []);
})
</script>

<style scoped lang="scss">
</style>  