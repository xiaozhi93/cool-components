<template>
  <Drawer v-model:open="open" v-bind="drawerProps">
    <CoolBaseForm  v-bind="formProps" :on-finish="handleFinish">
      <template #default="{ Component }">
        <slot />
         <!-- 先确保footerRef存在 -->
         <Teleport v-if="footerRef" :to="footerRef" defer>
          <component :is="Component" />
        </Teleport>
      </template>
    </CoolBaseForm>
    <template #footer>
      <div class="cool-drawer-form__footer" ref="footerRef"></div>
    </template>
  </Drawer>
  <component :is="triggerComponent" />
</template>

<script setup lang="ts">
import { computed, useSlots, h, useAttrs, ref } from 'vue'
import { Drawer } from 'ant-design-vue'
import CoolBaseForm from '../cool-base-form/index'
import type { CoolDrawerFormProps } from './types'
defineOptions({
  name: 'CoolDrawerForm',
  inheritAttrs: false
})
const attrs = useAttrs()
const slots = useSlots()
const props = withDefaults(defineProps<CoolDrawerFormProps>(), {
  title: '表单',
  width: 500,
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

const open = defineModel<boolean>('open', { required: false })
const footerRef = ref<HTMLElement>()
const drawerProps = computed(() => ({
  title: props.title,
  width: props.width,
  ...props.drawerProps
}))

const formProps = computed(() => {
  attrs._track; // 访问属性，强制建立以来追踪
  return {
    ...attrs,
    layout: 'vertical',
    submitter: true,
    submitterProps: props.submitterProps,
    formComponentType: 'CoolDrawerForm' as const
  }
})

const triggerComponent = computed(() => {
  if (!slots.trigger) return null

  return h('div', {
    onClick: () => {
      open.value = true
    }
  }, slots.trigger())
})

const handleFinish = async(values: any) => {
  const response = props.onFinish?.(values)
  if(response instanceof Promise) {
    await response
  }
  const result = await response;
  // 返回真值，关闭弹框
  if (result) {
    open.value = false;
  }
  return result;
}

</script>

<style scoped lang="scss">
.cool-drawer-form__footer {
  display: flex;
  justify-content: flex-end;
}
</style>