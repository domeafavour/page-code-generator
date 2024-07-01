import React from "react";
import { twMerge } from "tailwind-merge";
import { DraggableData } from "./Draggable";
import { useDroppable } from "./useDroppable";

export function Droppable({
  children,
  className,
  onDrop,
}: React.PropsWithChildren<{
  className?: string | ((props: { isOver: boolean }) => string);
  onDrop?: (data: DraggableData) => void;
}>) {
  const { ref, isOver } = useDroppable<HTMLDivElement, DraggableData>(onDrop);

  const classNameText =
    typeof className === "function" ? className({ isOver }) : className;

  return (
    <div ref={ref} className={twMerge(classNameText)}>
      {children}
    </div>
  );
}
