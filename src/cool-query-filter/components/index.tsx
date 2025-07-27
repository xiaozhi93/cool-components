import { defineComponent, type VNode } from 'vue'
import { Col as ACol, Row as ARow, Form } from 'ant-design-vue'
import { flatFieldItems } from '../core'
import Action from './actions.vue'

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
          <ACol span={8}>
            <Form.Item label=" " colon={false} noStyle>
              <Action>
                {slots.actions?.()}
              </Action>
            </Form.Item>
          </ACol>
        </ARow>
      )
    }
  }
})