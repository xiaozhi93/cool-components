import { defineComponent, computed, h, shallowRef, watchEffect, Fragment, reactive, watch, type VNode, type PropType } from "vue";
import type { CoolSchemaFormProps, FormLayoutType } from "./types";
import { SchemaFormLayout } from "./core";
import { genFormItems } from "./valueType";
import { omit } from "lodash-es";

export default defineComponent<CoolSchemaFormProps>({
  name: "CoolSchemaForm",
  inheritAttrs: false,
  props: {
    columns: {
      type: Array as PropType<CoolSchemaFormProps["columns"]>,
      default: () => []
    },
    layoutType: {
      type: String as PropType<FormLayoutType>,
      default: "CoolForm"
    }
  },
  setup(props, { attrs, slots, expose }) {
    const formModel = reactive<Record<string, any>>({});
    const formProps = computed(() => ({ ...attrs }));
    const FormRenderComponent = computed(() => SchemaFormLayout[props.layoutType || "CoolForm"]);
    const formItemNodes = shallowRef<VNode[]>([]);
    // 只在 columns 变化时重新生成 VNodes
    watchEffect(() => {
      formItemNodes.value = genFormItems(props.columns, formModel);
    });

    // 监听columns变化，更新formModel
    watch(
      () => props.columns,
      () => {
        if (props.columns?.length > 0) {
          props.columns.forEach((item) => {
            formModel[item.name] = formModel[item.name] || item.initialValue;
          });
        }
      },
      { immediate: true }
    );

    // 其他插槽
    const otherSlots = computed(() => omit(slots, ["default"]) || {});

    // 暴露方法
    const setFormValues = (values: any) => {
      Object.assign(formModel, values);
    };
    expose({ setFormValues });

    // 渲染
    return () => {
      // 动态布局组件
      const LayoutComponent = FormRenderComponent.value;
      // 默认插槽内容（表单项）
      const defaultSlot = () => h(Fragment, formItemNodes.value);
      return (
        <LayoutComponent {...formProps.value} model={formModel}>
          {{
            default: defaultSlot,
            ...otherSlots.value
          }}
        </LayoutComponent>
      );
    };
  }
}); 