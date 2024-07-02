import { EditingPropsValue } from "@/stores";
import { EditPropsDef } from "@/typings";

export function createEditingProps(props?: Record<string, EditPropsDef<any>>) {
  return props
    ? Object.keys(props).reduce<EditingPropsValue>((initial, key) => {
        initial[key] = props[key].default;
        return initial;
      }, {})
    : {};
}
