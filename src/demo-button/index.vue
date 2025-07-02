<template>
  <button class="demo-button" :style="buttonStyle">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  color?: string;
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
});

// 计算按钮样式
const buttonStyle = computed(() => {
  const style: Record<string, string> = {};
  
  if (props.color) {
    style.backgroundColor = props.color;
  }
  
  return style;
});
</script>

<style lang="scss">
.demo-button {
  min-width: 120px;
  color: #fff;
  font-size: 16px;
  line-height: 36px;
  background-color: #f44;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:active {
    transform: scale(0.98);
  }
}
</style>
