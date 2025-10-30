<template>
  <div style="padding: 16px">
    <CoolDescriptions
      :dataSource="user"
      :columns="columns"
      layout="vertical"
      :column="{ xs: 2, sm: 3, md: 4 }"
      title="用户详情"
    >
      <template #extra>
        <Space>
          <Button type="primary" @click="onReload">刷新</Button>
          <Button>更多</Button>
        </Space>
      </template>

      <template #name="{ value }">
        <strong>{{ value }}</strong>
      </template>
    </CoolDescriptions>
  </div>
</template>

<script setup lang="ts">
import CoolDescriptions from '../index.vue';
import { Space, Button } from 'ant-design-vue';
import { ref } from 'vue';

const user = ref({
  name: '张三',
  birthday: '1995-03-01',
  balance: 123456.78,
  status: 1,
  remark: '这是一段较长的备注，展示 ellipsis 效果并支持复制',
});

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '生日', dataIndex: 'birthday', formatter: 'date' },
  { title: '余额', dataIndex: 'balance', formatter: 'currency', currency: 'CNY' },
  { title: '状态', dataIndex: 'status', formatter: 'enum', enumMap: { 1: '启用', 0: { label: '禁用', color: 'red' } } },
  { title: '备注', dataIndex: 'remark', span: 2, ellipsis: true, copyable: true },
];

function onReload() {
  user.value = { ...user.value };
}
</script>

<style scoped></style>


