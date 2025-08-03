<template>
  <div class="form-canvas">
    <cool-base-form>
      <draggable 
        class="form-canvas-content"
          :list="designer.schema" 
          group="control" 
          item-key="key"
          @add="handleAdd"
        >
          <template #item="{ element }">
            <div 
              class="control-item"
            >
              <WithActionFormItem v-bind="element" :key="element.key" :id="element.key" />
            </div>
          </template>
        </draggable>
    </cool-base-form>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import coolBaseForm from '../../../cool-base-form/index';
import WithActionFormItem from '../WithActionFormItem/index.vue';
import { useDesignerContext } from '../../hooks/useDesigner';

const { designer, selectItem } = useDesignerContext();

const handleAdd = (evt: any) => {
  const newIndex = evt.newIndex;
  if (!!designer.schema[newIndex]) {
    selectItem(designer.schema[newIndex]);
  }
};
</script>

<style lang="scss" scoped>
.form-canvas-content {
  height: 60vh;
  overflow-y: auto;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>