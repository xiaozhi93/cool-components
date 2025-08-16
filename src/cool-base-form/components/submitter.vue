<template>
  <a-space>
    <a-button v-if="resetText" v-bind="resetButtonProps" @click="reset">
      {{ resetText }}
    </a-button>
    <a-button v-if="submitText" type="primary" v-bind="submitButtonProps" @click="submit">
      {{ submitText }}
    </a-button>
  </a-space>
</template>
<script setup lang="ts">
import { Button as AButton, Space as ASpace } from 'ant-design-vue'
import type { ButtonProps } from 'ant-design-vue/es/button'

export interface SubmitterProps {
  onSubmit?: (value?: any) => void;
  onReset?: (value?: any) => void;
  searchConfig?: {
    submitText: string;
    resetText: string;
  };
  submitButtonProps?: false | (ButtonProps & { preventDefault?: boolean });
  resetButtonProps?: false | (ButtonProps & { preventDefault?: boolean });
}
const props = defineProps<SubmitterProps>()

const submit = () => {
  props.onSubmit?.();
};

const reset = () => {
  props.onReset?.();
};

const {
  submitText = '提交',
  resetText = '',
} = props.searchConfig || {};
</script>
<style scoped lang="scss"></style>