import type { SubmitterProps } from '../components/submitter.vue'
import type { RowProps } from 'ant-design-vue/es/grid'
import type { ColProps } from 'ant-design-vue/es/grid'

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

  /** 是否启用网格布局 */
  grid?: boolean;
  /** 网格布局的行属性配置 */
  rowProps?: RowProps;
  /** 网格布局的列属性配置 */
  colProps?: ColProps;
} 