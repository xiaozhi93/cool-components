<template>
  <div class="cool-table-demo">
    <h2>CoolTable 基础演示</h2>
    <CoolTable
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      row-key="id"
    />
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import CoolTable from '../index.vue'
import type { ProColumns } from '../types'
import { Tag as ATag, Button as AButton, Space as ASpace } from 'ant-design-vue'

// 定义数据类型
interface DataItem {
  id: string
  name: string
  age: number
  email: string
  status: string
  createTime: string
}

// 列配置
const columns: ProColumns<DataItem>[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 120,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    valueType: 'select',
    width: 100,
    customRender: ({ text }) => {
      const statusMap = {
        active: { text: '活跃', color: 'green' },
        inactive: { text: '非活跃', color: 'red' },
        pending: { text: '待处理', color: 'orange' }
      }
      const status = statusMap[text as keyof typeof statusMap]
      return status ? <ATag color={status.color}>{status.text}</ATag> : text
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    valueType: 'dateRange',
    width: 180,
  },
  {
    title: '操作',
    key: 'action',
    width: 120,
    customRender: ({ record }) => {
      return (
        <ASpace>
          <AButton type="link" size="small">编辑</AButton>
          <AButton type="link" size="small" danger>删除</AButton>
        </ASpace>
      )
    }
  }
]

// 模拟数据
const dataSource: DataItem[] = [
  {
    id: '1',
    name: '张三',
    age: 28,
    email: 'zhangsan@example.com',
    status: 'active',
    createTime: '2024-01-15 10:30:00'
  },
  {
    id: '2',
    name: '李四',
    age: 32,
    email: 'lisi@example.com',
    status: 'inactive',
    createTime: '2024-01-14 14:20:00'
  },
  {
    id: '3',
    name: '王五',
    age: 25,
    email: 'wangwu@example.com',
    status: 'pending',
    createTime: '2024-01-13 09:15:00'
  },
  {
    id: '4',
    name: '赵六',
    age: 35,
    email: 'zhaoliu@example.com',
    status: 'active',
    createTime: '2024-01-12 16:45:00'
  },
  {
    id: '5',
    name: '钱七',
    age: 29,
    email: 'qianqi@example.com',
    status: 'inactive',
    createTime: '2024-01-11 11:30:00'
  }
]

// 分页配置
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: dataSource.length,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number, range: [number, number]) => 
    `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
})
</script>

<style scoped lang="scss">
.cool-table-demo {
  padding: 20px;
  
  h2 {
    margin-bottom: 20px;
    color: #333;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
