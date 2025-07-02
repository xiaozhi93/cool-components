# 快速上手

## 安装

### 安装组件库

```bash
# 通过 npm
npm i cool-components

# 通过 yarn
yarn add cool-components

# 通过 pnpm
pnpm add cool-components

# 通过 bun
bun add cool-components
```

### 安装 Peer Dependencies

本组件库需要以下依赖作为 peer dependencies，请确保在项目中安装：

```bash
# 必需依赖
npm i vue@^3.3.4

# 可选依赖（根据使用需求安装）
npm i ant-design-vue@^4.0.0 dayjs@^1.11.0 lodash-es@^4.17.0
```

## TypeScript 支持

本组件库完全支持 TypeScript，提供完整的类型声明。

### 基本使用

```typescript
// 在 Vue 3 + TypeScript 项目中使用
import { createApp } from 'vue';
import CoolComponents from 'cool-components';
import 'cool-components/lib/index.css';

const app = createApp({});
app.use(CoolComponents);
```

### 配合其他依赖使用

```typescript
// 使用 dayjs 进行日期处理
import dayjs from 'dayjs';

// 使用 lodash-es 工具函数
import { debounce, cloneDeep } from 'lodash-es';

// 使用 Ant Design Vue 组件
import { Button, DatePicker } from 'ant-design-vue';
```

## 注意事项

1. **Vue 版本**: 请确保使用 Vue 3.3.4 或更高版本
2. **TypeScript**: 推荐使用 TypeScript 5.0 或更高版本
3. **构建工具**: 推荐使用 Vite 或 Webpack 5+
