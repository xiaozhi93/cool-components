<template>
  <div class="cool-base-form-demo">
    <!-- 头部介绍 -->
    <div class="demo-header">
      <h1>📋 CoolBaseForm 增强表单组件</h1>
      <p class="demo-desc">
        基于 Ant Design Vue 的 a-form 组件增强，提供便捷的提交器插槽、异步回调处理和完整的表单功能封装。
      </p>
    </div>

    <!-- 基础用法示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>📝 基础用法</h2>
        <span class="section-badge">基础表单</span>
      </div>
      
      <div class="demo-content">
        <div class="example-wrapper">
          <CoolBaseForm
            :model="basicFormData"
            :rules="basicRules"
            layout="vertical"
            :grid="true"
            :row-props="{ gutter: 16 }"
            :col-props="{ span: 8 }"
          >
            <CoolFormField value-type="text" label="用户名" name="username" v-model:value="basicFormData.username" placeholder="请输入用户名" />
            
            <CoolFormField value-type="text" label="邮箱" name="email" v-model:value="basicFormData.email" placeholder="请输入邮箱地址" />
            
            <CoolFormField value-type="password" label="密码" name="password" v-model:value="basicFormData.password" placeholder="请输入密码" />
            
            <CoolFormField value-type="textarea" label="个人简介" name="bio" v-model:value="basicFormData.bio" placeholder="请输入个人简介" :rows="4" />
          </CoolBaseForm>
        </div>
      </div>
    </section>

    <!-- 自定义提交器 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>🎨 自定义提交器</h2>
        <span class="section-badge">插槽定制</span>
      </div>
      
      <div class="demo-content">
        <div class="custom-examples">
          <!-- 自定义提交器配置 -->
          <div class="example-item">
            <h3>配置式提交器</h3>
            <CoolBaseForm
              :model="customFormData"
              :on-finish="handleCustomSubmit"
              :on-reset="handleCustomReset"
            >
              <a-form-item label="项目名称" name="projectName">
                <a-input v-model:value="customFormData.projectName" placeholder="请输入项目名称" />
              </a-form-item>
              
              <a-form-item label="项目描述" name="description">
                <a-textarea v-model:value="customFormData.description" placeholder="请输入项目描述" :rows="3" />
              </a-form-item>
            </CoolBaseForm>
          </div>

          <!-- 插槽式提交器 -->
          <div class="example-item">
            <h3>插槽式提交器</h3>
            <CoolBaseForm
              :model="slotFormData"
              :on-finish="handleSlotSubmit"
              :on-reset="handleSlotReset"
            >
              <a-form-item label="文章标题" name="title">
                <a-input v-model:value="slotFormData.title" placeholder="请输入文章标题" />
              </a-form-item>
              
              <a-form-item label="文章内容" name="content">
                <a-textarea v-model:value="slotFormData.content" placeholder="请输入文章内容" :rows="4" />
              </a-form-item>
              
                             <!-- 自定义提交器插槽 -->
               <template #submitter="{ submit, reset }">
                 <div class="custom-submitter">
                   <a-space>
                     <a-button @click="reset" icon="reload">
                       重置
                     </a-button>
                     <a-button @click="handleDraft" icon="save">
                       保存草稿
                     </a-button>
                     <a-button type="primary" @click="submit" icon="send">
                       发布文章
                     </a-button>
                   </a-space>
                 </div>
               </template>
            </CoolBaseForm>
          </div>
        </div>
      </div>
    </section>

    <!-- 高级功能 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>⚡ 高级功能</h2>
        <span class="section-badge">完整功能</span>
      </div>
      
      <div class="demo-content">
        <div class="advanced-examples">
          <!-- 异步提交示例 -->
          <div class="example-item">
            <h3>异步提交处理</h3>
            <CoolBaseForm
              ref="asyncFormRef"
              :model="asyncFormData"
              :rules="asyncRules"
              :on-finish="handleAsyncSubmit"
              :on-reset="handleAsyncReset"
              :submitter-props="{
                submitText: '异步提交',
                resetText: '重置表单'
              }"
            >
              <a-form-item label="API接口" name="apiUrl">
                <a-input v-model:value="asyncFormData.apiUrl" placeholder="请输入API接口地址" />
              </a-form-item>
              
              <a-form-item label="请求方法" name="method">
                <a-select v-model:value="asyncFormData.method" placeholder="请选择请求方法">
                  <a-select-option value="GET">GET</a-select-option>
                  <a-select-option value="POST">POST</a-select-option>
                  <a-select-option value="PUT">PUT</a-select-option>
                  <a-select-option value="DELETE">DELETE</a-select-option>
                </a-select>
              </a-form-item>
              
              <a-form-item label="请求参数" name="params">
                <a-textarea v-model:value="asyncFormData.params" placeholder="请输入请求参数（JSON格式）" :rows="3" />
              </a-form-item>
            </CoolBaseForm>
            
            <div class="form-actions">
              <a-space>
                <a-button @click="validateForm">验证表单</a-button>
                <a-button @click="getFormValues">获取表单值</a-button>
                <a-button @click="setFormValues">设置表单值</a-button>
                <a-button @click="clearValidation">清除验证</a-button>
              </a-space>
            </div>
          </div>

          <!-- 动态表单示例 -->
          <div class="example-item">
            <h3>动态表单字段</h3>
            <CoolBaseForm
              :model="dynamicFormData"
              :on-finish="handleDynamicSubmit"
            >
              <a-form-item label="表单名称" name="formName">
                <a-input v-model:value="dynamicFormData.formName" placeholder="请输入表单名称" />
              </a-form-item>
              
              <div class="dynamic-fields">
                <div 
                  v-for="(field, index) in dynamicFormData.fields" 
                  :key="index"
                  class="dynamic-field-item"
                >
                  <a-row :gutter="16" align="middle">
                    <a-col :span="8">
                      <a-form-item :name="['fields', index, 'label']" label="字段标签">
                        <a-input v-model:value="field.label" placeholder="字段标签" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item :name="['fields', index, 'type']" label="字段类型">
                        <a-select v-model:value="field.type" placeholder="选择类型">
                          <a-select-option value="text">文本</a-select-option>
                          <a-select-option value="number">数字</a-select-option>
                          <a-select-option value="email">邮箱</a-select-option>
                          <a-select-option value="textarea">多行文本</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="6">
                      <a-form-item :name="['fields', index, 'required']" label="是否必填">
                        <a-switch v-model:checked="field.required" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="2">
                      <a-button 
                        type="link" 
                        danger 
                        @click="removeDynamicField(index)"
                        icon="delete"
                      />
                    </a-col>
                  </a-row>
                </div>
              </div>
              
              <a-button 
                type="dashed" 
                @click="addDynamicField" 
                icon="plus"
                style="width: 100%; margin-bottom: 16px;"
              >
                添加字段
              </a-button>
            </CoolBaseForm>
          </div>
        </div>
      </div>
    </section>

    <!-- 只读模式示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>👁️ 只读模式</h2>
        <span class="section-badge">数据展示</span>
      </div>
      
      <div class="demo-content">
        <div class="readonly-examples">
          <!-- 基础只读表单 -->
          <div class="example-item">
            <h3>基础只读表单</h3>
            <p class="example-desc">展示表单数据的只读模式，所有字段都不可编辑</p>
            <CoolBaseForm
              :model="readonlyFormData"
              :readonly="true"
              :submitter="false"
              layout="vertical"
              :grid="true"
              :row-props="{ gutter: 16 }"
              :col-props="{ span: 8 }"
            >
              <CoolFormField 
                value-type="text" 
                label="用户名" 
                name="username" 
                v-model:value="readonlyFormData.username" 
              />
              
              <CoolFormField 
                value-type="text" 
                label="邮箱" 
                name="email" 
                v-model:value="readonlyFormData.email" 
              />
              
              <CoolFormField 
                value-type="digit" 
                label="年龄" 
                name="age" 
                v-model:value="readonlyFormData.age" 
              />
              
              <CoolFormField 
                value-type="select" 
                label="职位" 
                name="position" 
                v-model:value="readonlyFormData.position"
                :options="[
                  { label: '前端开发工程师', value: 'frontend' },
                  { label: '后端开发工程师', value: 'backend' },
                  { label: '全栈开发工程师', value: 'fullstack' },
                  { label: '产品经理', value: 'pm' }
                ]"
              />
              
              <CoolFormField 
                value-type="date" 
                label="入职日期" 
                name="joinDate" 
                v-model:value="readonlyFormData.joinDate" 
              />
              
              <CoolFormField 
                value-type="money" 
                label="薪资" 
                name="salary" 
                v-model:value="readonlyFormData.salary" 
              />
              
              <CoolFormField 
                value-type="percent" 
                label="股权比例" 
                name="equity" 
                v-model:value="readonlyFormData.equity" 
              />
              
              <CoolFormField 
                value-type="switch" 
                label="是否在职" 
                name="isActive" 
                v-model:value="readonlyFormData.isActive" 
              />
              
              <CoolFormField 
                value-type="textarea" 
                label="个人简介" 
                name="bio" 
                v-model:value="readonlyFormData.bio" 
                :col-props="{ span: 24 }"
              />
            </CoolBaseForm>
          </div>

          <!-- 可切换的编辑/只读模式 -->
          <div class="example-item">
            <h3>可切换编辑/只读模式</h3>
            <p class="example-desc">通过切换按钮来展示同一表单在编辑和只读模式下的不同表现</p>
            
            <div class="mode-switcher">
              <a-space>
                <a-button 
                  :type="editableMode ? 'primary' : 'default'" 
                  @click="editableMode = true"
                  icon="edit"
                >
                  编辑模式
                </a-button>
                <a-button 
                  :type="!editableMode ? 'primary' : 'default'" 
                  @click="editableMode = false"
                  icon="eye"
                >
                  只读模式
                </a-button>
              </a-space>
            </div>
            
            <CoolBaseForm
              :model="editableFormData"
              :readonly="!editableMode"
              :submitter="editableMode"
              :rules="editableRules"
              :on-finish="handleEditableSubmit"
              :on-reset="handleEditableReset"
              layout="vertical"
              :grid="true"
              :row-props="{ gutter: 16 }"
              :col-props="{ span: 12 }"
            >
              <CoolFormField 
                value-type="text" 
                label="项目名称" 
                name="projectName" 
                v-model:value="editableFormData.projectName" 
                placeholder="请输入项目名称"
              />
              
              <CoolFormField 
                value-type="select" 
                label="项目状态" 
                name="status" 
                v-model:value="editableFormData.status"
                placeholder="请选择项目状态"
                :options="[
                  { label: '进行中', value: 'active', color: 'green' },
                  { label: '已完成', value: 'completed', color: 'blue' },
                  { label: '已暂停', value: 'paused', color: 'orange' },
                  { label: '已取消', value: 'cancelled', color: 'red' }
                ]"
              />
              
              <CoolFormField 
                value-type="dateRange" 
                label="项目周期" 
                name="duration" 
                v-model:value="editableFormData.duration" 
                :col-props="{ span: 24 }"
              />
              
              <CoolFormField 
                value-type="digit" 
                label="团队人数" 
                name="teamSize" 
                v-model:value="editableFormData.teamSize" 
                placeholder="请输入团队人数"
              />
              
              <CoolFormField 
                value-type="money" 
                label="项目预算" 
                name="budget" 
                v-model:value="editableFormData.budget" 
                placeholder="请输入项目预算"
              />
              
              <CoolFormField 
                value-type="textarea" 
                label="项目描述" 
                name="description" 
                v-model:value="editableFormData.description" 
                placeholder="请输入项目描述"
                :rows="4"
                :col-props="{ span: 24 }"
              />
            </CoolBaseForm>
          </div>
        </div>
      </div>
    </section>

    <!-- 布局样式示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>🎯 布局样式</h2>
        <span class="section-badge">样式配置</span>
      </div>
      
      <div class="demo-content">
        <div class="layout-examples">
          <!-- 水平布局 -->
          <div class="layout-demo">
            <h3>水平布局</h3>
            <CoolBaseForm
              :model="layoutFormData"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              :on-finish="handleLayoutSubmit"
              :submitter-props="{
                submitText: '水平提交',
                align: 'center'
              }"
            >
              <a-form-item label="姓名" name="name">
                <a-input v-model:value="layoutFormData.name" placeholder="请输入姓名" />
              </a-form-item>
              
              <a-form-item label="年龄" name="age">
                <a-input-number v-model:value="layoutFormData.age" placeholder="请输入年龄" style="width: 100%" />
              </a-form-item>
            </CoolBaseForm>
          </div>

          <!-- 垂直布局 -->
          <div class="layout-demo">
            <h3>垂直布局</h3>
            <CoolBaseForm
              :model="layoutFormData"
              layout="vertical"
              :on-finish="handleLayoutSubmit"
            >
              <a-form-item label="公司名称" name="company">
                <a-input v-model:value="layoutFormData.company" placeholder="请输入公司名称" />
              </a-form-item>
              
              <a-form-item label="职位" name="position">
                <a-input v-model:value="layoutFormData.position" placeholder="请输入职位" />
              </a-form-item>
            </CoolBaseForm>
          </div>

          <!-- 内联布局 -->
          <div class="layout-demo">
            <h3>内联布局</h3>
            <CoolBaseForm
              :model="layoutFormData"
              layout="inline"
              :on-finish="handleLayoutSubmit"
            >
              <a-form-item label="关键词" name="keyword">
                <a-input v-model:value="layoutFormData.keyword" placeholder="搜索关键词" />
              </a-form-item>
              
              <a-form-item label="分类" name="category">
                <a-select v-model:value="layoutFormData.category" placeholder="选择分类" style="width: 120px">
                  <a-select-option value="all">全部</a-select-option>
                  <a-select-option value="tech">技术</a-select-option>
                  <a-select-option value="design">设计</a-select-option>
                </a-select>
              </a-form-item>
            </CoolBaseForm>
          </div>
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
          <a-tab-pane key="custom" tab="自定义表单">
            <pre>{{ JSON.stringify(customFormData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="slot" tab="插槽表单">
            <pre>{{ JSON.stringify(slotFormData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="async" tab="异步表单">
            <pre>{{ JSON.stringify(asyncFormData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="dynamic" tab="动态表单">
            <pre>{{ JSON.stringify(dynamicFormData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="layout" tab="布局表单">
            <pre>{{ JSON.stringify(layoutFormData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="readonly" tab="只读表单">
            <pre>{{ JSON.stringify(readonlyFormData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="editable" tab="可编辑表单">
            <div style="margin-bottom: 12px; color: #64748b;">
              当前模式: <span :style="{ color: editableMode ? '#22c55e' : '#f59e0b', fontWeight: 'bold' }">
                {{ editableMode ? '编辑模式' : '只读模式' }}
              </span>
            </div>
            <pre>{{ JSON.stringify(editableFormData, null, 2) }}</pre>
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
  InputNumber as AInputNumber,
  Textarea as ATextarea,
  Select as ASelect,
  SelectOption as ASelectOption,
  Switch as ASwitch,
  Tabs as ATabs, 
  TabPane as ATabPane, 
  Space as ASpace, 
  Col as ACol, 
  Row as ARow
} from 'ant-design-vue'
import CoolBaseForm from '../index'
import CoolFormField from '../../cool-form-field/index'

// 表单引用
const asyncFormRef = ref()

// 基础表单数据
const basicFormData = reactive({
  username: '',
  email: '',
  password: '',
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
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, message: '密码长度至少6个字符' }
  ]
}

// 自定义表单数据
const customFormData = reactive({
  projectName: '',
  description: ''
})

// 插槽表单数据
const slotFormData = reactive({
  title: '',
  content: ''
})

// 异步表单数据
const asyncFormData = reactive({
  apiUrl: '',
  method: '',
  params: ''
})

// 异步验证规则
const asyncRules = {
  apiUrl: [
    { required: true, message: '请输入API接口地址' },
    { type: 'url', message: '请输入正确的URL格式' }
  ],
  method: [
    { required: true, message: '请选择请求方法' }
  ]
}

// 动态表单数据
const dynamicFormData = reactive({
  formName: '',
  fields: [
    { label: '姓名', type: 'text', required: true },
    { label: '邮箱', type: 'email', required: true }
  ]
})

// 布局表单数据
const layoutFormData = reactive({
  name: '',
  age: null,
  company: '',
  position: '',
  keyword: '',
  category: ''
})

// 只读表单数据
const readonlyFormData = reactive({
  username: 'john_doe',
  email: 'john.doe@example.com',
  age: 28,
  position: 'frontend',
  joinDate: '2023-03-15',
  salary: 120000,
  equity: 0.5,
  isActive: true,
  bio: '资深前端开发工程师，拥有5年以上React和Vue开发经验，熟悉现代前端工程化技术栈，负责公司核心产品的前端架构设计和开发工作。'
})

// 可编辑/只读切换表单数据
const editableFormData = reactive({
  projectName: 'Cool Components 组件库',
  status: 'active',
  duration: ['2023-01-01', '2023-12-31'],
  teamSize: 8,
  budget: 500000,
  description: '基于Vue 3和TypeScript的现代化组件库项目，提供高质量的UI组件和开发工具，帮助开发者快速构建美观且功能丰富的Web应用程序。'
})

// 编辑模式状态
const editableMode = ref(true)

// 可编辑表单验证规则
const editableRules = {
  projectName: [
    { required: true, message: '请输入项目名称' },
    { min: 2, max: 50, message: '项目名称长度为2-50个字符' }
  ],
  status: [
    { required: true, message: '请选择项目状态' }
  ],
  teamSize: [
    { required: true, message: '请输入团队人数' },
    { type: 'number', min: 1, max: 100, message: '团队人数应在1-100之间' }
  ]
}

// 当前激活的数据标签
const activeDataTab = ref('basic')

// 事件处理函数
const handleBasicSubmit = async (values: any) => {
  console.log('基础表单提交:', values)
  // 模拟异步提交
  await new Promise(resolve => setTimeout(resolve, 3000))
  message.success('基础表单提交成功！')
}

const handleBasicReset = () => {
  console.log('基础表单重置')
  message.info('基础表单已重置')
}

const handleCustomSubmit = async (values: any) => {
  console.log('自定义表单提交:', values)
  await new Promise(resolve => setTimeout(resolve, 800))
  message.success('自定义表单提交成功！')
}

const handleCustomReset = () => {
  console.log('自定义表单重置')
  message.info('自定义表单已重置')
}

const handleSlotSubmit = async (values: any) => {
  console.log('插槽表单提交:', values)
  await new Promise(resolve => setTimeout(resolve, 1200))
  message.success('文章发布成功！')
}

const handleSlotReset = () => {
  console.log('插槽表单重置')
  message.info('插槽表单已重置')
}

const handleDraft = () => {
  console.log('保存草稿:', slotFormData)
  message.success('草稿保存成功！')
}

const handleAsyncSubmit = async (values: any) => {
  console.log('异步表单提交:', values)
  // 模拟API调用
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          resolve(undefined)
        } else {
          reject(new Error('模拟API调用失败'))
        }
      }, 2000)
    })
    message.success('异步提交成功！')
  } catch (error) {
    message.error('异步提交失败，请重试')
    throw error
  }
}

const handleAsyncReset = () => {
  console.log('异步表单重置')
  message.info('异步表单已重置')
}

const handleDynamicSubmit = async (values: any) => {
  console.log('动态表单提交:', values)
  await new Promise(resolve => setTimeout(resolve, 1000))
  message.success('动态表单提交成功！')
}

const handleLayoutSubmit = async (values: any) => {
  console.log('布局表单提交:', values)
  await new Promise(resolve => setTimeout(resolve, 500))
  message.success('布局表单提交成功！')
}

const handleEditableSubmit = async (values: any) => {
  console.log('可编辑表单提交:', values)
  await new Promise(resolve => setTimeout(resolve, 1000))
  message.success('项目信息提交成功！')
}

const handleEditableReset = () => {
  console.log('可编辑表单重置')
  message.info('项目表单已重置')
}

// 动态字段操作
const addDynamicField = () => {
  dynamicFormData.fields.push({
    label: '',
    type: 'text',
    required: false
  })
}

const removeDynamicField = (index: number) => {
  dynamicFormData.fields.splice(index, 1)
}

// 表单操作方法
const validateForm = async () => {
  try {
    const values = await asyncFormRef.value?.validate()
    console.log('表单验证通过:', values)
    message.success('表单验证通过！')
  } catch (error) {
    message.error('表单验证失败！')
  }
}

const getFormValues = () => {
  // const values = asyncFormRef.value?.getFieldsValue()
  console.log('当前表单值:', asyncFormData)
  message.info('请查看控制台获取表单值')
}

const setFormValues = () => {
  Object.assign(asyncFormData, {
    apiUrl: 'https://api.example.com/test',
    method: 'POST',
    params: '{\n  "name": "test",\n  "value": 123\n}'
  })
  message.success('表单值设置成功！')
}

const clearValidation = () => {
  asyncFormRef.value?.clearValidate()
  message.info('验证状态已清除')
}
</script>

<style lang="scss" scoped>
.cool-base-form-demo {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 0;
  
  // 头部介绍样式
  .demo-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
    max-width: 1400px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    
    .section-header {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      padding: 24px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      h2 {
        color: white;
        font-size: 24px;
        font-weight: 600;
        margin: 0;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
      
      .section-badge {
        background: rgba(255, 255, 255, 0.2);
        color: white;
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
  
  // 自定义示例
  .custom-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
  }
  
  .example-item {
    background: #fafbfc;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e8e8e8;
    
    h3 {
      color: #2c3e50;
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 20px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid #e8e8e8;
    }
  }
  
  // 高级示例
  .advanced-examples {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  // 动态字段
  .dynamic-fields {
    margin: 16px 0;
  }
  
  .dynamic-field-item {
    background: white;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;
    border: 1px solid #f0f0f0;
  }
  
  // 布局示例
  .layout-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 24px;
  }
  
  .layout-demo {
    background: #fafbfc;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e8e8e8;
    
    h3 {
      color: #2c3e50;
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 16px 0;
    }
  }
  
  // 表单操作
  .form-actions {
    margin-top: 16px;
    padding: 16px;
    background: white;
    border-radius: 8px;
    border: 1px solid #f0f0f0;
  }
  
  // 只读示例
  .readonly-examples {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .example-desc {
    color: #64748b;
    font-size: 14px;
    margin-bottom: 16px;
    line-height: 1.5;
  }
  
  .mode-switcher {
    margin-bottom: 20px;
    padding: 16px;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px dashed #cbd5e1;
    text-align: center;
  }
  
  // 自定义提交器
  .custom-submitter {
    text-align: center;
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
    max-width: 1400px;
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
  @media (max-width: 1024px) {
    .custom-examples,
    .layout-examples {
      grid-template-columns: 1fr;
    }
  }
  
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
:deep(.ant-input-number),
:deep(.ant-select),
:deep(.ant-textarea),
:deep(.ant-picker) {
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
