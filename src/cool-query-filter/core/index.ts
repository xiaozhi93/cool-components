import type { VNode } from 'vue';

export const spanSize = {
  span: 8,
  layout: 'vertical',
}

export const flatFieldItems = (fieldItems: VNode[]): VNode[] => {
  if (!fieldItems) return []
  return fieldItems.reduce((acc, item) => {
    if (item.children && Array.isArray(item.children)) {
      acc.push(...flatFieldItems(item.children as VNode[]))
    } else {
      acc.push(item)
    }
    return acc
  }, [] as VNode[])
}
