import dayjs from 'dayjs';

export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function formatDate(value: any, type: 'date' | 'datetime' | 'time', fmt?: string): string {
  if (isNil(value) || value === '') return '';
  const d = dayjs(value);
  if (!d.isValid()) return String(value);
  if (type === 'date') return d.format(fmt || 'YYYY-MM-DD');
  if (type === 'time') return d.format(fmt || 'HH:mm:ss');
  return d.format(fmt || 'YYYY-MM-DD HH:mm:ss');
}

export function formatCurrency(value: any, currency = 'CNY'): string {
  if (isNil(value) || value === '') return '';
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(num);
}

export interface EnumItem { label: string; color?: string }
export type EnumMap = Record<string | number, string | EnumItem>;

export function resolveEnum(value: any, map?: EnumMap): { label: string; color?: string } | null {
  if (!map) return null;
  const hit = map[value as any];
  if (isNil(hit)) return null;
  if (typeof hit === 'string') return { label: hit };
  return hit;
}

export function getByPath(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  const segments = path.split('.');
  let cur: any = obj;
  for (const seg of segments) {
    if (isNil(cur)) return undefined;
    cur = cur[seg];
  }
  return cur;
}


