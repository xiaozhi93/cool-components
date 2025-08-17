<template>
  <div class="cool-table-column-setting">
    <a-popover
      :arrow="false"
      trigger="click"
      placement="bottomRight"
      :overlay-class-name="`cool-table-column-setting-overlay`"
    >
      <template #title>
        <div :class="`cool-table-column-setting-title`">
          <a-checkbox
            :indeterminate="indeterminate"
            :checked="isAllChecked"
            @change="handleCheckAll"
          >
            列展示
          </a-checkbox>
          <a
            :class="`cool-table-column-setting-action-rest-button`"
            @click="handleReset"
          >
            重置
          </a>
        </div>
      </template>
      
      <template #content>
        <div :class="`cool-table-column-setting-list`">
          <!-- 固定在左侧 -->
          <div v-if="leftColumns.length > 0" :class="`cool-table-column-setting-list-section`">
            <div :class="`cool-table-column-setting-list-title`">固定在左侧</div>
            <ColumnList
              :columns="leftColumns"
            />
          </div>
          
          <!-- 不固定 -->
          <div :class="`cool-table-column-setting-list-section`">
            <div v-if="leftColumns.length > 0 || rightColumns.length > 0" :class="`cool-table-column-setting-list-title`">
              不固定
            </div>
            <ColumnList
              :columns="normalColumns"
            />
          </div>
          
          <!-- 固定在右侧 -->
          <div v-if="rightColumns.length > 0" :class="`cool-table-column-setting-list-section`">
            <div :class="`cool-table-column-setting-list-title`">固定在右侧</div>
            <ColumnList
              :columns="rightColumns"
            />
          </div>
        </div>
      </template>
      
      <template #default>
        <a-tooltip title="列设置">
          <SettingOutlined />
        </a-tooltip>
      </template>
    </a-popover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Checkbox as ACheckbox, Tree as ATree, Tooltip as ATooltip, Popover as APopover } from 'ant-design-vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import ColumnList from './ColumnList.vue'
import { useCoolTableContext } from '../../provider'

const { columns, columnsMap, resetColumnsMap } = useCoolTableContext()


// 分离不同固定位置的列
const leftColumns = computed(() => 
  columns.filter(col => col.fixed === 'left' && !col.hideInSetting)
)

const rightColumns = computed(() => 
  columns.filter(col => col.fixed === 'right' && !col.hideInSetting)
)

const normalColumns = computed(() => 
  columns.filter(col => !col.fixed && !col.hideInSetting)
)

// 计算全选状态
const isAllChecked = computed(() => {
  const allColumns = [...leftColumns.value, ...normalColumns.value, ...rightColumns.value]
  return allColumns.length > 0 && allColumns.every(col => {
    const key = col.key || col.dataIndex
    return columnsMap.value[key as string]?.show !== false
  })
})

const indeterminate = computed(() => {
  const allColumns = [...leftColumns.value, ...normalColumns.value, ...rightColumns.value]
  const hiddenCount = allColumns.filter(col => {
    const key = col.key || col.dataIndex
    return columnsMap.value[key as string]?.show === false
  }).length
  return hiddenCount > 0 && hiddenCount < allColumns.length
})

// 处理全选/取消全选
const handleCheckAll = (e: any) => {
  const newColumnsMap = { ...columnsMap }
  const allColumns = [...leftColumns.value, ...normalColumns.value, ...rightColumns.value]
  
  allColumns.forEach(col => {
    const key = col.key || col.dataIndex
    if (key) {
      newColumnsMap.value[key as string] = {
        ...newColumnsMap.value[key as string],
        show: e.target.checked
      }
    }
  })
}

// 处理重置
const handleReset = () => {
  resetColumnsMap()
}
</script>

<style scoped lang="scss">
.cool-table-column-setting {
  display: inline-block;
}

.cool-table-column-setting-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
    
    .cool-table-column-setting-action-rest-button {
      color: #1890ff;
      cursor: pointer;
      
      &:hover {
        color: #40a9ff;
      }
    }
  }
  
  .cool-table-column-setting-list {
    max-height: 400px;
    overflow-y: auto;
    
    .cool-table-column-setting-list-section {
      margin-bottom: 16px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .cool-table-column-setting-list-title {
        padding: 8px 16px;
        font-size: 12px;
        color: #666;
        background: #fafafa;
        border-bottom: 1px solid #f0f0f0;
      }
    }
  }
</style>
