import { useEditorStore } from "@/stores";

export function useEditingValues() {
  return useEditorStore((store) =>
    store.editingId ? store.entities[store.editingId] : null
  );
}
