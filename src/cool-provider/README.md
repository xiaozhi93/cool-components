# CoolProvider 上下文组件

CoolProvider 是一个上下文提供组件，用于在整个组件树中共享公共的接口服务和工具方法。它支持字典服务、营业执照识别服务等业务接口，以及 dayjs、currency 等常用工具方法。

## 特性

- 🚀 **灵活的服务管理**：支持字典服务、营业执照识别服务等业务接口
- 🛠️ **丰富的工具方法**：内置货币、日期、数字格式化等常用工具
- 🔧 **双重注册方式**：支持 props 传入和全局注册两种方式
- 📦 **类型安全**：完整的 TypeScript 类型定义
- 🎯 **优先级控制**：props 传入的服务优先级高于全局注册

## 基础用法

### 通过 Props 传入服务

```vue
<template>
  <CoolProvider :services="services" :utils="utils">
    <YourComponent />
  </CoolProvider>
</template>

<script setup lang="ts">
import CoolProvider from '@cool/components/cool-provider'

const services = {
  dictionaryService: {
    async getDictionary(code: string) {
      // 返回字典数据
      return [
        { label: '选项1', value: 'option1' },
        { label: '选项2', value: 'option2' }
      ]
    }
  }
}

const utils = {
  currency: {
    formatCurrency(amount: number) {
      return `¥${amount.toFixed(2)}`
    }
  }
}
</script>
```

### 全局注册服务

```typescript
import { registerGlobalServices, registerGlobalUtils } from '@cool/components/cool-provider'

// 注册全局服务
registerGlobalServices({
  dictionaryService: {
    async getDictionary(code: string) {
      // 全局字典服务实现
      return await fetch(`/api/dictionary/${code}`).then(res => res.json())
    }
  }
})

// 注册全局工具
registerGlobalUtils({
  date: {
    formatDate(date: Date, format = 'YYYY-MM-DD') {
      return dayjs(date).format(format)
    }
  }
})
```

### 在子组件中使用

```vue
<script setup lang="ts">
import { useCoolProvider } from '@cool/components/cool-provider'

const { services, utils } = useCoolProvider()

// 使用字典服务
const loadDictionary = async () => {
  const data = await services.dictionaryService?.getDictionary('user-status')
  console.log(data)
}

// 使用工具方法
const formatAmount = (amount: number) => {
  return utils.currency?.formatCurrency(amount)
}
</script>
```

## API

### CoolProvider Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| services | 服务配置 | `Partial<CoolProviderServices>` | `{}` |
| utils | 工具方法配置 | `Partial<CoolProviderUtils>` | `{}` |

### CoolProviderServices

| 服务 | 说明 | 类型 |
|------|------|------|
| dictionaryService | 字典服务 | `DictionaryService` |
| licenseRecognitionService | 营业执照识别服务 | `LicenseRecognitionService` |
| requestService | 通用请求服务 | `RequestService` |

### CoolProviderUtils

| 工具 | 说明 | 类型 |
|------|------|------|
| currency | 货币工具 | `CurrencyUtils` |
| date | 日期工具 | `DateUtils` |
| number | 数字工具 | `NumberUtils` |

## 服务接口

### DictionaryService

```typescript
interface DictionaryService {
  getDictionary(code: string, params?: Record<string, any>): Promise<Array<{
    label: string
    value: any
    [key: string]: any
  }>>
}
```

### LicenseRecognitionService

```typescript
interface LicenseRecognitionService {
  recognizeLicense(file: File | string, options?: Record<string, any>): Promise<{
    companyName?: string
    creditCode?: string
    legalPerson?: string
    registeredCapital?: string
    [key: string]: any
  }>
}
```

## 工具方法

### CurrencyUtils

```typescript
interface CurrencyUtils {
  formatCurrency(amount: number | string, options?: {
    currency?: string
    locale?: string
    precision?: number
  }): string
}
```

### DateUtils

```typescript
interface DateUtils {
  formatDate(date: string | number | Date | dayjs.Dayjs, format?: string): string
  fromNow(date: string | number | Date | dayjs.Dayjs): string
  diff(date1: string | number | Date | dayjs.Dayjs, date2: string | number | Date | dayjs.Dayjs, unit?: dayjs.ManipulateType): number
}
```

### NumberUtils

```typescript
interface NumberUtils {
  formatNumber(num: number | string, options?: {
    precision?: number
    thousandsSeparator?: string
    decimalSeparator?: string
  }): string
  formatPercent(num: number | string, precision?: number): string
}
```

## 全局注册方法

### registerGlobalServices

注册全局服务，优先级低于 props 传入的服务。

```typescript
function registerGlobalServices(services: Partial<CoolProviderServices>): void
```

### registerGlobalUtils

注册全局工具方法，优先级低于 props 传入的工具。

```typescript
function registerGlobalUtils(utils: Partial<CoolProviderUtils>): void
```

## 使用示例

### 完整的业务场景

```vue
<template>
  <CoolProvider :services="businessServices" :utils="businessUtils">
    <div class="business-app">
      <UserForm />
      <OrderList />
    </div>
  </CoolProvider>
</template>

<script setup lang="ts">
import CoolProvider from '@cool/components/cool-provider'

const businessServices = {
  dictionaryService: {
    async getDictionary(code: string) {
      const response = await fetch(`/api/dictionary/${code}`)
      return response.json()
    }
  },
  licenseRecognitionService: {
    async recognizeLicense(file: File) {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch('/api/license/recognize', {
        method: 'POST',
        body: formData
      })
      return response.json()
    }
  }
}

const businessUtils = {
  currency: {
    formatCurrency(amount: number) {
      return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY'
      }).format(amount)
    }
  },
  date: {
    formatDate(date: Date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
```

## 最佳实践

1. **服务分层**：将不同业务的服务分别注册，便于管理和维护
2. **工具复用**：将常用的格式化工具注册为全局工具，避免重复定义
3. **类型安全**：充分利用 TypeScript 类型定义，确保服务调用的类型安全
4. **错误处理**：在服务实现中添加适当的错误处理逻辑
5. **性能优化**：对于频繁调用的服务，考虑添加缓存机制

## 注意事项

- `useCoolProvider` 必须在 `CoolProvider` 组件内部使用
- props 传入的服务优先级高于全局注册的服务
- 服务方法应该是异步的，返回 Promise
- 工具方法应该是纯函数，不产生副作用
