<template>
  <ColWrapper v-bind="colProps">
    <div class="cool-form-list">
      <RowWrapper>
        <slot :list="innerValue" :actions="actions" />
      </RowWrapper>
    </div>
  </ColWrapper>
</template>

<script setup lang="ts">
import type { CoolFormListProps } from './types';
import { useGridHelpers } from '../cool-form-field/utils/grid';
import { computed } from 'vue';

const props = withDefaults(defineProps<CoolFormListProps>(), {
  grid: false,
  rowProps: () => ({ gutter: 16 }),
  colProps: () => ({ span: 24 }),
})
const { RowWrapper, ColWrapper } = useGridHelpers({ grid: props.grid, rowProps: props.rowProps });
const innerValue = defineModel<any[]>('value', { required: true, default: () => [] }); // 内置数据

const actions = computed(() => {
  return {
    add: () => {
      innerValue.value.push({})
    }
  }
})
</script>

<style scoped lang="scss">
.cool-form-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>