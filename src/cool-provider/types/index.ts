import type { InjectionKey } from 'vue'
import dayjs from 'dayjs'

/**
 * 字典服务接口
 */
export interface DictionaryService {
  /** 获取字典数据 */
  getDictionary: (code: string, params?: Record<string, any>) => Promise<Array<{ label: string; value: any; [key: string]: any }>>
}

/**
 * 营业执照识别服务接口
 */
export interface LicenseRecognitionService {
  /** 识别营业执照 */
  recognizeLicense: (file: File | string, options?: Record<string, any>) => Promise<{
    companyName?: string
    creditCode?: string
    legalPerson?: string
    registeredCapital?: string
    [key: string]: any
  }>
}

/**
 * 通用请求服务接口
 */
export interface RequestService {
  /** 通用请求方法 */
  request: (url: string, options?: Record<string, any>) => Promise<any>
}

/**
 * 所有服务接口集合
 */
export interface CoolProviderServices {
  /** 字典服务 */
  dictionaryService?: DictionaryService
  /** 营业执照识别服务 */
  licenseRecognitionService?: LicenseRecognitionService
  /** 通用请求服务 */
  requestService?: RequestService
  /** 自定义服务 */
  [key: string]: any
}

/**
 * 货币格式化工具
 */
export interface CurrencyUtils {
  /** 格式化货币 */
  formatCurrency: (amount: number | string, options?: {
    currency?: string
    locale?: string
    precision?: number
  }) => string
}

/**
 * 日期格式化工具
 */
export interface DateUtils {
  /** 格式化日期 */
  formatDate: (date: string | number | Date | dayjs.Dayjs, format?: string) => string
  /** 获取相对时间 */
  fromNow: (date: string | number | Date | dayjs.Dayjs) => string
  /** 获取时间差 */
  diff: (date1: string | number | Date | dayjs.Dayjs, date2: string | number | Date | dayjs.Dayjs, unit?: dayjs.ManipulateType) => number
}

/**
 * 数字格式化工具
 */
export interface NumberUtils {
  /** 格式化数字 */
  formatNumber: (num: number | string, options?: {
    precision?: number
    thousandsSeparator?: string
    decimalSeparator?: string
  }) => string
  /** 格式化百分比 */
  formatPercent: (num: number | string, precision?: number) => string
}

/**
 * 所有工具方法集合
 */
export interface CoolProviderUtils {
  /** 货币工具 */
  currency?: CurrencyUtils
  /** 日期工具 */
  date?: DateUtils
  /** 数字工具 */
  number?: NumberUtils
  /** 自定义工具 */
  [key: string]: any
}

/**
 * CoolProvider 上下文接口
 */
export interface CoolProviderContext {
  /** 服务集合 */
  services: CoolProviderServices
  /** 工具方法集合 */
  utils: CoolProviderUtils
}

/**
 * CoolProvider 组件 Props
 */
export interface CoolProviderProps {
  /** 服务配置 */
  services?: Partial<CoolProviderServices>
  /** 工具方法配置 */
  utils?: Partial<CoolProviderUtils>
}

/**
 * CoolProvider 上下文注入键
 */
export const CoolProviderContextKey: InjectionKey<CoolProviderContext> = Symbol('CoolProviderContext')
