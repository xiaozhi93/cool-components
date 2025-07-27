<template>
  <div class="cool-query-filter-demo">
    <!-- 头部介绍 -->
    <div class="demo-header">
      <h1>🔍 CoolQueryFilter 查询筛选组件</h1>
      <p class="demo-desc">
        基于 Ant Design Vue 的查询筛选表单，支持多种字段类型，适用于表格、列表等场景的高级筛选。
      </p>
    </div>

    <!-- 基础用法示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>🚀 基础用法</h2>
        <span class="section-badge">筛选表单</span>
      </div>
      <div class="demo-content">
        <div class="example-wrapper">
          <CoolQueryFilter
            :model="filterData"
            :on-search="handleSearch"
            :on-reset="handleReset"
          >
            <CoolFormField
              value-type="text"
              label="关键词"
              name="keyword"
              v-model:value="filterData.keyword"
              placeholder="请输入关键词"
            />
            <CoolFormField
              value-type="select"
              label="状态"
              name="status"
              v-model:value="filterData.status"
              placeholder="请选择状态"
              :options="statusOptions"
            />
            <CoolFormField
              value-type="date"
              label="创建日期"
              name="date"
              v-model:value="filterData.date"
              placeholder="请选择日期"
            />
          </CoolQueryFilter>
        </div>
      </div>
    </section>

    <!-- 高级用法示例 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>🎯 高级用法</h2>
        <span class="section-badge">折叠筛选项</span>
      </div>
      <div class="demo-content">
        <div class="example-wrapper">
          <CoolQueryFilter
            :model="advancedFilterData"
            :on-search="handleAdvancedSearch"
            :on-reset="handleAdvancedReset"
          >
            <CoolFormField
              value-type="text"
              label="商品名称"
              name="productName"
              v-model:value="advancedFilterData.productName"
              placeholder="请输入商品名称"
            />
            <CoolFormField
              value-type="select"
              label="商品分类"
              name="category"
              v-model:value="advancedFilterData.category"
              placeholder="请选择商品分类"
              :options="categoryOptions"
            />
            <CoolFormField
              value-type="digit"
              label="最低价格"
              name="minPrice"
              v-model:value="advancedFilterData.minPrice"
              placeholder="请输入最低价格"
            />
            <CoolFormField
              value-type="digit"
              label="最高价格"
              name="maxPrice"
              v-model:value="advancedFilterData.maxPrice"
              placeholder="请输入最高价格"
            />
            <CoolFormField
              value-type="dateRange"
              label="上架时间"
              name="publishDate"
              v-model:value="advancedFilterData.publishDate"
            />
            <CoolFormField
              value-type="select"
              label="库存状态"
              name="stockStatus"
              v-model:value="advancedFilterData.stockStatus"
              :options="stockStatusOptions"
            />
            <CoolFormField
              value-type="select"
              label="是否推荐"
              name="isRecommended"
              v-model:value="advancedFilterData.isRecommended"
              :options="isRecommendedOptions"
            />
            <!-- <CoolFormField
              value-type="timeRange"
              label="营业时间"
              name="businessHours"
              v-model:value="advancedFilterData.businessHours"
            /> -->
          </CoolQueryFilter>
        </div>
      </div>
    </section>

    <!-- 数据展示 -->
    <div class="data-display">
      <h3 style="color: #ecf0f1; margin-bottom: 16px; font-size: 18px;">
        📊 当前筛选条件
      </h3>
      <div style="margin-bottom: 24px;">
        <h4 style="color: #3498db; margin-bottom: 12px;">基础筛选：</h4>
        <pre>{{ JSON.stringify(filterData, null, 2) }}</pre>
      </div>
      <div>
        <h4 style="color: #e74c3c; margin-bottom: 12px;">高级筛选：</h4>
        <pre>{{ JSON.stringify(advancedFilterData, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Input as AInput } from 'ant-design-vue'
import CoolQueryFilter from '../index.vue'
import CoolFormField from '../../cool-form-field/index'

const filterData = reactive({
  keyword: '111',
  status: '',
  date: ''
})

const advancedFilterData = reactive({
  productName: '',
  category: '',
  minPrice: '',
  maxPrice: '',
  publishDate: [],
  stockStatus: '',
  isRecommended: false,
  businessHours: []
})

const statusOptions = [
  { label: '启用', value: 'active' },
  { label: '禁用', value: 'inactive' }
]

const categoryOptions = [
  { label: '电子产品', value: 'electronics' },
  { label: '服装鞋帽', value: 'clothing' },
  { label: '家居用品', value: 'home' },
  { label: '图书音像', value: 'books' },
  { label: '运动户外', value: 'sports' }
]

const stockStatusOptions = [
  { label: '有库存', value: 'in_stock' },
  { label: '库存不足', value: 'low_stock' },
  { label: '缺货', value: 'out_of_stock' }
]

const isRecommendedOptions = [
  { label: '是', value: 'yes' },
  { label: '否', value: 'no' }
]

const handleChange = (value: any) => {
  filterData.keyword = '123'
  console.log(value, 'value')
}

const handleSearch = (values: any) => {
  // 这里只做演示，实际可发起请求
  console.log('基础筛选条件：', values)
}

const handleReset = () => {
  console.log('基础筛选条件已重置')
}

const handleAdvancedSearch = (values: any) => {
  // 这里只做演示，实际可发起请求
  console.log('高级筛选条件：', values)
}

const handleAdvancedReset = () => {
  console.log('高级筛选条件已重置')
}
</script>

<style lang="scss" scoped>
.cool-query-filter-demo {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 0;

  .demo-header {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    color: white;
    text-align: center;
    padding: 60px 20px;
    margin-bottom: 0;
    h1 {
      font-size: 40px;
      font-weight: 700;
      margin: 0 0 20px 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    .demo-desc {
      font-size: 18px;
      line-height: 1.6;
      opacity: 0.95;
      max-width: 1200px;
      margin: 0 auto;
    }
  }

  .demo-section {
    background: white;
    margin: 40px auto 0 auto;
    max-width: 1200px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    .section-header {
      background: linear-gradient(135deg, #f9ea8f 0%, #fbc2eb 100%);
      padding: 20px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        color: #2c3e50;
        font-size: 22px;
        font-weight: 600;
        margin: 0;
      }
      .section-badge {
        background: rgba(255, 255, 255, 0.8);
        color: #2c3e50;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
      }
    }
    .demo-content {
      padding: 32px;
    }
  }

  .example-wrapper {
    background: #fafbfc;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e8e8e8;
  }

  .data-display {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    border-radius: 12px;
    padding: 24px;
    color: #ecf0f1;
    font-size: 14px;
    line-height: 1.6;
    max-width: 1200px;
    margin: 40px auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
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
</style>
