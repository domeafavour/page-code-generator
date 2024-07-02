import { useEditorStore } from "@/stores";

export function useRootEntities() {
  return useEditorStore((store) =>
    store.rootIds.map((id) => store.entities[id])
  );
}
