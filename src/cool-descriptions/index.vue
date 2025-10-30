<template>
  <div
    class="cool-descriptions"
    :class="[
      `cool-descriptions--${layout}`,
      bordered && 'cool-descriptions--bordered',
      size && `cool-descriptions--${size}`,
    ]"
  >
    <div v-if="hasHeader" class="cool-descriptions__header">
      <div class="cool-descriptions__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <Space class="cool-descriptions__extra">
        <slot name="extra">{{ extra }}</slot>
      </Space>
    </div>

    <div v-if="finalLoading" class="cool-descriptions__loading">加载中...</div>
    <div v-else class="cool-descriptions__body">
      <Row :gutter="[16, 0]">
      <template v-for="(col, idx) in visibleColumns" :key="idx">
        <Col :span="calcSpan(undefined, col)" :xs="calcSpan('xs', col)" :sm="calcSpan('sm', col)" :md="calcSpan('md', col)" :lg="calcSpan('lg', col)" :xl="calcSpan('xl', col)">
          <div class="cool-descriptions__item">
          <div class="cool-descriptions__label">
            <template v-if="slots[`${slotKey(col)}-label`]">
              <slot :name="`${slotKey(col)}-label`" :column="col" :index="idx" />
            </template>
            <template v-else>
              <span class="cool-descriptions__label-text" :title="col.tooltip || undefined">
                {{ col.title }}：
              </span>
            </template>
            <span v-if="col.tooltip" class="cool-descriptions__tooltip" :title="col.tooltip">i</span>
          </div>

          <div class="cool-descriptions__value" :class="[{ 'is-ellipsis': !!col.ellipsis }]">
            <!-- slot -> render -> formatter -> raw -->
            <template v-if="slots[slotKey(col)]">
              <slot :name="slotKey(col)" :value="getValue(col)" :dataSource="innerData" :column="col" :index="idx" />
            </template>
            <template v-else-if="typeof col.render === 'function'">
              <component :is="RenderProxy" :render-fn="col.render" :ctx="{ value: getValue(col), dataSource: innerData, column: col, index: idx }" />
            </template>
            <template v-else>
              <span :class="['cool-descriptions__text', col.copyable && 'is-copyable']" @click="col.copyable && copyText(getDisplay(col))" :title="tooltipTitle(col)">
                <template v-if="isVNode(getDisplay(col))">
                  <component :is="(getDisplay(col) as any)" />
                </template>
                <template v-else>
                  {{ getDisplay(col) }}
                </template>
              </span>
            </template>
            <template v-if="slots[`${slotKey(col)}-extra`]"><slot :name="`${slotKey(col)}-extra`" :value="getValue(col)" :dataSource="innerData" :column="col" :index="idx" /></template>
          </div>
          </div>
        </Col>
      </template>
      </Row>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRefs, useSlots, watch, defineEmits, defineProps, isVNode } from 'vue';
import type { CoolDescriptionsEmits, CoolDescriptionsProps, DescriptionColumn } from './types';
import { formatCurrency, formatDate, getByPath, resolveEnum, isNil } from './utils/format';
import { Row, Col, Space } from 'ant-design-vue';

const props = withDefaults(defineProps<CoolDescriptionsProps<any>>(), {
  layout: 'horizontal',
  column: 4,
  bordered: false,
  size: 'middle',
  loading: false,
  emptyText: '-',
  immediate: true,
  title: '',
});

const emits = defineEmits<CoolDescriptionsEmits<any>>();
const slots = useSlots();

const innerData = ref<any>(props.dataSource ?? null);
const innerLoading = ref<boolean>(false);

watch(() => props.dataSource, (val) => {
  innerData.value = val ?? null;
});

const finalLoading = computed(() => props.loading || innerLoading.value);
const hasHeader = computed(() => !!(props.title || slots.title || props.extra || slots.extra));

function slotKey(col: DescriptionColumn<any>): string {
  return typeof col.dataIndex === 'string' ? col.dataIndex : 'render';
}

function valueOf(col: DescriptionColumn<any>) {
  const record = innerData.value;
  if (!record) return undefined;
  if (typeof col.dataIndex === 'function') return col.dataIndex(record);
  return getByPath(record, col.dataIndex);
}

function getValue(col: DescriptionColumn<any>) {
  const v = valueOf(col);
  return isNil(v) || v === '' ? null : v;
}

function displayByFormatter(col: DescriptionColumn<any>, value: any) {
  if (!col.formatter) return undefined;
  if (typeof col.formatter === 'function') return col.formatter(value, innerData.value, col);
  if (col.formatter === 'currency') return formatCurrency(value, col.currency || 'CNY');
  if (col.formatter === 'enum') {
    const e = resolveEnum(value, col.enumMap);
    if (!e) return '';
    return e.color ? `<span style="color:${e.color}">${e.label}</span>` : e.label;
  }
  if (col.formatter === 'date') return formatDate(value, 'date', col.format);
  if (col.formatter === 'time') return formatDate(value, 'time', col.format);
  if (col.formatter === 'datetime') return formatDate(value, 'datetime', col.format);
  return undefined;
}

function getDisplay(col: DescriptionColumn<any>): any {
  const value = getValue(col);
  if (isNil(value)) return props.emptyText;
  const formatted = displayByFormatter(col, value);
  if (!isNil(formatted)) return formatted as any;
  return value;
}

function tooltipTitle(col: DescriptionColumn<any>): string | undefined {
  const v = getDisplay(col);
  if (typeof v === 'string' || typeof v === 'number') return String(v);
  return undefined;
}

function shouldShow(col: DescriptionColumn<any>): boolean {
  if (typeof col.show === 'boolean') return col.show;
  if (typeof col.show === 'function') return col.show(innerData.value);
  return true;
}

const visibleColumns = computed(() => (props.columns || []).filter(shouldShow));

function resolveCols(bp?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): number {
  const c = props.column as any;
  if (typeof c === 'number') return Math.max(1, c);
  if (!c) return 3;
  return (bp && c[bp]) || c.md || c.sm || c.lg || c.xs || c.xl || 3;
}

function calcSpan(bp: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined, col: DescriptionColumn<any>): number {
  const cols = resolveCols(bp as any);
  const unit = Math.max(1, Math.floor(24 / Math.max(1, cols)));
  const spanUnits = Math.max(1, col.span || 1);
  return Math.min(24, unit * spanUnits);
}

async function doRequest(p?: any) {
  if (!props.request) return;
  try {
    innerLoading.value = true;
    const data = await props.request(p ?? props.params);
    innerData.value = data ?? null;
    emits('update:dataSource', innerData.value);
    emits('load', innerData.value);
  } catch (err) {
    emits('error', err);
  } finally {
    innerLoading.value = false;
  }
}

onMounted(() => {
  if (props.request && props.immediate) doRequest();
});

watch(() => props.params, (nv) => {
  if (props.request) doRequest(nv);
}, { deep: true });

function reload(p?: any) { return doRequest(p); }
function setDataSource(ds: any) { innerData.value = ds ?? null; emits('update:dataSource', innerData.value); }

function copyText(text: any) {
  const content = typeof text === 'string' ? text : String(text ?? '');
  if (!content) return;
  navigator.clipboard?.writeText(content).catch(() => {});
}

const RenderProxy = (props: { renderFn: Function; ctx: any }) => props.renderFn(props.ctx) as any;

defineExpose({ reload, setDataSource });
</script>

<style scoped lang="scss">
.cool-descriptions {
  --cc-label-color: #666;
  --cc-text-color: #1f1f1f;
  --cc-border-color: #f0f0f0;
  --cc-font-size: 14px;
  --cc-padding: 6px 0;

  display: flex;
  flex-direction: column;
  font-size: var(--cc-font-size);
  color: var(--cc-text-color);
  background-color: #fff;
  padding: 16px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  &__title {
    font-weight: 600;
    font-size: 16px;
  }

  &__extra {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  &__loading {
    padding: 12px 0;
    color: #999;
  }

  &__body { width: 100%; }

  &__item {
    display: grid;
    gap: 6px;
    grid-template-columns: auto 1fr;
    align-items: start;
    min-width: 0;
    padding: var(--cc-padding);

    & + & {
      border-top: 0;
    }
  }

  &--vertical &__item {
    grid-template-columns: 1fr;
  }

  &__label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--cc-label-color);
    white-space: nowrap;
    min-width: 0;
  }

  &__label-text { overflow: hidden; text-overflow: ellipsis; }

  &__tooltip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: #f0f0f0;
    color: #999;
    font-size: 12px;
    cursor: default;
  }

  &__value {
    min-width: 0;
  }

  &__text {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &.is-copyable { cursor: pointer; }
  }

  &--bordered &__item {
    border: 1px solid var(--cc-border-color);
    border-radius: 6px;
    padding: 12px;
  }

  &--small &__item { padding: 8px 0; }
  &--large &__item { padding: 16px 0; }
}

/* Row/Col 控制响应式列，无需媒体查询 */
</style> 