<template>
  <a-row :gutter="16">
    <component :is="renderCols" />
    <a-col :span="8">
      <Actions />
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { Row as ARow, Col as ACol } from 'ant-design-vue'
import { useSlots, h, type VNode } from 'vue';
import Actions from './actions.vue';
import { flatFieldItems, spanSize } from '../core';

defineOptions({
  name: 'QueryFilterContent',
  inheritAttrs: false
})

const slots = useSlots()
const contentVnodes = slots.default?.() ?? []
const flatFieldItemsVnodes = flatFieldItems(contentVnodes as VNode[])

const renderCols = () => {
  return flatFieldItemsVnodes.map((vnode, index) =>
    h(
      ACol,
      { span: vnode.props?.span || spanSize.span, key: index },
      { default: () => [vnode] }
    )
  )
}
</script>