// @cool/field 格式化函数
import dayjs from 'dayjs'

/**
 * 金额格式化选项
 */
interface MoneyFormatOptions {
  /** 小数位精度，默认 2 */
  precision?: number
  /** 货币符号，默认 ¥ */
  symbol?: string
  /** 是否显示货币符号，默认 true */
  showSymbol?: boolean
  /** 是否显示千分位分隔符，默认 true */
  thousand?: boolean
  /** 无效值时的显示文本，默认 '-' */
  invalidText?: string
}

/**
 * 百分比格式化选项
 */
interface PercentFormatOptions {
  /** 小数位精度，默认 2 */
  precision?: number
  /** 是否显示百分号，默认 true */
  showSymbol?: boolean
  /** 是否显示颜色（正数绿色，负数红色），默认 false */
  showColor?: boolean
  /** 自定义后缀，默认 % */
  suffix?: string
  /** 无效值时的显示文本，默认 '-' */
  invalidText?: string
}

/**
 * 数字格式化选项
 */
interface NumberFormatOptions {
  /** 小数位精度 */
  precision?: number
  /** 是否显示千分位分隔符，默认 false */
  thousand?: boolean
  /** 无效值时的显示文本，默认 '-' */
  invalidText?: string
}

/**
 * 检查值是否为有效数字
 */
function isValidNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value) && isFinite(value)
}

/**
 * 添加千分位分隔符
 */
function addThousandSeparator(numberStr: string): string {
  const parts = numberStr.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

/**
 * 格式化器集合
 */
export const formatters = {
  /**
   * 金额格式化
   * @param value 数值
   * @param options 格式化选项
   * @returns 格式化后的金额字符串
   */
  money: (value: any, options: MoneyFormatOptions = {}): string => {
    const {
      precision = 2,
      symbol = '¥',
      showSymbol = true,
      thousand = true,
      invalidText = '-'
    } = options

    // 检查数值有效性
    if (!isValidNumber(value)) {
      return invalidText
    }

    try {
      // 格式化数值
      let formatted = Number(value).toFixed(precision)
      
      // 添加千分位分隔符
      if (thousand) {
        formatted = addThousandSeparator(formatted)
      }
      
      // 添加货币符号
      return showSymbol ? `${symbol}${formatted}` : formatted
    } catch (error) {
      console.warn('[formatters.money] Format error:', error)
      return invalidText
    }
  },
  
  /**
   * 百分比格式化
   * @param value 数值（0.1234 表示 12.34%）
   * @param options 格式化选项
   * @returns 格式化后的百分比字符串
   */
  percent: (value: any, options: PercentFormatOptions = {}): string => {
    const {
      precision = 2,
      showSymbol = true,
      showColor = false,
      suffix = '%',
      invalidText = '-'
    } = options

    // 检查数值有效性
    if (!isValidNumber(value)) {
      return invalidText
    }

    try {
      // 转换为百分比（乘以 100）
      const percentValue = Number(value) * 100
      
      // 格式化数值
      let formatted = percentValue.toFixed(precision)
      
      // 添加百分号
      if (showSymbol) {
        formatted = `${formatted}${suffix}`
      }
      
      // 添加颜色样式（通过 CSS class）
      if (showColor) {
        const colorClass = percentValue > 0 ? 'text-success' : 
                          percentValue < 0 ? 'text-danger' : 'text-default'
        return `<span class="${colorClass}">${formatted}</span>`
      }
      
      return formatted
    } catch (error) {
      console.warn('[formatters.percent] Format error:', error)
      return invalidText
    }
  },
  
  /**
   * 日期格式化
   */
  date: (value: any, format?: string) => {
    if (!value) return ''
    
    try {
      const dayjsInstance = dayjs(value)
      if (!dayjsInstance.isValid()) return String(value)
      
      return dayjsInstance.format(format || 'YYYY-MM-DD')
    } catch (error) {
      return String(value)
    }
  },
  
  /**
   * 日期时间格式化
   */
  dateTime: (value: any, format?: string) => {
    if (!value) return ''
    
    try {
      const dayjsInstance = dayjs(value)
      if (!dayjsInstance.isValid()) return String(value)
      
      return dayjsInstance.format(format || 'YYYY-MM-DD HH:mm:ss')
    } catch (error) {
      return String(value)
    }
  },
  
  /**
   * 时间格式化
   */
  time: (value: any, format?: string) => {
    if (!value) return ''
    
    try {
      const dayjsInstance = dayjs(value)
      if (!dayjsInstance.isValid()) return String(value)
      
      return dayjsInstance.format(format || 'HH:mm:ss')
    } catch (error) {
      return String(value)
    }
  },
  
  /**
   * 日期范围格式化
   */
  dateRange: (value: any[], format?: string, separator?: string) => {
    if (!value || !Array.isArray(value) || value.length !== 2) return ''
    
    const [start, end] = value
    const startFormatted = formatters.date(start, format)
    const endFormatted = formatters.date(end, format)
    
    return `${startFormatted}${separator || ' ~ '}${endFormatted}`
  },
  
  /**
   * 数字格式化
   * @param value 数值
   * @param options 格式化选项
   * @returns 格式化后的数字字符串
   */
  number: (value: any, options: NumberFormatOptions = {}): string => {
    const {
      precision,
      thousand = false,
      invalidText = '-'
    } = options

    // 检查数值有效性
    if (!isValidNumber(value)) {
      return invalidText
    }

    try {
      // 格式化数值
      let formatted = precision !== undefined ? 
        Number(value).toFixed(precision) : 
        String(value)
      
      // 添加千分位分隔符
      if (thousand) {
        formatted = addThousandSeparator(formatted)
      }
      
      return formatted
    } catch (error) {
      console.warn('[formatters.number] Format error:', error)
      return invalidText
    }
  },
}

/**
 * 导出类型定义
 */
export type {
  MoneyFormatOptions,
  PercentFormatOptions,
  NumberFormatOptions
} 