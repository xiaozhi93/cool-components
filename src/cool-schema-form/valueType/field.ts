import { h, markRaw } from "vue"
import CoolFormField from "../../cool-form-field/index.vue"

// 缓存组件引用
const CachedCoolFormField = markRaw(CoolFormField)

export const renderField = (
  item: any,
  formModel: Record<string, any>
) => {
  // 使用 key 来确保组件正确更新
  const key = `${item.name}-${item.valueType}`
  
  return h(CachedCoolFormField, {
    key,
    ...item,
    value: formModel[item.name],
    'onUpdate:value': (value: any) => {
      formModel[item.name] = value
    }
  })
}