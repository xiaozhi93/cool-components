export type FormLayoutType = 'CoolForm' | 'CoolDrawerForm'
import { CoolFormFieldProps } from "../../cool-form-field/types"
import { FormItemProps } from 'ant-design-vue'

export type FormExpression = `{{${string}}}`

/**
 * 表单表达式求值结果类型
 */
export type FormExpressionResult = any

export interface CoolFormColumnsType extends CoolFormFieldProps {
  // 是否只读
  readonly?: boolean | FormExpression;
  
  // 初始值
  initialValue?: any | FormExpression;

  // 是否显示 （v-if），支持表单表达式
  visible?: boolean | FormExpression;
  
  // 字段属性配置
  fieldProps?: Record<string, any> | ((formData: Record<string, any>) => Record<string, any>);
  
  // 表单项属性配置
  formItemProps?: FormItemProps | ((formData: Record<string, any>) => FormItemProps);
}

export interface CoolSchemaFormProps {
  // 表单列配置，定义表单字段
  columns: CoolFormColumnsType[];
  // 表单布局类型
  layoutType?: FormLayoutType;
}