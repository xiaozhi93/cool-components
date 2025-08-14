<template>
  <div>
    <slot v-bind="props" />
  </div>
</template>

<script setup lang="ts">
import type { ListToolBarProps } from '../types/toolbar'

const props = defineProps<ListToolBarProps>()
</script>

<style scoped lang="scss">

</style>