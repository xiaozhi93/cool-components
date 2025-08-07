<template>
  <div class="demo-container">
    <h3>CoolFormGroup 结合 CoolForm 表单使用示例</h3>
    
    <CoolForm :model="formData">
      <!-- 基本信息组 -->
      <CoolFormGroup 
        label="基本信息" 
        tooltip="请填写用户的基本信息"
        :collapsible="'icon'"
        :default-collapsed="false"
      >
        <CoolFormField
          :name="['basic', 'name']"
          v-model:value="formData.basic.name"
          label="姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请输入姓名' }]"
        />
        <CoolFormField
          :name="['basic', 'age']"
          v-model:value="formData.basic.age"
          label="年龄"
          type="digit"
          placeholder="请输入年龄"
          :rules="[{ required: true, message: '请输入年龄' }]"
        />
        <CoolFormField
          :name="['basic', 'email']"
          v-model:value="formData.basic.email"
          label="邮箱"
          type="text"
          placeholder="请输入邮箱"
          :rules="[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入正确的邮箱格式' }
          ]"
        />
      </CoolFormGroup>

      <!-- 联系信息组 -->
      <CoolFormGroup 
        label="联系信息" 
        tooltip="请填写详细的联系信息"
        :collapsible="'title'"
        :default-collapsed="true"
        :grid="true"
      >
        <CoolFormField
          :name="['contact', 'phone']"
          v-model:value="formData.contact.phone"
          label="手机号码"
          type="text"
          placeholder="请输入手机号码"
          :rules="[
            { required: true, message: '请输入手机号码' },
            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
          ]"
        />
        <CoolFormField
          :name="['contact', 'address']"
          v-model:value="formData.contact.address"
          label="详细地址"
          type="text"
          placeholder="请输入详细地址"
          :rules="[{ required: true, message: '请输入详细地址' }]"
        />
      </CoolFormGroup>

      <!-- 工作信息组 -->
      <CoolFormGroup 
        label="工作信息" 
        tooltip="请填写工作相关信息"
        :collapsible="false"
        :grid="true"
        :row-props="{ gutter: 16 }"
      >
        <CoolFormField
          :name="['work', 'company']"
          v-model:value="formData.work.company"
          label="公司名称"
          type="text"
          placeholder="请输入公司名称"
          :rules="[{ required: true, message: '请输入公司名称' }]"
        />
        <CoolFormField
          :name="['work', 'position']"
          v-model:value="formData.work.position"
          label="职位"
          type="text"
          placeholder="请输入职位"
          :rules="[{ required: true, message: '请输入职位' }]"
        />
      </CoolFormGroup>
    </CoolForm>
    
    <!-- 数据预览 -->
    <div class="data-preview">
      <h4>表单数据预览：</h4>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import CoolForm from '../../cool-form/index.vue';
import CoolFormGroup from '../index.vue';
import CoolFormField from '../../cool-form-field/index';

interface BasicInfo {
  name: string;
  age: number | undefined;
  email: string;
}

interface ContactInfo {
  phone: string;
  address: string;
}

interface WorkInfo {
  company: string;
  position: string;
}

interface FormData {
  basic: BasicInfo;
  contact: ContactInfo;
  work: WorkInfo;
}

const formData = reactive<FormData>({
  basic: {
    name: '',
    age: undefined,
    email: ''
  },
  contact: {
    phone: '',
    address: ''
  },
  work: {
    company: '',
    position: ''
  }
});

</script>

<style scoped lang="scss">
.demo-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.form-actions {
  margin-top: 32px;
  text-align: center;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 6px;
  
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
    max-height: 400px;
    overflow-y: auto;
  }
}

:deep(.cool-form-group) {
  margin-bottom: 24px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  overflow: hidden;
  
  .cool-form-group-title {
    background: #fafafa;
    padding: 12px 16px;
    border-bottom: 1px solid #d9d9d9;
    font-weight: 500;
    color: #262626;
  }
  
  .cool-form-group-content {
    padding: 16px;
    background: white;
  }
}
</style>
