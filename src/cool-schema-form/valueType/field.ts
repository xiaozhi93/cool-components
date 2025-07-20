import { h } from "vue"
import CoolFormField from "../../cool-form-field/index.vue"

export const renderField = (
  item: any,
) => {
  return h(CoolFormField, {
    ...item,
    model: item.name,
  })
}