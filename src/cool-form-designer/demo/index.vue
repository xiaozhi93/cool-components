<template>
  <div class="form-designer-demo">
    <FormDesigner :components="components" />
  </div>
</template>

<script setup lang="ts">
import FormDesigner from '../index.vue';
import type { CoolFormDesignerComponent } from '../types';
import { CheckCircleOutlined } from '@ant-design/icons-vue'
import { createFormField } from '../../cool-form-field/core/createFormField'
import { Input as AInput } from 'ant-design-vue'
const CustomFormInput = createFormField(AInput, 'CustomFormInput')

const components: CoolFormDesignerComponent[] = [
  {
    valueType: 'custom',
    component: CustomFormInput,
    title: '自定义输入框',
    icon: CheckCircleOutlined
  }
];
</script>

<style lang="scss" scoped>
.form-designer-demo {
  height: calc(100vh - 56px - 20px);
}
</style> 