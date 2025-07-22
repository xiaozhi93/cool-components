<template>
  <CoolBaseForm
    layout="vertical"
    :is-key-press-submit="true"
    :field-props="{
      style: {
        width: '100%',
      },
    }"
    v-bind="$attrs"
  >
    <template #default>
      <QueryFilterContent v-bind="$props">
        <slot />
      </QueryFilterContent>
    </template>
    <template v-for="(_, name) in otherSlots" #[name]="slotProps" :key="name">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </CoolBaseForm>
</template>
<script setup lang="ts">
import { ref, useSlots, computed } from 'vue';
import { omit } from 'lodash-es';
import CoolBaseForm from '../cool-base-form/index.vue';
import { QueryFilterProps } from './types';
import QueryFilterContent from './components/QueryFilterContent.vue';


defineOptions({
  name: 'CoolQueryFilter',
  inheritAttrs: false,
});

defineProps<QueryFilterProps>();
const slots = useSlots();

const otherSlots = computed(() => {
  return omit(slots, ['default']);
});
</script>
<style scoped></style>
