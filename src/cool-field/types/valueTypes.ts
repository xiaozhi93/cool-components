/**
 * 基础 ValueType 类型枚举
 * 涵盖所有支持的字段类型
 */
export type CoolFieldValueType = 
  // 文本输入类
  | 'text'           // 单行文本 - Input
  | 'textarea'       // 多行文本 - Input.TextArea
  | 'password'       // 密码输入 - Input.Password
  
  // 数字输入类
  | 'digit'          // 数字输入框 - InputNumber
  | 'digitRange'     // 数字范围 - InputNumber[]
  | 'money'          // 金额输入框 - 自定义Money组件
  | 'percent'        // 百分比 - 自定义Percent组件
  
  // 日期时间类
  | 'date'           // 日期选择器 - DatePicker
  | 'dateTime'       // 日期时间选择器 - DatePicker
  | 'dateRange'      // 日期范围选择器 - DatePicker.RangePicker
  | 'time'           // 时间选择器 - TimePicker
  | 'timeRange'      // 时间范围选择器 - TimePicker.RangePicker
  
  // 选择输入类
  | 'select'         // 下拉选择框 - Select
  | 'checkbox'       // 多选框 - Checkbox.Group
  | 'radio'          // 单选框 - Radio.Group
  | 'radioButton'    // 单选按钮 - Radio.Group
  | 'switch'         // 开关 - Switch
  | 'rate'           // 评分 - Rate
  | 'slider'         // 滑动输入条 - Slider
  | 'cascader'       // 级联选择器 - Cascader
  | 'treeSelect'     // 树形选择器 - TreeSelect
  | 'segmented'      // 分段控制器 - Segmented
  
  // 展示类
  | 'progress'       // 进度条 - Progress
  | 'avatar'         // 头像 - Avatar
  | 'image'          // 图片 - 自定义Image组件
  | 'color'          // 颜色选择器 - ColorPicker
  
  // 代码类
  | 'code'           // 代码框 - 自定义Code组件
  | 'jsonCode'       // JSON代码框 - 自定义Code组件


/**
 * 复杂 ValueType 对象类型
 * 用于需要额外配置参数的字段类型
 */
export type CoolFieldValueObjectType = 
  | {
      type: 'money'
      locale?: string
      moneySymbol?: boolean | string
      customSymbol?: string
    }
  | {
      type: 'percent'
      showSymbol?: boolean
      precision?: number
      showColor?: boolean
    }
  | {
      type: 'dateTime'
      showTime?: boolean
    }
  | {
      type: 'select'
      valueEnum?: Record<string, any>
      request?: () => Promise<any[]>
    }
  | {
      type: 'checkbox'
      valueEnum?: Record<string, any>
      request?: () => Promise<any[]>
    }
  | {
      type: 'radio'
      valueEnum?: Record<string, any>
      request?: () => Promise<any[]>
    }
  | {
      type: 'radioButton'
      valueEnum?: Record<string, any>
      buttonStyle?: 'outline' | 'solid'
      request?: () => Promise<any[]>
    }
  | {
      type: 'progress'
      status?: 'success' | 'exception' | 'normal' | 'active'
    }
  | {
      type: 'image'
      width?: number
      height?: number
    }
  | {
      type: 'code'
      language?: string
    }
  | {
      type: 'jsonCode'
      language?: 'json'
    }
  | {
      type: 'digit'
      min?: number
      max?: number
      step?: number
      precision?: number
    }
  | {
      type: 'digitRange'
      min?: number
      max?: number
      step?: number
      precision?: number
    }
  | {
      type: 'date'
      format?: string
      showTime?: boolean
      picker?: 'date' | 'week' | 'month' | 'quarter' | 'year'
    }
  | {
      type: 'dateRange'
      format?: string
      showTime?: boolean
    }
  | {
      type: 'time'
      format?: string
      use12Hours?: boolean
      hourStep?: number
      minuteStep?: number
      secondStep?: number
    }
  | {
      type: 'timeRange'
      format?: string
      use12Hours?: boolean
    }

/**
 * ValueType 联合类型
 * 支持字符串类型和对象类型
 */
export type CoolFieldValueTypeConfig = CoolFieldValueType | CoolFieldValueObjectType

/**
 * ValueType 工具类型
 */
export type ExtractValueType<T> = T extends { type: infer U } ? U : T

/**
 * 判断是否为对象类型的 ValueType
 */
export type IsObjectValueType<T> = T extends { type: any } ? true : false