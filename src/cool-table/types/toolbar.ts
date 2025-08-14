import { CSSProperties, VNode } from "vue";

export type OptionConfig = {
  /** 是否全屏 */
  fullScreen?: boolean;
  /** 是否刷新 */
  reload?: boolean;
  /** 是否设置 */
  setting?: boolean;
};

export type MenuConfig = {
  /** 菜单类型 */
  type: 'tab';
  /** 当前激活的菜单项 */
  activeKey: string;
  /** 菜单项 */
  items: { key: string; tab: string }[];
  /** 菜单项变化时触发 */
  onChange: (key: string) => void;
}

export type SearchConfig = {
  /** 搜索框的placeholder */
  placeholder?: string;
  /** 是否允许清空 */
  allowClear?: boolean;
  /** 是否显示搜索按钮 */
  enterButton?: boolean;
  /** 搜索回调 */
  onSearch?: (value: string) => void;
}

export type ListToolBarProps = {
  /** 工具栏的className */
  className?: string;
  /** 工具栏的style */
  style?: CSSProperties;
  /** 左侧菜单配置 */
  menu?: MenuConfig;
  /** 搜索输入栏相关配置 */
  search?: SearchConfig;
  /** 工具栏右侧操作区 */
  actions?: string[];
  /** 工作栏右侧设置区 */
  settings?: VNode[];
};