<template>
  <div class="control-panel">
    <div class="panel-content">
      <draggable 
        tag="div" 
        :clone="handleControlClone" 
        :list="controls" 
        item-key="valueType" 
        class="control-list" 
        handle=".control-item" 
        :group="{ name: 'control', pull: 'clone', put: false }" 
        ghost-class="ghost" 
        :sort="false"
      >
        <template #item="{ element }">
          <div class="control-item" @dblclick="handleControlDoubleClick(element)">
            <component :is="element.icon" />
            <span>{{ element.title }}</span>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import {  type FormItem, useDesignerContext } from '../../hooks/useDesigner';


const { addItem, controls } = useDesignerContext();

const handleControlClone = (control: any): FormItem => {
  const newItem: FormItem = {
    valueType: control.valueType, // 根据这个查找容器组件名称和图标
    key: Date.now().toString(),
    name: control.valueType + Date.now().toString(),
    label: control.title,
    formItemProps: {
    },
    fieldProps: {}
  };
  // 自定义组件需要特殊处理
  if(control.valueType === 'custom') {
    newItem.component = control.component.name;
  }
  return newItem;
};

const handleControlDoubleClick = (element: any) => {
  const newItem = handleControlClone(element);
  addItem(newItem as any);
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