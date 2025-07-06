// @cool/field 异步数据加载 composable

import { ref, watch, readonly, nextTick, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export interface UseRequestOptions<T = any> {
  /** 默认值 */
  defaultValue?: T
  /** 手动触发模式，不会自动执行请求 */
  manual?: boolean
  /** 格式化响应数据 */
  formatResult?: (data: any) => T
  /** 请求成功回调 */
  onSuccess?: (data: T, params?: any) => void
  /** 请求失败回调 */
  onError?: (error: Error, params?: any) => void
  /** 请求完成回调（无论成功失败） */
  onFinally?: (params?: any) => void
  /** 防抖延迟时间（毫秒） */
  debounceWait?: number
  /** 轮询间隔时间（毫秒），设置后会自动轮询 */
  pollingInterval?: number
  /** 重试次数 */
  retryCount?: number
  /** 重试延迟时间（毫秒） */
  retryDelay?: number
  /** 缓存 key，设置后会启用缓存 */
  cacheKey?: string
  /** 缓存过期时间（毫秒），默认 5 分钟 */
  cacheTime?: number
}

export interface UseRequestReturn<T> {
  /** 响应数据 */
  data: Readonly<Ref<T | undefined>>
  /** 加载状态 */
  loading: Readonly<Ref<boolean>>
  /** 错误信息 */
  error: Readonly<Ref<Error | null>>
  /** 手动执行请求 */
  run: (runParams?: any) => Promise<T | undefined>
  /** 刷新请求 */
  refresh: () => Promise<T | undefined>
  /** 取消请求 */
  cancel: () => void
  /** 变更数据 */
  mutate: (newData: T | ((oldData: T | undefined) => T)) => void
}

// 简单的内存缓存实现
const cache = new Map<string, { data: any; timestamp: number; cacheTime: number }>()

// 清理过期缓存
const clearExpiredCache = () => {
  const now = Date.now()
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > value.cacheTime) {
      cache.delete(key)
    }
  }
}

// 定期清理过期缓存
setInterval(clearExpiredCache, 60000) // 每分钟清理一次

export function useRequest<T = any>(
  request?: (...args: any[]) => Promise<T>,
  params?: Record<string, any> | (() => Record<string, any>),
  options?: UseRequestOptions<T>
): UseRequestReturn<T> {
  const data = ref<T | undefined>(options?.defaultValue)
  const loading = ref(false)
  const error = ref<Error | null>(null)
  
  let abortController: AbortController | null = null
  let pollingTimer: number | null = null
  let debounceTimer: number | null = null

  // 获取缓存数据
  const getCachedData = (key: string): T | undefined => {
    const cached = cache.get(key)
    if (cached && Date.now() - cached.timestamp <= cached.cacheTime) {
      return cached.data
    }
    return undefined
  }

  // 设置缓存数据
  const setCachedData = (key: string, result: T) => {
    cache.set(key, {
      data: result,
      timestamp: Date.now(),
      cacheTime: options?.cacheTime || 300000 // 默认 5 分钟
    })
  }

  // 获取当前参数
  const getCurrentParams = () => {
    return typeof params === 'function' ? params() : params
  }

  // 生成缓存 key
  const generateCacheKey = (runParams?: any) => {
    if (!options?.cacheKey) return null
    const currentParams = runParams || getCurrentParams()
    return `${options.cacheKey}:${JSON.stringify(currentParams || {})}`
  }

  // 延迟执行函数
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  // 执行请求
  const executeRequest = async (runParams?: any, retryTimes = 0): Promise<T | undefined> => {
    if (!request) return undefined

    const currentParams = runParams || getCurrentParams()
    const cacheKey = generateCacheKey(runParams)

    // 检查缓存
    if (cacheKey) {
      const cachedResult = getCachedData(cacheKey)
      if (cachedResult !== undefined) {
        data.value = cachedResult
        return cachedResult
      }
    }

    // 取消之前的请求
    if (abortController) {
      abortController.abort()
    }

    abortController = new AbortController()
    loading.value = true
    error.value = null

    try {
      const result = await request(currentParams)
      
      // 检查请求是否被取消
      if (abortController.signal.aborted) {
        return undefined
      }

      // 格式化结果
      const formattedResult = options?.formatResult ? options.formatResult(result) : result
      
      // 更新数据
      data.value = formattedResult

      // 设置缓存
      if (cacheKey) {
        setCachedData(cacheKey, formattedResult)
      }

      // 成功回调
      options?.onSuccess?.(formattedResult, currentParams)

      return formattedResult
    } catch (err) {
      // 检查请求是否被取消
      if (abortController.signal.aborted) {
        return undefined
      }

      const requestError = err as Error
      
      // 重试逻辑
      if (retryTimes < (options?.retryCount || 0)) {
        if (options?.retryDelay) {
          await delay(options.retryDelay)
        }
        return executeRequest(runParams, retryTimes + 1)
      }

      error.value = requestError
      options?.onError?.(requestError, currentParams)
      throw requestError
    } finally {
      loading.value = false
      options?.onFinally?.(currentParams)
      abortController = null
    }
  }

  // 防抖执行请求
  const debouncedRun = (runParams?: any): Promise<T | undefined> => {
    return new Promise((resolve, reject) => {
      // 清除之前的定时器
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }

      if (options?.debounceWait) {
        debounceTimer = setTimeout(() => {
          executeRequest(runParams).then(resolve).catch(reject)
        }, options.debounceWait)
      } else {
        executeRequest(runParams).then(resolve).catch(reject)
      }
    })
  }

  // 手动执行请求
  const run = async (runParams?: any): Promise<T | undefined> => {
    return debouncedRun(runParams)
  }

  // 刷新请求
  const refresh = async (): Promise<T | undefined> => {
    return run()
  }

  // 取消请求
  const cancel = () => {
    if (abortController) {
      abortController.abort()
      abortController = null
    }
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      debounceTimer = null
    }
    if (pollingTimer) {
      clearTimeout(pollingTimer)
      pollingTimer = null
    }
    loading.value = false
  }

  // 变更数据
  const mutate = (newData: T | ((oldData: T | undefined) => T)) => {
    if (typeof newData === 'function') {
      data.value = (newData as Function)(data.value)
    } else {
      data.value = newData
    }
  }

  // 启动轮询
  const startPolling = () => {
    if (options?.pollingInterval && options.pollingInterval > 0) {
      pollingTimer = setTimeout(() => {
        if (!loading.value) {
          run().finally(() => {
            startPolling() // 继续下一次轮询
          })
        } else {
          startPolling() // 如果正在加载，等待下一个间隔
        }
      }, options.pollingInterval)
    }
  }

  // 停止轮询
  const stopPolling = () => {
    if (pollingTimer) {
      clearTimeout(pollingTimer)
      pollingTimer = null
    }
  }

  // 自动执行逻辑
  if (!options?.manual && request) {
    nextTick(() => {
      run().then(() => {
        // 启动轮询
        if (options?.pollingInterval) {
          startPolling()
        }
      })
    })
  }

  // 监听参数变化，自动重新请求
  if (params) {
    watch(
      typeof params === 'function' ? params : () => params,
      (newParams, oldParams) => {
        // 避免初始化时重复请求
        if (oldParams !== undefined && !options?.manual) {
          run()
        }
      },
      { deep: true }
    )
  }

  // 组件卸载时清理
  onUnmounted(() => {
    cancel()
  })

  return {
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),
    run,
    refresh,
    cancel,
    mutate
  }
}

// 导出工具函数
export { clearExpiredCache } 