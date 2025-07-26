import type { FormExpression, FormExpressionResult } from '../types'

/**
 * 检查字符串是否为有效的表单表达式
 * @param expr 待检查的字符串
 * @returns 是否为表单表达式
 */
export function isFormExpression(expr: string): expr is FormExpression {
  return expr.startsWith('{{') && expr.endsWith('}}');
}

/**
 * 将字符串转换为表单表达式类型
 * @param expr 字符串
 * @returns 表单表达式或原字符串
 */
export function toFormExpression(expr: string): FormExpression | string {
  return isFormExpression(expr) ? expr as FormExpression : expr;
}

/**
 * 表达式求值
 * @param expr 表达式
 * @param data 数据
 * @returns 求值结果
 * @example
 * evalExpr('$form.a.b', { a: { b: 1 } }) // 1
 */
export function evalExpr(expr: string, data: Record<string, any>): any {
  try {
    // 支持 $form.xxx
    // eslint-disable-next-line no-new-func
    return new Function('$form', `return (${expr})`)(data);
  } catch (e) {
    return undefined;
  }
}

/**
 * 表单表达式求值
 * @param expr 表达式
 * @param formData 表单数据
 * @returns 求值结果
 * @example
 * evalFormilyExpr('{{$form.a.b}}', { a: { b: 1 } }) // 1
 */
export function evalFormilyExpr(expr: FormExpression | string, formData: Record<string, any>): FormExpressionResult {
  const match = expr.match(/^\{\{(.+)\}\}$/);
  if (!match) return expr;
  const code = match[1];
  try {
    // eslint-disable-next-line no-new-func
    return new Function('$form', `return (${code})`)(formData);
  } catch (e) {
    return undefined;
  }
}