import type { DrawerProps } from 'ant-design-vue'
import type { SubmitterProps } from '../../cool-base-form/types'

export interface CoolDrawerFormProps  {
  title?: string
  width?: number
  drawerProps?: Omit<DrawerProps, 'open'>
  submitter?: boolean
  submitterProps?: SubmitterProps
  onFinish?: (values: any) => Promise<any>
}