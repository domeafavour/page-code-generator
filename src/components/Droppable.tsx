import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Droppable({
  children,
  droppableId,
  className,
}: React.PropsWithChildren<{
  className?: string | ((props: { isOver: boolean }) => string);
  droppableId: string;
}>) {
  const { isOver, setNodeRef } = useDroppable({
    id: droppableId,
  });

  const classNameText =
    typeof className === 'function' ? className({ isOver }) : className;

  return (
    <div ref={setNodeRef} className={twMerge(classNameText)}>
      {children}
    </div>
  );
}
