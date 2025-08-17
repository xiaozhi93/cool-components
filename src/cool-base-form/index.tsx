import { defineComponent, ref, computed, h, PropType } from 'vue';
import { Form as AForm } from 'ant-design-vue';
import type { FormInstance } from 'ant-design-vue/es/form';
import type { CoolBaseFormProps } from './types';
import Submitter from './components/submitter.vue';
import { useGridHelpers, provideGridContext } from '../cool-form-field/utils/grid';
import { provideEditOrReadContext, type ProFormEditOrReadConfig } from '../cool-form-field/utils/editOrRead';
import { provideFormFieldContext, type ProFormFieldContext } from '../cool-form-field/utils/field';

export default defineComponent<CoolBaseFormProps>({
  name: 'CoolBaseForm',
  inheritAttrs: false,
  props: {
    grid: { type: Boolean, default: false },
    rowProps: { type: Object as PropType<CoolBaseFormProps['rowProps']>, default: () => ({ gutter: 16 }) },
    colProps: { type: Object as PropType<CoolBaseFormProps['colProps']>, default: () => ({ span: 8 }) },
    readonly: { type: Boolean, default: false },
    formItemProps: { type: Object as PropType<CoolBaseFormProps['formItemProps']>, default: () => ({}) },
    fieldProps: { type: Object as PropType<CoolBaseFormProps['fieldProps']>, default: () => ({}) },
    submitter: { type: Boolean, default: true },
    submitterProps: { type: Object as PropType<CoolBaseFormProps['submitterProps']>, default: () => ({
      submitText: '提交',
      resetText: '重置',
      submitButtonProps: {
        type: 'primary',
        htmlType: 'submit',
      },
    }) },
    onFinish: Function as PropType<CoolBaseFormProps['onFinish']>,
    onReset: Function as PropType<CoolBaseFormProps['onReset']>,
    isKeyPressSubmit: Boolean,
    formComponentType: String as PropType<CoolBaseFormProps['formComponentType']>,
  },
  setup(props, { slots, attrs, expose }) {
    // 表单引用
    const formRef = ref<FormInstance>();
    // 提交状态
    const submitting = ref(false);
    // 计算传递给 a-form 的属性（排除自定义属性）
    const formProps = computed(() => {
      return attrs;
    });
    // 网格布局
    provideGridContext({
      grid: props.grid,
      rowProps: props.rowProps,
      colProps: props.colProps,
    });
    const { RowWrapper } = useGridHelpers({ grid: props.grid, rowProps: props.rowProps });
    // 编辑或只读 - 使用计算属性让它变成响应式的
    const editOrReadConfig = computed<ProFormEditOrReadConfig>(() => ({
      mode: props.readonly ? 'read' : 'edit',
    }));
    provideEditOrReadContext(editOrReadConfig);
    // 表单项上下文
    const formFieldContext = computed<ProFormFieldContext>(() => ({
      formComponentType: props.formComponentType,
      formItemProps: props.formItemProps,
      fieldProps: props.fieldProps,
    }));
    provideFormFieldContext(formFieldContext);
    // 提交按钮
    const handleSubmit = async () => {
      try {
        const values = await formRef.value?.validate?.();
        submitting.value = true;
        if (props.onFinish) {
          await props.onFinish(values);
        }
      } catch (error) {
        console.error('Form finish error:', error);
      } finally {
        submitting.value = false;
      }
    };
    const handleReset = async () => {
      try {
        formRef.value?.resetFields();
        if (props.onReset) {
          await props.onReset(attrs.model || {});
        }
      } catch (error) {
        console.error('Form reset error:', error);
      }
    };
    // 暴露方法
    expose({
      submit: handleSubmit,
      reset: handleReset,
      validate: () => formRef.value?.validate(),
      validateFields: (fields?: string[]) => formRef.value?.validateFields(fields),
      scrollToField: (name: any, options: [any]) => formRef.value?.scrollToField(name, options),
      resetFields: () => formRef.value?.resetFields(),
      clearValidate: (fields?: string[]) => formRef.value?.clearValidate?.(fields),
    });
    // 渲染
    return () => {
      const submitterDom = () => h(Submitter, {
        ...props.submitterProps,
        submitButtonProps: {
          ...props.submitterProps?.submitButtonProps,
          loading: submitting.value,
        },
        onSubmit: handleSubmit,
        onReset: handleReset,
      })
      return (
        <AForm ref={formRef} auto-complete="off" {...formProps.value} onKeydown={(e: any) => {
          if (!props.isKeyPressSubmit) return;
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }} >
          <RowWrapper>
            {slots.default?.({
              Component: submitterDom,
            })}
          </RowWrapper>
        </AForm>
      )
    };
  },
});