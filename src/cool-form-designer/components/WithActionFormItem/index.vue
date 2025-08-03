<template>
  <div 
    class="with-action-form-item"
    :class="{ 'selected': isSelected }"
    @click="handleSelect"
  >
    <!-- 表单项内容 -->
    <div class="form-item-content">
      <CoolFormField 
        v-bind="$attrs"
        :valueType="valueType"
      />
    </div>
    
    <!-- 操作按钮 -->
    <div 
      class="action-buttons"
      @click.stop
    >
      <button 
        class="action-btn copy-btn"
        @click="handleCopy"
        title="复制"
      >
        📋
      </button>
      <button 
        class="action-btn up-btn"
        @click="handleMoveUp"
        :disabled="!canMoveUpItem"
        title="上移"
      >
        ⬆️
      </button>
      <button 
        class="action-btn down-btn"
        @click="handleMoveDown"
        :disabled="!canMoveDownItem"
        title="下移"
      >
        ⬇️
      </button>
      <button 
        class="action-btn delete-btn"
        @click="handleDelete"
        title="删除"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CoolFormField from '../../../cool-form-field/index';
import { useDesignerContext, type FormItem } from '../../hooks/useDesigner';

defineOptions({
  name: 'WithActionFormItem',
  inheritAttrs: false
});

const props = defineProps<{
  id: string;
  valueType: string;
}>();

const { 
  designer, 
  selectItem, 
  removeItem,
  canMoveUp,
  canMoveDown,
  copyItem,
  moveItemUp,
  moveItemDown
} = useDesignerContext();

// 计算属性
const isSelected = computed(() => designer.selectedKey === props.id);
const canMoveUpItem = computed(() => canMoveUp(props.id));
const canMoveDownItem = computed(() => canMoveDown(props.id));

// 事件处理
const handleSelect = () => {
  selectItem(props as any);
};

const handleCopy = () => {
  copyItem(props.id);
};

const handleDelete = () => {
  removeItem(props.id);
};

const handleMoveUp = () => {
  moveItemUp(props.id);
};

const handleMoveDown = () => {
  moveItemDown(props.id);
};
</script>

<style scoped lang="scss">
.with-action-form-item {
  position: relative;
  margin-bottom: 8px;
  padding: 12px;
  border: 2px solid transparent;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #d9d9d9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    .action-buttons {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  &.selected {
    border-color: #1890ff;
    background-color: #e6f7ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    
    .action-buttons {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .form-item-content {
    pointer-events: none;
  }
  
  .action-buttons {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    gap: 4px;
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.2s ease;
    
    .action-btn {
      width: 28px;
      height: 28px;
      border: none;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(4px);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      transition: all 0.2s ease;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      
      &:hover {
        transform: scale(1.1);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      }
      
      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        transform: none;
      }
      
      &.copy-btn:hover {
        background-color: #e6f7ff;
        color: #1890ff;
      }
      
      &.up-btn:hover,
      &.down-btn:hover {
        background-color: #f6ffed;
        color: #52c41a;
      }
      
      &.delete-btn:hover {
        background-color: #fff2f0;
        color: #ff4d4f;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .with-action-form-item {
    .action-buttons {
      position: static;
      opacity: 1;
      transform: none;
      margin-top: 8px;
      justify-content: center;
      
      .action-btn {
        width: 32px;
        height: 32px;
        font-size: 16px;
      }
    }
  }
}
</style>