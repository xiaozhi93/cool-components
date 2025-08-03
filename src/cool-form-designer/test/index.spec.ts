import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import FormDesigner from '../index.vue';

describe('FormDesigner', () => {
  it('should render three panels correctly', () => {
    const wrapper = mount(FormDesigner);
    
    expect(wrapper.find('.control-panel').exists()).toBe(true);
    expect(wrapper.find('.form-canvas').exists()).toBe(true);
    expect(wrapper.find('.property-panel').exists()).toBe(true);
  });

  it('should have correct layout structure', () => {
    const wrapper = mount(FormDesigner);
    const designer = wrapper.find('.form-designer');
    
    expect(designer.exists()).toBe(true);
    expect(designer.classes()).toContain('form-designer');
  });
}); 