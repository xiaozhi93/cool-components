import type { RowProps, ColProps } from 'ant-design-vue/es/grid'

export type CoolFormListProps = {
  label?: string;
  tooltip?: string;
  // 网格布局
  grid?: boolean;
  rowProps?: RowProps;
  colProps?: ColProps;
}