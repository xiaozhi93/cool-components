<template>
  <div class="cool-table-toolbar">
    <div class="cool-table-toolbar-container">
      <div class="cool-table-toolbar-left">
        左边菜单
      </div>
      <div class="cool-table-toolbar-right">
        <slot name="toolbar" />
        <slot v-bind="props" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ListToolBarProps } from '../types/toolbar'

const props = defineProps<ListToolBarProps>()
</script>

<style scoped lang="scss">
.cool-table-toolbar {
  .cool-table-toolbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 16px;
    padding-inline: 0;
  }
  .cool-table-toolbar-left {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    justify-content: flex-start;
    max-width: calc(100% - 200px);
  }
  .cool-table-toolbar-right {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
  }
}
</style>