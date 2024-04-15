import { EditPropsDef } from '@/typings';

export function genDefaultProps(props?: Record<string, EditPropsDef<any>>) {
  if (!props) {
    return {};
  }
  return Object.keys(props).reduce((mergedProps, key) => {
    mergedProps[key] = props[key].default;
    return mergedProps;
  }, {} as Record<string, any>);
}
