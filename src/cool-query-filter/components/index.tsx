import { defineComponent, type VNode } from 'vue'
import { Col as ACol, Row as ARow } from 'ant-design-vue'
import { flatFieldItems } from '../core'

export default defineComponent({
  name: 'QueryFilter',
  inheritAttrs: false,
  setup(props, { slots }) {
    return () => {
      const contentVnodes = slots.default?.() ?? []
      const flatFieldItemsVnodes = flatFieldItems(contentVnodes as VNode[])
      return (
        <ARow gutter={16}>
          {flatFieldItemsVnodes.map((vnode: VNode, index: number) => (
            <ACol span={8} key={index}>
              {vnode}
            </ACol>
          ))}
        </ARow>
      )
    }
  }
})