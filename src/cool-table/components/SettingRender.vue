<template>
  <div class="cool-table-setting">
    <a-tooltip title="刷新">
      <ReloadOutlined @click="handleReload" />
    </a-tooltip>
    <ColumnSetting
      :columns="columns"
      :columns-map="columnsMap"
    />
  </div>
</template>

<script setup lang="ts">
import type { ListToolBarProps } from '../types/toolbar'
import { Tooltip as ATooltip } from 'ant-design-vue'
import { ReloadOutlined } from '@ant-design/icons-vue'
import ColumnSetting from './ColumnSetting/index.vue'
import { useCoolTableContext } from '../provider';

const props = defineProps<ListToolBarProps>()

const { columns, columnsMap } = useCoolTableContext()

const emit = defineEmits<{
  'reload': []
  'columns-change': [columnsMap: Record<string, any>]
  'reset': []
}>()

// 处理刷新
const handleReload = () => {
  emit('reload')
}

</script>

<style scoped lang="scss">
.cool-table-setting {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #666;
  }
}
</style>