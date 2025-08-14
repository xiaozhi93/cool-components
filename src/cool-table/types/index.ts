import type { SortOrder, ColumnType } from 'ant-design-vue/es/table/interface';
import type { CoolFormColumnsType } from '../../cool-schema-form/types';
import type { TableProps } from 'ant-design-vue';
import type { OptionConfig, ListToolBarProps } from './toolbar';
import type { SearchConfig } from './form';
import type { CoolFieldValueTypeConfig } from '../../cool-field/types/valueTypes';
import { Ref } from 'vue';

export type RequestData<T> = {
  data: T[] | undefined;
  total?: number;
} & Record<string, any>;

export interface ProColumns<DataSource>
  extends ColumnType<DataSource>, Omit<CoolFormColumnsType, 'valueType' | 'name' | 'label'> {
  /** @name 字段类型 */
  valueType?: CoolFieldValueTypeConfig | 'custom' | 'group' | 'list';
  /** @name 表单字段名称 */
  name?: string,
  /** @name 表单字段标签 */
  label?: string,
  /** 在查询表单中隐藏 */
  search?:
  | boolean
  | {
      /**
       * Transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
       *
       * @name 转化值的key, 一般用于时间区间的转化
       */
      transform?: (value: any) => any;
    };
  /** @name 在 table 中隐藏 */
  hideInTable?: boolean;

  /** @name 在新建表单中删除 */
  hideInForm?: boolean;

  /** @name 不在配置工具中显示 */
  hideInSetting?: boolean;
}

export type CoolTableProps<DataSource, U, ValueType = 'text'> = {
  // 表格
  /**
   * @name 列配置能力，支持一个数组
   */
  columns?: ProColumns<DataSource>[];

  /** @name 空值时显示 */
  columnEmptyText?: string | false;

  /** @name 一个获得 dataSource 的方法 */
  request?: (
    params: U & {
      pageSize?: number;
      current?: number;
      keyword?: string;
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, (string | number)[] | null>
  ) => Promise<Partial<RequestData<DataSource>>>;

  /** @name 对数据进行一些处理 */
  postData?: any;

  /** @name 是否手动触发请求 */
  manualRequest?: boolean;

  /**
   * @type SearchConfig
   * @name 是否显示搜索表单
   */
  search?: false | SearchConfig;
  /** @name 提交表单时触发 */
  onSubmit?: (params: U) => void;

  /** @name 重置表单时触发 */
  onReset?: () => void;
  /**
   * @name ListToolBar 的属性
   */
  toolbar?: Omit<ListToolBarProps, 'settings'>;
  /** @name 操作栏配置 */
  options?: OptionConfig | false;
  /** @name 是否显示CRUD按钮 */
  crud?: {
    /** @name 是否显示新增按钮 */
    add?: boolean;
    /** @name 是否显示编辑按钮 */
    edit?: boolean;
    /** @name 是否显示删除按钮 */
    delete?: boolean;
  };
  /** @name 新增按钮点击回调 */
  onCrudAdd?: (record: DataSource) => Promise<void>;
  /** @name 编辑按钮点击回调 */
  onCrudEdit?: (record: DataSource) => Promise<void>;
  /** @name 删除按钮点击回调 */
  onCrudDelete?: (record: DataSource) => Promise<void>;

  actionRef?: Ref<any>;
} & Omit<TableProps<DataSource>, 'columns'>;
