<template>
  <div class="canvas-toolbar">
    <a-button-group>
      <a-button @click="$emit('undo')">撤销</a-button>
      <a-button @click="$emit('redo')">重做</a-button>
    </a-button-group>
    <a-button-group>
      <a-button @click="$emit('preview')">预览</a-button>
      <a-button @click="$emit('export')">导出</a-button>
    </a-button-group>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  undo: [];
  redo: [];
  preview: [];
  export: [];
}>();
</script> 