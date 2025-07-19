<template>
  <a-form
    ref="formRef"
    auto-complete="off"
    v-bind="formProps"
  >
    <!-- 透传默认插槽 -->
    <slot />
    
    <!-- 增强的submitter插槽 -->
    <div v-if="submitter" class="cool-base-form__submitter">
      <slot name="submitter" :form="formRef" :submit="handleSubmit" :reset="handleReset">
        <Submitter
          v-bind="submitterProps"
          :submit-button-props="{
            ...submitterProps.submitButtonProps,
            loading: submitting,
          }"
          @submit="handleSubmit"
          @reset="handleReset"

        />
      </slot>
    </div>
  </a-form>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'
import { Form as AForm } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue/es/form'
import type { CoolBaseFormProps } from './types'
import Submitter from './components/submitter.vue'

defineOptions({
  name: 'CoolBaseForm',
  inheritAttrs: false
})

// 定义组件 props
const props = withDefaults(defineProps<CoolBaseFormProps>(), {
  submitter: true,
  submitterProps: () => ({
    submitText: '提交',
    resetText: '重置',
    submitButtonProps: {
      type: 'primary',
      htmlType: 'submit'
    }
  })
})

// 获取 attrs
const attrs = useAttrs()

// 表单引用
const formRef = ref<FormInstance>()

// 提交状态
const submitting = ref(false)

// 计算传递给 a-form 的属性（排除自定义属性）
const formProps = computed(() => {
  return attrs
})


// 处理表单提交
const handleSubmit = async () => {
  try {
    const values = await formRef.value?.validate?.()
    submitting.value = true
    if (props.onFinish) {
      await props.onFinish(values)
    }
  } catch (error) {
    console.error('Form finish error:', error)
  } finally {
    submitting.value = false
  }
}

// 处理表单重置
const handleReset = async () => {
  try {
    // 重置表单
    formRef.value?.resetFields()
    
    // 如果有 onReset 回调，则调用
    if (props.onReset) {
      await props.onReset()
    }
  } catch (error) {
    console.error('Form reset error:', error)
  }
}

// 暴露表单实例方法
defineExpose({
  formRef,
  submit: handleSubmit,
  reset: handleReset,
  validate: () => formRef.value?.validate(),
  validateFields: (fields?: string[]) => formRef.value?.validateFields(fields),
  scrollToField: (name: any, options: [any]) => formRef.value?.scrollToField(name, options),
  resetFields: () => formRef.value?.resetFields(),
  clearValidate: (fields?: string[]) => formRef.value?.clearValidate?.(fields)
})
</script>

<style lang="scss" scoped>
.cool-base-form {
  &__submitter {
    margin-top: 24px;
    text-align: center;
  }
}
</style>
