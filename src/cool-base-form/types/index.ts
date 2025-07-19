import type { SubmitterProps } from '../components/submitter.vue'

export interface CoolBaseFormProps {
  // 表单提交成功回调
  onFinish?: (values: any) => void | Promise<void>
  
  // 表单重置回调
  onReset?: (values?: any) => void | Promise<void>
  
  submitter?: boolean;
  submitterProps?: SubmitterProps;

  /** 是否回车提交 */
  isKeyPressSubmit?: boolean;
  /** Form 组件的类型，内部使用 */
  formComponentType?: 'CoolDrawerForm' | 'CoolModalForm' | 'CoolQueryFilter';
} 