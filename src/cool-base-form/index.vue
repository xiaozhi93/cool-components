<template>
  <a-form
    ref="formRef"
    auto-complete="off"
    v-bind="formProps"
  >
    <!-- 透传默认插槽 -->
    <RowWrapper>
      <slot />
    </RowWrapper>
    <!-- 增强的submitter插槽 -->
    <div v-if="submitter" class="cool-base-form__submitter">
      <component :is="submitterComponent" />
    </div>
  </a-form>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs, h, useSlots } from 'vue'
import { Form as AForm } from 'ant-design-vue'
import type { FormInstance } from 'ant-design-vue/es/form'
import type { CoolBaseFormProps } from './types'
import Submitter from './components/submitter.vue'
import { useGridHelpers, provideGridContext } from '../cool-form-field/utils/grid'
import { provideEditOrReadContext, type ProFormEditOrReadConfig } from '../cool-form-field/utils/editOrRead'

defineOptions({
  name: 'CoolBaseForm',
  inheritAttrs: false
})

// 定义组件 props
const props = withDefaults(defineProps<CoolBaseFormProps>(), {
  grid: false,
  rowProps: () => ({
    gutter: 16
  }),
  colProps: () => ({
    span: 8
  }),
  readonly: false,
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
const slots = useSlots()

// 表单引用
const formRef = ref<FormInstance>()

// 提交状态
const submitting = ref(false)

// 计算传递给 a-form 的属性（排除自定义属性）
const formProps = computed(() => {
  return attrs
})

// 网格布局
provideGridContext({
  grid: props.grid,
  rowProps: props.rowProps,
  colProps: props.colProps
})
const { RowWrapper } = useGridHelpers({ grid: props.grid, rowProps: props.rowProps });

// 编辑或只读 - 使用计算属性让它变成响应式的
const editOrReadConfig = computed<ProFormEditOrReadConfig>(() => ({
  mode: props.readonly ? 'read' as const : 'edit' as const
}))
provideEditOrReadContext(editOrReadConfig)

// 提交按钮
const submitterComponent = computed(() => {
  if (!props.submitter) return null
  const submitter = () => h(Submitter, {
    ...props.submitterProps,
    submitButtonProps: {
      ...props.submitterProps.submitButtonProps,
      loading: submitting.value
    },
    onSubmit: handleSubmit,
    onReset: handleReset
  })
  if(slots.submitter) {
    return () => {
      return slots.submitter?.({
        Component: submitter
      })
    }
  }
  return submitter
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
