import { 
  defineComponent, 
  computed, 
  type PropType,
  type Component,
  type VNode,
  type SlotsType,
  h
} from 'vue'
import { FormItem } from 'ant-design-vue'
import type { CoolFieldProps, CoolFieldMode } from '../../cool-field/types'
import { useGridHelpers } from '../utils/grid'
import { useEditOrReadContext } from '../utils/editOrRead'
import type { CoolFieldValueTypeConfig } from '../../cool-field/types/valueTypes'
import type { CoolFormFieldProps } from '../types'
import { useFormFieldContext } from '../utils/field'

/**
 * 创建表单项组件的工厂函数
 * 
 * 这个函数用于创建包装了 FormItem 的字段组件，提供统一的表单项功能：
 * - 自动处理表单验证
 * - 支持只读/编辑模式切换
 * - 集成 Grid 布局系统
 * - 支持上下文配置继承
 * 
 * @param FieldComponent 需要包装的字段组件
 * @returns 包装后的表单项组件
 * 
 * @example
 * ```tsx
 * const MyFormField = createFormField(MyFieldComponent)
 * 
 * // 使用
 * <MyFormField 
 *   name="username" 
 *   label="用户名" 
 *   required 
 *   :rules="[{ required: true, message: '请输入用户名' }]"
 * />
 * ```
 */
export const createFormField = (
  FieldComponent: Component
) => {
  return defineComponent({
    name: 'CoolFormField',
    inheritAttrs: false,
    props: {
      /** 字段类型 */
      valueType: {
        type: [Object, String] as PropType<CoolFieldValueTypeConfig | string>,
        default: 'text'
      },
      /** 组件模式 */
      mode: {
        type: String as PropType<CoolFieldMode>,
        default: 'edit'
      },
      /** 是否必填 */
      required: {
        type: Boolean,
        default: false
      },
      /** 验证规则 */
      rules: {
        type: Array as PropType<any[]>,
        default: () => []
      },
      /** 字段标签 */
      label: {
        type: String,
        default: ''
      },
      /** 字段名称 */
      name: {
        type: String,
        default: ''
      },
      /** 是否隐藏 */
      hidden: {
        type: Boolean,
        default: false
      },
      /** 表单项额外属性 */
      formItemProps: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
      },
      /** 字段组件额外属性 */
      fieldProps: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
      }
    },

    setup(props, { attrs, slots }) {
      // 获取Grid辅助工具
      const { ColWrapper } = useGridHelpers(attrs)

      // 获取编辑或只读上下文
      const modeContext = useEditOrReadContext()

      // 获取表单项上下文
      const formFieldContext = useFormFieldContext()

      // 计算表单项属性，优化性能
      const computedFormItemProps = computed(() => {
        const baseProps = {
          ...formFieldContext.value.formItemProps,
          label: props.label,
          name: props.name,
          required: props.required,
          rules: props.rules,
          ...props.formItemProps
        }
        
        // 过滤掉空值，提高性能
        return Object.fromEntries(
          Object.entries(baseProps).filter(([_, value]) => 
            value !== undefined && value !== null
          )
        )
      })

      // 计算字段组件属性
      const fieldComponentProps = computed(() => {
        attrs._track; // 访问属性，强制建立以来追踪
        return {
          valueType: props.valueType,
          mode: props.mode,
          ...formFieldContext.value.fieldProps,
          ...props.fieldProps,
          ...attrs
        } as CoolFieldProps
      })

      // 计算当前模式，提供默认值
      const currentMode = computed(() => 
        props.mode || modeContext.value.mode || 'edit'
      )

      // 计算样式
      const computedStyle = computed(() => 
        props.hidden ? { display: 'none' } : {}
      )

      // 渲染字段组件
      const renderFieldComponent = () => h(FieldComponent, {
        ...fieldComponentProps.value,
        mode: currentMode.value
      }, slots)

      return (): VNode => {
        const isReadMode = currentMode.value === 'read'
        
        // 如果是只读模式，直接渲染字段组件
        if (isReadMode) {
          return h(ColWrapper, {}, () => h(FormItem, {
              ...computedFormItemProps.value,
              required: false, // 只读模式下不需要验证
              style: computedStyle.value
            }, renderFieldComponent)
          )
        }

        // 渲染带表单项的字段组件
        return h(ColWrapper, {}, () => h(FormItem, {
          ...computedFormItemProps.value,
          style: computedStyle.value
        }, renderFieldComponent))
      }
    }
  })
}