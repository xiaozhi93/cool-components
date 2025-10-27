import dayjs from 'dayjs'
import type { CurrencyUtils, DateUtils, NumberUtils } from '../types'

/**
 * 货币格式化工具实现
 */
export const currencyUtils: CurrencyUtils = {
  formatCurrency(amount: number | string, options: {
    currency?: string
    locale?: string
    precision?: number
  } = {}) {
    const {
      currency = 'CNY',
      locale = 'zh-CN',
      precision = 2
    } = options

    const num = typeof amount === 'string' ? parseFloat(amount) : amount
    
    if (isNaN(num)) {
      return '0.00'
    }

    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
      }).format(num)
    } catch (error) {
      // 降级处理
      return `${currency} ${num.toFixed(precision)}`
    }
  }
}

/**
 * 日期格式化工具实现
 */
export const dateUtils: DateUtils = {
  formatDate(date: string | number | Date | dayjs.Dayjs, format: string = 'YYYY-MM-DD') {
    return dayjs(date).format(format)
  },

  fromNow(date: string | number | Date | dayjs.Dayjs) {
    return dayjs(date).fromNow()
  },

  diff(date1: string | number | Date | dayjs.Dayjs, date2: string | number | Date | dayjs.Dayjs, unit: dayjs.ManipulateType = 'millisecond') {
    return dayjs(date1).diff(dayjs(date2), unit)
  }
}

/**
 * 数字格式化工具实现
 */
export const numberUtils: NumberUtils = {
  formatNumber(num: number | string, options: {
    precision?: number
    thousandsSeparator?: string
    decimalSeparator?: string
  } = {}) {
    const {
      precision = 2,
      thousandsSeparator = ',',
      decimalSeparator = '.'
    } = options

    const number = typeof num === 'string' ? parseFloat(num) : num
    
    if (isNaN(number)) {
      return '0'
    }

    // 处理精度
    const fixed = number.toFixed(precision)
    const [integer, decimal] = fixed.split('.')

    // 添加千分位分隔符
    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator)

    // 组合结果
    if (precision > 0 && decimal) {
      return `${formattedInteger}${decimalSeparator}${decimal}`
    }
    
    return formattedInteger
  },

  formatPercent(num: number | string, precision: number = 2) {
    const number = typeof num === 'string' ? parseFloat(num) : num
    
    if (isNaN(number)) {
      return '0%'
    }

    return `${(number * 100).toFixed(precision)}%`
  }
}

/**
 * 默认工具方法集合
 */
export const defaultUtils = {
  currency: currencyUtils,
  date: dateUtils,
  number: numberUtils
}
