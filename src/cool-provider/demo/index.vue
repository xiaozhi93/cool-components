<template>
  <div class="cool-provider-demo">
    <h2>CoolProvider 演示示例</h2>
    
    <!-- 基础用法示例 -->
    <div class="demo-section">
      <h3>1. 基础用法 - Props 传入服务</h3>
      <CoolProvider :services="basicServices" :utils="basicUtils">
        <BasicUsageExample />
      </CoolProvider>
    </div>

    <!-- 全局注册示例 -->
    <div class="demo-section">
      <h3>2. 全局注册用法</h3>
      <div class="demo-actions">
        <a-button @click="registerGlobalServices" type="primary">
          注册全局服务
        </a-button>
        <a-button @click="registerGlobalUtils" type="primary">
          注册全局工具
        </a-button>
      </div>
      <CoolProvider>
        <GlobalUsageExample />
      </CoolProvider>
    </div>

    <!-- 混合使用示例 -->
    <div class="demo-section">
      <h3>3. 混合使用 - Props + 全局注册</h3>
      <CoolProvider :services="mixedServices">
        <MixedUsageExample />
      </CoolProvider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Button as AButton } from 'ant-design-vue'
import CoolProvider from '../index.vue'
import { 
  registerGlobalServices, 
  registerGlobalUtils,
  useCoolProvider 
} from '../provider'
import type { CoolProviderServices, CoolProviderUtils } from '../types'

// 基础服务示例
const basicServices: CoolProviderServices = {
  dictionaryService: {
    async getDictionary(code: string) {
      // 模拟字典数据
      const mockData: Record<string, any[]> = {
        'user-status': [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 }
        ],
        'order-status': [
          { label: '待支付', value: 'pending' },
          { label: '已支付', value: 'paid' },
          { label: '已完成', value: 'completed' }
        ]
      }
      
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(mockData[code] || [])
        }, 500)
      })
    }
  },
  requestService: {
    async request(url: string, options: Record<string, any> = {}) {
      console.log('请求:', url, options)
      return { data: 'mock response' }
    }
  }
}

// 基础工具示例
const basicUtils: CoolProviderUtils = {
  currency: {
    formatCurrency(amount: number | string, options = {}) {
      const num = typeof amount === 'string' ? parseFloat(amount) : amount
      return `¥${num.toFixed(2)}`
    }
  }
}

// 混合服务示例
const mixedServices: Partial<CoolProviderServices> = {
  licenseRecognitionService: {
    async recognizeLicense(file: File | string) {
      console.log('识别营业执照:', file)
      return {
        companyName: '示例科技有限公司',
        creditCode: '91110000000000000X',
        legalPerson: '张三',
        registeredCapital: '1000万元'
      }
    }
  }
}

// 注册全局服务
const registerGlobalServicesHandler = () => {
  registerGlobalServices({
    dictionaryService: {
      async getDictionary(code: string) {
        console.log('全局字典服务:', code)
        return [
          { label: '全局选项1', value: 'global1' },
          { label: '全局选项2', value: 'global2' }
        ]
      }
    }
  })
  console.log('已注册全局服务')
}

// 注册全局工具
const registerGlobalUtilsHandler = () => {
  registerGlobalUtils({
    date: {
      formatDate(date: string | number | Date, format = 'YYYY-MM-DD HH:mm:ss') {
        const d = new Date(date)
        return d.toLocaleString('zh-CN')
      },
      fromNow(date: string | number | Date) {
        const d = new Date(date)
        const now = new Date()
        const diff = now.getTime() - d.getTime()
        const minutes = Math.floor(diff / 60000)
        return `${minutes} 分钟前`
      },
      diff() {
        return 0
      }
    }
  })
  console.log('已注册全局工具')
}

// 基础用法示例组件
const BasicUsageExample = defineComponent({
  name: 'BasicUsageExample',
  setup() {
    const { services, utils } = useCoolProvider()
    const loading = ref(false)
    const dictionaryData = ref<any[]>([])
    const formattedAmount = ref('')

    const loadDictionary = async () => {
      if (!services.dictionaryService) return
      
      loading.value = true
      try {
        const data = await services.dictionaryService.getDictionary('user-status')
        dictionaryData.value = data
      } finally {
        loading.value = false
      }
    }

    const formatAmount = () => {
      if (utils.currency) {
        formattedAmount.value = utils.currency.formatCurrency(1234.56)
      }
    }

    onMounted(() => {
      loadDictionary()
      formatAmount()
    })

    return {
      loading,
      dictionaryData,
      formattedAmount,
      loadDictionary,
      formatAmount
    }
  },
  template: `
    <div class="example-content">
      <p><strong>字典服务示例:</strong></p>
      <a-button :loading="loading" @click="loadDictionary">
        加载字典数据
      </a-button>
      <div v-if="dictionaryData.length">
        <a-tag v-for="item in dictionaryData" :key="item.value">
          {{ item.label }}
        </a-tag>
      </div>
      
      <p><strong>工具方法示例:</strong></p>
      <p>格式化金额: {{ formattedAmount }}</p>
    </div>
  `
})

// 全局用法示例组件
const GlobalUsageExample = defineComponent({
  name: 'GlobalUsageExample',
  setup() {
    const { services, utils } = useCoolProvider()
    const globalData = ref<any[]>([])

    const loadGlobalData = async () => {
      if (!services.dictionaryService) return
      
      const data = await services.dictionaryService.getDictionary('global-test')
      globalData.value = data
    }

    const formatDate = () => {
      if (utils.date) {
        return utils.date.formatDate(new Date())
      }
      return '无日期工具'
    }

    onMounted(() => {
      loadGlobalData()
    })

    return {
      globalData,
      loadGlobalData,
      formatDate
    }
  },
  template: `
    <div class="example-content">
      <p><strong>全局服务示例:</strong></p>
      <a-button @click="loadGlobalData">
        加载全局数据
      </a-button>
      <div v-if="globalData.length">
        <a-tag v-for="item in globalData" :key="item.value">
          {{ item.label }}
        </a-tag>
      </div>
      
      <p><strong>全局工具示例:</strong></p>
      <p>当前时间: {{ formatDate() }}</p>
    </div>
  `
})

// 混合用法示例组件
const MixedUsageExample = defineComponent({
  name: 'MixedUsageExample',
  setup() {
    const { services, utils } = useCoolProvider()
    const licenseData = ref<any>(null)
    const loading = ref(false)

    const recognizeLicense = async () => {
      if (!services.licenseRecognitionService) return
      
      loading.value = true
      try {
        const data = await services.licenseRecognitionService.recognizeLicense('mock-file')
        licenseData.value = data
      } finally {
        loading.value = false
      }
    }

    return {
      licenseData,
      loading,
      recognizeLicense
    }
  },
  template: `
    <div class="example-content">
      <p><strong>营业执照识别服务:</strong></p>
      <a-button :loading="loading" @click="recognizeLicense">
        识别营业执照
      </a-button>
      <div v-if="licenseData" class="license-result">
        <p>公司名称: {{ licenseData.companyName }}</p>
        <p>统一社会信用代码: {{ licenseData.creditCode }}</p>
        <p>法定代表人: {{ licenseData.legalPerson }}</p>
        <p>注册资本: {{ licenseData.registeredCapital }}</p>
      </div>
    </div>
  `
})
</script>

<style scoped lang="scss">
.cool-provider-demo {
  padding: 20px;
  
  .demo-section {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #e8e8e8;
    border-radius: 6px;
    
    h3 {
      margin-top: 0;
      color: #1890ff;
    }
    
    .demo-actions {
      margin-bottom: 20px;
      
      .ant-btn {
        margin-right: 10px;
      }
    }
    
    .example-content {
      padding: 16px;
      background: #fafafa;
      border-radius: 4px;
      
      p {
        margin: 8px 0;
      }
      
      .license-result {
        margin-top: 16px;
        padding: 12px;
        background: #fff;
        border-radius: 4px;
        border-left: 4px solid #52c41a;
      }
    }
  }
}
</style>
