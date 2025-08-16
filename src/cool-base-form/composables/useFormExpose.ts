import { getCurrentInstance, onMounted, type Ref } from 'vue';
import { extend } from 'lodash-es';
import type { CoolBaseFormExpose } from '../types'

export function useFormExpose(formRef: Ref<CoolBaseFormExpose>, expose?: Record<string, any>) {
  const instance = getCurrentInstance();
  
  if (instance) {
    instance.exposed = instance.exposed || {};
    Object.assign(instance.exposed, {
      submit: () => formRef.value?.submit(),
      reset: () => formRef.value?.reset(),
      validate: () => formRef.value?.validate(),
      validateFields: (fields?: string[]) => formRef.value?.validateFields(fields),
      scrollToField: (name: any, options: [any]) => formRef.value?.scrollToField(name, options),
      resetFields: () => formRef.value?.resetFields(),
      clearValidate: (fields?: string[]) => formRef.value?.clearValidate(fields),
      ...(expose || {})
    });
  }
}

