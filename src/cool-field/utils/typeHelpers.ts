// @cool/field 类型辅助工具

import type { 
  CoolFieldValueType, 
  CoolFieldValueTypeConfig, 
  CoolFieldValueObjectType 
} from '../types'

/**
 * 判断 valueType 是否为对象类型
 */
export function isObjectValueType(
  valueType: CoolFieldValueTypeConfig
): valueType is CoolFieldValueObjectType {
  return typeof valueType === 'object' && valueType !== null && 'type' in valueType
}

/**
 * 判断 valueType 是否为字符串类型
 */
export function isStringValueType(
  valueType: CoolFieldValueTypeConfig
): valueType is CoolFieldValueType {
  return typeof valueType === 'string'
}

/**
 * 从对象 valueType 中提取类型字符串
 */
export function extractValueType(valueType: CoolFieldValueTypeConfig): string {
  if (isObjectValueType(valueType)) {
    return valueType.type
  }
  return valueType as string
}

/**
 * 判断值是否为空
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && value.trim() === '') return true
  if (Array.isArray(value) && value.length === 0) return true
  if (typeof value === 'object' && Object.keys(value).length === 0) return true
  return false
}

/**
 * 根据 valueType 和值判断是否应该显示空状态
 */
export function shouldShowEmpty(value: any, valueType: CoolFieldValueTypeConfig): boolean {
  const type = extractValueType(valueType)
  
  // 数字类型特殊处理：0 不算空值
  if (['digit', 'digitRange', 'money', 'percent'].includes(type)) {
    return value === null || value === undefined || (typeof value === 'string' && value.trim() === '')
  }
  
  // 布尔类型特殊处理：false 不算空值
  if (['switch'].includes(type)) {
    return value === null || value === undefined
  }
  
  return isEmpty(value)
}

/**
 * 值类型分类枚举
 */
export enum ValueTypeCategory {
  TEXT = 'text',           // 文本类
  NUMBER = 'number',       // 数字类
  DATE = 'date',           // 日期类
  SELECT = 'select',       // 选择类
  DISPLAY = 'display',     // 展示类
  INPUT = 'input',         // 输入类
  ADVANCED = 'advanced',   // 高级类
  CODE = 'code',           // 代码类
  TIME_FORMAT = 'timeFormat', // 时间格式化类
  SPECIAL = 'special'      // 特殊列类
}

/**
 * 获取 valueType 的分类
 */
export function getValueTypeCategory(valueType: CoolFieldValueTypeConfig): ValueTypeCategory {
  const type = extractValueType(valueType)
  
  // 文本类
  if (['text', 'textarea', 'password'].includes(type)) {
    return ValueTypeCategory.TEXT
  }
  
  // 数字类
  if (['digit', 'digitRange', 'money', 'percent'].includes(type)) {
    return ValueTypeCategory.NUMBER
  }
  
  // 日期类
  if (['date', 'dateTime', 'dateRange', 'time', 'timeRange'].includes(type)) {
    return ValueTypeCategory.DATE
  }
  
  // 选择类
  if (['select', 'checkbox', 'radio', 'radioButton', 'switch', 'rate', 'slider'].includes(type)) {
    return ValueTypeCategory.SELECT
  }
  
  // 展示类
  if (['progress', 'avatar', 'image', 'color'].includes(type)) {
    return ValueTypeCategory.DISPLAY
  }
  
  // 高级类
  if (['cascader', 'treeSelect', 'segmented'].includes(type)) {
    return ValueTypeCategory.ADVANCED
  }
  
  // 代码类
  if (['code', 'jsonCode'].includes(type)) {
    return ValueTypeCategory.CODE
  }
  
  // 时间格式化类
  if (['second', 'fromNow'].includes(type)) {
    return ValueTypeCategory.TIME_FORMAT
  }
  
  // 特殊列类
  if (['indexColumn', 'option'].includes(type)) {
    return ValueTypeCategory.SPECIAL
  }
  
  return ValueTypeCategory.INPUT
}



/**
 * 判断 valueType 是否支持异步数据
 */
export function supportsAsyncData(valueType: CoolFieldValueTypeConfig): boolean {
  const asyncSupportedTypes = [
    'select', 'checkbox', 'radio', 'radioButton',
    'cascader', 'treeSelect', 'segmented'
  ]
  const type = extractValueType(valueType)
  return asyncSupportedTypes.includes(type)
}

/**
 * 获取默认的格式化选项
 */
export function getDefaultFormatOptions(valueType: CoolFieldValueTypeConfig): Record<string, any> {
  const type = extractValueType(valueType)
  
  switch (type) {
    case 'money':
      return { precision: 2, symbol: true }
    case 'percent':
      return { precision: 2, showSymbol: true }
    case 'digit':
      return { precision: 0 }
    case 'date':
      return { format: 'YYYY-MM-DD' }
    case 'dateTime':
      return { format: 'YYYY-MM-DD HH:mm:ss' }
    case 'time':
      return { format: 'HH:mm:ss' }
    default:
      return {}
  }
}

/**
 * 合并 valueType 配置
 */
export function mergeValueTypeConfig(
  valueType: CoolFieldValueTypeConfig,
  extraConfig: Record<string, any> = {}
): CoolFieldValueObjectType | CoolFieldValueType {
  if (isStringValueType(valueType)) {
    // 如果有额外配置，则转换为对象类型
    if (Object.keys(extraConfig).length > 0) {
      return {
        type: valueType,
        ...extraConfig
      } as CoolFieldValueObjectType
    }
    return valueType
  }
  
  // 对象类型，合并配置
  return {
    ...valueType,
    ...extraConfig
  } as CoolFieldValueObjectType
} 