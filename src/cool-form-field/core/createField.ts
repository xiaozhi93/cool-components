import { 
  defineComponent, 
  computed, 
  h, 
  type PropType
} from 'vue'
import { FormItem } from 'ant-design-vue'
import CoolField from '../../cool-field/index.vue'
import type { CoolFieldProps, CoolFieldMode } from '../../cool-field/types'
import { useGridHelpers } from '../utils/grid'
import { useEditOrReadContext } from '../utils/editOrRead'
import type { ColProps } from 'ant-design-vue'
import type { CoolFieldValueTypeConfig } from '../../cool-field/types/valueTypes'
/**
 * 表单字段配置接口
 */
export interface FormFieldConfig {
  /** 字段类型 */
  valueType?: CoolFieldValueTypeConfig
  /** 字段标签 */
  label?: string
  /** 字段名称 */
  name?: string
  /** 是否必填 */
  required?: boolean
  /** 验证规则 */
  rules?: any[]
  /** 表单项额外属性 */
  formItemProps?: Record<string, any>
  /** 字段值 */
  value?: any
  /** 字段组件额外属性 */
  fieldProps?: Record<string, any>
  /** 列配置 */
  colProps?: ColProps
}

/**
 * 创建表单字段组件的工厂函数
 * @param config 字段配置
 * @returns Vue 组件
 */
export function createField(config: FormFieldConfig = {}) {
  return defineComponent({
    name: 'CoolFormWrapperField',
    inheritAttrs: false,
    
    props: {
      /** 字段标签 */
      label: {
        type: String,
        default: config.label
      },
      /** 字段名称 */
      name: {
        type: String,
        default: config.name
      },
      /** 字段类型 */
      valueType: {
        type: [Object, String] as PropType<CoolFieldValueTypeConfig | string>,
        default: config.valueType || 'text'
      },
      /** 组件模式 */
      mode: {
        type: String as PropType<CoolFieldMode>,
        default: ''
      },
      /** 是否必填 */
      required: {
        type: Boolean,
        default: config.required || false
      },
      /** 验证规则 */
      rules: {
        type: Array as PropType<any[]>,
        default: () => config.rules || []
      },
      /** 表单项额外属性 */
      formItemProps: {
        type: Object,
        default: () => config.formItemProps || {}
      },
      /** 字段值 */
      value: {
        type: [String, Number, Boolean, Array, Object] as PropType<any>,
        default: undefined
      },
      /** 字段组件额外属性 */
      fieldProps: {
        type: Object,
        default: () => config.fieldProps || {}
      }
    },

    setup(props, { attrs, slots }) {
      // 获取Grid辅助工具
      const { ColWrapper } = useGridHelpers(attrs)

      // 获取编辑或只读上下文
      const modeContext = useEditOrReadContext()

      // 计算表单项属性
      const formItemProps = computed(() => {
        const baseProps = {
          label: props.label,
          name: props.name,
          required: props.required,
          rules: props.rules,
          ...props.formItemProps
        }
        
        // 过滤掉空值
        return Object.keys(baseProps).reduce((acc, key) => {
          const value = (baseProps as any)[key]
          if (value !== undefined && value !== null) {
            (acc as any)[key] = value
          }
          return acc
        }, {} as Record<string, any>)
      })

      // 计算字段组件属性
      const fieldComponentProps = computed(() => {
        return {
          value: props.value,
          valueType: props.valueType,
          mode: props.mode,
          ...props.fieldProps,
          ...attrs
        } as CoolFieldProps
      })
      return () => {
        // 如果是只读模式，直接渲染字段组件, FormItem可二次封装
        if (props.mode === 'read' || modeContext.value.mode === 'read') {
          return h(ColWrapper, {}, () => h(
            FormItem,
            formItemProps.value,
            { 
              default: () => h(CoolField, {
                ...fieldComponentProps.value,
                mode: props.mode || modeContext.value.mode
              }, slots)
            }
          ))
        }

        // 渲染带表单项的字段组件
        return h(ColWrapper, {}, () => h(
          FormItem,
          formItemProps.value,
          { 
            default: () => h(CoolField, {
              ...fieldComponentProps.value,
              mode: props.mode || modeContext.value.mode
            }, slots)
          }
        ))
      }
    }
  })
}

/**
 * 导出默认工厂函数
 */
export default createField
