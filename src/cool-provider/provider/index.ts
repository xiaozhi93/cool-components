import { provide, inject, type InjectionKey } from 'vue'
import type { 
  CoolProviderServices, 
  CoolProviderUtils, 
  CoolProviderContext, 
  CoolProviderProps 
} from '../types'
import { CoolProviderContextKey } from '../types'
import { defaultUtils } from '../utils'

/**
 * 全局注册的服务和工具
 */
const globalServices: Partial<CoolProviderServices> = {}
const globalUtils: Partial<CoolProviderUtils> = {}

/**
 * 注册全局服务
 * @param services 服务配置
 */
export function registerGlobalServices(services: Partial<CoolProviderServices>) {
  Object.assign(globalServices, services)
}

/**
 * 注册全局工具方法
 * @param utils 工具方法配置
 */
export function registerGlobalUtils(utils: Partial<CoolProviderUtils>) {
  Object.assign(globalUtils, utils)
}

/**
 * 合并服务和工具，props 优先级高于全局注册
 * @param props 组件 props
 * @returns 合并后的上下文
 */
function mergeContext(props: CoolProviderProps): CoolProviderContext {
  // 合并服务：props > 全局注册
  const services: CoolProviderServices = {
    ...globalServices,
    ...props.services
  }

  // 合并工具方法：props > 全局注册 > 默认工具
  const utils: CoolProviderUtils = {
    ...defaultUtils,
    ...globalUtils,
    ...props.utils
  }

  return {
    services,
    utils
  }
}

/**
 * 提供 CoolProvider 上下文
 * @param props 组件 props
 * @returns 上下文对象
 */
export function provideCoolProvider(props: CoolProviderProps = {}) {
  const context = mergeContext(props)
  
  provide(CoolProviderContextKey, context)
  
  return context
}

/**
 * 注入 CoolProvider 上下文
 * @returns 上下文对象
 */
export function useCoolProvider(): CoolProviderContext {
  const context = inject(CoolProviderContextKey)
  
  if (!context) {
    throw new Error('useCoolProvider must be used within a CoolProvider component')
  }
  
  return context
}

/**
 * 获取全局服务（不依赖组件上下文）
 * @returns 全局服务
 */
export function getGlobalServices(): Partial<CoolProviderServices> {
  return { ...globalServices }
}

/**
 * 获取全局工具方法（不依赖组件上下文）
 * @returns 全局工具方法
 */
export function getGlobalUtils(): Partial<CoolProviderUtils> {
  return { ...globalUtils }
}
