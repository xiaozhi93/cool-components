<template>
  <div class="cool-field-demo">
    <!-- 头部介绍 -->
    <div class="demo-header">
      <h1>🎯 CoolField 统一字段组件</h1>
      <p class="demo-desc">
        基于 Vue 3 + TypeScript + Ant Design Vue 的统一字段组件，支持 30+ 种字段类型，
        提供完整的透传机制，满足各种业务场景需求。
      </p>
    </div>

    <!-- 文本类字段 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>📝 文本类字段</h2>
        <span class="section-badge">3 种类型</span>
      </div>
      
      <div class="demo-grid">
        <!-- 基础文本 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>text - 基础文本</h3>
            <span class="type-tag">text</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField value-type="text" mode="read" :value="demoData.text" />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="text" 
                  mode="edit" 
                  v-model:value="demoData.text"
                  placeholder="请输入文本"
                  allow-clear
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 密码字段 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>password - 密码字段</h3>
            <span class="type-tag">password</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField value-type="password" mode="read" :value="demoData.password" />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="password" 
                  mode="edit" 
                  v-model:value="demoData.password"
                  placeholder="请输入密码"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 多行文本 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>textarea - 多行文本</h3>
            <span class="type-tag">textarea</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField value-type="textarea" mode="read" :value="demoData.textarea" />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="textarea" 
                  mode="edit" 
                  v-model:value="demoData.textarea"
                  placeholder="请输入多行文本"
                  :rows="3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 数字类字段 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>🔢 数字类字段</h2>
        <span class="section-badge">4 种类型</span>
      </div>
      
      <div class="demo-grid">

        <!-- 整数 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>digit - 整数</h3>
            <span class="type-tag">digit</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField value-type="digit" mode="read" :value="demoData.digit" />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="digit" 
                  mode="edit" 
                  v-model:value="demoData.digit"
                  placeholder="请输入整数"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 整数区间 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>digitRange - 整数区间</h3>
            <span class="type-tag highlight">digitRange</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField value-type="digitRange" mode="read" :value="demoData.digitRange" />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="digitRange" 
                  mode="edit" 
                  v-model:value="demoData.digitRange"
                  min-placeholder="最小值"
                  max-placeholder="最大值"
                  separator=" ～ "
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 金额 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>money - 金额</h3>
            <span class="type-tag">money</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField 
                  :value-type="{ type: 'money', currency: '¥', precision: 2 }" 
                  mode="read" 
                  :value="demoData.money" 
                />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  :value-type="{ type: 'money', currency: '¥', precision: 2 }" 
                  mode="edit" 
                  v-model:value="demoData.money"
                  placeholder="请输入金额"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 百分比 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>percent - 百分比</h3>
            <span class="type-tag">percent</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField 
                  :value-type="{ type: 'percent', precision: 1, showColor: true }" 
                  mode="read" 
                  :value="demoData.percent" 
                />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  :value-type="{ type: 'percent', precision: 1 }" 
                  mode="edit" 
                  v-model:value="demoData.percent"
                  placeholder="请输入百分比"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
        <!-- 选择类字段 -->
        <section class="demo-section">
      <div class="section-header">
        <h2>📋 选择类字段</h2>
        <span class="section-badge">6 种类型</span>
      </div>
      
      <div class="demo-grid">
        <!-- 下拉选择 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>select - 下拉选择</h3>
            <span class="type-tag">select</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField 
                  value-type="select" 
                  mode="read" 
                  :value="demoData.select"
                  :value-enum="selectOptions"
                />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="select" 
                  mode="edit" 
                  v-model:value="demoData.select"
                  :value-enum="selectOptions"
                  placeholder="请选择选项"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 复选框 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>checkbox - 复选框</h3>
            <span class="type-tag">checkbox</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField value-type="checkbox" mode="read" :value="demoData.checkbox" />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="checkbox" 
                  mode="edit"
                  :options="checkboxOptions"
                  v-model:value="demoData.checkbox"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 单选框 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>radio - 单选框</h3>
            <span class="type-tag">radio</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField 
                  value-type="radio" 
                  mode="read" 
                  :value="demoData.radio"
                  :value-enum="radioOptions"
                />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="radio" 
                  mode="edit" 
                  v-model:value="demoData.radio"
                  :value-enum="radioOptions"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 级联选择 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>cascader - 级联选择</h3>
            <span class="type-tag highlight">cascader</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField 
                  value-type="cascader" 
                  mode="read" 
                  :value="demoData.cascader"
                  :options="cascaderOptions"
                />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="cascader" 
                  mode="edit" 
                  v-model:value="demoData.cascader"
                  :options="cascaderOptions"
                  placeholder="请选择省市区"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 树选择（单选） -->
        <div class="demo-card">
          <div class="card-header">
            <h3>treeSelect - 树选择（单选）</h3>
            <span class="type-tag">treeSelect</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField 
                  value-type="treeSelect" 
                  mode="read" 
                  :value="demoData.treeSelect"
                  :options="treeSelectOptions"
                />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="treeSelect" 
                  mode="edit" 
                  v-model:value="demoData.treeSelect"
                  :options="treeSelectOptions"
                  placeholder="请选择部门"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 树选择（多选） -->
        <div class="demo-card">
          <div class="card-header">
            <h3>treeSelect - 树选择（多选）</h3>
            <span class="type-tag highlight">treeSelect</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField 
                  value-type="treeSelect" 
                  mode="read" 
                  :value="demoData.treeSelectMultiple"
                  :options="treeSelectOptions"
                  :multiple="true"
                />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="treeSelect" 
                  mode="edit" 
                  v-model:value="demoData.treeSelectMultiple"
                  :options="treeSelectOptions"
                  :multiple="true"
                  placeholder="请选择多个部门"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 开关 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>switch - 开关</h3>
            <span class="type-tag">switch</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField 
                  value-type="switch" 
                  mode="read" 
                  :value="demoData.switch"
                />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="switch" 
                  mode="edit" 
                  v-model:value="demoData.switch"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 开关（自定义文本） -->
        <div class="demo-card">
          <div class="card-header">
            <h3>switch - 开关（自定义文本）</h3>
            <span class="type-tag highlight">switch</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField 
                  value-type="switch" 
                  mode="read" 
                  :value="demoData.switchWithCustomText"
                  checked-text="启用"
                  unchecked-text="禁用"
                />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="switch" 
                  mode="edit" 
                  v-model:value="demoData.switchWithCustomText"
                  checked-text="启用"
                  unchecked-text="禁用"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 日期时间类字段 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>📅 日期时间类字段</h2>
        <span class="section-badge">4 种场景</span>
      </div>
      
      <div class="demo-grid">
        <!-- 日期选择 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>date - 日期选择</h3>
            <span class="type-tag">date</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField 
                  value-type="date" 
                  mode="read" 
                  :value="demoData.date"
                />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="date" 
                  mode="edit" 
                  v-model:value="demoData.date"
                  placeholder="请选择日期"
                  format="YYYY-MM-DD"
                />
              </div>
            </div>
          </div>
        </div>

                 <!-- 日期时间选择 -->
         <div class="demo-card">
           <div class="card-header">
             <h3>date - 日期时间选择（带时间）</h3>
             <span class="type-tag highlight">date + showTime</span>
           </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                                 <CoolField 
                   value-type="date" 
                   mode="read" 
                   :value="demoData.dateWithTime"
                   show-time
                 />
               </div>
               <div class="demo-col">
                 <label>编辑模式</label>
                                  <CoolField 
                   value-type="date" 
                   mode="edit" 
                   v-model:value="demoData.dateWithTime"
                   placeholder="请选择日期时间"
                   format="YYYY-MM-DD HH:mm:ss"
                   show-time
                 />
              </div>
            </div>
          </div>
        </div>

        <!-- 自定义格式日期 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>date - 自定义格式</h3>
            <span class="type-tag">date</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式（中文格式）</label>
                <CoolField 
                  value-type="date" 
                  mode="read"
                  format="YYYY年MM月DD日"
                  :value="demoData.date"
                />
              </div>
              <div class="demo-col">
                <label>编辑模式（自定义格式）</label>
                <CoolField 
                  :value-type="{ type: 'date', format: 'MM/DD/YYYY' }" 
                  mode="edit" 
                  v-model:value="demoData.date"
                  placeholder="请选择日期"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 日期范围选择 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>dateRange - 日期范围选择</h3>
            <span class="type-tag">dateRange</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField 
                  value-type="dateRange" 
                  mode="read" 
                  :value="demoData.dateRange"
                />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="dateRange" 
                  mode="edit" 
                  v-model:value="demoData.dateRange"
                  placeholder="请选择日期范围"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 日期时间范围选择 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>dateRange - 日期时间范围（带时间）</h3>
            <span class="type-tag highlight">dateRange + showTime</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField 
                  value-type="dateRange" 
                  mode="read" 
                  :value="demoData.dateTimeRange"
                  show-time
                />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="dateRange" 
                  mode="edit" 
                  v-model:value="demoData.dateTimeRange"
                  placeholder="请选择日期时间范围"
                  show-time
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 展示类字段 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>🎨 展示类字段</h2>
        <span class="section-badge">6 种类型</span>
      </div>
      
      <div class="demo-grid">
        <!-- 进度条 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>progress - 进度条</h3>
            <span class="type-tag">progress</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField 
                  :value-type="{ type: 'progress', showInfo: true, strokeColor: '#1890ff' }" 
                  mode="read" 
                  :value="demoData.progress" 
                />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  :value-type="{ type: 'progress' }" 
                  mode="edit" 
                  v-model:value="demoData.progress"
                  placeholder="请输入进度值"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 头像 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>avatar - 头像</h3>
            <span class="type-tag">avatar</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField value-type="avatar" mode="read" :value="demoData.avatar" />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="avatar" 
                  mode="edit" 
                  v-model:value="demoData.avatar"
                  placeholder="请输入头像URL"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 图片 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>image - 图片</h3>
            <span class="type-tag">image</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField value-type="image" mode="read" :value="demoData.image" />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="image" 
                  mode="edit" 
                  v-model:value="demoData.image"
                  placeholder="请输入图片URL"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 颜色 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>color - 颜色</h3>
            <span class="type-tag">color</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField value-type="color" mode="read" :value="demoData.color" />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="color" 
                  mode="edit" 
                  v-model:value="demoData.color"
                  placeholder="请选择颜色"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 标签 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>tag - 标签</h3>
            <span class="type-tag">tag</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField value-type="tag" mode="read" :value="demoData.tag" />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="tag" 
                  mode="edit" 
                  v-model:value="demoData.tag"
                  placeholder="请输入标签"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 徽章 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>badge - 徽章</h3>
            <span class="type-tag">badge</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>只读模式</label>
                <CoolField value-type="badge" mode="read" :value="demoData.badge" />
              </div>
              <div class="demo-col">
                <label>编辑模式</label>
                <CoolField 
                  value-type="badge" 
                  mode="edit" 
                  v-model:value="demoData.badge"
                  placeholder="请输入徽章内容"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



    <!-- 高级特性 -->
    <section class="demo-section">
      <div class="section-header">
        <h2>⚡ 高级特性</h2>
        <span class="section-badge">透传机制</span>
      </div>
      
      <div class="demo-grid">
        <!-- 空值处理 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>空值处理</h3>
            <span class="type-tag">emptyText</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>默认空值显示</label>
                <CoolField value-type="text" mode="read" :value="null" />
              </div>
              <div class="demo-col">
                <label>自定义空值文本</label>
                <CoolField 
                  value-type="text" 
                  mode="read" 
                  :value="null"
                  empty-text="🔍 暂无数据"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 属性透传 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>属性透传</h3>
            <span class="type-tag">props</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>带前缀图标</label>
                <CoolField 
                  value-type="text" 
                  mode="edit" 
                  v-model:value="demoData.textWithIcon"
                  placeholder="请输入文本"
                  prefix="🔍"
                  allow-clear
                />
              </div>
              <div class="demo-col">
                <label>大尺寸输入框</label>
                <CoolField 
                  value-type="text" 
                  mode="edit" 
                  v-model:value="demoData.textLarge"
                  placeholder="大尺寸输入框"
                  size="large"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 事件透传 -->
        <div class="demo-card">
          <div class="card-header">
            <h3>事件透传</h3>
            <span class="type-tag">events</span>
          </div>
          <div class="card-content">
            <div class="demo-row">
              <div class="demo-col">
                <label>事件监听</label>
                <CoolField 
                  value-type="text" 
                  mode="edit" 
                  v-model:value="demoData.textWithEvents"
                  placeholder="输入文本查看事件"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                />
              </div>
              <div class="demo-col">
                <label>事件日志</label>
                <div class="event-log">
                  <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
                    {{ log }}
                  </div>
                  <div v-if="eventLogs.length === 0" class="log-empty">
                    暂无事件记录
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据状态展示 -->
    <div class="data-display">
      <h3 style="color: #ecf0f1; margin-bottom: 16px; font-size: 18px;">
        📊 当前数据状态
      </h3>
      <pre>{{ JSON.stringify(demoData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import CoolField from '../index.vue'

// 演示数据
const demoData = reactive({
  // 文本类
  text: 'Hello CoolField 🎯',
  password: 'secret123',
  textarea: '这是一段多行文本示例\n支持换行显示\n功能强大且易用',
  
  // 数字类
  number: 123.45,
  digit: 888,
  digitRange: [10, 100] as [number, number],
  money: 1234.56,
  percent: 85.7,
  
  // 展示类
  progress: 75,
  avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
  image: 'https://picsum.photos/200/150?random=1',
  color: '#1890ff',
  tag: '前端开发',
  badge: '新功能',
  
  // 选择类
  select: 'option2',
  checkbox: ['checkbox1', 'checkbox2'],
  radio: 'radio1',
  cascader: ['zhejiang', 'hangzhou', 'xihu'],
  treeSelect: 'frontend',
  treeSelectMultiple: ['frontend', 'backend'],
  switch: true,
  switchWithCustomText: false,
  
  // 日期时间类
  date: '2024-01-15',
  dateWithTime: '2024-01-15 14:30:00',
  dateRange: ['2024-01-01', '2024-01-31'],
  dateTimeRange: ['2024-01-01 09:00:00', '2024-01-31 18:00:00'],
  
  // 高级特性
  textWithIcon: '',
  textLarge: '',
  textWithEvents: ''
})

// 选择框配置
const selectOptions = {
  option1: { label: '选项一', value: 'option1' },
  option2: { label: '选项二', value: 'option2' },
  option3: { label: '选项三', value: 'option3' }
}

// 单选框配置
const radioOptions = {
  radio1: { label: '选项A', value: 'radio1' },
  radio2: { label: '选项B', value: 'radio2' },
  radio3: { label: '选项C', value: 'radio3' }
}

// 多选框配置
const checkboxOptions = [
  { label: '选项A', value: 'checkbox1' },
  { label: '选项B', value: 'checkbox2' },
  { label: '选项C', value: 'checkbox3' }
]

// 级联选择配置
const cascaderOptions = [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '余杭区', value: 'yuhang' },
          { label: '滨江区', value: 'binjiang' }
        ]
      },
      {
        label: '宁波市',
        value: 'ningbo',
        children: [
          { label: '海曙区', value: 'haishu' },
          { label: '江北区', value: 'jiangbei' }
        ]
      }
    ]
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
        children: [
          { label: '玄武区', value: 'xuanwu' },
          { label: '秦淮区', value: 'qinhuai' }
        ]
      },
      {
        label: '苏州市',
        value: 'suzhou',
        children: [
          { label: '姑苏区', value: 'gusu' },
          { label: '虎丘区', value: 'huqiu' }
        ]
      }
    ]
  }
]

// 树选择配置
const treeSelectOptions = [
  {
    title: '技术团队',
    value: 'tech',
    children: [
      {
        title: '前端开发',
        value: 'frontend',
        children: [
          { title: 'Vue开发', value: 'vue' },
          { title: 'React开发', value: 'react' },
          { title: 'Angular开发', value: 'angular' }
        ]
      },
      {
        title: '后端开发',
        value: 'backend',
        children: [
          { title: 'Java开发', value: 'java' },
          { title: 'Node.js开发', value: 'nodejs' },
          { title: 'Python开发', value: 'python' }
        ]
      },
      {
        title: '移动开发',
        value: 'mobile',
        children: [
          { title: 'iOS开发', value: 'ios' },
          { title: 'Android开发', value: 'android' },
          { title: 'Flutter开发', value: 'flutter' }
        ]
      }
    ]
  },
  {
    title: '产品团队',
    value: 'product',
    children: [
      { title: '产品经理', value: 'pm' },
      { title: 'UI设计师', value: 'ui' },
      { title: 'UX设计师', value: 'ux' }
    ]
  },
  {
    title: '运营团队',
    value: 'operation',
    children: [
      { title: '内容运营', value: 'content' },
      { title: '用户运营', value: 'user' },
      { title: '数据分析', value: 'data' }
    ]
  }
]

// 事件日志
const eventLogs = ref<string[]>([])

// 事件处理器
const handleFocus = () => {
  const now = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`${now} - Focus 事件触发`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
}

const handleBlur = () => {
  const now = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`${now} - Blur 事件触发`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
}

const handleChange = (value: any) => {
  const now = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`${now} - Change 事件: ${value}`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
}

</script>

<style lang="scss" scoped>
.cool-field-demo {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 0;
  
  // 头部介绍样式
  .demo-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    padding: 60px 20px;
    margin-bottom: 0;
    
    h1 {
      font-size: 48px;
      font-weight: 700;
      margin: 0 0 20px 0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .demo-desc {
      font-size: 18px;
      line-height: 1.6;
      opacity: 0.95;
      max-width: 800px;
      margin: 0 auto;
    }
  }
  
  // 章节样式
  .demo-section {
    background: white;
    margin: 40px auto 0 auto;
    max-width: 1400px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    
    .section-header {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      padding: 24px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      
      h2 {
        color: white;
        font-size: 24px;
        font-weight: 600;
        margin: 0;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
      
      .section-badge {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        backdrop-filter: blur(10px);
      }
    }
    
    // 卡片网格布局
    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      gap: 24px;
      padding: 32px;
    }
    
    // 演示卡片
    .demo-card {
      background: white;
      border-radius: 12px;
      border: 1px solid #e8e8e8;
      overflow: hidden;
      transition: all 0.3s ease;
      
      &:hover {
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        transform: translateY(-4px);
      }
      
      .card-header {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        padding: 16px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        h3 {
          color: white;
          font-size: 16px;
          font-weight: 600;
          margin: 0;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        .type-tag {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          backdrop-filter: blur(10px);
          
          &.highlight {
            background: #ff4757;
            animation: pulse 2s infinite;
          }
        }
      }
      
      .card-content {
        padding: 20px;
      }
    }
    
    // 演示行布局
    .demo-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      align-items: start;
      
      .demo-col {
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #2c3e50;
          font-size: 14px;
        }
      }
    }
  }
  
  // 事件日志
  .event-log {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 8px;
    padding: 16px;
    max-height: 140px;
    overflow-y: auto;
    
    .log-item {
      color: white;
      font-size: 12px;
      margin-bottom: 6px;
      padding: 4px 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    .log-empty {
      color: rgba(255, 255, 255, 0.7);
      font-size: 12px;
      text-align: center;
      font-style: italic;
    }
  }
  
  // 数据显示
  .data-display {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    border: none;
    border-radius: 12px;
    padding: 24px;
    color: #ecf0f1;
    font-size: 14px;
    line-height: 1.6;
    max-width: 1400px;
    margin: 40px auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  // 响应式布局
  @media (max-width: 1024px) {
    .demo-grid {
      grid-template-columns: 1fr;
      gap: 20px;
      padding: 24px;
    }
    
    .demo-header {
      padding: 40px 20px;
      
      h1 {
        font-size: 36px;
      }
      
      .demo-desc {
        font-size: 16px;
      }
    }
  }
  
  @media (max-width: 768px) {
    .demo-row {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    
    .section-header {
      padding: 20px 24px;
      flex-direction: column;
      gap: 12px;
      
      h2 {
        font-size: 20px;
      }
    }
  }
}

// 全局样式覆盖
:deep(.ant-input),
:deep(.ant-input-number),
:deep(.ant-select),
:deep(.ant-textarea),
:deep(.ant-input-password) {
  width: 100%;
  border-radius: 6px;
  border-color: #d9d9d9;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #4facfe;
    box-shadow: 0 2px 8px rgba(79, 172, 254, 0.2);
  }
  
  &:focus {
    border-color: #4facfe;
    box-shadow: 0 0 0 2px rgba(79, 172, 254, 0.2);
  }
}

:deep(.ant-progress) {
  width: 100%;
}

:deep(.ant-checkbox-wrapper),
:deep(.ant-radio-wrapper) {
  margin-right: 16px;
}

// 动画效果
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

// 滚动条样式
.event-log::-webkit-scrollbar {
  width: 6px;
}

.event-log::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.event-log::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
}
</style> 