type ComponentType = "component" | "layout";

export type EditingEntity = {
  id: string;
  type: ComponentType;
  component: string;
};

export type PropEditorComponent<V> = React.ComponentType<{
  value?: V;
  onChange?: (value: V) => void;
}>;

export type PropEditorProps<V> = React.ComponentProps<PropEditorComponent<V>>;

export type EditPropsDef<V> = {
  required: boolean;
  default?: V;
  editor: PropEditorComponent<V>;
};

export interface PreviewComponent {
  title: string;
  type: ComponentType;
  component: React.ComponentType<any>;
  props?: Record<string, EditPropsDef<any>>;
}

export type PreviewComponentMap<K extends string = string> = Record<
  K,
  PreviewComponent
>;

export type ConfigurablePropsMap<T extends Record<string, any>> = {
  [key in keyof T]: {
    required: boolean;
    default: T[key];
    editor: PropEditorComponent<T[key]>;
  };
};
