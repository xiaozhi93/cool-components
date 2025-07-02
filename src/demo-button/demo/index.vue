<template>
  <demo-block title="基础用法">
    <demo-button type="primary" style="margin-left: 15px">按钮</demo-button>
  </demo-block>

  <demo-block title="自定义颜色">
    <demo-button color="#03a9f4" style="margin-left: 15px">按钮</demo-button>
  </demo-block>

  <demo-block title="不同类型">
    <demo-button type="primary" style="margin-left: 15px">主要按钮</demo-button>
    <demo-button type="secondary" style="margin-left: 15px">次要按钮</demo-button>
  </demo-block>

  <demo-block title="自定义内容">
    <demo-button color="#ff6b35" style="margin-left: 15px">
      🚀 火箭按钮
    </demo-button>
    <demo-button color="#4ecdc4" style="margin-left: 15px">
      ✨ 特效按钮
    </demo-button>
  </demo-block>
</template>

<script setup lang="ts">
import DemoButton from '../index.vue';

// 如果需要可以在这里定义一些响应式数据或方法
// import { ref, reactive } from 'vue';
</script>

<style lang="scss" scoped>
// 演示页面的自定义样式
.demo-block {
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
