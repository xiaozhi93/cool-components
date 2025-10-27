import { InjectionKey, provide, inject } from 'vue'
import mitt, { type Emitter } from 'mitt'

export interface CoolSchemaFormContext {
  emit: Emitter<Record<string, any>>; // 事件发射器
}

export const CoolSchemaFormContextKey: InjectionKey<CoolSchemaFormContext> = Symbol('CoolSchemaFormContext')

export function provideCoolSchemaFormContext(props: Record<string, any>) {
  const context: CoolSchemaFormContext = {
    ...(props ?? {}),
    emit: mitt()
  }
  provide(CoolSchemaFormContextKey, context)
  return context
}

export function useCoolSchemaFormContext() {
  const context = inject(CoolSchemaFormContextKey)
  if(!context) {
    throw new Error('useCoolSchemaFormContext must be used within a CoolSchemaForm component')
  }
  return context as CoolSchemaFormContext
}