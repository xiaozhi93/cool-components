import CoolForm from "../../cool-form/index.vue"
import CoolDrawerForm from "../../cool-drawer-form/index.vue"
import type { FormLayoutType } from "../types"
import { evalFormilyExpr, isFormExpression, isFunctionString, evalFunctionString } from "../utils"
import { omit } from "lodash-es"

export const SchemaFormLayout: Record<FormLayoutType, any> = {
  CoolForm: CoolForm,
  CoolDrawerForm: CoolDrawerForm,
};

export const getFieldProp = (field: Record<string, any>, propName: string, formData: Record<string, any>, context?: Record<string, any>) => {
  const prop = field[propName] ?? field.props?.[propName];
  if (typeof prop === 'function') {
    return prop(formData, context);
  }
  if (typeof prop === 'string') {
    // 检查是否为表单表达式格式
    if (isFormExpression(prop)) {
      return evalFormilyExpr(prop, formData, context);
    }
    // 检查是否为函数字符串格式
    if (isFunctionString(prop)) {
      return evalFunctionString(prop, formData, context);
    }
  }
  return prop;
}

export const getFieldProps = (field: Record<string, any>, formData: Record<string, any>, context?: Record<string, any>) => {
  const props = omit(field, ['name', 'visible', 'initialValue']);
  // 处理所有 props 支持函数
  Object.keys(props).forEach(key => {
    props[key] = getFieldProp(field, key, formData, context ?? {})
  });
  // 支持 dynamicProps 批量动态设置属性
  if (typeof field.dynamicProps === 'function') {
    Object.assign(props, field.dynamicProps(formData, context)); // 优先级高于其他属性
  } else if (typeof field.dynamicProps === 'string' && isFunctionString(field.dynamicProps)) {
    const dynamicPropsResult = evalFunctionString(field.dynamicProps, formData, context);
    if (typeof dynamicPropsResult === 'object') {
      Object.assign(props, dynamicPropsResult);
    }
  }
  return props;
}

export const getFieldVisibleProp = (field: Record<string, any>, formData: Record<string, any>, context?: Record<string, any>) => {
  let visible = getFieldProp(field, 'visible', formData, context);
  if (typeof field.dynamicProps === 'function') {
    visible = field.dynamicProps(formData, context)?.visible;
  } else if (typeof field.dynamicProps === 'string' && isFunctionString(field.dynamicProps)) {
    const dynamicPropsResult = evalFunctionString(field.dynamicProps, formData, context);
    if (typeof dynamicPropsResult === 'object') {
      visible = dynamicPropsResult.visible;
    }
  }
  return visible;
}