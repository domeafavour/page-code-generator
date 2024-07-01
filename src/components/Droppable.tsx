import React from "react";
import { twMerge } from "tailwind-merge";
import { useDroppable } from "./useDroppable";

export function Droppable({
  children,
  className,
}: React.PropsWithChildren<{
  className?: string | ((props: { isOver: boolean }) => string);
  droppableId: string;
}>) {
  const { ref, isOver } = useDroppable<HTMLDivElement>();
  const classNameText =
    typeof className === "function" ? className({ isOver }) : className;

  return (
    <div ref={ref} className={twMerge(classNameText)}>
      {children}
    </div>
  );
}
