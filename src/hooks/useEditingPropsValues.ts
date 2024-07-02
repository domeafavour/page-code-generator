import { useEditorStore } from "@/stores";

export function useEditingPropsValues(id: string) {
  return useEditorStore((store) => store.editingProps[id]);
}
