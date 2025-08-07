<template>
  <ColWrapper v-bind="colProps">
    <div class="cool-form-list">
      <RowWrapper>
        <slot :list="innerValue" :actions="actions" />
      </RowWrapper>
      <a-button type="dashed" style="width: 60%" @click="actions.add">
        <PlusOutlined />
        添加一项
      </a-button>
    </div>
  </ColWrapper>
</template>

<script setup lang="ts">
import type { CoolFormListProps } from './types';
import { useGridHelpers } from '../cool-form-field/utils/grid';
import { computed } from 'vue';
import { Button as AButton } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';

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
      // innerValue.value.push({})
      innerValue.value = [
        ...innerValue.value,
        {}
      ]
    },
    remove: (index: number) => {
      // innerValue.value.splice(index, 1)
      innerValue.value = innerValue.value.filter((_, i) => i !== index)
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