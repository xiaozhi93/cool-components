import type { ColProps } from "ant-design-vue"
import type { CoolFieldValueTypeConfig } from '../../cool-field/types/valueTypes'

export type CoolFormFieldProps = {
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
    /** 字段组件额外属性 */
    fieldProps?: Record<string, any>
    /** 列配置 */
    colProps?: ColProps
    /** 是否隐藏 */
    hidden?: boolean
    /** 模式 */
    mode?: CoolFormFieldMode
}

export type CoolFormFieldMode = 'edit' | 'read'