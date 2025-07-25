<template>
  <div class="cool-form-field-demo">
    <!-- 头部介绍 -->
    <div class="demo-header">
      <h1>📋 CoolFormField 表单字段组件</h1>
      <p class="demo-desc">
        基于 CoolField 构建的表单字段组件，内置 FormItem 包装，支持验证规则、布局配置、Grid 系统等表单专用功能。
      </p>
    </div>

    <!-- 基础表单示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>📝 基础表单示例</h2>
        <span class="section-badge">完整表单</span>
      </div>
      
      <div class="demo-content">
        <a-form 
          ref="formRef"
          :model="formData" 
          :label-col="{ span: 6 }" 
          :wrapper-col="{ span: 18 }"
          @finish="handleSubmit"
        >
          <div class="form-grid">
            <!-- 基本信息 -->
            <div class="form-section">
              <h3>基本信息</h3>
              
              <CoolFormField
                value-type="text"
                label="用户名"
                name="username"
                :required="true"
                v-model:value="formData.username"
                placeholder="请输入用户名"
                :rules="[
                  { required: true, message: '请输入用户名' },
                  { min: 3, max: 20, message: '用户名长度为3-20个字符' }
                ]"
              />

              <CoolFormField
                value-type="text"
                label="邮箱"
                name="email"
                :required="true"
                v-model:value="formData.email"
                placeholder="请输入邮箱地址"
                :rules="[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '邮箱格式不正确' }
                ]"
              />

              <CoolFormField
                value-type="digit"
                label="年龄"
                name="age"
                v-model:value="formData.age"
                placeholder="请输入年龄"
                :rules="[
                  { type: 'number', min: 18, max: 100, message: '年龄必须在18-100之间' }
                ]"
              />

              <CoolFormField
                value-type="select"
                label="性别"
                name="gender"
                v-model:value="formData.gender"
                placeholder="请选择性别"
                :value-enum="genderOptions"
                :rules="[
                  { required: true, message: '请选择性别' }
                ]"
              />
            </div>

            <!-- 工作信息 -->
            <div class="form-section">
              <h3>工作信息</h3>
              
              <CoolFormField
                value-type="cascader"
                label="所在地区"
                name="location"
                v-model:value="formData.location"
                placeholder="请选择省市区"
                :options="regionOptions"
              />

              <CoolFormField
                value-type="select"
                label="职业"
                name="profession"
                v-model:value="formData.profession"
                placeholder="请选择职业"
                :value-enum="professionOptions"
              />

              <CoolFormField
                value-type="money"
                label="期望薪资"
                name="salary"
                v-model:value="formData.salary"
                placeholder="请输入期望薪资"
              />

              <CoolFormField
                value-type="dateRange"
                label="工作经验"
                name="workExperience"
                v-model:value="formData.workExperience"
              />
            </div>

            <!-- 偏好设置 -->
            <div class="form-section">
              <h3>偏好设置</h3>
              
              <CoolFormField
                value-type="checkbox"
                label="技能标签"
                name="skills"
                v-model:value="formData.skills"
                :options="skillOptions"
              />

              <CoolFormField
                value-type="radio"
                label="工作模式"
                name="workMode"
                v-model:value="formData.workMode"
                :value-enum="workModeOptions"
              />

              <CoolFormField
                value-type="switch"
                label="接收推送"
                name="notifications"
                v-model:value="formData.notifications"
                checked-text="开启"
                unchecked-text="关闭"
              />

              <CoolFormField
                value-type="textarea"
                label="个人简介"
                name="bio"
                v-model:value="formData.bio"
                placeholder="请输入个人简介"
                :rows="4"
                :maxlength="500"
                show-count
              />
            </div>
          </div>

          <div class="form-actions">
            <a-space size="large">
              <a-button type="primary" html-type="submit" size="large">
                提交表单
              </a-button>
              <a-button @click="resetForm" size="large">
                重置表单
              </a-button>
              <a-button @click="validateForm" size="large">
                验证表单
              </a-button>
            </a-space>
          </div>
        </a-form>
      </div>
    </section>

    <!-- Grid 布局示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>🎯 Grid 布局示例</h2>
        <span class="section-badge">响应式布局</span>
      </div>
      
      <div class="demo-content">
        <div class="grid-examples">
          <!-- 双列布局 -->
          <div class="grid-demo">
            <h3>双列布局 (1:1)</h3>
            <a-form :model="gridFormData" layout="vertical">
              <a-row :gutter="16">
                <a-col :span="12">
                  <CoolFormField
                    value-type="text"
                    label="姓名"
                    name="name"
                    v-model:value="gridFormData.name"
                    placeholder="请输入姓名"
                  />
                </a-col>
                <a-col :span="12">
                  <CoolFormField
                    value-type="text"
                    label="电话"
                    name="phone"
                    v-model:value="gridFormData.phone"
                    placeholder="请输入电话号码"
                  />
                </a-col>
              </a-row>
              
              <a-row :gutter="16">
                <a-col :span="12">
                  <CoolFormField
                    value-type="date"
                    label="出生日期"
                    name="birthday"
                    v-model:value="gridFormData.birthday"
                    placeholder="请选择出生日期"
                  />
                </a-col>
                <a-col :span="12">
                  <CoolFormField
                    value-type="select"
                    label="学历"
                    name="education"
                    v-model:value="gridFormData.education"
                    placeholder="请选择学历"
                    :value-enum="educationOptions"
                  />
                </a-col>
              </a-row>
            </a-form>
          </div>

          <!-- 三列布局 -->
          <div class="grid-demo">
            <h3>三列布局 (1:1:1)</h3>
            <a-form :model="gridFormData" layout="vertical">
              <a-row :gutter="16">
                <a-col :span="8">
                  <CoolFormField
                    value-type="text"
                    label="公司名称"
                    name="company"
                    v-model:value="gridFormData.company"
                    placeholder="请输入公司名称"
                  />
                </a-col>
                <a-col :span="8">
                  <CoolFormField
                    value-type="text"
                    label="部门"
                    name="department"
                    v-model:value="gridFormData.department"
                    placeholder="请输入部门"
                  />
                </a-col>
                <a-col :span="8">
                  <CoolFormField
                    value-type="text"
                    label="职位"
                    name="position"
                    v-model:value="gridFormData.position"
                    placeholder="请输入职位"
                  />
                </a-col>
              </a-row>
            </a-form>
          </div>

          <!-- 混合布局 -->
          <div class="grid-demo">
            <h3>混合布局 (2:1:1)</h3>
            <a-form :model="gridFormData" layout="vertical">
              <a-row :gutter="16">
                <a-col :span="12">
                  <CoolFormField
                    value-type="textarea"
                    label="项目描述"
                    name="description"
                    v-model:value="gridFormData.description"
                    placeholder="请输入项目描述"
                    :rows="3"
                  />
                </a-col>
                <a-col :span="6">
                  <CoolFormField
                    value-type="digit"
                    label="项目周期(天)"
                    name="duration"
                    v-model:value="gridFormData.duration"
                    placeholder="项目周期"
                  />
                </a-col>
                <!-- <a-col :span="6">
                  <CoolFormField
                    value-type="percent"
                    label="完成进度"
                    name="progress"
                    v-model:value="gridFormData.progress"
                    placeholder="完成进度"
                  />
                </a-col> -->
              </a-row>
            </a-form>
          </div>
        </div>
      </div>
    </section>

    <!-- 验证规则示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>✅ 验证规则示例</h2>
        <span class="section-badge">表单验证</span>
      </div>
      
      <div class="demo-content">
        <a-form 
          :model="validationFormData" 
          :label-col="{ span: 8 }" 
          :wrapper-col="{ span: 16 }"
          @finish="handleValidationSubmit"
        >
          <div class="validation-examples">
            <div class="validation-group">
              <h3>基础验证</h3>
              
              <CoolFormField
                value-type="text"
                label="必填字段"
                name="required"
                v-model:value="validationFormData.required"
                placeholder="这是必填字段"
                :rules="[
                  { required: true, message: '这个字段是必填的！' }
                ]"
              />

              <CoolFormField
                value-type="text"
                label="长度限制"
                name="length"
                v-model:value="validationFormData.length"
                placeholder="请输入5-10个字符"
                :rules="[
                  { min: 5, max: 10, message: '长度必须在5-10个字符之间' }
                ]"
              />

              <CoolFormField
                value-type="text"
                label="正则验证"
                name="pattern"
                v-model:value="validationFormData.pattern"
                placeholder="请输入手机号码"
                :rules="[
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码格式' }
                ]"
              />
            </div>

            <div class="validation-group">
              <h3>数值验证</h3>
              
              <CoolFormField
                value-type="digit"
                label="数值范围"
                name="numberRange"
                v-model:value="validationFormData.numberRange"
                placeholder="请输入1-100的数字"
                :rules="[
                  { type: 'number', min: 1, max: 100, message: '数值必须在1-100之间' }
                ]"
              />

              <CoolFormField
                value-type="money"
                label="金额验证"
                name="amount"
                v-model:value="validationFormData.amount"
                placeholder="请输入金额（不超过100万）"
                :rules="[
                  { type: 'number', max: 1000000, message: '金额不能超过100万' }
                ]"
              />
            </div>

            <div class="validation-group">
              <h3>自定义验证</h3>
              
              <CoolFormField
                value-type="text"
                label="确认密码"
                name="confirmPassword"
                v-model:value="validationFormData.confirmPassword"
                placeholder="请再次输入密码"
                :rules="[
                  { validator: validatePassword, trigger: 'blur' }
                ]"
              />

              <CoolFormField
                value-type="text"
                label="异步验证"
                name="asyncValidation"
                v-model:value="validationFormData.asyncValidation"
                placeholder="请输入用户名（模拟检查重复）"
                :rules="[
                  { validator: validateUsernameAsync, trigger: 'blur' }
                ]"
              />
            </div>
          </div>

          <div class="form-actions">
            <a-space>
              <a-button type="primary" html-type="submit">
                提交验证表单
              </a-button>
              <a-button @click="resetValidationForm">
                重置验证表单
              </a-button>
            </a-space>
          </div>
        </a-form>
      </div>
    </section>

    <!-- 字段类型展示 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>🎨 字段类型展示</h2>
        <span class="section-badge">所有类型</span>
      </div>
      
      <div class="demo-content">
        <div class="field-types-grid">
          <!-- 文本类 -->
          <div class="field-group">
            <h3>📝 文本类</h3>
            <a-form layout="vertical" :model="fieldTypeData">
              <CoolFormField
                value-type="text"
                label="基础文本"
                name="text"
                v-model:value="fieldTypeData.text"
                placeholder="请输入文本"
              />
              
              <CoolFormField
                value-type="password"
                label="密码"
                name="password"
                v-model:value="fieldTypeData.password"
                placeholder="请输入密码"
              />
              
              <CoolFormField
                value-type="textarea"
                label="多行文本"
                name="textarea"
                v-model:value="fieldTypeData.textarea"
                placeholder="请输入多行文本"
                :rows="3"
              />
            </a-form>
          </div>

          <!-- 数字类 -->
          <div class="field-group">
            <h3>🔢 数字类</h3>
            <a-form layout="vertical" :model="fieldTypeData">
              <CoolFormField
                value-type="digit"
                label="整数"
                name="digit"
                v-model:value="fieldTypeData.digit"
                placeholder="请输入整数"
              />
              
              <CoolFormField
                value-type="money"
                label="金额"
                name="money"
                v-model:value="fieldTypeData.money"
                placeholder="请输入金额"
              />
              
              <!-- <CoolFormField
                value-type="percent"
                label="百分比"
                name="percent"
                v-model:value="fieldTypeData.percent"
                placeholder="请输入百分比"
              /> -->
            </a-form>
          </div>

          <!-- 选择类 -->
          <div class="field-group">
            <h3>📋 选择类</h3>
            <a-form layout="vertical" :model="fieldTypeData">
              <CoolFormField
                value-type="select"
                label="下拉选择"
                name="select"
                v-model:value="fieldTypeData.select"
                placeholder="请选择"
                :value-enum="selectOptions"
              />
              
              <CoolFormField
                value-type="radio"
                label="单选"
                name="radio"
                v-model:value="fieldTypeData.radio"
                :value-enum="radioOptions"
              />
              
              <CoolFormField
                value-type="checkbox"
                label="多选"
                name="checkbox"
                v-model:value="fieldTypeData.checkbox"
                :options="checkboxOptions"
              />
              
              <CoolFormField
                value-type="switch"
                label="开关"
                name="switch"
                v-model:value="fieldTypeData.switch"
              />
            </a-form>
          </div>

          <!-- 日期时间类 -->
          <div class="field-group">
            <h3>📅 日期时间类</h3>
            <a-form layout="vertical" :model="fieldTypeData">
              <CoolFormField
                value-type="date"
                label="日期"
                name="date"
                v-model:value="fieldTypeData.date"
                placeholder="请选择日期"
              />
              
              <CoolFormField
                value-type="time"
                label="时间"
                name="time"
                v-model:value="fieldTypeData.time"
                placeholder="请选择时间"
              />
              
              <CoolFormField
                value-type="dateRange"
                label="日期范围"
                name="dateRange"
                v-model:value="fieldTypeData.dateRange"
              />
            </a-form>
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
          <a-tab-pane key="form" tab="基础表单数据">
            <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="grid" tab="Grid表单数据">
            <pre>{{ JSON.stringify(gridFormData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="validation" tab="验证表单数据">
            <pre>{{ JSON.stringify(validationFormData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="fieldType" tab="字段类型数据">
            <pre>{{ JSON.stringify(fieldTypeData, null, 2) }}</pre>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { message, Button as AButton, Form as AForm, Tabs as ATabs, TabPane as ATabPane, Space as ASpace, Col as ACol, Row as ARow} from 'ant-design-vue'
import CoolFormField from '../index'

const formRef = ref()

// 基础表单数据
const formData = reactive({
  username: '',
  email: '',
  age: null,
  gender: undefined,
  location: [],
  profession: '',
  salary: null,
  workExperience: [],
  skills: [],
  workMode: '',
  notifications: true,
  bio: ''
})

// Grid表单数据
const gridFormData = reactive({
  name: '',
  phone: '',
  birthday: '',
  education: '',
  company: '',
  department: '',
  position: '',
  description: '',
  duration: null,
  progress: null
})

// 验证表单数据
const validationFormData = reactive({
  required: '',
  length: '',
  pattern: '',
  numberRange: null,
  amount: null,
  confirmPassword: '',
  asyncValidation: ''
})

// 字段类型展示数据
const fieldTypeData = reactive({
  text: '',
  password: '',
  textarea: '',
  digit: null,
  money: null,
  percent: null,
  select: '',
  radio: '',
  checkbox: [],
  switch: false,
  date: '',
  time: '',
  dateRange: []
})

// 当前激活的数据标签
const activeDataTab = ref('form')

// 选项配置
const genderOptions = {
  male: { label: '男', value: 'male' },
  female: { label: '女', value: 'female' },
  other: { label: '其他', value: 'other' }
}

const professionOptions = {
  developer: { label: '开发工程师', value: 'developer' },
  designer: { label: '设计师', value: 'designer' },
  product: { label: '产品经理', value: 'product' },
  sales: { label: '销售', value: 'sales' },
  other: { label: '其他', value: 'other' }
}

const skillOptions = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Vue.js', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'Python', value: 'python' }
]

const workModeOptions = {
  onsite: { label: '现场办公', value: 'onsite' },
  remote: { label: '远程办公', value: 'remote' },
  hybrid: { label: '混合办公', value: 'hybrid' }
}

const educationOptions = {
  bachelor: { label: '本科', value: 'bachelor' },
  master: { label: '硕士', value: 'master' },
  doctor: { label: '博士', value: 'doctor' },
  other: { label: '其他', value: 'other' }
}

const selectOptions = {
  option1: { label: '选项一', value: 'option1' },
  option2: { label: '选项二', value: 'option2' },
  option3: { label: '选项三', value: 'option3' }
}

const radioOptions = {
  radio1: { label: '选项A', value: 'radio1' },
  radio2: { label: '选项B', value: 'radio2' },
  radio3: { label: '选项C', value: 'radio3' }
}

const checkboxOptions = [
  { label: '选项1', value: 'check1' },
  { label: '选项2', value: 'check2' },
  { label: '选项3', value: 'check3' }
]

// 地区选项
const regionOptions = [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '余杭区', value: 'yuhang' }
        ]
      }
    ]
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
        children: [
          { label: '玄武区', value: 'xuanwu' },
          { label: '秦淮区', value: 'qinhuai' }
        ]
      }
    ]
  }
]

// 事件处理函数
const handleSubmit = (values: any) => {
  console.log('Form submitted:', values)
  message.success('表单提交成功！')
}

const resetForm = () => {
  formRef.value?.resetFields()
  message.info('表单已重置')
}

const validateForm = () => {
  message.info('表单验证功能需要配合 a-form 组件使用')
}

const handleValidationSubmit = (values: any) => {
  console.log('Validation form submitted:', values)
  message.success('验证表单提交成功！')
}

const resetValidationForm = () => {
  formRef.value?.resetFields()
  message.info('验证表单已重置')
}

// 自定义验证函数
const validatePassword = (rule: any, value: string) => {
  if (!value) {
    return Promise.reject('请输入确认密码')
  }
  if (value !== 'password123') {
    return Promise.reject('确认密码不匹配')
  }
  return Promise.resolve()
}

const validateUsernameAsync = (rule: any, value: string) => {
  return new Promise((resolve, reject) => {
    if (!value) {
      resolve(undefined)
      return
    }
    
    // 模拟异步验证
    setTimeout(() => {
      if (value === 'admin' || value === 'root') {
        reject('该用户名已被占用')
      } else {
        resolve(undefined)
      }
    }, 1000)
  })
}
</script>

<style lang="scss" scoped>
.cool-form-field-demo {
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
  
  // 表单网格
  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 32px;
  }
  
  .form-section {
    background: #fafbfc;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e8e8e8;
    
    h3 {
      color: #2c3e50;
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 20px 0;
      padding-bottom: 8px;
      border-bottom: 2px solid #e8e8e8;
    }
  }
  
  // Grid 示例
  .grid-examples {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .grid-demo {
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
  
  // 验证示例
  .validation-examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 32px;
  }
  
  .validation-group {
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
  
  // 字段类型网格
  .field-types-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }
  
  .field-group {
    background: #fafbfc;
    border-radius: 12px;
    padding: 20px;
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
    text-align: center;
    margin-top: 32px;
    padding: 24px;
    background: #fafbfc;
    border-radius: 12px;
    border: 1px solid #e8e8e8;
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
    .form-grid {
      grid-template-columns: 1fr;
    }
    
    .validation-examples {
      grid-template-columns: 1fr;
    }
    
    .field-types-grid {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
    
    .field-types-grid {
      grid-template-columns: 1fr;
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
</style> 