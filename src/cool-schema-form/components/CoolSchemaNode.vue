<template>
  <!-- 自定义组件 -->
  <component 
    v-if="column.valueType === 'custom' && getFieldVisibleProp(column, formModel) !== false" 
    :is="getComponent(column.component)" 
    :name="parentPath && parentIndex !== undefined ? [parentPath, parentIndex.toString(), column.name] : column.name"
    :hidden="hidden"
    v-bind="getFieldProps(column, formModel, context)" 
    v-model:value="formModel[column.name]" 
  />
  
  <!-- 分组组件 -->
  <CoolFormGroup 
    v-else-if="column.valueType === 'group' && getFieldVisibleProp(column, formModel) !== false" 
    :name="column.name"
    :hidden="hidden"
    v-bind="getFieldProps(column, formModel, context)" 
  >
    <!-- 递归渲染子字段 -->
    <template v-if="column.columns?.length">
      <CoolSchemaNode 
        v-for="(childColumn, index) in column.columns"
        :key="childColumn.name"
        :column="childColumn"
        :form-model="formModel"
        :context="context"
        :components="components"
      />
    </template>
  </CoolFormGroup>
  
  <!-- 列表组件 -->
  <CoolFormList 
    v-else-if="column.valueType === 'list' && getFieldVisibleProp(column, formModel) !== false" 
    :name="column.name"
    :hidden="hidden"
    v-bind="getFieldProps(column, formModel, context)" 
    v-model:value="formModel[column.name]" 
  >
    <template #default="{ list, actions }">
      <div v-for="(listItem, index) in list" :key="index" class="list-item">
        <div class="list-item-header">
          <span>项目 {{ index + 1 }}</span>
          <button @click="actions.remove(index)" type="button">删除</button>
        </div>
        <!-- 递归渲染子字段 -->
        <template v-if="column.columns?.length">
          <CoolSchemaNode 
            v-for="(childColumn, childIndex) in column.columns"
            :key="childColumn.name"
            :column="childColumn"
            :form-model="listItem"
            :context="context"
            :components="components"
            :parent-path="column.name"
            :parent-index="index"
          />
        </template>
      </div>
    </template>
  </CoolFormList>
  
  <!-- 普通字段 -->
  <CoolFormField 
    v-else-if="getFieldVisibleProp(column, formModel) !== false" 
    :name="parentPath && parentIndex !== undefined ? [parentPath, parentIndex.toString(), column.name] : column.name" 
    :hidden="hidden"
    v-bind="getFieldProps(column, formModel, context)" 
    v-model:value="formModel[column.name]" 
  />
</template>

<script setup lang="ts">
import type { CoolFormColumnsType } from "../types"
import { getFieldProps, getFieldVisibleProp } from "../core"
import type { Component } from "vue"
import CoolFormField from "../../cool-form-field/index"
import CoolFormList from "../../cool-form-list/index.vue"
import CoolFormGroup from "../../cool-form-group/index.vue"

defineOptions({
  name: "CoolSchemaNode",
  inheritAttrs: false
})

interface Props {
  column: CoolFormColumnsType
  formModel: Record<string, any>
  context?: Record<string, any>
  components?: Record<string, Component>
  parentPath?: string // 父级路径
  parentIndex?: number // 父级索引， 用于列表组件
  hidden?: boolean // 是否隐藏
}

const props = withDefaults(defineProps<Props>(), {
  column: () => ({} as CoolFormColumnsType),
  formModel: () => ({}),
  context: () => ({}),
  components: () => ({}),
  hidden: false
})

// 获取组件函数，支持字符串和组件对象
const getComponent = (component: Component | string | undefined): Component | string => {
  if (!component) return ''
  
  if (typeof component === 'string') {
    if (props.components && props.components[component]) {
      return props.components[component]
    }
    return component
  }
  
  return component
}
</script>

<style scoped lang="scss">
.list-item {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 8px;
  background-color: #fafafa;
  
  .list-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e8e8e8;
    
    span {
      font-weight: 500;
      color: #333;
    }
    
    button {
      padding: 4px 8px;
      background-color: #ff4d4f;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      
      &:hover {
        background-color: #ff7875;
      }
    }
  }
}
</style>
