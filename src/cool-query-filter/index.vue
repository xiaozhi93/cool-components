<template>
  <CoolBaseForm
    layout="vertical"
    :is-key-press-submit="true"
    :form-component-type="'CoolQueryFilter'"
    :field-props="{
      style: {
        width: '100%',
      },
    }"
    :submitter="true"
    :submitter-props="submitterProps"
    v-bind="$attrs"
  >
    <template #default="{ Component }">
      <QueryFilterContent v-bind="$props">
        <slot />
        <template #actions>
          <Component :is="Component" />
        </template>
      </QueryFilterContent>
    </template>
    <template v-for="(_, name) in otherSlots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </CoolBaseForm>
</template>
<script setup lang="ts">
import { useSlots, computed } from 'vue';
import { omit } from 'lodash-es';
import CoolBaseForm from '../cool-base-form/index';
import { CoolQueryFilterProps } from './types';
import QueryFilterContent from './components/index';

defineOptions({
  name: 'CoolQueryFilter',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<CoolQueryFilterProps>(), {
  defaultCollapsed: true,
  defaultColsNumber: undefined,
  resetText: '重置',
  searchText: '搜索'
});
const slots = useSlots();

const otherSlots = computed(() => {
  return omit(slots, ['default']);
});

const submitterProps = computed(() => {
  return {
    searchConfig: {
      submitText: props.searchText,
      resetText: props.resetText,
    }
  }
})
</script>
<style scoped></style>
