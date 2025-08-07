<template>
  <ColWrapper v-bind="colProps">
  <div class="cool-form-group">
    <div class="cool-form-group-title">
      <slot name="label">
        <span>{{ label }}</span>
      </slot>
    </div>
    <div class="cool-form-group-content">
      <RowWrapper>
        <slot />
      </RowWrapper>
      </div>
    </div>
  </ColWrapper>
</template>

<script setup lang="ts">
import type { CoolFormGroupProps } from './types'
import { useGridHelpers } from '../cool-form-field/utils/grid';

defineOptions({
  name: 'CoolFormGroup',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CoolFormGroupProps>(), {
  label: '',
  tooltip: '',
  collapsible: 'icon',
  defaultCollapsed: false,
  grid: false,
  rowProps: () => ({ gutter: 16 }),
  colProps: () => ({ span: 24 }),
})

const { RowWrapper, ColWrapper } = useGridHelpers({ grid: props.grid, rowProps: props.rowProps });
</script>

<style scoped lang="scss">
.cool-form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>