<template>
  <div class="property-panel">
    <div class="panel-content">
      <div v-if="selectedItem" class="property-editor">
        <h3>属性设置</h3>
        <div class="property-group">
          <label>标签名称</label>
          <input 
            v-model="selectedItem.label" 
            @input="handlePropertyChange('label', selectedItem.label)"
            type="text" 
            placeholder="请输入标签名称"
          />
        </div>
        <div class="property-group">
          <label>字段名称</label>
          <input 
            v-model="selectedItem.name" 
            @input="handlePropertyChange('name', selectedItem.name)"
            type="text" 
            placeholder="请输入字段名称"
          />
        </div>
        <div class="property-actions">
          <button @click="handleDeleteItem" class="delete-btn">删除控件</button>
        </div>
      </div>
      <div v-else class="no-selection">
        <p>请选择一个控件进行属性设置</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDesignerContext, type FormItem } from '../../hooks/useDesigner';

const { designer, updateItem, removeItem, getSelectedItem } = useDesignerContext();

const selectedItem = computed(() => getSelectedItem());

const handlePropertyChange = (key: string, value: any) => {
  if (selectedItem.value) {
    updateItem(selectedItem.value.key, { [key]: value });
  }
};

const handleDeleteItem = () => {
  if (selectedItem.value) {
    removeItem(selectedItem.value.key);
  }
};
</script>

<style lang="scss" scoped>
.property-panel {
  .panel-content {
    padding: 16px;
    
    .property-editor {
      h3 {
        margin-bottom: 16px;
        color: #333;
        font-size: 16px;
        font-weight: 500;
      }
      
      .property-group {
        margin-bottom: 16px;
        
        label {
          display: block;
          margin-bottom: 4px;
          color: #666;
          font-size: 14px;
        }
        
        input, select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d9d9d9;
          border-radius: 4px;
          font-size: 14px;
          
          &:focus {
            outline: none;
            border-color: #1890ff;
            box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
          }
        }
      }
      
      .property-actions {
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid #e8e8e8;
        
        .delete-btn {
          width: 100%;
          padding: 8px 16px;
          background-color: #ff4d4f;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          
          &:hover {
            background-color: #ff7875;
          }
        }
      }
    }
    
    .no-selection {
      text-align: center;
      color: #999;
      padding: 40px 20px;
      
      p {
        margin: 0;
        font-size: 14px;
      }
    }
  }
}
</style> 