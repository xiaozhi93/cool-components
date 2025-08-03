import { ref, reactive, inject, provide, type Ref } from 'vue';

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
  designer: DesignerState;
  selectItem: (item: FormItem) => void;
  addItem: (item: FormItem) => void;
  removeItem: (key: string) => void;
  updateItem: (key: string, updates: Partial<FormItem>) => void;
  clearSelection: () => void;
  getSelectedItem: () => FormItem | null;
}

export function useDesigner(): DesignerContext {
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

  const context: DesignerContext = {
    designer,
    selectItem,
    addItem,
    removeItem,
    updateItem,
    clearSelection,
    getSelectedItem
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

