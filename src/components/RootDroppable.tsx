import { twMerge } from 'tailwind-merge';
import { Droppable } from './Droppable';

export const ROOT_DROPPABLE_ID = 'ROOT';

export function RootDroppable({ children }: React.PropsWithChildren) {
  return (
    <Droppable
      droppableId={ROOT_DROPPABLE_ID}
      className={(droppableProps) =>
        twMerge(
          'flex-1 size-80 bg-gray-300',
          droppableProps.isOver && 'bg-red-500'
        )
      }
    >
      {children}
    </Droppable>
  );
}
