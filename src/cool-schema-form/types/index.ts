export type FormLayoutType = 'CoolForm' | 'CoolDrawerForm'
import { CoolFieldValueType } from "../../cool-field/types/valueTypes"


export interface CoolFormColumnsType {
  // 字段名称
  name: string;
  
  // 字段标题
  label?: string;
  
  // 字段类型
  valueType?: CoolFieldValueType;
  
  // 字段宽度
  width?: string | number;
  
  // 排序权重
  order?: number;
  
  // 是否只读
  readonly?: boolean;
  
  // 初始值
  initialValue?: any;
  
  // 是否在表单中隐藏
  hideInForm?: boolean;
  
  // 字段属性配置
  fieldProps?: any;
  
  // 表单项属性配置
  formItemProps?: any;
}

export interface CoolSchemaFormProps {
  // 表单列配置，定义表单字段
  columns: CoolFormColumnsType[];
  // 表单布局类型
  layoutType?: FormLayoutType;
}