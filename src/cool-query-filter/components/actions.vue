<template>
  <a-space>
    <slot />
    <a v-if="needCollapse" @click="handleClick">
      <template v-if="collapsed">
        <DownOutlined />
        {{ '展开' }}
      </template>
      <template v-else>
        <UpOutlined />
        {{ '收起' }}
      </template>
    </a>
  </a-space>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Space as ASpace } from 'ant-design-vue';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';

defineProps<{
  needCollapse: boolean
}>()
const collapsed = defineModel<boolean>('collapsed', { default: false })

const handleClick = () => {
  collapsed.value = !collapsed.value
}
</script>
<style scoped>

</style>