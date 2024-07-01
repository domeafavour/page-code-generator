import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";

export function useDroppable<T extends HTMLElement>() {
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
        console.log(args);
        setIsOver(false);
      },
    });
    return cleanup;
  }, []);
  return { ref, isOver };
}
