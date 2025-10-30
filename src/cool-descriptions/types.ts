import type { VNodeChild, Component } from 'vue';

export type ResponsiveColumns = number | {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

export type BuiltinFormatterType = 'date' | 'datetime' | 'time' | 'currency' | 'enum';

export interface EnumItem {
  label: string;
  color?: string;
}

export type EnumMap = Record<string | number, string | EnumItem>;

export interface DescriptionColumn<RecordType = any> {
  dataIndex: string | ((record: RecordType) => any);
  title?: string;
  tooltip?: string;
  span?: number;
  show?: boolean | ((record: RecordType) => boolean);
  ellipsis?: boolean;
  copyable?: boolean;
  /** 使用注册的组件渲染此值，优先级：slot > render > valueType > formatter > raw */
  valueType?: string;
  /** 整行自定义渲染，覆盖 label+value 默认布局 */
  itemRender?: (ctx: {
    column: DescriptionColumn<RecordType>;
    value: any;
    dataSource: RecordType;
    index: number;
  }) => VNodeChild;
  render?: (ctx: { value: any; dataSource: RecordType; column: DescriptionColumn<RecordType>; index: number }) => VNodeChild;
  formatter?: BuiltinFormatterType | ((value: any, record: RecordType, column: DescriptionColumn<RecordType>) => VNodeChild | string | number | null | undefined);
  format?: string; // date/time format
  currency?: string; // currency code, e.g. CNY
  enumMap?: EnumMap;
}

export interface CoolDescriptionsProps<RecordType = any> {
  dataSource?: RecordType | null;
  columns: DescriptionColumn<RecordType>[];
  layout?: 'horizontal' | 'vertical';
  column?: ResponsiveColumns;
  bordered?: boolean;
  size?: 'small' | 'middle' | 'large';
  title?: string;
  extra?: string | VNodeChild;
  loading?: boolean;
  emptyText?: string;
  request?: (params?: any) => Promise<RecordType>;
  params?: any;
  immediate?: boolean;
  /** 显示标签后的冒号，默认 true */
  colon?: boolean;
  /** 注册可用的渲染组件，key 即为 column.valueType */
  components?: Record<string, Component>;
}

export type CoolDescriptionsEmits<RecordType = any> = {
  (e: 'load', data: RecordType): void;
  (e: 'error', err: unknown): void;
  (e: 'update:dataSource', data: RecordType | null): void;
};


