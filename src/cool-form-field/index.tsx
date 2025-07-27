import { 
  defineComponent, 
  computed, 
  type PropType
} from 'vue'
import { FormItem } from 'ant-design-vue'
import CoolField from '../cool-field/index.vue'
import type { CoolFieldProps, CoolFieldMode } from '../cool-field/types'
import { useGridHelpers } from './utils/grid'
import { useEditOrReadContext } from './utils/editOrRead'
import type { CoolFieldValueTypeConfig } from '../cool-field/types/valueTypes'
import type { CoolFormFieldProps } from './types'
import { useFormFieldContext } from './utils/field'

export default defineComponent<CoolFormFieldProps>({
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
        type: Object,
        default: () => {}
      },
      /** 字段组件额外属性 */
      fieldProps: {
        type: Object,
        default: () => {}
      }
    },

    setup(props, { attrs, slots }) {
      // 获取Grid辅助工具
      const { ColWrapper } = useGridHelpers(attrs)

      // 获取编辑或只读上下文
      const modeContext = useEditOrReadContext()

      // 获取表单项上下文
      const formFieldContext = useFormFieldContext()

      // 计算表单项属性
      const formItemProps = computed(() => {
        const baseProps = {
          ...formFieldContext.value.formItemProps,
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
          valueType: props.valueType,
          mode: props.mode,
          ...formFieldContext.value.fieldProps,
          ...props.fieldProps,
          ...attrs
        } as CoolFieldProps
      })
      console.log(formFieldContext.value, 'formFieldContext')
      console.log(formItemProps.value, 'formItemProps')
      return () => {
        // 如果是只读模式，直接渲染字段组件, FormItem可二次封装
        if (props.mode === 'read' || modeContext.value.mode === 'read') {
          return (
            <ColWrapper>
              <FormItem {...formItemProps.value} required={false}>
                <CoolField
                  {...fieldComponentProps.value}
                  mode={props.mode || modeContext.value.mode}
                  v-slots={slots}
                />
              </FormItem>
            </ColWrapper>
          )
        }

        // 渲染带表单项的字段组件
        return (
          <ColWrapper>
            <FormItem {...formItemProps.value}>
              <CoolField
                {...fieldComponentProps.value}
                mode={props.mode || modeContext.value.mode}
                v-slots={slots}
              />
            </FormItem>
          </ColWrapper>
        )
      }
    }
  })
