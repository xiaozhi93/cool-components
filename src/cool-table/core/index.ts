import type { ProColumns } from '../types';
import { Table } from 'ant-design-vue';

export const genProColumnsToColumns = (proColumns: ProColumns<any>[]) => {
  return proColumns
    .filter((column) => !column.hideInTable)
    .map((column) => {
      return {
        ...column,
      };
    });
};

export const genProColumnsToFormColumns = (columns: ProColumns<any>[]) => {
  return columns
    .filter((item) => {
      if (item === Table.EXPAND_COLUMN || item === Table.SELECTION_COLUMN || item.valueType === 'group' || item.valueType === 'list' || item.key === 'action') {
        return false;
      }
      if (item.search === false) {
        return false;
      }
      if (item.hideInForm) {
        return false;
      }
      return true;
    })
    .map((column) => {
      // FIXME: 排除一些非表单的字段
      return {
        ...column,
        name: column.name || column.dataIndex,
        label: column.label || column.title,

      };
    });
};
