<template>
  <div class="cool-form-demo">
    <!-- 头部介绍 -->
    <div class="demo-header">
      <h1>📝 CoolForm 垂直表单组件</h1>
      <p class="demo-desc">
        基于 CoolBaseForm 的简化版本，专注于垂直布局的表单设计，提供更简洁的API和优雅的用户体验。
      </p>
    </div>

    <!-- 基础用法示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>🚀 基础用法</h2>
        <span class="section-badge">垂直布局</span>
      </div>
      
      <div class="demo-content">
        <div class="example-wrapper">
          <CoolForm
            :model="basicFormData"
            :rules="basicRules"
            :on-finish="handleBasicSubmit"
            :on-reset="handleBasicReset"
          >
            <a-form-item label="用户名" name="username">
              <a-input v-model:value="basicFormData.username" placeholder="请输入用户名" />
            </a-form-item>
            
            <a-form-item label="邮箱地址" name="email">
              <a-input v-model:value="basicFormData.email" placeholder="请输入邮箱地址" />
            </a-form-item>
            
            <a-form-item label="手机号码" name="phone">
              <a-input v-model:value="basicFormData.phone" placeholder="请输入手机号码" />
            </a-form-item>
            
            <a-form-item label="个人简介" name="bio">
              <a-textarea v-model:value="basicFormData.bio" placeholder="请输入个人简介" :rows="4" />
            </a-form-item>
          </CoolForm>
        </div>
      </div>
    </section>

    <!-- 与 CoolFormField 配合使用 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>🔧 CoolFormField 字段组件</h2>
        <span class="section-badge">动态字段</span>
      </div>
      
      <div class="demo-content">
        <div class="example-wrapper">
          <CoolForm
            :model="fieldFormData"
            :rules="fieldRules"
            :on-finish="handleFieldSubmit"
            :on-reset="handleFieldReset"
          >
            <CoolFormField 
              value-type="text" 
              label="姓名" 
              name="name" 
              v-model:value="fieldFormData.name" 
              placeholder="请输入姓名"
            />
            
            <CoolFormField 
              value-type="digit" 
              label="年龄" 
              name="age" 
              v-model:value="fieldFormData.age" 
              placeholder="请输入年龄"
            />
            
            <CoolFormField 
              value-type="money" 
              label="期望薪资" 
              name="salary" 
              v-model:value="fieldFormData.salary" 
              placeholder="请输入期望薪资"
            />
            
            <CoolFormField 
              value-type="select" 
              label="工作城市" 
              name="city" 
              v-model:value="fieldFormData.city" 
              placeholder="请选择工作城市"
              :options="cityOptions"
            />
            
            <CoolFormField 
              value-type="date" 
              label="可入职时间" 
              name="availableDate" 
              v-model:value="fieldFormData.availableDate" 
              placeholder="请选择可入职时间"
            />
            
            <CoolFormField 
              value-type="switch" 
              label="是否接受出差" 
              name="travelAccept" 
              v-model:value="fieldFormData.travelAccept"
            />
          </CoolForm>
        </div>
      </div>
    </section>

    <!-- 与 CoolField 配合使用 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>📋 CoolField 通用字段</h2>
        <span class="section-badge">编辑/只读</span>
      </div>
      
      <div class="demo-content">
        <div class="field-mode-switcher">
          <a-space>
            <a-button 
              :type="fieldMode === 'edit' ? 'primary' : 'default'" 
              @click="fieldMode = 'edit'"
              icon="edit"
            >
              编辑模式
            </a-button>
            <a-button 
              :type="fieldMode === 'read' ? 'primary' : 'default'" 
              @click="fieldMode = 'read'"
              icon="eye"
            >
              只读模式
            </a-button>
          </a-space>
        </div>
        
        <div class="example-wrapper">
          <CoolForm
            :model="coolFieldFormData"
            :on-finish="handleCoolFieldSubmit"
            :on-reset="handleCoolFieldReset"
            :submitter="fieldMode === 'edit'"
          >
            <a-form-item label="项目名称" name="projectName">
              <CoolField 
                value-type="text" 
                :mode="fieldMode"
                v-model:value="coolFieldFormData.projectName" 
                placeholder="请输入项目名称"
              />
            </a-form-item>
            
            <a-form-item label="项目预算" name="budget">
              <CoolField 
                value-type="money" 
                :mode="fieldMode"
                v-model:value="coolFieldFormData.budget" 
                placeholder="请输入项目预算"
              />
            </a-form-item>
            
            <a-form-item label="完成度" name="progress">
              <CoolField 
                value-type="percent" 
                :mode="fieldMode"
                v-model:value="coolFieldFormData.progress" 
                placeholder="请输入完成度"
              />
            </a-form-item>
            
            <a-form-item label="项目状态" name="status">
              <CoolField 
                value-type="select" 
                :mode="fieldMode"
                v-model:value="coolFieldFormData.status" 
                placeholder="请选择项目状态"
                :options="statusOptions"
              />
            </a-form-item>
            
            <a-form-item label="开始时间" name="startDate">
              <CoolField 
                value-type="date" 
                :mode="fieldMode"
                v-model:value="coolFieldFormData.startDate" 
                placeholder="请选择开始时间"
              />
            </a-form-item>
            
            <a-form-item label="是否紧急" name="urgent">
              <CoolField 
                value-type="switch" 
                :mode="fieldMode"
                v-model:value="coolFieldFormData.urgent"
              />
            </a-form-item>
            
            <a-form-item label="项目描述" name="description">
              <CoolField 
                value-type="textarea" 
                :mode="fieldMode"
                v-model:value="coolFieldFormData.description" 
                placeholder="请输入项目描述"
                :rows="4"
              />
            </a-form-item>
          </CoolForm>
        </div>
      </div>
    </section>

    <!-- 异步提交示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>⚡ 异步提交处理</h2>
        <span class="section-badge">异步操作</span>
      </div>
      
      <div class="demo-content">
        <div class="example-wrapper">
          <CoolForm
            ref="asyncFormRef"
            :model="asyncFormData"
            :rules="asyncRules"
            :on-finish="handleAsyncSubmit"
            :on-reset="handleAsyncReset"
          >
            <a-form-item label="文章标题" name="title">
              <a-input v-model:value="asyncFormData.title" placeholder="请输入文章标题" />
            </a-form-item>
            
            <a-form-item label="文章分类" name="category">
              <a-select v-model:value="asyncFormData.category" placeholder="请选择文章分类">
                <a-select-option value="tech">技术文章</a-select-option>
                <a-select-option value="life">生活随笔</a-select-option>
                <a-select-option value="travel">旅行游记</a-select-option>
                <a-select-option value="food">美食探店</a-select-option>
              </a-select>
            </a-form-item>
            
            <a-form-item label="标签" name="tags">
              <a-select 
                v-model:value="asyncFormData.tags" 
                mode="tags" 
                placeholder="请输入或选择标签"
                :options="tagOptions"
              />
            </a-form-item>
            
            <a-form-item label="发布状态" name="status">
              <a-radio-group v-model:value="asyncFormData.status">
                <a-radio value="draft">草稿</a-radio>
                <a-radio value="published">发布</a-radio>
                <a-radio value="scheduled">定时发布</a-radio>
              </a-radio-group>
            </a-form-item>
            
            <a-form-item label="文章内容" name="content">
              <a-textarea 
                v-model:value="asyncFormData.content" 
                placeholder="请输入文章内容" 
                :rows="6" 
              />
            </a-form-item>
            
            <!-- 自定义提交器 -->
            <template #submitter="{ submit, reset }">
              <div class="custom-submitter">
                <a-space>
                  <a-button @click="reset" icon="reload">
                    重置
                  </a-button>
                  <a-button @click="handleSaveDraft" icon="save">
                    保存草稿
                  </a-button>
                  <a-button type="primary" @click="submit" icon="send">
                    发布文章
                  </a-button>
                </a-space>
              </div>
            </template>
          </CoolForm>
          
          <div class="form-actions">
            <a-space>
              <a-button @click="validateAsyncForm">验证表单</a-button>
              <a-button @click="getAsyncFormValues">获取表单值</a-button>
              <a-button @click="setAsyncFormValues">填充示例数据</a-button>
              <a-button @click="clearAsyncValidation">清除验证</a-button>
            </a-space>
          </div>
        </div>
      </div>
    </section>

    <!-- 复杂表单示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>🎯 复杂表单示例</h2>
        <span class="section-badge">综合应用</span>
      </div>
      
      <div class="demo-content">
        <div class="example-wrapper">
          <CoolForm
            :model="complexFormData"
            :rules="complexRules"
            :on-finish="handleComplexSubmit"
            :on-reset="handleComplexReset"
          >
            <!-- 基础信息 -->
            <div class="form-section">
              <h3 class="section-title">基础信息</h3>
              <a-row :gutter="16">
                <a-col :span="12">
                  <CoolFormField 
                    value-type="text" 
                    label="公司名称" 
                    name="companyName" 
                    v-model:value="complexFormData.companyName" 
                    placeholder="请输入公司名称"
                  />
                </a-col>
                <a-col :span="12">
                  <CoolFormField 
                    value-type="select" 
                    label="公司规模" 
                    name="companySize" 
                    v-model:value="complexFormData.companySize" 
                    placeholder="请选择公司规模"
                    :options="companySizeOptions"
                  />
                </a-col>
              </a-row>
              
              <a-row :gutter="16">
                <a-col :span="12">
                  <CoolFormField 
                    value-type="date" 
                    label="成立时间" 
                    name="establishDate" 
                    v-model:value="complexFormData.establishDate" 
                    placeholder="请选择成立时间"
                  />
                </a-col>
                <a-col :span="12">
                  <CoolFormField 
                    value-type="money" 
                    label="注册资本" 
                    name="registeredCapital" 
                    v-model:value="complexFormData.registeredCapital" 
                    placeholder="请输入注册资本"
                  />
                </a-col>
              </a-row>
            </div>

            <!-- 联系信息 -->
            <div class="form-section">
              <h3 class="section-title">联系信息</h3>
              <a-row :gutter="16">
                <a-col :span="12">
                  <a-form-item label="联系人" name="contactName">
                    <a-input v-model:value="complexFormData.contactName" placeholder="请输入联系人姓名" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="联系电话" name="contactPhone">
                    <a-input v-model:value="complexFormData.contactPhone" placeholder="请输入联系电话" />
                  </a-form-item>
                </a-col>
              </a-row>
              
              <a-form-item label="公司地址" name="address">
                <a-textarea v-model:value="complexFormData.address" placeholder="请输入详细地址" :rows="2" />
              </a-form-item>
            </div>

            <!-- 业务信息 -->
            <div class="form-section">
              <h3 class="section-title">业务信息</h3>
              <CoolFormField 
                value-type="textarea" 
                label="主营业务" 
                name="businessScope" 
                v-model:value="complexFormData.businessScope" 
                placeholder="请描述公司主营业务"
                :rows="3"
              />
              
              <CoolFormField 
                value-type="switch" 
                label="是否上市公司" 
                name="isPublic" 
                v-model:value="complexFormData.isPublic"
              />
            </div>
          </CoolForm>
        </div>
      </div>
    </section>

    <!-- 数据展示 -->
    <div class="data-display">
      <h3 style="color: #ecf0f1; margin-bottom: 16px; font-size: 18px;">
        📊 表单数据状态
      </h3>
      <div class="data-tabs">
        <a-tabs v-model:active-key="activeDataTab" type="card">
          <a-tab-pane key="basic" tab="基础表单">
            <pre>{{ JSON.stringify(basicFormData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="field" tab="字段表单">
            <pre>{{ JSON.stringify(fieldFormData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="coolField" tab="通用字段">
            <div style="margin-bottom: 12px; color: #64748b;">
              当前模式: <span :style="{ color: fieldMode === 'edit' ? '#22c55e' : '#f59e0b', fontWeight: 'bold' }">
                {{ fieldMode === 'edit' ? '编辑模式' : '只读模式' }}
              </span>
            </div>
            <pre>{{ JSON.stringify(coolFieldFormData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="async" tab="异步表单">
            <pre>{{ JSON.stringify(asyncFormData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="complex" tab="复杂表单">
            <pre>{{ JSON.stringify(complexFormData, null, 2) }}</pre>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { 
  message, 
  Button as AButton, 
  FormItem as AFormItem,
  Input as AInput,
  Textarea as ATextarea,
  Select as ASelect,
  SelectOption as ASelectOption,
  RadioGroup as ARadioGroup,
  Radio as ARadio,
  Tabs as ATabs, 
  TabPane as ATabPane, 
  Space as ASpace, 
  Col as ACol, 
  Row as ARow
} from 'ant-design-vue'
import CoolForm from '../index.vue'
import CoolFormField from '../../cool-form-field/index'
import CoolField from '../../cool-field/index.vue'

// 表单引用
const asyncFormRef = ref()

// 基础表单数据
const basicFormData = reactive({
  username: '',
  email: '',
  phone: '',
  bio: ''
})

// 基础验证规则
const basicRules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 3, max: 20, message: '用户名长度为3-20个字符' }
  ],
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '邮箱格式不正确' }
  ],
  phone: [
    { required: true, message: '请输入手机号码' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确' }
  ]
}

// 字段表单数据
const fieldFormData = reactive({
  name: '',
  age: null,
  salary: null,
  city: '',
  availableDate: '',
  travelAccept: false
})

// 字段验证规则
const fieldRules = {
  name: [
    { required: true, message: '请输入姓名' }
  ],
  age: [
    { required: true, message: '请输入年龄' },
    { type: 'number', min: 18, max: 65, message: '年龄应在18-65之间' }
  ],
  city: [
    { required: true, message: '请选择工作城市' }
  ]
}

// 城市选项
const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' },
  { label: '成都', value: 'chengdu' }
]

// CoolField 表单数据
const coolFieldFormData = reactive({
  projectName: '酷炫组件库项目',
  budget: 100000,
  progress: 75,
  status: 'active',
  startDate: '2023-01-01',
  urgent: true,
  description: '这是一个基于Vue 3和TypeScript的现代化组件库项目，旨在提供高质量、易用的UI组件。'
})

// 字段模式
const fieldMode = ref<'edit' | 'read'>('edit')

// 状态选项
const statusOptions = [
  { label: '进行中', value: 'active', color: 'green' },
  { label: '已完成', value: 'completed', color: 'blue' },
  { label: '已暂停', value: 'paused', color: 'orange' },
  { label: '已取消', value: 'cancelled', color: 'red' }
]

// 异步表单数据
const asyncFormData = reactive({
  title: '',
  category: '',
  tags: [],
  status: 'draft',
  content: ''
})

// 异步验证规则
const asyncRules = {
  title: [
    { required: true, message: '请输入文章标题' },
    { min: 5, max: 100, message: '标题长度为5-100个字符' }
  ],
  category: [
    { required: true, message: '请选择文章分类' }
  ],
  content: [
    { required: true, message: '请输入文章内容' },
    { min: 50, message: '文章内容至少50个字符' }
  ]
}

// 标签选项
const tagOptions = [
  { label: 'Vue.js', value: 'vue' },
  { label: 'TypeScript', value: 'typescript' },
  { label: '前端开发', value: 'frontend' },
  { label: '组件库', value: 'component' },
  { label: '开源项目', value: 'opensource' }
]

// 复杂表单数据
const complexFormData = reactive({
  companyName: '',
  companySize: '',
  establishDate: '',
  registeredCapital: null,
  contactName: '',
  contactPhone: '',
  address: '',
  businessScope: '',
  isPublic: false
})

// 复杂表单验证规则
const complexRules = {
  companyName: [
    { required: true, message: '请输入公司名称' }
  ],
  companySize: [
    { required: true, message: '请选择公司规模' }
  ],
  contactName: [
    { required: true, message: '请输入联系人姓名' }
  ],
  contactPhone: [
    { required: true, message: '请输入联系电话' }
  ]
}

// 公司规模选项
const companySizeOptions = [
  { label: '1-20人', value: 'small' },
  { label: '21-100人', value: 'medium' },
  { label: '101-500人', value: 'large' },
  { label: '500人以上', value: 'huge' }
]

// 当前激活的数据标签
const activeDataTab = ref('basic')

// 事件处理函数
const handleBasicSubmit = async (values: any) => {
  console.log('基础表单提交:', values)
  await new Promise(resolve => setTimeout(resolve, 1000))
  message.success('基础表单提交成功！')
}

const handleBasicReset = () => {
  console.log('基础表单重置')
  message.info('基础表单已重置')
}

const handleFieldSubmit = async (values: any) => {
  console.log('字段表单提交:', values)
  await new Promise(resolve => setTimeout(resolve, 1200))
  message.success('字段表单提交成功！')
}

const handleFieldReset = () => {
  console.log('字段表单重置')
  message.info('字段表单已重置')
}

const handleCoolFieldSubmit = async (values: any) => {
  console.log('通用字段表单提交:', values)
  await new Promise(resolve => setTimeout(resolve, 800))
  message.success('通用字段表单提交成功！')
}

const handleCoolFieldReset = () => {
  console.log('通用字段表单重置')
  message.info('通用字段表单已重置')
}

const handleAsyncSubmit = async (values: any) => {
  console.log('异步表单提交:', values)
  // 模拟API调用
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve(undefined)
        } else {
          reject(new Error('模拟API调用失败'))
        }
      }, 2000)
    })
    message.success('文章发布成功！')
  } catch (error) {
    message.error('发布失败，请重试')
    throw error
  }
}

const handleAsyncReset = () => {
  console.log('异步表单重置')
  message.info('异步表单已重置')
}

const handleSaveDraft = () => {
  console.log('保存草稿:', asyncFormData)
  message.success('草稿保存成功！')
}

const handleComplexSubmit = async (values: any) => {
  console.log('复杂表单提交:', values)
  await new Promise(resolve => setTimeout(resolve, 1500))
  message.success('公司信息提交成功！')
}

const handleComplexReset = () => {
  console.log('复杂表单重置')
  message.info('复杂表单已重置')
}

// 异步表单操作方法
const validateAsyncForm = async () => {
  try {
    const values = await asyncFormRef.value?.validate()
    console.log('表单验证通过:', values)
    message.success('表单验证通过！')
  } catch (error) {
    message.error('表单验证失败！')
  }
}

const getAsyncFormValues = () => {
  console.log('当前表单值:', asyncFormData)
  message.info('请查看控制台获取表单值')
}

const setAsyncFormValues = () => {
  Object.assign(asyncFormData, {
    title: 'Vue 3 组件库开发实践',
    category: 'tech',
    tags: ['vue', 'typescript', 'component'],
    status: 'published',
    content: '在现代前端开发中，组件库是提高开发效率的重要工具。本文将分享Vue 3组件库的开发实践，包括设计理念、技术选型、开发流程等内容。通过合理的架构设计和规范的开发流程，我们可以构建出高质量、易维护的组件库。'
  })
  message.success('示例数据填充成功！')
}

const clearAsyncValidation = () => {
  asyncFormRef.value?.clearValidate()
  message.info('验证状态已清除')
}
</script>

<style lang="scss" scoped>
.cool-form-demo {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 0;
  
  // 头部介绍样式
  .demo-header {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    text-align: center;
    padding: 60px 20px;
    margin-bottom: 0;
    
    h1 {
      font-size: 48px;
      font-weight: 700;
      margin: 0 0 20px 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .demo-desc {
      font-size: 18px;
      line-height: 1.6;
      opacity: 0.95;
      max-width: 800px;
      margin: 0 auto;
    }
  }
  
  // 章节样式
  .demo-section {
    background: white;
    margin: 40px auto 0 auto;
    max-width: 1200px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    
    .section-header {
      background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
      padding: 24px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      h2 {
        color: #2c3e50;
        font-size: 24px;
        font-weight: 600;
        margin: 0;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .section-badge {
        background: rgba(255, 255, 255, 0.8);
        color: #2c3e50;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        backdrop-filter: blur(10px);
      }
    }
    
    .demo-content {
      padding: 32px;
    }
  }
  
  // 示例包装器
  .example-wrapper {
    background: #fafbfc;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e8e8e8;
  }
  
  // 字段模式切换
  .field-mode-switcher {
    margin-bottom: 20px;
    padding: 16px;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px dashed #cbd5e1;
    text-align: center;
  }
  
  // 表单区块
  .form-section {
    margin-bottom: 32px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    border: 1px solid #f0f0f0;
    
    .section-title {
      color: #2c3e50;
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 16px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid #e8e8e8;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  // 自定义提交器
  .custom-submitter {
    text-align: center;
    padding: 16px;
    background: white;
    border-radius: 8px;
    border: 1px solid #f0f0f0;
    margin-top: 16px;
  }
  
  // 表单操作
  .form-actions {
    margin-top: 16px;
    padding: 16px;
    background: white;
    border-radius: 8px;
    border: 1px solid #f0f0f0;
  }
  
  // 数据显示
  .data-display {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    border-radius: 12px;
    padding: 24px;
    color: #ecf0f1;
    font-size: 14px;
    line-height: 1.6;
    max-width: 1200px;
    margin: 40px auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    
    .data-tabs {
      margin-top: 16px;
      
      :deep(.ant-tabs-card) {
        .ant-tabs-tab {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
          
          &.ant-tabs-tab-active {
            background: rgba(255, 255, 255, 0.2);
            color: white;
          }
        }
        
        .ant-tabs-content-holder {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 16px;
        }
      }
      
      pre {
        margin: 0;
        color: #ecf0f1;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 12px;
        line-height: 1.4;
        white-space: pre-wrap;
        word-break: break-all;
      }
    }
  }
  
  // 响应式
  @media (max-width: 768px) {
    .demo-header {
      padding: 40px 20px;
      
      h1 {
        font-size: 36px;
      }
      
      .demo-desc {
        font-size: 16px;
      }
    }
    
    .demo-content {
      padding: 20px;
    }
    
    .form-section {
      :deep(.ant-col) {
        margin-bottom: 8px;
      }
    }
  }
}

// 全局样式覆盖
:deep(.ant-form-item) {
  margin-bottom: 20px;
}

:deep(.ant-form-item-label) {
  font-weight: 600;
  color: #2c3e50;
}

:deep(.ant-input),
:deep(.ant-select),
:deep(.ant-textarea),
:deep(.ant-picker),
:deep(.ant-input-number) {
  border-radius: 6px;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #4facfe;
    box-shadow: 0 2px 8px rgba(79, 172, 254, 0.2);
  }
  
  &:focus {
    border-color: #4facfe;
    box-shadow: 0 0 0 2px rgba(79, 172, 254, 0.2);
  }
}

:deep(.ant-btn) {
  border-radius: 6px;
  font-weight: 500;
  
  &.ant-btn-primary {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    border: none;
    
    &:hover {
      background: linear-gradient(135deg, #3b9cfd 0%, #00e8fd 100%);
    }
  }
}

:deep(.cool-base-form__submitter) {
  margin-top: 24px;
}
</style>
