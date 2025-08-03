<template>
  <AInput :value="value" v-bind="computedAttrs" />
</template>
<script setup lang="ts">
import { useAttrs, computed, toRefs, unref } from 'vue'
import { Input as AInput } from 'ant-design-vue'
defineOptions({
  name: 'Test',
  inheritAttrs: false
})
const props = defineProps<{
  value?: string
}>()
const attrs = useAttrs()
const computedAttrs = computed(() => {
  // attrs.__v_skip; // 强制依赖追踪（无需实际使用此属性）
  // return { ...attrs };
  // attrs.__v_skip;
  console.log(attrs)
  attrs.test; // 访问属性，强制建立以来追踪
  return { 
    ...attrs 
  };
  // console.log(attrs, 'attrs')
  // return {
  //   ...attrs
  // }
  // return { ...toRefs(attrs) }; // 每个属性转为 ref
  // const refs = toRefs(attrs)
  // return Object.fromEntries(
  //   Object.entries(refs).map(([key, ref]) => [key, unref(ref)]
  // ))
})
</script>
<style scoped>

</style>