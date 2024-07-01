import React from "react";
import { useDraggable } from "./useDraggable";

export type DraggableData = {
  id: string;
  name: string;
  type: "component" | "layout";
};

export function Draggable<T extends DraggableData>({
  className,
  data,
  children,
}: React.PropsWithChildren<{ className?: string; data: T }>) {
  const { ref } = useDraggable<HTMLDivElement, DraggableData>(data);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
