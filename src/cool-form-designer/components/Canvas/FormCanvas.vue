<template>
  <div class="form-canvas">
    <cool-base-form>
      <draggable 
        class="form-canvas-content"
          :list="designer.schema" 
          group="control" 
          item-key="key"
        >
          <template #item="{ element }">
            <div 
              class="control-item"
              :class="{ 'selected': isSelected(element.key) }"
              @click="handleItemClick(element)"
            >
              <CoolFormField 
                :name="element.name" 
                :label="element.label" 
                :valueType="element.type" 
              />
            </div>
          </template>
        </draggable>
    </cool-base-form>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import coolBaseForm from '../../../cool-base-form/index';
import CoolFormField from '../../../cool-form-field/index';
import { useDesignerContext, type FormItem } from '../../hooks/useDesigner';

const { designer, selectItem } = useDesignerContext();

const isSelected = (key: string): boolean => {
  return designer.selectedKey === key;
};

const handleItemClick = (item: FormItem) => {
  selectItem(item);
};
</script>

<style lang="scss" scoped>
.form-canvas-content {
  height: 60vh;
  overflow-y: auto;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;

  .control-item {
    display: flex;
    margin-bottom: 8px;
    padding: 8px;
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      border-color: #d9d9d9;
      background-color: #fafafa;
    }
    
    &.selected {
      border-color: #1890ff;
      background-color: #e6f7ff;
    }
  }
}
</style>