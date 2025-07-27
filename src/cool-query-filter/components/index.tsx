import { defineComponent, ref, computed, type VNode } from 'vue'
import { Col as ACol, Row as ARow, FormItem as AFormItem } from 'ant-design-vue'
import { flatFieldItems } from '../core'
import Action from './actions.vue'
import { spanSize } from '../core'

export default defineComponent({
  name: 'QueryFilter',
  inheritAttrs: false,
  props: {
    defaultCollapsed: {
      type: Boolean,
      default: false,
    },
    defaultColsNumber: {
      type: Number,
      default: 24 / spanSize.span * 2, // 2行的数量， 默认一个项占 一个spanSize
    },
  },
  setup(props, { slots }) {
    const collapsed = ref(props.defaultCollapsed)
    const setCollapsed = (value: boolean) => {
      collapsed.value = value
    }
    const offset = computed(() => {
      return collapsed.value ? 0 : 8
    })
    return () => {
      const contentVnodes = slots.default?.() ?? []
      const flatFieldItemsVnodes = flatFieldItems(contentVnodes as VNode[])
      // flatFieldItemsVnodes 计算是否需要隐藏，隐藏添加一个hidden属性直接渲染，不隐藏添加一个show属性，默认true使用ACol组件包裹
      const needCollapse = flatFieldItemsVnodes.length >= props.defaultColsNumber
      let offset = 0
      const totalSize = flatFieldItemsVnodes.length * spanSize.span
      if (totalSize % 24 !== 0) { // 0, 8, 16
        offset = 24 - totalSize % 24 - spanSize.span
      } else {
        offset = 24 - spanSize.span // 最后
      }
      return (
        <ARow gutter={16}>
          {flatFieldItemsVnodes.map((vnode: VNode, index: number) => (
            <ACol span={spanSize.span} key={index}>
              {vnode}
            </ACol>
          ))}
          <ACol span={spanSize.span} offset={offset}>
            <AFormItem label=" " colon={false}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Action collapsed={collapsed.value} onUpdate:collapsed={setCollapsed} needCollapse={needCollapse.value}>
                {slots.actions?.()}
              </Action>
              </div>
            </AFormItem>
          </ACol>
        </ARow>
      )
    }
  }
})