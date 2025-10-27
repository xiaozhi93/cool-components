// CoolProvider 组件导出
export { default } from './index.vue'

// 类型导出
export type {
  CoolProviderServices,
  CoolProviderUtils,
  CoolProviderContext,
  CoolProviderProps,
  DictionaryService,
  LicenseRecognitionService,
  RequestService,
  CurrencyUtils,
  DateUtils,
  NumberUtils
} from './types'

// Provider 方法导出
export {
  provideCoolProvider,
  useCoolProvider,
  registerGlobalServices,
  registerGlobalUtils,
  getGlobalServices,
  getGlobalUtils
} from './provider'

// 工具方法导出
export {
  currencyUtils,
  dateUtils,
  numberUtils,
  defaultUtils
} from './utils'
