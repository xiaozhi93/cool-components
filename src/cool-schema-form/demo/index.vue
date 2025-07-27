<template>
  <div class="cool-schema-form-demo">
    <!-- 头部介绍 -->
    <div class="demo-header">
      <h1>🏗️ CoolSchemaForm 配置表单组件</h1>
      <p class="demo-desc">
        基于 Schema 配置的智能表单组件，通过 JSON 配置即可快速生成复杂的表单，支持多种布局和丰富的字段类型。
      </p>
    </div>

    <!-- 基础用法示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>🚀 基础用法</h2>
        <span class="section-badge">配置驱动</span>
      </div>
      
      <div class="demo-content">
        <div class="example-wrapper">
          <CoolSchemaForm ref="basicFormRef" :on-finish="onFinish" :on-reset="onReset" :columns="basicColumns" layout-type="CoolForm" :context="{ username: 'windfly' }" />
          <div class="form-actions">
            <a-space>
              <a-button @click="getBasicFormValues" type="primary">获取表单值</a-button>
              <a-button @click="setBasicFormValues">填充示例数据</a-button>
              <a-button @click="clearBasicFormValues">清空表单</a-button>
            </a-space>
          </div>
        </div>
      </div>
    </section>

    <!-- 完整字段类型示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>🔧 完整字段类型</h2>
        <span class="section-badge">全类型支持</span>
      </div>
      
      <div class="demo-content">
        <div class="example-wrapper">
          <CoolSchemaForm ref="fullFormRef"  :columns="fullColumns" layout-type="CoolForm" :readonly="isReadonly" />
          <div class="form-actions">
            <a-space>
              <a-button @click="getFullFormValues" type="primary">获取表单值</a-button>
              <a-button @click="setFullFormValues">填充示例数据</a-button>
              <a-button @click="toggleReadonlyMode">{{ isReadonly ? '切换到编辑模式' : '切换到只读模式' }}</a-button>
            </a-space>
          </div>
        </div>
      </div>
    </section>

    <!-- 抽屉表单示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>📱 抽屉表单布局</h2>
        <span class="section-badge">移动优化</span>
      </div>
      
      <div class="demo-content">
        <div class="example-wrapper">
          <div class="drawer-trigger">
            <a-button type="primary" @click="showDrawerForm" size="large">
              🎯 打开抽屉表单
            </a-button>
          </div>
          
          <CoolSchemaForm 
            ref="drawerFormRef" 
            :columns="drawerColumns" 
            layout-type="CoolDrawerForm"
            v-model:open="drawerVisible"
            @close="closeDrawerForm"
          />
        </div>
      </div>
    </section>

    <!-- 动态表单示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>⚡ 动态表单配置</h2>
        <span class="section-badge">运行时配置</span>
      </div>
      
      <div class="demo-content">
        <div class="dynamic-controls">
          <a-space wrap>
            <a-button @click="addDynamicField" type="dashed">
              ➕ 添加字段
            </a-button>
            <a-button @click="removeDynamicField" :disabled="dynamicColumns.length <= 1">
              ➖ 移除字段
            </a-button>
            <a-button @click="toggleFieldType">
              🔄 切换字段类型
            </a-button>
            <a-button @click="reorderFields">
              📋 重新排序
            </a-button>
          </a-space>
        </div>
        
        <div class="example-wrapper">
          <CoolSchemaForm ref="dynamicFormRef" :columns="dynamicColumns" layout-type="CoolForm" />
          <div class="form-actions">
            <a-space>
              <a-button @click="getDynamicFormValues" type="primary">获取表单值</a-button>
              <a-button @click="exportSchema">导出配置</a-button>
              <a-button @click="importSchema">导入配置</a-button>
            </a-space>
          </div>
        </div>
      </div>
    </section>

    <!-- 复杂表单示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>🎯 复杂表单示例</h2>
        <span class="section-badge">企业级应用</span>
      </div>
      
      <div class="demo-content">
        <div class="example-wrapper">
          <CoolSchemaForm ref="complexFormRef" :columns="complexColumns" layout-type="CoolForm" />
          <div class="form-actions">
            <a-space>
              <a-button @click="validateComplexForm" type="primary">验证表单</a-button>
              <a-button @click="getComplexFormValues">获取表单值</a-button>
              <a-button @click="setComplexFormValues">填充企业数据</a-button>
              <a-button @click="resetComplexForm">重置表单</a-button>
            </a-space>
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
          <a-tab-pane key="full" tab="完整字段">
            <div style="margin-bottom: 12px; color: #64748b;">
              只读模式: <span :style="{ color: isReadonly ? '#f59e0b' : '#22c55e', fontWeight: 'bold' }">
                {{ isReadonly ? '开启' : '关闭' }}
              </span>
            </div>
            <pre>{{ JSON.stringify(fullFormData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="drawer" tab="抽屉表单">
            <div style="margin-bottom: 12px; color: #64748b;">
              抽屉状态: <span :style="{ color: drawerVisible ? '#22c55e' : '#64748b', fontWeight: 'bold' }">
                {{ drawerVisible ? '已打开' : '已关闭' }}
              </span>
            </div>
            <pre>{{ JSON.stringify(drawerFormData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="dynamic" tab="动态表单">
            <div style="margin-bottom: 12px; color: #64748b;">
              字段数量: <span style="color: #3b82f6; font-weight: bold;">{{ dynamicColumns.length }}</span>
            </div>
            <pre>{{ JSON.stringify(dynamicFormData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="complex" tab="复杂表单">
            <pre>{{ JSON.stringify(complexFormData, null, 2) }}</pre>
          </a-tab-pane>
          <a-tab-pane key="schema" tab="配置详情">
            <div style="margin-bottom: 12px; color: #64748b;">当前激活的表单配置</div>
            <pre>{{ JSON.stringify(getCurrentSchema(), null, 2) }}</pre>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { 
  message, 
  Button as AButton, 
  Space as ASpace, 
  Tabs as ATabs, 
  TabPane as ATabPane
} from 'ant-design-vue'
import CoolSchemaForm from '../index.vue'
import type { CoolFormColumnsType } from '../types'

// 表单引用
const basicFormRef = ref()
const fullFormRef = ref()
const drawerFormRef = ref()
const dynamicFormRef = ref()
const complexFormRef = ref()

// 状态管理
const isReadonly = ref(false)
const drawerVisible = ref(false)
const activeDataTab = ref('basic')

// 表单数据
const basicFormData = reactive({})
const fullFormData = reactive({})
const drawerFormData = reactive({})
const dynamicFormData = reactive({})
const complexFormData = reactive({})

// 基础表单配置
const basicColumns: CoolFormColumnsType[] = [
  {
    name: 'username',
    label: '用户名',
    valueType: 'text',
    initialValue: '{{$context.username}}',
    fieldProps: {
      placeholder: '请输入用户名'
    },
    formItemProps: {
      rules: [
        { required: true, message: '请输入用户名' },
        { min: 3, max: 20, message: '用户名长度为3-20个字符' }
      ]
    }
  },
  {
    name: 'email',
    label: '邮箱地址',
    valueType: 'text',
    initialValue: '',
    fieldProps: {
      placeholder: '请输入邮箱地址'
    },
    formItemProps: {
      rules: [
        { required: true, message: '请输入邮箱' },
        { type: 'email', message: '邮箱格式不正确' }
      ]
    }
  },
  {
    name: 'age',
    label: '年龄',
    valueType: 'digit',
    initialValue: null,
    fieldProps: {
      placeholder: '请输入年龄',
      min: 0,
      max: 120
    }
  },
  {
    name: 'active',
    label: '是否激活',
    valueType: 'switch',
    initialValue: false
  },
  {
    visible: "{{$form.active}}",
    name: 'activeName',
    label: '激活名称',
    valueType: 'text',
    required: true,
    initialValue: '',
    fieldProps: {
      placeholder: '请输入激活名称'
    }
  }
]

const onFinish = (values: any) => {
  console.log('onFinish', values)
}

const onReset = () => {
  console.log('onReset')
}

// 完整字段类型配置
const fullColumns = computed((): CoolFormColumnsType[] => [
  {
    name: 'text',
    label: '文本输入',
    valueType: 'text',
    initialValue: '',
    readonly: isReadonly.value,
    fieldProps: {
      placeholder: '请输入文本'
    }
  },
  {
    name: 'digit',
    label: '数字输入',
    valueType: 'digit',
    initialValue: null,
    readonly: isReadonly.value,
    fieldProps: {
      placeholder: '请输入数字'
    }
  },
  {
    name: 'money',
    label: '金额输入',
    valueType: 'money',
    initialValue: null,
    readonly: isReadonly.value,
    fieldProps: {
      placeholder: '请输入金额'
    }
  },
  {
    name: 'percent',
    label: '百分比',
    valueType: 'percent',
    initialValue: null,
    readonly: isReadonly.value,
    fieldProps: {
      placeholder: '请输入百分比'
    }
  },
  {
    name: 'date',
    label: '日期选择',
    valueType: 'date',
    initialValue: '',
    readonly: isReadonly.value,
    fieldProps: {
      placeholder: '请选择日期'
    }
  },
  {
    name: 'time',
    label: '时间选择',
    valueType: 'time',
    initialValue: '',
    readonly: isReadonly.value,
    fieldProps: {
      placeholder: '请选择时间'
    }
  },
  {
    name: 'dateRange',
    label: '日期范围',
    valueType: 'dateRange',
    initialValue: [],
    readonly: isReadonly.value,
    fieldProps: {
      placeholder: ['开始日期', '结束日期']
    }
  },
  {
    name: 'select',
    label: '下拉选择',
    valueType: 'select',
    initialValue: '',
    readonly: isReadonly.value,
    fieldProps: {
      placeholder: '请选择选项',
      options: [
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' }
      ]
    }
  },
  {
    name: 'radio',
    label: '单选按钮',
    valueType: 'radio',
    initialValue: '',
    readonly: isReadonly.value,
    fieldProps: {
      options: [
        { label: '选项A', value: 'a' },
        { label: '选项B', value: 'b' },
        { label: '选项C', value: 'c' }
      ]
    }
  },
  {
    name: 'checkbox',
    label: '多选框',
    valueType: 'checkbox',
    initialValue: [],
    readonly: isReadonly.value,
    fieldProps: {
      options: [
        { label: '复选项1', value: 'check1' },
        { label: '复选项2', value: 'check2' },
        { label: '复选项3', value: 'check3' }
      ]
    }
  },
  {
    name: 'switch',
    label: '开关',
    valueType: 'switch',
    initialValue: false,
    readonly: isReadonly.value
  }
])

// 抽屉表单配置
const drawerColumns: CoolFormColumnsType[] = [
  {
    name: 'label',
    label: '任务标题',
    valueType: 'text',
    initialValue: '',
    fieldProps: {
      placeholder: '请输入任务标题'
    }
  },
  {
    name: 'priority',
    label: '优先级',
    valueType: 'select',
    initialValue: 'medium',
    fieldProps: {
      options: [
        { label: '低', value: 'low', color: 'blue' },
        { label: '中', value: 'medium', color: 'orange' },
        { label: '高', value: 'high', color: 'red' }
      ]
    }
  },
  {
    name: 'dueDate',
    label: '截止日期',
    valueType: 'date',
    initialValue: '',
    fieldProps: {
      placeholder: '请选择截止日期'
    }
  },
  {
    name: 'assignee',
    label: '负责人',
    valueType: 'select',
    initialValue: '',
    fieldProps: {
      placeholder: '请选择负责人',
      options: [
        { label: '张三', value: 'zhangsan' },
        { label: '李四', value: 'lisi' },
        { label: '王五', value: 'wangwu' }
      ]
    }
  },
  {
    name: 'description',
    label: '任务描述',
    valueType: 'textarea',
    initialValue: '',
    fieldProps: {
      placeholder: '请输入任务描述',
      rows: 4
    }
  }
]

// 动态表单配置
const dynamicColumns = ref<CoolFormColumnsType[]>([
  {
    name: 'field1',
    label: '动态字段1',
    valueType: 'text',
    initialValue: '',
    fieldProps: {
      placeholder: '这是一个动态字段'
    }
  }
])

// 复杂表单配置
const complexColumns: CoolFormColumnsType[] = [
  {
    name: 'companyName',
    label: '公司名称',
    valueType: 'text',
    initialValue: '',
    fieldProps: {
      placeholder: '请输入公司名称'
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入公司名称' }]
    }
  },
  {
    name: 'companyType',
    label: '公司类型',
    valueType: 'select',
    initialValue: '',
    fieldProps: {
      placeholder: '请选择公司类型',
      options: [
        { label: '有限责任公司', value: 'limited' },
        { label: '股份有限公司', value: 'corporation' },
        { label: '个人独资企业', value: 'individual' },
        { label: '合伙企业', value: 'partnership' }
      ]
    }
  },
  {
    name: 'establishDate',
    label: '成立日期',
    valueType: 'date',
    initialValue: '',
    fieldProps: {
      placeholder: '请选择成立日期'
    }
  },
  {
    name: 'registeredCapital',
    label: '注册资本',
    valueType: 'money',
    initialValue: null,
    fieldProps: {
      placeholder: '请输入注册资本'
    }
  },
  {
    name: 'businessScope',
    label: '经营范围',
    valueType: 'textarea',
    initialValue: '',
    fieldProps: {
      placeholder: '请输入经营范围',
      rows: 3
    }
  },
  {
    name: 'contactPerson',
    label: '联系人',
    valueType: 'text',
    initialValue: '',
    fieldProps: {
      placeholder: '请输入联系人'
    }
  },
  {
    name: 'contactPhone',
    label: '联系电话',
    valueType: 'text',
    initialValue: '',
    fieldProps: {
      placeholder: '请输入联系电话'
    }
  },
  {
    name: 'contactEmail',
    label: '联系邮箱',
    valueType: 'text',
    initialValue: '',
    fieldProps: {
      placeholder: '请输入联系邮箱'
    }
  },
  {
    name: 'isPublic',
    label: '是否上市',
    valueType: 'switch',
    initialValue: false,
  },
  {
    name: 'hasSubsidiary',
    label: '有子公司',
    valueType: 'switch',
    initialValue: false,
  },
  {
    name: 'isHighTech',
    label: '高新技术企业',
    valueType: 'switch',
    initialValue: false,
  },
  {
    name: 'isExport',
    label: '进出口企业',
    valueType: 'switch',
    initialValue: false,
  }
]

// 字段类型列表
const fieldTypes = ['text', 'digit', 'money', 'date', 'select', 'switch', 'textarea']

// 事件处理函数
const getBasicFormValues = () => {
  const values = basicFormRef.value?.getFieldsValue()
  console.log(values)
  message.success('基础表单数据已获取，请查看数据展示区域')
}

const setBasicFormValues = () => {
  const values = {
    username: 'cooluser',
    email: 'cool@example.com',
    age: 25,
    active: true
  }
  basicFormRef.value?.setFieldsValue(values)
  message.success('基础表单示例数据已填充')
}

const clearBasicFormValues = () => {
  basicFormRef.value?.setFieldsValue({
    username: '',
    email: '',
    age: null,
    active: false
  })
  Object.assign(basicFormData, {})
  message.info('基础表单已清空')
}

const getFullFormValues = () => {
  const values = fullFormRef.value?.getFieldsValue()
  console.log(values)
  message.success('完整字段表单数据已获取')
}

const setFullFormValues = () => {
  const values = {
    text: '示例文本',
    digit: 42,
    money: 99999,
    percent: 85,
    date: '2023-12-25',
    time: '14:30:00',
    dateRange: ['2023-01-01', '2023-12-31'],
    select: 'option2',
    radio: 'b',
    checkbox: ['check1', 'check3'],
    switch: true
  }
  fullFormRef.value?.setFieldsValue(values)
  message.success('完整字段示例数据已填充')
}

const toggleReadonlyMode = () => {
  isReadonly.value = !isReadonly.value
  message.info(`已切换到${isReadonly.value ? '只读' : '编辑'}模式`)
}

const showDrawerForm = () => {
  drawerVisible.value = true
}

const closeDrawerForm = () => {
  drawerVisible.value = false
  const values = drawerFormRef.value?.getFieldsValue()
  console.log(values)
}

const addDynamicField = () => {
  const fieldIndex = dynamicColumns.value.length + 1
  const randomType = fieldTypes[Math.floor(Math.random() * fieldTypes.length)]
  
  const newField: CoolFormColumnsType = {
    name: `field${fieldIndex}`,
    label: `动态字段${fieldIndex}`,
    valueType: randomType as any,
    initialValue: getInitialValueByType(randomType),
    fieldProps: {
      placeholder: `这是动态添加的${randomType}字段`
    }
  }
  
  if (randomType === 'select') {
    newField.fieldProps!.options = [
      { label: '选项1', value: 'opt1' },
      { label: '选项2', value: 'opt2' }
    ]
  }
  
  dynamicColumns.value.push(newField)
  message.success(`已添加${randomType}类型字段`)
}

const removeDynamicField = () => {
  if (dynamicColumns.value.length > 1) {
    dynamicColumns.value.pop()
    message.success('已移除最后一个字段')
  }
}

const toggleFieldType = () => {
  if (dynamicColumns.value.length > 0) {
    const lastField = dynamicColumns.value[dynamicColumns.value.length - 1]
    const currentTypeIndex = fieldTypes.indexOf(lastField.valueType as string)
    const nextTypeIndex = (currentTypeIndex + 1) % fieldTypes.length
    const newType = fieldTypes[nextTypeIndex]
    
    lastField.valueType = newType as any
    lastField.initialValue = getInitialValueByType(newType)
    lastField.fieldProps = {
      placeholder: `切换为${newType}字段`
    }
    
    if (newType === 'select') {
      lastField.fieldProps!.options = [
        { label: '选项A', value: 'a' },
        { label: '选项B', value: 'b' }
      ]
    }
    
    message.success(`字段类型已切换为 ${newType}`)
  }
}

const reorderFields = () => {
  dynamicColumns.value.reverse()
  dynamicColumns.value.forEach((field, index) => {
  })
  message.success('字段顺序已重新排列')
}

const getDynamicFormValues = () => {
  const values = dynamicFormRef.value?.getFieldsValue()
  console.log(values)
  message.success('动态表单数据已获取')
}

const exportSchema = () => {
  const schema = JSON.stringify(dynamicColumns.value, null, 2)
  console.log('导出的配置:', schema)
  message.success('配置已导出到控制台')
}

const importSchema = () => {
  // 示例导入配置
  const sampleSchema: CoolFormColumnsType[] = [
    {
      name: 'importedField1',
      label: '导入字段1',
      valueType: 'text',
      initialValue: '导入的数据',
    },
    {
      name: 'importedField2',
      label: '导入字段2',
      valueType: 'digit',
      initialValue: 100,
    }
  ]
  
  dynamicColumns.value = sampleSchema
  message.success('示例配置已导入')
}

const validateComplexForm = () => {
  // 这里可以添加表单验证逻辑
  message.success('复杂表单验证通过')
}

const getComplexFormValues = () => {
  const values = complexFormRef.value?.getFieldsValue()
  console.log(values)
  message.success('复杂表单数据已获取')
}

const setComplexFormValues = () => {
  const values = {
    companyName: '酷炫科技有限公司',
    companyType: 'limited',
    establishDate: '2020-01-01',
    registeredCapital: 1000000,
    businessScope: '软件开发、技术咨询、系统集成、网络服务',
    contactPerson: '张总',
    contactPhone: '138-0000-0000',
    contactEmail: 'contact@cooltech.com',
    isPublic: false,
    hasSubsidiary: true,
    isHighTech: true,
    isExport: false
  }
  complexFormRef.value?.setFieldsValue(values)
  message.success('企业示例数据已填充')
}

const resetComplexForm = () => {
  complexFormRef.value?.setFieldsValue({
    companyName: '',
    companyType: '',
    establishDate: '',
    registeredCapital: null,
    businessScope: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    isPublic: false,
    hasSubsidiary: false,
    isHighTech: false,
    isExport: false
  })
  Object.assign(complexFormData, {})
  message.info('复杂表单已重置')
}

// 工具函数
const getInitialValueByType = (type: string) => {
  switch (type) {
    case 'digit':
    case 'money':
    case 'percent':
      return null
    case 'switch':
      return false
    case 'checkbox':
    case 'dateRange':
      return []
    default:
      return ''
  }
}

const getCurrentSchema = () => {
  switch (activeDataTab.value) {
    case 'basic':
      return basicColumns
    case 'full':
      return fullColumns.value
    case 'drawer':
      return drawerColumns
    case 'dynamic':
      return dynamicColumns.value
    case 'complex':
      return complexColumns
    default:
      return []
  }
}
</script>

<style lang="scss" scoped>
.cool-schema-form-demo {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
      background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
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
  
  // 抽屉触发器
  .drawer-trigger {
    text-align: center;
    padding: 40px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    border-radius: 12px;
    margin-bottom: 20px;
  }
  
  // 动态控制
  .dynamic-controls {
    margin-bottom: 20px;
    padding: 16px;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px dashed #cbd5e1;
  }
  
  // 表单操作
  .form-actions {
    margin-top: 16px;
    padding: 16px;
    background: white;
    border-radius: 8px;
    border: 1px solid #f0f0f0;
    text-align: center;
  }
  
  // 数据显示
  .data-display {
    background: linear-gradient(135deg, #2c3e50 0%, #4a6741 100%);
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
  }
}

// 全局样式覆盖
:deep(.ant-btn) {
  border-radius: 6px;
  font-weight: 500;
  
  &.ant-btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    
    &:hover {
      background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    }
  }
  
  &.ant-btn-dashed {
    border-color: #667eea;
    color: #667eea;
    
    &:hover {
      border-color: #5a6fd8;
      color: #5a6fd8;
    }
  }
}

:deep(.cool-base-form__submitter) {
  margin-top: 24px;
}
</style>
