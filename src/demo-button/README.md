# DemoButton 按钮

### 介绍

DemoButton 是一个基于 Vue 3 + TypeScript 开发的现代化按钮组件，支持多种类型和自定义颜色。

### 引入

```ts
// 方式一：按需引入（推荐）
import { DemoButton } from 'cool-components';

// 方式二：完整引入
import CoolComponents from 'cool-components';
import { createApp } from 'vue';

const app = createApp();
app.use(CoolComponents);
```

### TypeScript 支持

```ts
// 在 TypeScript 项目中使用
import { DemoButton } from 'cool-components';
import type { ComponentProps } from 'vue-component-type-helpers';

// 获取组件属性类型
type DemoButtonProps = ComponentProps<typeof DemoButton>;
```

## 代码演示

### 基础用法

```vue
<template>
  <demo-button type="primary">主要按钮</demo-button>
</template>

<script setup lang="ts">
import { DemoButton } from 'cool-components';
</script>
```

### 自定义颜色

```vue
<template>
  <demo-button color="#03a9f4">自定义颜色</demo-button>
  <demo-button color="#ff6b35">🚀 火箭按钮</demo-button>
</template>

<script setup lang="ts">
import { DemoButton } from 'cool-components';
</script>
```

### 事件处理

```vue
<template>
  <demo-button @click="handleClick">点击我</demo-button>
</template>

<script setup lang="ts">
import { DemoButton } from 'cool-components';

const handleClick = (event: MouseEvent) => {
  console.log('按钮被点击了！', event);
};
</script>
```

## API

### Props

| 参数          | 说明     | 类型     | 默认值    | 版本 |
| ------------- | -------- | -------- | --------- | ---- |
| type          | 按钮类型 | _string_ | `primary` | -    |
| color `1.0.0` | 按钮颜色 | _string_ | -         | 1.0.0 |

### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| click  | 点击时触发 | _event: MouseEvent_ |

### Slots

| 名称    | 说明     | 参数 |
| ------- | -------- | ---- |
| default | 默认插槽 | -    |

### 样式变量

组件提供了以下 CSS 变量，可用于自定义样式：

| 名称 | 默认值 | 描述 |
| ---- | ------ | ---- |
| --demo-button-min-width | 120px | 按钮最小宽度 |
| --demo-button-font-size | 16px | 字体大小 |
| --demo-button-line-height | 36px | 行高 |
| --demo-button-border-radius | 30px | 圆角大小 |
| --demo-button-background-color | #f44 | 默认背景色 |

### 类型定义

```ts
interface DemoButtonProps {
  type?: string;
  color?: string;
}

interface DemoButtonEmits {
  click: (event: MouseEvent) => void;
}
```
