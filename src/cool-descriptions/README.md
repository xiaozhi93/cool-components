# CoolDescriptions

基于 columns 的详情展示组件，支持顶部标题/操作区、水平/垂直布局、响应式列数、内置格式化、插槽/自定义渲染与内置请求。

## 基本用法

```vue
<CoolDescriptions
  :dataSource="user"
  :columns="[
    { title: '姓名', dataIndex: 'name' },
    { title: '生日', dataIndex: 'birthday', formatter: 'date' },
    { title: '余额', dataIndex: 'balance', formatter: 'currency', currency: 'CNY' },
    { title: '状态', dataIndex: 'status', formatter: 'enum', enumMap: { 1: '启用', 0: { label: '禁用', color: 'red' } } },
    { title: '备注', dataIndex: 'remark', span: 2, ellipsis: true },
  ]"
  layout="vertical"
  :column="{ xs: 1, sm: 2, md: 3 }"
  title="用户详情"
>
  <template #extra>
    <a-space>
      <a-button type="primary">编辑</a-button>
      <a-button danger>禁用</a-button>
    </a-space>
  </template>

  <template #name="{ value }">
    <a-typography-text strong>{{ value }}</a-typography-text>
  </template>
</CoolDescriptions>
```

## 请求用法

```vue
<CoolDescriptions
  :columns="columns"
  :params="{ id }"
  :request="async (p) => fetchUser(p.id)"
  :column="3"
  bordered
/>
```

## Props
- dataSource?: Record<string, any>
- columns: DescriptionColumn[]
- layout?: 'horizontal' | 'vertical' = 'horizontal'
- column?: number | { xs?, sm?, md?, lg?, xl? } = 3
- bordered?: boolean
- size?: 'small' | 'middle' | 'large' = 'middle'
- title?: string
- extra?: string | VNode
- loading?: boolean
- emptyText?: string = '-'
- request?: (params?: any) => Promise<Record<string, any>>
- params?: any
- immediate?: boolean = true

## Column
- dataIndex: string | (rec) => any
- title?: string
- tooltip?: string
- span?: number
- show?: boolean | (rec) => boolean
- ellipsis?: boolean
- copyable?: boolean
- render?: ({ value, dataSource, column, index }) => VNodeChild
- formatter?: 'date' | 'datetime' | 'time' | 'currency' | 'enum' | ((value, rec, col) => any)
- format?: string
- currency?: string
- enumMap?: Record<string | number, string | { label: string; color?: string }>

## 插槽
- #title / #extra 顶部区域
- #<dataIndex> 值插槽（作用域：{ value, dataSource, column, index }）
- #<dataIndex>-label 标签插槽
- #<dataIndex>-extra 值区域扩展插槽

## Expose
- reload(params?)
- setDataSource(ds)

## Emits
- load(data)
- error(err)
- update:dataSource(data)


