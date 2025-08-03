<template>
  <div class="canvas-toolbar">
    <a-button-group>
      <a-button @click="handleClear">清空</a-button>
    </a-button-group>
    <a-button-group>
      <a-button @click="handlePreview">预览</a-button>
      <a-button @click="handleExport">导出</a-button>
    </a-button-group>

    <!-- 预览模态框 -->
    <CoolSchemaForm
        v-model:open="previewModalVisible"
        title="预览表单"
        :columns="previewColumns"
        layout-type="CoolDrawerForm"
        :components="formComponents"
      />
    <!-- 导出模态框 -->
    <a-modal
      v-model:open="exportModalVisible"
      title="导出表单配置"
      width="800px"
      :footer="null"
      @cancel="handleExportCancel"
    >
      <div class="export-modal-content">
        <div class="export-actions">
          <a-button type="primary" @click="handleCopyJson">
            <template #icon>
              <CopyOutlined />
            </template>
            复制JSON
          </a-button>
          <a-button type="primary" @click="handleDownloadJson">
            <template #icon>
              <DownloadOutlined />
            </template>
            下载JSON
          </a-button>
        </div>
        <div class="json-editor-container">
          <v-ace-editor
            v-model:value="jsonData"
            :options="editorOptions"
            @init="onEditorInit"
            style="height: 400px; width: 100%;"
          />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Button as AButton, ButtonGroup as AButtonGroup, Modal as AModal, message } from 'ant-design-vue';
import { CopyOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import { VAceEditor } from 'vue3-ace-editor';
import { useDesignerContext } from '../../hooks/useDesigner';
import CoolSchemaForm from '../../../cool-schema-form/index.vue';
import type { CoolFormColumnsType } from '../../../cool-schema-form/types';

// 导入 ace 编辑器的模式和主题
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

defineOptions({
  name: 'CanvasToolbar'
});

const { designer, clear, formComponents } = useDesignerContext();

// 预览模态框状态
const previewModalVisible = ref(false);

// 导出模态框状态
const exportModalVisible = ref(false);
const jsonData = ref('');

// 编辑器配置
const editorOptions = {
  mode: 'ace/mode/json',
  theme: 'ace/theme/monokai',
  fontSize: 14,
  showPrintMargin: false,
  showGutter: true,
  highlightActiveLine: true,
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  showLineNumbers: true,
  tabSize: 2,
  readOnly: false
};

// 转换设计器 schema 为 schema-form columns
const previewColumns = computed(() => {
  return designer.schema.map(item => {
    const { key, name, label, valueType, formItemProps, fieldProps, initialValue, visible, ...rest } = item;
    return {
      name,
      label,
      valueType,
      formItemProps: formItemProps || {},
      fieldProps: fieldProps || {},
      initialValue,
      visible: visible !== false,
      ...rest
    };
  }) as CoolFormColumnsType[];
});

// 计算JSON数据
const computedJsonData = computed(() => {
  return JSON.stringify(designer.schema, null, 2);
});

// 处理清空
const handleClear = () => {
  clear();
}

// 处理预览
const handlePreview = () => {
  if (designer.schema.length === 0) {
    message.warning('请先添加表单项');
    return;
  }
  previewModalVisible.value = true;
}

// 处理预览模态框取消
const handlePreviewCancel = () => {
  previewModalVisible.value = false;
}

// 处理导出
const handleExport = () => {
  jsonData.value = computedJsonData.value;
  exportModalVisible.value = true;
}

// 处理导出模态框取消
const handleExportCancel = () => {
  exportModalVisible.value = false;
}

// 编辑器初始化
const onEditorInit = (editor: any) => {
  editor.setReadOnly(true);
};

// 复制JSON
const handleCopyJson = async () => {
  try {
    await navigator.clipboard.writeText(jsonData.value);
    message.success('JSON已复制到剪贴板');
  } catch (err) {
    // 降级方案
    const textArea = document.createElement('textarea');
    textArea.value = jsonData.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    message.success('JSON已复制到剪贴板');
  }
}

// 下载JSON
const handleDownloadJson = () => {
  const blob = new Blob([jsonData.value], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'form-schema.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  message.success('JSON文件已下载');
}
</script>

<style scoped>
.canvas-toolbar {
  display: flex;
  gap: 8px;
  padding: 8px;
  border-bottom: 1px solid #f0f0f0;
}

.preview-modal-content {
  height: calc(100vh - 200px);
  overflow: auto;
}

.export-modal-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.export-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.json-editor-container {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  overflow: hidden;
}
</style> 