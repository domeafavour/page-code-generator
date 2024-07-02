import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import React, { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";

interface Props extends React.PropsWithChildren {}

export type { Props as AddedDroppableProps };

export function AddedDroppable({ children }: Props) {
  const [isOver, setIsOver] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const element = ref.current;
    invariant(element);
    return dropTargetForElements({
      element,
      onDragEnter: () => {
        setIsOver(true);
      },
      onDragLeave: () => {
        setIsOver(false);
      },
      onDrop: () => {
        setIsOver(false);
      },
    });
  }, []);
  return (
    <Card ref={ref}>
      <CardContent className={cn("pt-6", isOver && "bg-secondary")}>
        {children}
      </CardContent>
    </Card>
  );
}
