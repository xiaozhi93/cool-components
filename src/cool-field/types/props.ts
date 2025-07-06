import type { CoolFieldValueTypeConfig } from './valueTypes'

/**
 * Vue Node 类型定义
 * 兼容多种渲染内容类型
 */
export type VueNode = any

/**
 * 组件模式类型
 */
export type CoolFieldMode = 'read' | 'edit' | 'update'


/**
 * CoolField 组件 Props 接口
 * 严格按照设计方案定义，保持最小化API
 */
export interface CoolFieldProps {
  /** 字段值 */
  value?: any
  
  /** 格式化的类型 */
  valueType?: CoolFieldValueTypeConfig
  
  /** 组件的模式 */
  mode?: CoolFieldMode

  /** 空值时的显示文本 */
  emptyText?: any
  
  /** 其他属性 */
  [key: string]: any

}

/**
 * CoolField 组件 Slots 接口
 * 按照设计方案简化，只保留核心插槽
 */
export interface CoolFieldSlots {
  /** 只读模式自定义渲染 */
  readRender?: (props: { value: any; text: string }) => VueNode
  
  /** 编辑模式自定义渲染 */
  editRender?: (props: { value: any; onChange: (val: any) => void }) => VueNode
  
  /** 其他插槽会在 edit/update 模式下透传给底层组件 */
  [key: string]: any
}

/**
 * 字段组件渲染结果类型
 */
export interface FieldRenderResult {
  /** 渲染的组件 */
  renderedComponent: any
  /** 组件属性 */
  componentProps: Record<string, any>
}
