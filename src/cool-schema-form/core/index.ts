import CoolForm from "../../cool-form/index.vue"
import CoolDrawerForm from "../../cool-drawer-form/index.vue"
import type { FormLayoutType } from "../types"
import { evalExpr, evalFormilyExpr, isFormExpression } from "../utils"

export const SchemaFormLayout: Record<FormLayoutType, any> = {
  CoolForm: CoolForm,
  CoolDrawerForm: CoolDrawerForm,
};

export const getFieldProp = (field: Record<string, any>, propName: string, formData: Record<string, any>) => {
  const prop = field[propName] ?? field.props?.[propName];
  if (typeof prop === 'function') {
    return prop(formData);
  }
  if (typeof prop === 'string') {
    if (prop.includes('data.')) {
      return evalExpr(prop, formData);
    }
    // 检查是否为表单表达式格式
    if (isFormExpression(prop)) {
      return evalFormilyExpr(prop, formData);
    }
  }
  return prop;
}

export const getFieldProps = (field: Record<string, any>, formData: Record<string, any>) => {
  const props = { ...field };
  // 处理所有 props 支持函数
  Object.keys(props).forEach(key => {
    props[key] = getFieldProp(field, key, formData)
  });
  return props;
}