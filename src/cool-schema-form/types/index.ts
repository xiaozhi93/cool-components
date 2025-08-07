export type FormLayoutType = 'CoolForm' | 'CoolDrawerForm'
import { CoolFormFieldProps } from "../../cool-form-field/types"
import { FormItemProps } from 'ant-design-vue'
import type { Component } from "vue";
import type { CoolFieldValueTypeConfig } from "../../cool-field/types/valueTypes";

export type FormExpression = `{{${string}}}`

/**
 * 表单表达式求值结果类型
 */
export type FormExpressionResult = any

export interface CoolFormColumnsType extends Omit<CoolFormFieldProps, 'valueType'> {
  /**
   * 字段类型，支持 CoolFieldValueTypeConfig 及 'custom'
   */
  valueType?: CoolFieldValueTypeConfig | 'custom' | 'group' | 'list'
  // 初始值
  initialValue?: any | FormExpression;

  // 是否显示 （v-if），支持表单表达式
  visible?: boolean | FormExpression;
  
  // 字段属性配置
  fieldProps?: Record<string, any> | ((formData: Record<string, any>) => Record<string, any>);
  
  // 表单项属性配置
  formItemProps?: FormItemProps | ((formData: Record<string, any>) => FormItemProps);
  
  // 自定义组件（当 valueType 为 'custom' 时使用）
  component?: Component | string; // 字符串的时候从当前注册表或者全局注册表获取
  
  // 子表单列配置，定义表单字段(当 valueType 为 'group'和 'list' 时使用)
  columns?: CoolFormColumnsType[];

  /**
   * 批量动态设置属性的函数
   */
  dynamicProps?: (formData: Record<string, any>, context?: Record<string, any>) => Partial<CoolFormColumnsType>;
}

export interface CoolSchemaFormProps {
  // 表单列配置，定义表单字段
  columns: CoolFormColumnsType[];
  // 表单布局类型
  layoutType?: FormLayoutType;
  // 上下文数据
  context?: Record<string, any>;
  // 自定义组件注册表
  components?: Record<string, Component>;
}