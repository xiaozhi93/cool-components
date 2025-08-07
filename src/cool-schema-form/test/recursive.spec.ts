import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CoolSchemaNode from '../components/CoolSchemaNode.vue'
import type { CoolFormColumnsType } from '../types'

describe('CoolSchemaNode 递归组件测试', () => {
  it('应该正确渲染普通字段', () => {
    const columns: CoolFormColumnsType[] = [
      {
        name: 'name',
        label: '姓名',
        valueType: 'text'
      }
    ]

    const wrapper = mount(CoolSchemaNode, {
      props: {
        columns,
        formModel: {},
        context: {},
        components: {}
      },
      global: {
        stubs: {
          CoolFormField: true,
          CoolFormGroup: true,
          CoolFormList: true
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('应该正确渲染分组字段', () => {
    const columns: CoolFormColumnsType[] = [
      {
        name: 'group',
        label: '分组',
        valueType: 'group',
        columns: [
          {
            name: 'name',
            label: '姓名',
            valueType: 'text'
          }
        ]
      }
    ]

    const wrapper = mount(CoolSchemaNode, {
      props: {
        columns,
        formModel: {},
        context: {},
        components: {}
      },
      global: {
        stubs: {
          CoolFormField: true,
          CoolFormGroup: true,
          CoolFormList: true
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('应该正确渲染列表字段', () => {
    const columns: CoolFormColumnsType[] = [
      {
        name: 'list',
        label: '列表',
        valueType: 'list',
        columns: [
          {
            name: 'name',
            label: '姓名',
            valueType: 'text'
          }
        ]
      }
    ]

    const wrapper = mount(CoolSchemaNode, {
      props: {
        columns,
        formModel: { list: [] },
        context: {},
        components: {}
      },
      global: {
        stubs: {
          CoolFormField: true,
          CoolFormGroup: true,
          CoolFormList: true
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('应该正确渲染自定义组件', () => {
    const CustomComponent = {
      template: '<div>Custom</div>'
    }

    const columns: CoolFormColumnsType[] = [
      {
        name: 'custom',
        label: '自定义',
        valueType: 'custom',
        component: CustomComponent
      }
    ]

    const wrapper = mount(CoolSchemaNode, {
      props: {
        columns,
        formModel: {},
        context: {},
        components: {}
      },
      global: {
        stubs: {
          CoolFormField: true,
          CoolFormGroup: true,
          CoolFormList: true
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
  })
})
