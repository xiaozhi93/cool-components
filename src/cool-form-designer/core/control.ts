import { EditOutlined } from '@ant-design/icons-vue'
import type { ControlDefinition } from '../types'
export const baseControl: ControlDefinition[] = [
  {
    valueType: 'text',
    title: '文本输入框',
    icon: EditOutlined
  },
  {
    valueType: 'digit',
    title: '数字输入框',
    icon: EditOutlined
  }
]