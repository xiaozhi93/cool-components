<template>
  <!-- 只读模式 -->
  <template v-if="mode === 'read'">
    <slot name="readRender" :value="value" :text="displayText">
      <span class="cool-field-checkbox">
        <a-tag 
          v-for="item in displayItems" 
          :key="item.value"
          :color="item.color || 'blue'"
          class="cool-field-checkbox-tag"
        >
          {{ item.label }}
        </a-tag>
      </span>
    </slot>
  </template>

  <!-- 编辑模式 -->
  <template v-else>
    <slot 
      name="editRender" 
      :value="value" 
      :on-change="editAttrs['onUpdate:value']" 
    >
      <!-- 多选模式 -->
      <a-checkbox-group
        :value="value"
        :options="computedOptions"
        v-bind="editAttrs"
      >
        <!-- 透传其他插槽给底层组件 -->
        <template v-for="(_, name) in otherSlots" #[name]="slotProps" :key="name">
          <slot :name="name" v-bind="slotProps || {}" />
        </template>
      </a-checkbox-group>
    </slot>
  </template>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'
import { CheckboxGroup as ACheckboxGroup, Tag as ATag } from 'ant-design-vue'
import { useRequest } from '../../composables'

interface FieldCheckboxProps {
  /** 字段值 */
  value?: (string | number)[]
  /** 组件模式 */
  mode?: 'read' | 'edit' | 'update'
  /** 空值显示文本 */
  emptyText?: string
  /** 选项配置 */
  options?: Array<{ label: string; value: any; disabled?: boolean }>
  /** 值枚举映射 */
  valueEnum?: Record<string | number, { label: string; value: any; disabled?: boolean; color?: string } | string>
  /** 异步请求函数 */
  request?: (...args: any[]) => Promise<any[]>
  /** 请求参数 */
  params?: Record<string, any>
}

defineOptions({
  name: 'CoolFieldCheckbox',
  inheritAttrs: false
})

const props = withDefaults(defineProps<FieldCheckboxProps>(), {
  mode: 'read',
  emptyText: '-'
})

const slots = useSlots()
const attrs = useAttrs()

// 异步数据加载
const { data: requestData, loading } = useRequest(props.request, props.params)

// 计算选项
const computedOptions = computed(() => {
  // 优先级：options > request > valueEnum
  if (props.options) {
    return props.options
  }

  if (requestData.value && requestData.value.length > 0) {
    return requestData.value
  }

  if (props.valueEnum) {
    return Object.entries(props.valueEnum).map(([value, config]) => ({
      label: typeof config === 'string' ? config : config.label,
      value: value,
      disabled: typeof config === 'object' ? config.disabled : undefined,
    }))
  }

  return []
})

// 计算需要透传的插槽
const otherSlots = computed(() => {
  if (props.mode === 'read') return {}
  return slots || {}
})

// 计算显示文本
const displayText = computed(() => {
  return props.emptyText
})

// 计算显示项目
const displayItems = computed(() => {
  if (!Array.isArray(props.value) || props.value.length === 0) {
    return []
  }

  return props.value.map(val => {
    // 从选项中查找
    const option = computedOptions.value.find(opt => opt.value == val)
    if (option) {
      return {
        value: val,
        label: option.label,
        color: (option as any).color
      }
    }

    // 从 valueEnum 中查找
    if (props.valueEnum && props.valueEnum[val]) {
      const enumItem = props.valueEnum[val]
      return {
        value: val,
        label: typeof enumItem === 'string' ? enumItem : enumItem.label,
        color: typeof enumItem === 'object' ? enumItem.color : undefined
      }
    }

    // 默认返回值本身
    return {
      value: val,
      label: String(val)
    }
  })
})

// 计算透传属性
const editAttrs = computed(() => {
  attrs._track; // 访问属性，强制建立以来追踪
  const result: any = { ...attrs }
  
  if (loading.value) {
    result.loading = true
  }

  return result
})
</script>

<style lang="scss" scoped>
.cool-field-checkbox {
  display: inline-block;
}

.cool-field-checkbox-tag {
  margin: 2px 4px 2px 0;
  font-size: 12px;
}

.cool-field-checkbox-tag:last-child {
  margin-right: 0;
}
</style> 