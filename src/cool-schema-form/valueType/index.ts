import { type VNode } from "vue"
import { renderField } from "./field"

// 渲染表单项组件
export const renderValueType = (
  item: any,
) => {
  // 最后执行
  return renderField(item);
};

// 生成表单项组件
export const genFormItems = (columns: any[]) => {
  let formItemNodes: VNode[] = []
  formItemNodes = columns.map(item => {
    return renderValueType(item)
  })
  return formItemNodes
}