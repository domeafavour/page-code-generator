import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef } from "react";
import invariant from "tiny-invariant";

export function useDraggable<T extends HTMLElement, D extends Record<string, unknown>>(
  data: D
) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const element = ref.current!;
    invariant(element);
    return draggable({
      element,
      getInitialData: () => data,
    });
  }, []);
  return { ref };
}
