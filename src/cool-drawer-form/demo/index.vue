<template>
  <div class="cool-drawer-form-demo">
    <!-- 头部介绍 -->
    <div class="demo-header">
      <h1>🚪 CoolDrawerForm 抽屉表单组件</h1>
      <p class="demo-desc">
        基于 CoolBaseForm 和 Ant Design Vue Drawer 的抽屉表单组件，提供优雅的侧边栏表单体验，支持自定义触发器和完整的表单功能。
      </p>
    </div>

    <!-- 基础用法示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>🚀 基础用法</h2>
        <span class="section-badge">基础演示</span>
      </div>
      
      <div class="demo-content">
        <div class="example-wrapper">
          <CoolDrawerForm
            v-model:open="basicVisible"
            title="基础信息编辑"
            :width="500"
            :model="basicFormData"
            :rules="basicRules"
            :on-finish="handleBasicSubmit"
            :on-reset="handleBasicReset"
          >
            <template #trigger>
              <a-button type="primary" icon="edit">
                编辑基础信息
              </a-button>
            </template>
            
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
          </CoolDrawerForm>
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
          <CoolDrawerForm
            v-model:open="fieldVisible"
            title="员工信息管理"
            :width="600"
            :model="fieldFormData"
            :rules="fieldRules"
            :on-finish="handleFieldSubmit"
            :on-reset="handleFieldReset"
          >
            <template #trigger>
              <a-button type="primary" ghost icon="user-add">
                添加员工信息
              </a-button>
            </template>
            
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
              label="入职时间" 
              name="joinDate" 
              v-model:value="fieldFormData.joinDate" 
              placeholder="请选择入职时间"
            />
            
            <CoolFormField 
              value-type="switch" 
              label="是否接受调岗" 
              name="transferAccept" 
              v-model:value="fieldFormData.transferAccept"
            />
          </CoolDrawerForm>
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
            <span>字段模式：</span>
            <a-button 
              :type="fieldMode === 'edit' ? 'primary' : 'default'" 
              @click="fieldMode = 'edit'"
              size="small"
            >
              编辑模式
            </a-button>
            <a-button 
              :type="fieldMode === 'read' ? 'primary' : 'default'" 
              @click="fieldMode = 'read'"
              size="small"
            >
              只读模式
            </a-button>
          </a-space>
        </div>
        
        <div class="example-wrapper">
          <CoolDrawerForm
            v-model:open="coolFieldVisible"
            title="项目详情"
            :width="700"
            :model="coolFieldFormData"
            :on-finish="handleCoolFieldSubmit"
            :on-reset="handleCoolFieldReset"
            :submitter="fieldMode === 'edit'"
          >
            <template #trigger>
              <a-button icon="project">
                {{ fieldMode === 'edit' ? '编辑项目' : '查看项目' }}
              </a-button>
            </template>
            
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
          </CoolDrawerForm>
        </div>
      </div>
    </section>

    <!-- 自定义触发器 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>🎨 自定义触发器</h2>
        <span class="section-badge">个性化</span>
      </div>
      
      <div class="demo-content">
        <div class="example-wrapper">
          <a-space size="large" wrap>
            <!-- 卡片触发器 -->
            <CoolDrawerForm
              v-model:open="customVisible1"
              title="设置中心"
              :width="500"
              :model="settingsData"
              :on-finish="handleSettingsSubmit"
            >
              <template #trigger>
                <div class="custom-trigger-card">
                  <div class="card-icon">⚙️</div>
                  <div class="card-content">
                    <div class="card-title">系统设置</div>
                    <div class="card-desc">管理系统偏好设置</div>
                  </div>
                </div>
              </template>
              
              <a-form-item label="系统主题" name="theme">
                <a-select v-model:value="settingsData.theme" placeholder="请选择主题">
                  <a-select-option value="light">浅色主题</a-select-option>
                  <a-select-option value="dark">深色主题</a-select-option>
                  <a-select-option value="auto">跟随系统</a-select-option>
                </a-select>
              </a-form-item>
              
              <a-form-item label="语言设置" name="language">
                <a-select v-model:value="settingsData.language" placeholder="请选择语言">
                  <a-select-option value="zh-CN">简体中文</a-select-option>
                  <a-select-option value="en-US">English</a-select-option>
                  <a-select-option value="ja-JP">日本語</a-select-option>
                </a-select>
              </a-form-item>
              
              <a-form-item label="自动保存" name="autoSave">
                <a-switch v-model:checked="settingsData.autoSave" />
              </a-form-item>
            </CoolDrawerForm>

            <!-- 图片触发器 -->
            <CoolDrawerForm
              v-model:open="customVisible2"
              title="个人资料"
              :width="600"
              :model="profileData"
              :on-finish="handleProfileSubmit"
            >
              <template #trigger>
                <div class="avatar-trigger">
                  <img src="https://via.placeholder.com/80" alt="头像" class="avatar-img" />
                  <div class="avatar-overlay">
                    <span>编辑资料</span>
                  </div>
                </div>
              </template>
              
              <a-form-item label="昵称" name="nickname">
                <a-input v-model:value="profileData.nickname" placeholder="请输入昵称" />
              </a-form-item>
              
              <a-form-item label="个人签名" name="signature">
                <a-textarea v-model:value="profileData.signature" placeholder="请输入个人签名" :rows="3" />
              </a-form-item>
              
              <a-form-item label="所在城市" name="location">
                <a-input v-model:value="profileData.location" placeholder="请输入所在城市" />
              </a-form-item>
            </CoolDrawerForm>

            <!-- 文字链接触发器 -->
            <CoolDrawerForm
              v-model:open="customVisible3"
              title="反馈建议"
              :width="500"
              :model="feedbackData"
              :on-finish="handleFeedbackSubmit"
            >
              <template #trigger>
                <a class="feedback-link">💬 意见反馈</a>
              </template>
              
              <a-form-item label="反馈类型" name="type">
                <a-select v-model:value="feedbackData.type" placeholder="请选择反馈类型">
                  <a-select-option value="bug">Bug报告</a-select-option>
                  <a-select-option value="feature">功能建议</a-select-option>
                  <a-select-option value="improvement">体验改进</a-select-option>
                  <a-select-option value="other">其他</a-select-option>
                </a-select>
              </a-form-item>
              
              <a-form-item label="详细描述" name="content">
                <a-textarea v-model:value="feedbackData.content" placeholder="请详细描述您的反馈..." :rows="6" />
              </a-form-item>
              
              <a-form-item label="联系方式" name="contact">
                <a-input v-model:value="feedbackData.contact" placeholder="请输入您的联系方式（可选）" />
              </a-form-item>
            </CoolDrawerForm>
          </a-space>
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
          <a-tab-pane key="custom" tab="自定义表单">
            <div style="margin-bottom: 12px; color: #64748b;">
              设置数据:
            </div>
            <pre>{{ JSON.stringify(settingsData, null, 2) }}</pre>
            <div style="margin: 16px 0 12px 0; color: #64748b;">
              资料数据:
            </div>
            <pre>{{ JSON.stringify(profileData, null, 2) }}</pre>
            <div style="margin: 16px 0 12px 0; color: #64748b;">
              反馈数据:
            </div>
            <pre>{{ JSON.stringify(feedbackData, null, 2) }}</pre>
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
  Switch as ASwitch,
  Tabs as ATabs, 
  TabPane as ATabPane, 
  Space as ASpace
} from 'ant-design-vue'
import CoolDrawerForm from '../index.vue'
import CoolFormField from '../../cool-form-field/index'
import CoolField from '../../cool-field/index.vue'

// 控制抽屉显示状态
const basicVisible = ref(false)
const fieldVisible = ref(false)
const coolFieldVisible = ref(false)
const customVisible1 = ref(false)
const customVisible2 = ref(false)
const customVisible3 = ref(false)

// 基础表单数据
const basicFormData = reactive({
  username: 'johndoe',
  email: 'john@example.com',
  phone: '13800138000',
  bio: '一名热爱技术的前端开发工程师'
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
  joinDate: '',
  transferAccept: false
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

// 自定义表单数据
const settingsData = reactive({
  theme: 'light',
  language: 'zh-CN',
  autoSave: true
})

const profileData = reactive({
  nickname: '酷炫开发者',
  signature: '代码改变世界 ✨',
  location: '上海'
})

const feedbackData = reactive({
  type: '',
  content: '',
  contact: ''
})

// 当前激活的数据标签
const activeDataTab = ref('basic')

// 事件处理函数
const handleBasicSubmit = async (values: any): Promise<void> => {
  console.log('基础表单提交:', values)
  await new Promise(resolve => setTimeout(resolve, 1000))
  message.success('用户信息更新成功！')
  basicVisible.value = false
}

const handleBasicReset = (): void => {
  console.log('基础表单重置')
  message.info('基础表单已重置')
}

const handleFieldSubmit = async (values: any): Promise<void> => {
  console.log('员工信息提交:', values)
  await new Promise(resolve => setTimeout(resolve, 1200))
  message.success('员工信息添加成功！')
  fieldVisible.value = false
}

const handleFieldReset = (): void => {
  console.log('字段表单重置')
  message.info('字段表单已重置')
}

const handleCoolFieldSubmit = async (values: any): Promise<void> => {
  console.log('项目信息提交:', values)
  await new Promise(resolve => setTimeout(resolve, 800))
  message.success('项目信息保存成功！')
  coolFieldVisible.value = false
}

const handleCoolFieldReset = (): void => {
  console.log('通用字段表单重置')
  message.info('项目信息已重置')
}

const handleSettingsSubmit = async (values: any): Promise<void> => {
  console.log('设置保存:', values)
  await new Promise(resolve => setTimeout(resolve, 500))
  message.success('设置保存成功！')
  customVisible1.value = false
}

const handleProfileSubmit = async (values: any): Promise<void> => {
  console.log('个人资料更新:', values)
  await new Promise(resolve => setTimeout(resolve, 800))
  message.success('个人资料更新成功！')
  customVisible2.value = false
}

const handleFeedbackSubmit = async (values: any): Promise<void> => {
  console.log('反馈提交:', values)
  await new Promise(resolve => setTimeout(resolve, 1000))
  message.success('感谢您的反馈！我们会认真处理')
  feedbackData.type = ''
  feedbackData.content = ''
  feedbackData.contact = ''
  customVisible3.value = false
}
</script>

<style lang="scss" scoped>
.cool-drawer-form-demo {
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
    max-width: 1200px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    
    .section-header {
      background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%);
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
  
  // 自定义触发器样式
  .custom-trigger-card {
    display: flex;
    align-items: center;
    padding: 16px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    width: 240px;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
    
    .card-icon {
      font-size: 24px;
      margin-right: 12px;
    }
    
    .card-content {
      .card-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 4px;
      }
      
      .card-desc {
        font-size: 12px;
        opacity: 0.8;
      }
    }
  }
  
  .avatar-trigger {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
      
      .avatar-overlay {
        opacity: 1;
      }
    }
    
    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .avatar-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
  }
  
  .feedback-link {
    color: #667eea;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(102, 126, 234, 0.1);
      color: #5a67d8;
    }
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
    
    .custom-trigger-card {
      width: 100%;
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
    border-color: #667eea;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
  }
  
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
}

:deep(.ant-btn) {
  border-radius: 6px;
  font-weight: 500;
  
  &.ant-btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    
    &:hover {
      background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
    }
  }
}

:deep(.drawer-footer) {
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}
</style>
