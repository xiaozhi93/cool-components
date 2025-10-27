<template>
  <slot />
</template>

<script setup lang="ts">
import { provideCoolProvider } from './provider'
import type { CoolProviderProps } from './types'

defineOptions({
  name: 'CoolProvider',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CoolProviderProps>(), {
  services: () => ({}),
  utils: () => ({})
})

// 提供上下文
provideCoolProvider(props)
</script>

<style scoped lang="scss"></style>  