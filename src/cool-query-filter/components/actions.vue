<template>
  <a-button type="primary" @click="handleClick">
    展开
    </a-button>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Button as AButton } from 'ant-design-vue';

const collapsed = ref(false)

const handleClick = () => {
  collapsed.value = !collapsed.value
}
</script>
<style scoped>

</style>