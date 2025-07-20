import { type VNode } from "vue"
import { renderField } from "./field"

// 渲染表单项组件
export const renderValueType = (
  item: any,
  formModel: Record<string, any>
) => {
  // 最后执行
  return renderField(item, formModel);
};

// 生成表单项组件
export const genFormItems = (columns: any[], formModel: Record<string, any>) => {
  let formItemNodes: VNode[] = []
  formItemNodes = columns.map(item => {
    return renderValueType(item, formModel)
  })
  return formItemNodes
}