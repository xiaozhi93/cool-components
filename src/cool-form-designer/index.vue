<template>
  <div class="form-designer">
    <ControlPanel />
    <Canvas />
    <PropertyPanel />
  </div>
</template>

<script setup lang="ts">
import ControlPanel from './components/ControlPanel/index.vue';
import Canvas from './components/Canvas/index.vue';
import PropertyPanel from './components/PropertyPanel/index.vue';
import { useDesigner } from './hooks/useDesigner';

useDesigner();

</script>

<style lang="scss" scoped>
.form-designer {
  display: flex;
  height: 100%;
  background-color: #f5f5f5;

  .control-panel {
    width: 280px;
    background-color: #fff;
    border-right: 1px solid #e8e8e8;
    overflow-y: auto;

    .panel-content {
      padding: 16px;
    }
  }

  .form-canvas {
    flex: 1;
    background-color: #fff;
    margin: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .canvas-toolbar {
      padding: 12px 16px;
      border-bottom: 1px solid #e8e8e8;
      background-color: #fafafa;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .canvas-content {
      padding: 24px;
      min-height: calc(100vh - 200px);
      background-image: 
        linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
      background-size: 20px 20px;
    }
  }

  .property-panel {
    width: 320px;
    background-color: #fff;
    border-left: 1px solid #e8e8e8;
    overflow-y: auto;

    .panel-content {
      padding: 16px;
    }
  }
}
</style> 