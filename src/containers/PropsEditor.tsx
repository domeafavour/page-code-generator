import { useEditingValues } from "./useEditingValues";

export function PropsEditor() {
  const editingValues = useEditingValues();
  return <div>{JSON.stringify(editingValues, null, 2)}</div>;
}
