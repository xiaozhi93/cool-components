import { ref, reactive, inject, provide, type Ref, type Component, computed } from 'vue';
import type { CoolFormDesignerComponent,   ControlDefinition } from '../types';
import { baseControl } from '../core/control';
// 定义设计器状态类型
export interface DesignerState {
  schema: FormItem[];
  selectedKey: string | null;
  selectedItem: FormItem | null;
}

// 定义表单项类型
export interface FormItem {
  key: string;
  name: string;
  label: string;
  valueType: string;
  formItemProps: any;
  fieldProps: any;
  [key: string]: any;
}

// 定义设计器上下文类型
export interface DesignerContext {
  controls: ControlDefinition[];
  formComponents: Record<string, Component>;
  designer: DesignerState;
  selectItem: (item: FormItem) => void;
  addItem: (item: FormItem) => void;
  removeItem: (key: string) => void;
  updateItem: (key: string, updates: Partial<FormItem>) => void;
  clearSelection: () => void;
  getSelectedItem: () => FormItem | null;
  // 新增功能
  copyItem: (key: string) => void;
  moveItemUp: (key: string) => void;
  moveItemDown: (key: string) => void;
  canMoveUp: (key: string) => boolean;
  canMoveDown: (key: string) => boolean;
  clear: () => void;
}

export function useDesigner(components: CoolFormDesignerComponent[]): DesignerContext {
  const controls = [...baseControl, ...components] as ControlDefinition[];
  const formComponents = components.reduce((acc, component) => {
    acc[component.component.name as string] = component.component;
    return acc;
  }, {} as Record<string, Component>);
  const designer = reactive<DesignerState>({
    schema: [],
    selectedKey: null,
    selectedItem: null
  });

  const selectItem = (currentItem: FormItem) => {
    designer.selectedKey = currentItem.key;
    designer.selectedItem = currentItem;
  };

  const addItem = (item: FormItem) => {
    designer.schema.push(item);
  };

  const removeItem = (key: string) => {
    const index = designer.schema.findIndex(item => item.key === key);
    if (index > -1) {
      designer.schema.splice(index, 1);
      // 如果删除的是当前选中的项目，清除选择
      if (designer.selectedKey === key) {
        clearSelection();
      }
    }
  };

  const updateItem = (key: string, updates: Partial<FormItem>) => {
    const item = designer.schema.find(item => item.key === key);
    if (item) {
      Object.assign(item, updates);
      // 如果更新的是当前选中的项目，同步更新选中项
      if (designer.selectedKey === key) {
        designer.selectedItem = item;
      }
    }
  };

  const clearSelection = () => {
    designer.selectedKey = null;
    designer.selectedItem = null;
  };

  const getSelectedItem = (): FormItem | null => {
    return designer.selectedItem;
  };

  // 新增功能方法
  const copyItem = (key: string) => {
    const item = designer.schema.find(item => item.key === key);
    if (item) {
      const copiedItem: FormItem = {
        ...item,
        key: Date.now().toString(),
        name: `${item.name}_copy`,
        label: `${item.label}_副本`
      };
      addItem(copiedItem);
      selectItem(copiedItem);
    }
  };

  const getItemIndex = (key: string): number => {
    return designer.schema.findIndex(item => item.key === key);
  };

  const canMoveUp = (key: string): boolean => {
    const index = getItemIndex(key);
    return index > 0;
  };

  const canMoveDown = (key: string): boolean => {
    const index = getItemIndex(key);
    return index >= 0 && index < designer.schema.length - 1;
  };

  const moveItemUp = (key: string) => {
    const index = getItemIndex(key);
    if (canMoveUp(key)) {
      const item = designer.schema.splice(index, 1)[0];
      designer.schema.splice(index - 1, 0, item);
    }
  };

  const moveItemDown = (key: string) => {
    const index = getItemIndex(key);
    if (canMoveDown(key)) {
      const item = designer.schema.splice(index, 1)[0];
      designer.schema.splice(index + 1, 0, item);
    }
  };

  const clear = () => {
    designer.schema = [];
  };

  const context: DesignerContext = {
    controls,
    formComponents,
    designer,
    selectItem,
    addItem,
    removeItem,
    updateItem,
    clearSelection,
    getSelectedItem,
    copyItem,
    moveItemUp,
    moveItemDown,
    canMoveUp,
    canMoveDown,
    clear
  };

  provide('designer', context);

  return context;
}

export function useDesignerContext(): DesignerContext {
  const designer = inject<DesignerContext>('designer');
  
  if (!designer) {
    throw new Error('useDesignerContext must be used within a component that has called useDesigner');
  }
  
  return designer;
}