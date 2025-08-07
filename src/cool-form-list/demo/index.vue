<template>
  <div class="demo-container">
    <h3>CoolFormList 结合 CoolForm 表单使用示例</h3>
    
    <CoolForm>
      <CoolFormList v-model:value="formData.items">
        <template #default="{ list, actions }">
          <div class="form-list-container">
            <div v-for="(item, index) in list" :key="index" class="form-item">
              <div class="item-header">
                <span class="item-title">项目 {{ index + 1 }}</span>
                <a-button 
                  type="text" 
                  danger 
                  size="small"
                  @click="removeItem(index)"
                >
                  删除
                </a-button>
              </div>
              <div class="item-content">
                <CoolFormField
                  :name="`items.${index}.name`"
                  v-model:value="item.name"
                  label="名称"
                  placeholder="请输入名称"
                  :rules="[{ required: true, message: '请输入名称' }]"
                />
                <CoolFormField
                  :name="`items.${index}.age`"
                  v-model:value="item.age"
                  label="年龄"
                  type="digit"
                  placeholder="请输入年龄"
                  :rules="[{ required: true, message: '请输入年龄' }]"
                />
                <CoolFormField
                  :name="`items.${index}.email`"
                  v-model:value="item.email"
                  label="邮箱"
                  type="text"
                  placeholder="请输入邮箱"
                  :rules="[{ required: true, message: '请输入邮箱' }]"
                />
              </div>
            </div>
            
            <div class="add-button-container">
              <a-button type="dashed" @click="actions.add">
                <PlusOutlined />
                添加项目
              </a-button>
            </div>
          </div>
        </template>
      </CoolFormList>
    </CoolForm>
    
    <div class="data-preview">
      <h4>数据预览：</h4>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CoolForm from '../../cool-form/index.vue';
import CoolFormList from '../index.vue';
import CoolFormField from '../../cool-form-field/index';
import { PlusOutlined } from '@ant-design/icons-vue';

interface FormItem {
  name: string;
  age: number | undefined;
  email: string;
}

interface FormData {
  items: FormItem[];
}

const formData = ref<FormData>({
  items: [
    {
      name: '张三',
      age: 25,
      email: 'zhangsan@example.com'
    }
  ]
});

const removeItem = (index: number) => {
  formData.value.items.splice(index, 1);
};

const handleSubmit = () => {
  console.log('提交数据:', formData.value);
  alert('数据已提交，请查看控制台');
};

const handleReset = () => {
  formData.value.items = [
    {
      name: '',
      age: undefined,
      email: ''
    }
  ];
};
</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.form-list-container {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 16px;
  background: #fafafa;
}

.form-item {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  background: white;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.item-title {
  font-weight: 500;
  color: #262626;
}

.item-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.add-button-container {
  text-align: center;
  padding: 16px 0;
}

.form-actions {
  margin-top: 24px;
  text-align: center;
  
  .ant-btn {
    margin: 0 8px;
  }
}

.data-preview {
  margin-top: 32px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 6px;
  
  h4 {
    margin: 0 0 12px 0;
    color: #262626;
  }
  
  pre {
    background: white;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    overflow-x: auto;
    font-size: 12px;
    line-height: 1.5;
  }
}
</style>