import { inject, provide, computed, type InjectionKey, type ComputedRef } from 'vue'

export interface ProFormFieldContext {
  /** FormItem 组件的属性 */
  formItemProps?: Record<string, any>
  /** Form 组件的属性 */
  fieldProps?: Record<string, any>
  /** Form 组件的类型 */
  formComponentType?: string
}

export const FormFieldContextKey: InjectionKey<ComputedRef<ProFormFieldContext>> = Symbol('FormFieldContext')

/**
 * 提供编辑或只读上下文
 */
export function provideFormFieldContext(fieldContext:  ComputedRef<ProFormFieldContext>) {

  provide(FormFieldContextKey, fieldContext)
  
  return fieldContext
}

/**
 * 注入编辑或只读上下文
 */
export function useFormFieldContext(): ComputedRef<ProFormFieldContext> {
  return inject(FormFieldContextKey, computed(() => ({
    formItemProps: {},
    fieldProps: {},
    formComponentType: undefined
  })))
}