import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CoolField from '../index.vue'

describe('CoolField 组件测试', () => {
  
  describe('基础功能测试', () => {
    it('应该正常渲染', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'read',
          value: 'test value'
        }
      })
      
      expect(wrapper.exists()).toBe(true)
    })

    it('应该支持默认 Props', () => {
      const wrapper = mount(CoolField, {
        props: {
          value: 'test'
        }
      })
      
      expect(wrapper.props('valueType')).toBe('text')
      expect(wrapper.props('mode')).toBe('read')
      expect(wrapper.props('emptyText')).toBe('-')
      expect(wrapper.props('readonly')).toBe(false)
      expect(wrapper.props('disabled')).toBe(false)
    })

    it('应该正确处理空值', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'read',
          value: null
        }
      })
      
      const emptyElement = wrapper.find('.cool-field-empty')
      expect(emptyElement.exists()).toBe(true)
      expect(emptyElement.text()).toBe('-')
    })

    it('应该支持自定义空值文本', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'read',
          value: null,
          emptyText: '暂无数据'
        }
      })
      
      const emptyElement = wrapper.find('.cool-field-empty')
      expect(emptyElement.text()).toBe('暂无数据')
    })
  })

  describe('数据类型测试', () => {
    it('应该支持文本类型', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'read',
          value: 'Hello World'
        }
      })
      
      const textElement = wrapper.find('.cool-field-text')
      expect(textElement.exists()).toBe(true)
      expect(textElement.text()).toBe('Hello World')
    })

    it('应该支持数字类型', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'number',
          mode: 'read',
          value: 123.45
        }
      })
      
      const numberElement = wrapper.find('.cool-field-number')
      expect(numberElement.exists()).toBe(true)
      expect(numberElement.text()).toBe('123.45')
    })

    it('应该支持密码类型', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'password',
          mode: 'read',
          value: 'secret123'
        }
      })
      
      const passwordElement = wrapper.find('.cool-field-password')
      expect(passwordElement.exists()).toBe(true)
      expect(passwordElement.text()).toBe('••••••••')
    })

    it('应该支持多行文本类型', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'textarea',
          mode: 'read',
          value: 'Line 1\nLine 2'
        }
      })
      
      const textareaElement = wrapper.find('.cool-field-textarea')
      expect(textareaElement.exists()).toBe(true)
      expect(textareaElement.text()).toBe('Line 1\nLine 2')
    })
  })

  describe('对象类型测试', () => {
    it('应该支持金额类型', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: { type: 'money', currency: '¥', precision: 2 },
          mode: 'read',
          value: 1234.56
        }
      })
      
      const moneyElement = wrapper.find('.cool-field-money')
      expect(moneyElement.exists()).toBe(true)
      expect(moneyElement.text()).toContain('¥')
      expect(moneyElement.text()).toContain('1,234.56')
    })

    it('应该支持百分比类型', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: { type: 'percent', precision: 1, showSymbol: true },
          mode: 'read',
          value: 75.5
        }
      })
      
      const percentElement = wrapper.find('.cool-field-percent')
      expect(percentElement.exists()).toBe(true)
      expect(percentElement.text()).toBe('75.5%')
    })

    it('应该支持进度条类型', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: { type: 'progress', showInfo: true },
          mode: 'read',
          value: 65
        }
      })
      
      // 检查是否渲染为进度条组件
      expect(wrapper.vm.renderedComponent.component).toBe('a-progress')
      expect(wrapper.vm.renderedComponent.props.percent).toBe(65)
    })
  })

  describe('模式切换测试', () => {
    it('应该支持 read 模式', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'read',
          value: 'test'
        }
      })
      
      // read模式应该渲染为span
      expect(wrapper.vm.renderedComponent.component).toBe('span')
    })

    it('应该支持 edit 模式', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'edit',
          value: 'test'
        }
      })
      
      // edit模式应该渲染为输入组件
      expect(wrapper.vm.renderedComponent.component).toBe('a-input')
    })

    it('应该支持 update 模式', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'update',
          value: 'test'
        }
      })
      
      // update模式应该渲染为输入组件
      expect(wrapper.vm.renderedComponent.component).toBe('a-input')
    })
  })

  describe('透传机制测试', () => {
    it('应该透传属性到底层组件', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'edit',
          value: 'test',
          placeholder: '请输入内容',
          size: 'large',
          allowClear: true
        }
      })
      
             const { componentProps } = wrapper.vm
       expect(componentProps.placeholder).toBe('请输入内容')
       expect(componentProps.size).toBe('large')
       expect(componentProps.allowClear).toBe(true)
    })

    it('应该透传事件监听器', async () => {
      const mockFocus = vi.fn()
      const mockChange = vi.fn()
      
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'edit',
          value: 'test',
          onFocus: mockFocus,
          onChange: mockChange
        }
      })
      
      // 触发focus事件
      await wrapper.trigger('focus')
      
      // 触发change事件
      await wrapper.vm.$emit('change', 'new value')
      
      expect(mockFocus).toHaveBeenCalled()
    })

    it('应该支持插槽透传', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'edit',
          value: 'test'
        },
        slots: {
          suffix: '<span class="custom-suffix">后缀</span>'
        }
      })
      
      const suffixSlot = wrapper.find('.custom-suffix')
      expect(suffixSlot.exists()).toBe(true)
      expect(suffixSlot.text()).toBe('后缀')
    })
  })

  describe('事件处理测试', () => {
    it('应该正确处理 update:value 事件', async () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'edit',
          value: 'initial'
        }
      })
      
      await wrapper.vm.handleUpdateValue('new value')
      
      const emitted = wrapper.emitted('update:value')
      expect(emitted).toHaveLength(1)
      expect(emitted[0]).toEqual(['new value'])
    })

    it('应该正确处理 change 事件', async () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'edit',
          value: 'initial'
        }
      })
      
      await wrapper.vm.handleChange('new value', { source: 'input' })
      
      const emitted = wrapper.emitted('change')
      expect(emitted).toHaveLength(1)
      expect(emitted[0]).toEqual(['new value', { source: 'input' }])
    })

    it('应该正确处理 focus 和 blur 事件', async () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'edit',
          value: 'test'
        }
      })
      
      const mockEvent = new Event('focus')
      await wrapper.vm.handleFocus(mockEvent)
      
      const focusEmitted = wrapper.emitted('focus')
      expect(focusEmitted).toHaveLength(1)
      expect(focusEmitted[0][0]).toBe(mockEvent)
      
      const blurEvent = new Event('blur')
      await wrapper.vm.handleBlur(blurEvent)
      
      const blurEmitted = wrapper.emitted('blur')
      expect(blurEmitted).toHaveLength(1)
      expect(blurEmitted[0][0]).toBe(blurEvent)
    })
  })

  describe('枚举值处理测试', () => {
    const valueEnum = {
      active: { label: '激活', value: 'active' },
      inactive: { label: '未激活', value: 'inactive' }
    }

    it('应该正确处理枚举值显示', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'select',
          mode: 'read',
          value: 'active',
          valueEnum: valueEnum
        }
      })
      
      // 在read模式下应该显示标签而不是值
      expect(wrapper.text()).toContain('激活')
    })

    it('应该在编辑模式下传递枚举选项', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'select',
          mode: 'edit',
          value: 'active',
          valueEnum: valueEnum
        }
      })
      
             const { componentProps } = wrapper.vm
       expect(componentProps.valueEnum).toBe(valueEnum)
    })
  })

  describe('特殊情况测试', () => {
    it('应该处理无效的 valueType', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'invalid-type' as any,
          mode: 'read',
          value: 'test'
        }
      })
      
      // 无效类型应该默认按text处理
      expect(wrapper.vm.renderedComponent.component).toBe('span')
    })

    it('应该处理 undefined/null 值', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'read',
          value: undefined
        }
      })
      
      const emptyElement = wrapper.find('.cool-field-empty')
      expect(emptyElement.exists()).toBe(true)
    })

    it('应该在编辑模式下不显示空值文本', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'edit',
          value: null
        }
      })
      
      const emptyElement = wrapper.find('.cool-field-empty')
      expect(emptyElement.exists()).toBe(false)
    })
  })

  describe('自定义渲染测试', () => {
    it('应该支持自定义渲染函数', () => {
      const customRender = vi.fn().mockReturnValue({
        component: 'div',
        props: { class: 'custom-render' },
        slots: { default: () => 'Custom Content' }
      })
      
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'read',
          value: 'test',
          render: customRender
        }
      })
      
      expect(customRender).toHaveBeenCalled()
      expect(wrapper.vm.renderedComponent.component).toBe('div')
      expect(wrapper.vm.renderedComponent.props.class).toBe('custom-render')
    })
  })

  describe('性能测试', () => {
    it('应该正确缓存计算属性', () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'read',
          value: 'test'
        }
      })
      
      const renderedComponent1 = wrapper.vm.renderedComponent
      const renderedComponent2 = wrapper.vm.renderedComponent
      
      // 计算属性应该缓存结果
      expect(renderedComponent1).toBe(renderedComponent2)
    })

    it('应该在 props 更新时重新计算', async () => {
      const wrapper = mount(CoolField, {
        props: {
          valueType: 'text',
          mode: 'read',
          value: 'test'
        }
      })
      
      const initialComponent = wrapper.vm.renderedComponent.component
      
      await wrapper.setProps({ valueType: 'number' })
      
      const updatedComponent = wrapper.vm.renderedComponent.component
      
      // 更新props后应该重新计算
      expect(initialComponent).toBe('span')
      expect(updatedComponent).toBe('span') // 数字类型在read模式下也是span
    })
  })
}) 