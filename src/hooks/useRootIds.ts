import { useEditorStore } from "@/stores";

export function useRootIds() {
  return useEditorStore((store) => store.rootIds);
}
