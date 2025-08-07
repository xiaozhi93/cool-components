import type { RowProps, ColProps } from 'ant-design-vue/es/grid'

export type CoolFormGroupProps = {
  label?: string;
  tooltip?: string;
  // 折叠相关
  collapsible?: 'icon' | 'title' | false;
  defaultCollapsed?: boolean;
  
  // 网格布局
  grid?: boolean;
  rowProps?: RowProps;
  colProps?: ColProps;
}