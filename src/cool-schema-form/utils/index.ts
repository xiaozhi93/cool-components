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
 * 表单表达式求值
 * @param expr 表达式
 * @param formData 表单数据
 * @returns 求值结果
 * @example
 * evalFormilyExpr('{{$form.a.b}}', { a: { b: 1 } }) // 1
 */
export function evalFormilyExpr(expr: FormExpression | string, formData: Record<string, any>, context?: Record<string, any>): FormExpressionResult {
  const match = expr.match(/^\{\{(.+)\}\}$/);
  if (!match) return expr;
  const code = match[1];
  try {
    // eslint-disable-next-line no-new-func
    return new Function('$form', '$context', `return (${code})`)(formData, context);
  } catch (e) {
    return undefined;
  }
}

/**
 * 检查字符串是否为有效的函数字符串表达式
 * @param expr 待检查的字符串
 * @returns 是否为函数字符串
 */
export function isFunctionString(expr: string): boolean {
  const str = expr.trim();
  // 支持箭头函数格式，如 (a, b) => {...}
  if (/^\s*\(.*\)\s*=>/.test(str)) return true;
  // 支持 function 声明格式，如 function(a, b) {...}
  if (/^function\s*\(.*\)/.test(str)) return true;
  return false;
}

/**
 * 安全执行函数字符串表达式
 * @param fnStr 函数字符串
 * @param formData 表单数据
 * @param context 上下文
 * @returns 执行结果
 */
export function evalFunctionString(fnStr: string, formData: Record<string, any>, context?: Record<string, any>): any {
  try {
    const str = fnStr.trim();
    const fn = new Function('return (' + str + ')')();
    return fn(formData, context);
  } catch (e) {
    return fnStr;
  }
}