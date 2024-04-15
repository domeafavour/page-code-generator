import { useDraggable } from '@dnd-kit/core';
import React from 'react';

export type DraggableData = {
  id: string;
  name: string;
  type: 'component' | 'layout';
};

export function Draggable<T extends DraggableData>({
  className,
  data,
  children,
}: React.PropsWithChildren<{ className?: string; data: T }>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: data.id,
    data,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={className}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}
