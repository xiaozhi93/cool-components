import CoolForm from "../../cool-form/index.vue"
import CoolDrawerForm from "../../cool-drawer-form/index.vue"
import type { FormLayoutType } from "../types"
export const SchemaFormLayout: Record<FormLayoutType, any> = {
  CoolForm: CoolForm,
  CoolDrawerForm: CoolDrawerForm,
};