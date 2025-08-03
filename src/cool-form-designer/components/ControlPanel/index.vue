<template>
  <div class="control-panel">
    <div class="panel-content">
      <draggable 
        tag="div" 
        :clone="handleControlClone" 
        :list="categories" 
        item-key="type" 
        class="control-list" 
        handle=".control-item" 
        :group="{ name: 'control', pull: 'clone', put: false }" 
        ghost-class="ghost" 
        :sort="false"
      >
        <template #item="{ element }">
          <div class="control-item">
            <component :is="element.icon" />
            <span>{{ element.title }}</span>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import draggable from "vuedraggable";
import { baseControl } from '../../core/control';
import {  type FormItem } from '../../hooks/useDesigner';

const categories = ref(baseControl);

const handleControlClone = (control: any): FormItem => {
  const newItem: FormItem = {
    valueType: control.valueType, // 根据这个查找容器组件名称和图标
    key: Date.now().toString(),
    name: control.valueType + Date.now().toString(),
    label: control.title,
    type: control.valueType,
    formItemProps: {
    },
    fieldProps: {}
  };
  return newItem;
};
</script>

<style lang="scss" scoped>
.control-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  height: 100%;
  overflow-y: auto;
  
  .control-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background-color: #fff;
    cursor: grab;
    
    &:active {
      cursor: grabbing;
    }
  }
}
</style>