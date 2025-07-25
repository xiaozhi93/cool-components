import { defineComponent, h, type VNode, computed } from 'vue'
import { Col as ACol } from 'ant-design-vue'
import { flatFieldItems } from '../core'

export default defineComponent({
  name: 'QueryFilter',
  inheritAttrs: false,
  setup(props, { slots }) {
    return () => {
      const contentVnodes = slots.default?.() ?? []
      console.log(contentVnodes, 'contentVnodes')
      const flatFieldItemsVnodes = flatFieldItems(contentVnodes as VNode[])
      console.log(flatFieldItemsVnodes, 'flatFieldItemsVnodes')
      return flatFieldItemsVnodes.map((vnode: VNode) =>
        h(
          ACol,
          { span: 8 },
          { default: () => [vnode] }
        )
      )
    }
  }
})