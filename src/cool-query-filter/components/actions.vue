<template>
  <a-space>
    <slot />
    <a @click="handleClick">展开</a>
  </a-space>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Space as ASpace } from 'ant-design-vue';

const collapsed = ref(false)

const handleClick = () => {
  collapsed.value = !collapsed.value
}
</script>
<style scoped>

</style>