import { computed, inject, provide, type InjectionKey, type VNode, h, FunctionalComponent } from 'vue'
import { Row, Col } from 'ant-design-vue'
import type { RowProps, ColProps } from 'ant-design-vue'

/**
 * 表单Grid配置接口
 */
export interface ProFormGridConfig {
  /** 是否启用grid布局 */
  grid?: boolean
  /** 行属性配置 */
  rowProps?: RowProps
  /** 列属性配置 */
  colProps?: ColProps
}

/**
 * Grid上下文类型
 */
export interface GridContextType extends ProFormGridConfig {
  grid: boolean
  colProps?: ColProps
  rowProps?: RowProps
}

/**
 * Grid上下文注入键
 */
export const GridContextKey: InjectionKey<GridContextType> = Symbol('GridContext')

/**
 * 提供Grid上下文
 */
export function provideGridContext(config: ProFormGridConfig = {}) {
  const gridContext: GridContextType = {
    grid: !!config.grid,
    colProps: config.colProps,
    rowProps: config.rowProps
  }
  
  provide(GridContextKey, gridContext)
  
  return gridContext
}

/**
 * 注入Grid上下文
 */
export function useGridContext(): GridContextType {
  return inject(GridContextKey, {
    grid: false,
    colProps: undefined,
    rowProps: undefined
  })
}

/**
 * 通用组件属性
 */
export interface CommonProps {
  /** 包装组件 */
  wrapper?: any
}

interface GridComponents {
  grid: boolean;
  RowWrapper: FunctionalComponent<RowWrapperProps>;
  ColWrapper: FunctionalComponent<ColWrapperProps>;
}

interface RowWrapperProps extends CommonProps {
  wrapper?: any; // 可以是组件或渲染函数
  children?: VNode[] | VNode;
}

interface ColWrapperProps extends CommonProps {
  wrapper?: any;
  span?: number;
  xs?: number;
}

export function createGridHelpers(config: ProFormGridConfig & CommonProps = {}): GridComponents {
  const { grid = false, rowProps = {}, colProps = {} } = config;

  const RowWrapper: FunctionalComponent<RowWrapperProps> = (
    { wrapper: Wrapper, children, ...props },
    { slots }
  ) => {
    if (!grid) {
      const content = children || slots?.default?.();
      return Wrapper ? h(Wrapper, {}, content) : content;
    }

    const finalRowProps = {
      gutter: 8,
      ...rowProps,
      ...props
    };

    return h(Row, finalRowProps, () => children || slots?.default?.());
  };

  const ColWrapper: FunctionalComponent<ColWrapperProps> = (props, { slots }) => {
    const { wrapper: Wrapper, ...rest } = props || {};

    // 合并 colProps（全局/父级）和当前 props
    const finalColProps = computed(() => {
      const originProps = { ...colProps, ...rest };
      // xs 优先于 span，避免 span 不生效
      if (
        typeof originProps.span === 'undefined' &&
        typeof originProps.xs === 'undefined'
      ) {
        originProps.xs = 24;
      }
      return originProps;
    });

    if (!grid) {
      const content = slots?.default?.();
      return Wrapper ? h(Wrapper, {}, content) : content;
    }

    return h(Col, finalColProps.value, slots?.default?.());
  };

  // 添加组件 displayName 便于调试
  RowWrapper.displayName = 'GridRowWrapper';
  ColWrapper.displayName = 'GridColWrapper';

  return {
    grid,
    RowWrapper,
    ColWrapper
  };
}

/**
 * 使用Grid辅助工具的组合函数
 */
export function useGridHelpers(
  props?: (ProFormGridConfig & CommonProps) | boolean
): GridComponents {
  const config = computed(() => {
    if (typeof props === 'object') {
      return props
    }
    return {
      grid: props
    }
  })

  const contextGrid = useGridContext()

  return computed(() => {
    return createGridHelpers({
      grid: !!(contextGrid.grid || config.value.grid),
      rowProps: config.value?.rowProps,
      colProps: config.value?.colProps || contextGrid.colProps,
      wrapper: config.value?.wrapper
    })
  }).value
}


