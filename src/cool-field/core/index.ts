// @cool/field 核心渲染分发逻辑

import { h } from 'vue'
import type { CoolFieldValueType, CoolFieldValueObjectType, FieldRenderResult, CoolFieldProps } from '../types'
import { isObjectValueType, extractValueType, shouldShowEmpty } from '../utils'

// 统一导入字段组件
import {
  CoolTextField,
  CoolFieldPercent,
  CoolFieldDigit,
  CoolDigitRangeField,
  CoolFieldMoney,
  CoolFieldRadio,
  CoolFieldRadioButton,
  CoolFieldSelect,
  CoolFieldCheckbox,
  CoolFieldCascader,
  CoolFieldTreeSelect,
  CoolFieldSwitch,
  CoolFieldDate,
} from '../fields'


// 处理对象类型 valueType 的函数（避免循环导入）
function renderObjectValueType(
  dataValue: any,
  valueType: CoolFieldValueObjectType,
  props: Omit<CoolFieldProps, 'value' | 'valueType'>,
): FieldRenderResult {
  // 从对象类型中提取基础类型和配置
  const { type, ...config } = valueType
  
  // 合并配置到 props 中
  const mergedProps = {
    ...props,
    ...config
  }
  
  // 递归调用 render 处理基础类型
  return render(dataValue, type, mergedProps)
}

export function render(
  dataValue: any,
  valueType: CoolFieldValueType | CoolFieldValueObjectType,
  props: Omit<CoolFieldProps, 'value' | 'valueType'>,
): FieldRenderResult {
  const { mode = 'read', emptyText = '-' } = props

  // 空值处理
  if (emptyText !== false && mode === 'read' && shouldShowEmpty(dataValue, valueType)) {
    return {
      renderedComponent: {
        render: () => h('span', { class: 'cool-field-empty' }, emptyText)
      },
      componentProps: {}
    }
  }

  // 对象类型 valueType 处理
  if (isObjectValueType(valueType)) {
    return renderObjectValueType(dataValue, valueType as CoolFieldValueObjectType, props)
  }

  // 提取基础类型
  const baseType = extractValueType(valueType)

  // 根据 valueType 分发到具体组件
  switch (baseType) {
    case 'text':
    case 'textarea':
    case 'password':
      return {
        renderedComponent: CoolTextField, 
        componentProps: {
          value: dataValue,
          valueType: baseType,
          mode,
          emptyText,
          ...props 
        }
      }
    
    case 'digit':
      return {
        renderedComponent: CoolFieldDigit,
        componentProps: {
          value: dataValue,
          valueType: baseType,
          mode,
          emptyText,
          ...props 
        }
      }
    case 'digitRange':
      return {
        renderedComponent: CoolDigitRangeField,
        componentProps: { 
          value: dataValue, 
          mode,
          emptyText,
          ...props 
        }
      }
    
    case 'money':
      return {
        renderedComponent: CoolFieldMoney,
        componentProps: { 
          value: dataValue, 
          mode,
          emptyText,
          ...props 
        }
      }
    
    case 'percent':
      return {
        renderedComponent: CoolFieldPercent,
        componentProps: { 
          value: dataValue, 
          mode,
          emptyText,
          ...props 
        }
      }
    
    case 'radio':
      return {
        renderedComponent: CoolFieldRadio,
        componentProps: { 
          value: dataValue, 
          mode,
          emptyText,
          ...props 
        }
      }
    case 'radioButton':
      return {
        renderedComponent: CoolFieldRadioButton,
        componentProps: { 
          value: dataValue, 
          mode,
          emptyText,
          ...props 
        }
      }
    case 'select':
      return {
        renderedComponent: CoolFieldSelect,
        componentProps: { 
          value: dataValue, 
          mode,
          emptyText,
          ...props 
        }
      }
    case 'checkbox':
      return {
        renderedComponent: CoolFieldCheckbox,
        componentProps: { 
          value: dataValue, 
          mode,
          emptyText,
          ...props 
        }
      }
    case 'cascader':
      return {
        renderedComponent: CoolFieldCascader,
        componentProps: { 
          value: dataValue, 
          mode,
          emptyText,
          ...props 
        }
      }
    case 'treeSelect':
      return {
        renderedComponent: CoolFieldTreeSelect,
        componentProps: { 
          value: dataValue, 
          mode,
          emptyText,
          ...props 
        }
      }
    case 'switch':
      return {
        renderedComponent: CoolFieldSwitch,
        componentProps: { 
          value: dataValue, 
          mode,
          emptyText,
          ...props 
        }
      }
    case 'date':
      return {
        renderedComponent: CoolFieldDate,
        componentProps: { 
          value: dataValue, 
          mode,
          emptyText,
          ...props 
        }
      }
    
    // // TODO: 这些类型将在独立组件中实现
    // case 'dateRange':
    // case 'time':
    // case 'timeRange':
    //   // 暂时使用文本组件，后续实现独立组件
    //   return {
    //     renderedComponent: FieldText,
    //     componentProps: { 
    //       value: dataValue, 
    //       mode,
    //       emptyText,
    //       ...props 
    //     }
    //   }
    
    // // TODO: 待实现的新类型
    // case 'switch':
    //   return {
    //     renderedComponent: FieldSwitch,
    //     componentProps: { 
    //       value: dataValue, 
    //       mode,
    //       emptyText,
    //       ...props 
    //     }
    //   }
    
    // case 'checkbox':
    //   return {
    //     renderedComponent: FieldCheckbox,
    //     componentProps: { 
    //       value: dataValue, 
    //       mode,
    //       emptyText,
    //       ...props 
    //     }
    //   }
    
    // case 'radio':
    //   return {
    //     renderedComponent: FieldRadio,
    //     componentProps: { 
    //       value: dataValue, 
    //       mode,
    //       emptyText,
    //       ...props 
    //     }
    //   }
    
    // case 'radioButton':
    //   return {
    //     renderedComponent: FieldRadioButton,
    //     componentProps: { 
    //       value: dataValue, 
    //       mode,
    //       emptyText,
    //       ...props 
    //     }
    //   }
    
    // case 'progress':
    //   return {
    //     renderedComponent: FieldProgress,
    //     componentProps: { 
    //       value: dataValue, 
    //       mode,
    //       emptyText,
    //       ...props 
    //     }
    //   }
    
    // case 'image':
    //   return {
    //     renderedComponent: FieldImage,
    //     componentProps: { 
    //       value: dataValue, 
    //       mode,
    //       emptyText,
    //       ...props 
    //     }
    //   }
    
    // case 'avatar':
    //   return {
    //     renderedComponent: FieldAvatar,
    //     componentProps: { 
    //       value: dataValue, 
    //       mode,
    //       emptyText,
    //       ...props 
    //     }
    //   }
    
    default:
      // 默认使用文本组件
      return {
        renderedComponent: CoolTextField,
        componentProps: { 
          value: dataValue, 
          mode,
          emptyText,
          ...props 
        }
      }
  }
} 