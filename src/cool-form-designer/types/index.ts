import type { Component } from 'vue';

export interface ControlDefinition {
  valueType: string;
  title: string;
  icon: Component;
}

export interface CoolFormDesignerComponent {
  valueType: 'custom';
  component: Component;
  title: string;
  icon: Component;
}

export interface CoolFormDesignerProps {
  components: CoolFormDesignerComponent[];
}