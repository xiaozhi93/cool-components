import { inject, provide, computed, type InjectionKey, type ComputedRef } from 'vue'

export interface ProFormEditOrReadConfig {
  mode?: 'edit' | 'read'
}

export const EditOrReadContextKey: InjectionKey<ComputedRef<ProFormEditOrReadConfig>> = Symbol('EditOrReadContext')

/**
 * 提供编辑或只读上下文
 */
export function provideEditOrReadContext(modeContext:  ComputedRef<ProFormEditOrReadConfig>) {

  provide(EditOrReadContextKey, modeContext)
  
  return modeContext
}

/**
 * 注入编辑或只读上下文
 */
export function useEditOrReadContext(): ComputedRef<ProFormEditOrReadConfig> {
  return inject(EditOrReadContextKey, computed(() => ({
    mode: undefined
  })))
}