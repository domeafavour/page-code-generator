import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";

export function useDroppable<
  T extends HTMLElement,
  D extends Record<string, unknown>
>(onDrop?: (data: D) => void) {
  const latestOnDropRef = useRef(onDrop);
  useEffect(() => {
    latestOnDropRef.current = onDrop;
  });

  const [isOver, setIsOver] = useState(false);
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const element = ref.current;
    invariant(element);
    const cleanup = dropTargetForElements({
      element: ref.current!,
      onDragEnter: () => {
        setIsOver(true);
      },
      onDragLeave: () => {
        setIsOver(false);
      },
      onDrop: (args) => {
        setIsOver(false);
        latestOnDropRef.current?.(args.source.data as D);
      },
    });
    return cleanup;
  }, []);
  return { ref, isOver };
}
