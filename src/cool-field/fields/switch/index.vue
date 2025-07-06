<template>
  <!-- 只读模式 -->
  <template v-if="mode === 'read'">
    <slot name="readRender" :value="value" :text="displayText">
      <a-tag 
        :color="value ? 'success' : 'default'"
        class="cool-field-switch"
      >
        {{ displayText }}
      </a-tag>
    </slot>
  </template>

  <!-- 编辑模式 -->
  <template v-else>
    <slot 
      name="editRender" 
      :value="value" 
      :on-change="editAttrs['onUpdate:value']" 
    >
      <a-switch
        :checked="value"
        v-bind="editAttrs"
      >
        <!-- 透传其他插槽给底层组件 -->
        <template v-for="(_, name) in editSlots" #[name]="slotProps" :key="name">
          <slot :name="name" v-bind="slotProps || {}" />
        </template>
      </a-switch>
    </slot>
  </template>
</template>

<script setup lang="ts">
import { computed, useSlots, useAttrs } from 'vue'
import { Switch as ASwitch, Tag as ATag } from 'ant-design-vue'

interface FieldSwitchProps {
  /** 字段值 */
  value?: boolean
  /** 组件模式 */
  mode?: 'read' | 'edit' | 'update'
  /** 空值显示文本 */
  emptyText?: string
  /** 选中时的文本 */
  checkedText?: string
  /** 未选中时的文本 */
  uncheckedText?: string
  /** 值枚举映射 */
  valueEnum?: Record<string | number, { label: string; value: any; disabled?: boolean; color?: string } | string>
}

defineOptions({
  name: 'CoolFieldSwitch',
  inheritAttrs: false
})

const props = withDefaults(defineProps<FieldSwitchProps>(), {
  mode: 'read',
  emptyText: '-',
  checkedText: '是',
  uncheckedText: '否'
})

const slots = useSlots()
const attrs = useAttrs()

// 计算需要透传的插槽
const editSlots = computed(() => {
  if (props.mode === 'read') return {}
  return slots || {}
})

// 计算显示文本
const displayText = computed(() => {
  if (props.value === null || props.value === undefined) {
    return props.emptyText
  }

  // 如果有 valueEnum，优先使用
  if (props.valueEnum) {
    const enumItem = props.valueEnum[props.value ? 'true' : 'false'] || props.valueEnum[props.value ? 1 : 0]
    if (enumItem) {
      return typeof enumItem === 'string' ? enumItem : enumItem.label
    }
  }

  // 使用配置的文本
  return props.value ? props.checkedText : props.uncheckedText
})

// 计算透传属性
const editAttrs = computed(() => {
  const result: any = { ...attrs }
  
  // 🔧 关键修复：事件名称转换 value → checked
  if (result['onUpdate:value']) {
    result['onUpdate:checked'] = result['onUpdate:value']
    delete result['onUpdate:value']
  }
  
  // 处理 checkedChildren 和 unCheckedChildren
  if (props.checkedText && !result.checkedChildren) {
    result.checkedChildren = props.checkedText
  }
  if (props.uncheckedText && !result.unCheckedChildren) {
    result.unCheckedChildren = props.uncheckedText
  }

  return result
})
</script>

<style lang="scss" scoped>
.cool-field-switch {
  font-size: 12px;
  border-radius: 10px;
  padding: 2px 8px;
}
</style> 