# CoolField 组件

> 统一字段组件，支持多种数据类型和展示模式

## 特性

- 🎯 **类型驱动**: 基于 TypeScript 的完整类型支持
- 🔄 **三种模式**: 支持 read/edit/update 三种展示模式  
- 📦 **完整透传**: 属性、事件、插槽透传机制
- 🎨 **多种类型**: 支持 24+ 种数据类型渲染
- 🛠 **易于扩展**: 支持自定义渲染函数
- 🎪 **开箱即用**: 基于 Ant Design Vue 组件

## 安装

```bash
npm install cool-field
# 或
pnpm add cool-field
# 或
yarn add cool-field
```

## 快速开始

### 基础用法

```vue
<template>
  <div>
    <!-- 只读模式 -->
    <CoolField 
      valueType="text" 
      mode="read" 
      :value="userInfo.name" 
    />
    
    <!-- 编辑模式 -->
    <CoolField 
      valueType="text" 
      mode="edit" 
      v-model:value="userInfo.name"
      placeholder="请输入姓名"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CoolField from 'cool-field'

const userInfo = ref({
  name: '张三'
})
</script>
```

### 数据类型示例

```vue
<template>
  <div>
    <!-- 文本类型 -->
    <CoolField valueType="text" mode="read" :value="data.text" />
    
    <!-- 数字类型 -->
    <CoolField valueType="number" mode="read" :value="data.number" />
    
    <!-- 金额类型 -->
    <CoolField 
      :valueType="{ type: 'money', currency: '¥', precision: 2 }" 
      mode="read" 
      :value="data.money" 
    />
    
    <!-- 百分比类型 -->
    <CoolField 
      :valueType="{ type: 'percent', precision: 1, showColor: true }" 
      mode="read" 
      :value="data.percent" 
    />
    
    <!-- 日期类型 -->
    <CoolField 
      :valueType="{ type: 'date', format: 'YYYY-MM-DD' }" 
      mode="read" 
      :value="data.date" 
    />
    
    <!-- 枚举选择 -->
    <CoolField 
      valueType="select" 
      mode="read" 
      :value="data.status"
      :valueEnum="statusEnum"
    />
  </div>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| valueType | 字段类型 | `string \| object` | `'text'` |
| mode | 显示模式 | `'read' \| 'edit' \| 'update'` | `'read'` |
| value | 字段值 | `any` | - |
| placeholder | 占位符文本 | `string` | - |
| emptyText | 空值显示文本 | `string` | `'-'` |
| readonly | 是否只读 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| valueEnum | 枚举值配置 | `CoolValueEnum` | - |
| request | 异步请求函数 | `CoolFieldRequestData` | - |
| params | 请求参数 | `Record<string, any>` | - |
| render | 自定义渲染函数 | `RenderFunction` | - |

### ValueType 类型

#### 基础类型

| 类型 | 说明 | 示例 |
|------|------|------|
| `text` | 文本 | 普通文本显示 |
| `password` | 密码 | 密码遮罩显示 |
| `textarea` | 多行文本 | 支持换行的文本 |
| `number` | 数字 | 数字格式显示 |
| `digit` | 整数 | 整数输入 |
| `money` | 金额 | 货币格式显示 |
| `percent` | 百分比 | 百分比格式显示 |

#### 日期时间类型

| 类型 | 说明 | 格式 |
|------|------|------|
| `date` | 日期 | YYYY-MM-DD |
| `dateTime` | 日期时间 | YYYY-MM-DD HH:mm:ss |
| `dateRange` | 日期区间 | 开始日期 ~ 结束日期 |
| `time` | 时间 | HH:mm:ss |
| `timeRange` | 时间区间 | 开始时间 ~ 结束时间 |

#### 选择类型

| 类型 | 说明 | 配置 |
|------|------|------|
| `select` | 下拉选择 | 需配置 valueEnum |
| `checkbox` | 复选框 | 需配置 valueEnum |
| `radio` | 单选框 | 需配置 valueEnum |
| `radioButton` | 单选按钮 | 需配置 valueEnum |
| `cascader` | 级联选择 | 需配置 options |
| `treeSelect` | 树选择 | 需配置 treeData |

#### 展示类型

| 类型 | 说明 | 特性 |
|------|------|------|
| `progress` | 进度条 | 支持颜色配置 |
| `avatar` | 头像 | 支持图片/文字头像 |
| `image` | 图片 | 支持预览功能 |
| `color` | 颜色 | 颜色选择器 |
| `rate` | 评分 | 星级评分 |
| `slider` | 滑块 | 数值滑动选择 |
| `switch` | 开关 | 布尔值切换 |
| `tag` | 标签 | 标签显示 |
| `badge` | 徽标 | 状态徽标 |

### 对象类型配置

当 `valueType` 为对象时，支持更丰富的配置：

```typescript
// 金额类型配置
{
  type: 'money',
  currency: '¥',           // 货币符号
  precision: 2,            // 小数位数
  locale: 'zh-CN'          // 本地化
}

// 百分比类型配置
{
  type: 'percent',
  precision: 1,            // 小数位数
  showSymbol: true,        // 显示百分号
  showColor: true          // 根据数值显示颜色
}

// 进度条类型配置
{
  type: 'progress',
  showInfo: true,          // 显示进度信息
  strokeColor: '#1890ff',  // 进度条颜色
  trailColor: '#f0f0f0'    // 背景颜色
}

// 日期类型配置
{
  type: 'date',
  format: 'YYYY-MM-DD',    // 日期格式
  showTime: false          // 是否显示时间
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:value | 值更新事件 | `(value: any)` |
| change | 值变化事件 | `(value: any, option?: any)` |
| focus | 焦点事件 | `(event: Event)` |
| blur | 失焦事件 | `(event: Event)` |
| keydown | 按键事件 | `(event: KeyboardEvent)` |
| click | 点击事件 | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 默认插槽 | - |
| prefix | 前缀插槽 | - |
| suffix | 后缀插槽 | - |
| addonBefore | 前置标签 | - |
| addonAfter | 后置标签 | - |

## 高级用法

### 枚举值配置

```vue
<template>
  <CoolField 
    valueType="select" 
    mode="edit" 
    v-model:value="status"
    :valueEnum="statusEnum"
  />
</template>

<script setup>
import { ref } from 'vue'

const status = ref('active')

// 对象形式配置
const statusEnum = {
  active: { label: '激活', value: 'active' },
  inactive: { label: '未激活', value: 'inactive' },
  pending: { label: '待审核', value: 'pending' }
}

// 数组形式配置
const statusEnum2 = [
  { label: '激活', value: 'active' },
  { label: '未激活', value: 'inactive' },
  { label: '待审核', value: 'pending' }
]
</script>
```

### 异步数据加载

```vue
<template>
  <CoolField 
    valueType="select" 
    mode="edit" 
    v-model:value="userId"
    :request="loadUserOptions"
    :params="{ departmentId: currentDeptId }"
  />
</template>

<script setup>
import { ref } from 'vue'

const userId = ref()
const currentDeptId = ref('001')

// 异步加载用户选项
const loadUserOptions = async (params) => {
  const response = await fetch(`/api/users?dept=${params.departmentId}`)
  const users = await response.json()
  
  return users.map(user => ({
    label: user.name,
    value: user.id
  }))
}
</script>
```

### 自定义渲染

```vue
<template>
  <CoolField 
    valueType="text" 
    mode="read" 
    :value="userInfo"
    :render="customRender"
  />
</template>

<script setup>
import { h } from 'vue'
import { Avatar } from 'ant-design-vue'

const userInfo = {
  name: '张三',
  avatar: '/avatar.jpg'
}

// 自定义渲染函数
const customRender = ({ value }) => {
  return {
    component: h('div', { style: 'display: flex; align-items: center; gap: 8px;' }, [
      h(Avatar, { src: value.avatar, size: 32 }),
      h('span', value.name)
    ])
  }
}
</script>
```

### 属性透传

```vue
<template>
  <!-- 透传 Ant Design Vue 组件属性 -->
  <CoolField 
    valueType="text" 
    mode="edit" 
    v-model:value="text"
    placeholder="请输入内容"
    size="large"
    allowClear
    prefix="🔍"
    @focus="handleFocus"
    @change="handleChange"
  />
</template>
```

## 最佳实践

### 1. 类型安全

```typescript
import type { CoolFieldProps } from 'cool-field'

// 定义字段配置
interface FieldConfig extends Partial<CoolFieldProps> {
  label: string
  key: string
}

const fieldConfigs: FieldConfig[] = [
  {
    label: '姓名',
    key: 'name',
    valueType: 'text',
    mode: 'edit'
  },
  {
    label: '年龄',
    key: 'age',
    valueType: 'digit',
    mode: 'edit'
  }
]
```

### 2. 表单集成

```vue
<template>
  <a-form :model="formData" layout="vertical">
    <a-form-item 
      v-for="field in fieldConfigs" 
      :key="field.key"
      :label="field.label"
      :name="field.key"
    >
      <CoolField 
        v-bind="field"
        v-model:value="formData[field.key]"
      />
    </a-form-item>
  </a-form>
</template>
```

### 3. 数据回显

```vue
<template>
  <div>
    <!-- 详情页面回显 -->
    <CoolField 
      v-for="field in detailFields" 
      :key="field.key"
      :valueType="field.valueType"
      mode="read"
      :value="detailData[field.key]"
      :valueEnum="field.valueEnum"
    />
  </div>
</template>
```

### 4. 性能优化

```vue
<script setup>
import { computed, shallowRef } from 'vue'

// 使用 shallowRef 优化大量数据
const largeDataList = shallowRef([])

// 使用 computed 缓存枚举配置
const memoizedEnum = computed(() => {
  return processValueEnum(rawEnumData.value)
})
</script>
```

## 常见问题

### Q: 如何自定义新的字段类型？

A: 可以通过自定义渲染函数实现：

```vue
<template>
  <CoolField 
    valueType="custom"
    :render="customTypeRender"
    :value="value"
  />
</template>

<script setup>
const customTypeRender = ({ value, mode }) => {
  if (mode === 'read') {
    return {
      component: 'div',
      props: { class: 'custom-display' },
      slots: { default: () => `自定义显示: ${value}` }
    }
  }
  
  return {
    component: 'a-input',
    props: { 
      value,
      placeholder: '请输入自定义内容'
    }
  }
}
</script>
```

### Q: 如何处理复杂的数据转换？

A: 可以在父组件中处理数据转换，或使用计算属性：

```vue
<script setup>
import { computed } from 'vue'

const displayValue = computed(() => {
  // 复杂的数据转换逻辑
  return processComplexData(rawValue.value)
})
</script>
```

### Q: 如何集成第三方组件？

A: 通过自定义渲染函数可以集成任何 Vue 组件：

```vue
<script setup>
import ThirdPartyComponent from 'third-party-lib'

const customRender = ({ value, mode, ...props }) => {
  return {
    component: ThirdPartyComponent,
    props: {
      value,
      disabled: mode === 'read',
      ...props
    }
  }
}
</script>
```

## 更新日志

### v1.0.0 (2024-01-15)

- ✨ 初始版本发布
- 🎯 支持 24+ 种字段类型
- 🔄 支持 read/edit/update 三种模式
- 📦 完整的属性、事件、插槽透传
- 🛠 TypeScript 完整支持
- 🎪 基于 Ant Design Vue 组件

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 相关链接

- [Ant Design Vue](https://antdv.com/)
- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/) 