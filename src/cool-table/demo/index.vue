<template>
  <div class="cool-table-demo">
    <h2>CoolTable 基础演示</h2>
    
    <!-- 静态数据表格 -->
    <div class="demo-section">
      <h3>静态数据表格</h3>
      <CoolTable
        :columns="columns"
        :data-source="dataSource"
        :pagination="pagination"
        row-key="id"
      >
        <template #toolbar>
          <a-button type="primary">新增</a-button>
        </template>
      </CoolTable>
    </div>

    <!-- 动态请求数据表格 -->
    <div class="demo-section">
      <h3>动态请求数据表格</h3>
      <CoolTable
        :columns="requestColumns"
        :request="fetchData"
        :request-options="requestOptions"
        row-key="id"
      >
        <template #toolbar>
          <a-button type="primary" @click="handleAdd">新增</a-button>
        </template>
      </CoolTable>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import CoolTable from '../index.vue'
import type { ProColumns, RequestData } from '../types'
import { Tag as ATag, Button as AButton, Space as ASpace, message } from 'ant-design-vue'

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

// 动态请求表格的列配置
const requestColumns: ProColumns<DataItem>[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 120,
    search: true,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 80,
    search: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
    width: 200,
    search: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    valueType: 'select',
    width: 100,
    search: true,
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
    search: {
      transform: (value: any) => ({
        startTime: value?.[0],
        endTime: value?.[1]
      })
    }
  },
  {
    title: '操作',
    key: 'action',
    width: 120,
    customRender: ({ record }) => {
      return (
        <ASpace>
          <AButton type="link" size="small" onClick={() => handleEdit(record)}>编辑</AButton>
          <AButton type="link" size="small" danger onClick={() => handleDelete(record)}>删除</AButton>
        </ASpace>
      )
    }
  }
]

// 模拟动态数据 - 增加更多数据支持多页
const mockData: DataItem[] = [
  { id: '1', name: '张三', age: 28, email: 'zhangsan@example.com', status: 'active', createTime: '2024-01-15 10:30:00' },
  { id: '2', name: '李四', age: 32, email: 'lisi@example.com', status: 'inactive', createTime: '2024-01-14 14:20:00' },
  { id: '3', name: '王五', age: 25, email: 'wangwu@example.com', status: 'pending', createTime: '2024-01-13 09:15:00' },
  { id: '4', name: '赵六', age: 35, email: 'zhaoliu@example.com', status: 'active', createTime: '2024-01-12 16:45:00' },
  { id: '5', name: '钱七', age: 29, email: 'qianqi@example.com', status: 'inactive', createTime: '2024-01-11 11:30:00' },
  { id: '6', name: '孙八', age: 31, email: 'sunba@example.com', status: 'active', createTime: '2024-01-10 08:20:00' },
  { id: '7', name: '周九', age: 27, email: 'zhoujiu@example.com', status: 'pending', createTime: '2024-01-09 15:45:00' },
  { id: '8', name: '吴十', age: 33, email: 'wushi@example.com', status: 'inactive', createTime: '2024-01-08 12:10:00' },
  { id: '9', name: '郑十一', age: 26, email: 'zhengshiyi@example.com', status: 'active', createTime: '2024-01-07 10:30:00' },
  { id: '10', name: '王十二', age: 34, email: 'wangshier@example.com', status: 'inactive', createTime: '2024-01-06 14:20:00' },
  { id: '11', name: '李十三', age: 30, email: 'lishisan@example.com', status: 'pending', createTime: '2024-01-05 09:15:00' },
  { id: '12', name: '张十四', age: 28, email: 'zhangshisi@example.com', status: 'active', createTime: '2024-01-04 16:45:00' },
  { id: '13', name: '刘十五', age: 31, email: 'liushiwu@example.com', status: 'inactive', createTime: '2024-01-03 11:30:00' },
  { id: '14', name: '陈十六', age: 29, email: 'chenshiliu@example.com', status: 'active', createTime: '2024-01-02 08:20:00' },
  { id: '15', name: '杨十七', age: 27, email: 'yangshiqi@example.com', status: 'pending', createTime: '2024-01-01 15:45:00' },
  { id: '16', name: '黄十八', age: 32, email: 'huangshiba@example.com', status: 'inactive', createTime: '2023-12-31 12:10:00' },
  { id: '17', name: '赵十九', age: 25, email: 'zhaoshijiu@example.com', status: 'active', createTime: '2023-12-30 10:30:00' },
  { id: '18', name: '吴二十', age: 33, email: 'wuershi@example.com', status: 'inactive', createTime: '2023-12-29 14:20:00' },
  { id: '19', name: '孙二一', age: 28, email: 'suneryi@example.com', status: 'pending', createTime: '2023-12-28 09:15:00' },
  { id: '20', name: '周二二', age: 30, email: 'zhouerer@example.com', status: 'active', createTime: '2023-12-27 16:45:00' },
  { id: '21', name: '吴二三', age: 26, email: 'wuersan@example.com', status: 'inactive', createTime: '2023-12-26 11:30:00' },
  { id: '22', name: '郑二四', age: 31, email: 'zhengsi@example.com', status: 'active', createTime: '2023-12-25 08:20:00' },
  { id: '23', name: '王二五', age: 29, email: 'wangwu@example.com', status: 'pending', createTime: '2023-12-24 15:45:00' },
  { id: '24', name: '李二六', age: 34, email: 'liuliu@example.com', status: 'inactive', createTime: '2023-12-23 12:10:00' },
  { id: '25', name: '张二七', age: 27, email: 'zhangqi@example.com', status: 'active', createTime: '2023-12-22 10:30:00' },
  { id: '26', name: '刘二八', age: 32, email: 'liuba@example.com', status: 'inactive', createTime: '2023-12-21 14:20:00' },
  { id: '27', name: '陈二九', age: 28, email: 'chenjiu@example.com', status: 'pending', createTime: '2023-12-20 09:15:00' },
  { id: '28', name: '杨三十', age: 30, email: 'yangsan@example.com', status: 'active', createTime: '2023-12-19 16:45:00' },
  { id: '29', name: '黄三一', age: 25, email: 'huangyi@example.com', status: 'inactive', createTime: '2023-12-18 11:30:00' },
  { id: '30', name: '赵三二', age: 33, email: 'zhaoer@example.com', status: 'active', createTime: '2023-12-17 08:20:00' },
]

// 模拟请求函数
const fetchData = async (params: any, sort: any, filter: any): Promise<Partial<RequestData<DataItem>>> => {
  console.log('请求参数:', params)
  console.log('排序:', sort)
  console.log('过滤:', filter)
  
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // 模拟搜索过滤
  let filteredData = [...mockData]
  
  if (params.name) {
    filteredData = filteredData.filter(item => item.name.includes(params.name))
  }
  
  if (params.age) {
    filteredData = filteredData.filter(item => item.age === Number(params.age))
  }
  
  if (params.email) {
    filteredData = filteredData.filter(item => item.email.includes(params.email))
  }
  
  if (params.status) {
    filteredData = filteredData.filter(item => item.status === params.status)
  }
  
  if (params.startTime && params.endTime) {
    filteredData = filteredData.filter(item => {
      const createTime = new Date(item.createTime)
      const startTime = new Date(params.startTime)
      const endTime = new Date(params.endTime)
      return createTime >= startTime && createTime <= endTime
    })
  }
  
  // 模拟分页
  const { current = 1, pageSize = 5 } = params
  const startIndex = (current - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = filteredData.slice(startIndex, endIndex)
  console.log(paginatedData, 'paginatedData', filteredData.length)
  return {
    data: paginatedData,
    total: filteredData.length
  }
}

// 请求配置
const requestOptions = {
  manual: false, // 自动执行
  defaultParams: [
    {
      current: 1,
      pageSize: 5 // 每页显示5条，30条数据分成6页
    }
  ]
}

// 操作函数
const handleAdd = () => {
  message.info('点击了新增按钮')
}

const handleRefresh = () => {
  message.info('点击了刷新按钮')
}

const handleEdit = (record: DataItem) => {
  message.info(`编辑用户: ${record.name}`)
}

const handleDelete = (record: DataItem) => {
  message.info(`删除用户: ${record.name}`)
}
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

  .demo-section {
    margin-bottom: 40px;
    
    h3 {
      margin-bottom: 16px;
      color: #666;
      font-size: 16px;
      font-weight: 500;
      border-left: 3px solid #1890ff;
      padding-left: 12px;
    }
  }
}
</style>
