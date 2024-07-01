import { useEditorStore } from "@/stores";
import { ensureArray } from "@/utils/array";

export function useChildIds(parentId: string | null) {
  return useEditorStore((store) => {
    const { rootIds, childIds } = store;
    return parentId ? ensureArray(childIds[parentId]) : rootIds;
  });
}
