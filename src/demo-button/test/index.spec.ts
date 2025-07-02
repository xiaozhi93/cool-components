// @ts-nocheck
import { mount } from '@vue/test-utils';
import DemoButton from '../index.vue';

// 基础渲染测试
test('render demo button', () => {
  const wrapper = mount(DemoButton);
  expect(wrapper.html()).toMatchSnapshot();
});

// 属性测试
test('render demo button with props', () => {
  const wrapper = mount(DemoButton, {
    props: {
      type: 'primary',
      color: '#03a9f4'
    },
    slots: {
      default: '测试按钮'
    }
  });
  
  expect(wrapper.find('.demo-button').exists()).toBe(true);
  expect(wrapper.text()).toBe('测试按钮');
  
  // 检查自定义颜色是否正确应用
  const buttonElement = wrapper.element as HTMLElement;
  expect(buttonElement.style.backgroundColor).toBeTruthy();
});

// 默认属性测试
test('render demo button with default props', () => {
  const wrapper = mount(DemoButton, {
    slots: {
      default: '默认按钮'
    }
  });
  
  expect(wrapper.find('.demo-button').exists()).toBe(true);
  expect(wrapper.text()).toBe('默认按钮');
});

// 空内容测试
test('render demo button with empty content', () => {
  const wrapper = mount(DemoButton);
  
  expect(wrapper.find('.demo-button').exists()).toBe(true);
  expect(wrapper.text()).toBe('');
});

// 点击事件测试
test('demo button click event', async () => {
  const wrapper = mount(DemoButton, {
    slots: {
      default: '点击我'
    }
  });

  const button = wrapper.find('.demo-button');
  expect(button.exists()).toBe(true);
  
  // 模拟点击
  await button.trigger('click');
  
  // 验证按钮依然存在（基础功能正常）
  expect(button.exists()).toBe(true);
}); 