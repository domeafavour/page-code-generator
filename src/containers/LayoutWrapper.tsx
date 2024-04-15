import { Droppable } from '@/components/Droppable';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/stores';

export function LayoutWrapper({
  children,
  id,
  parentId,
}: React.PropsWithChildren<{ id: string; parentId: string | null }>) {
  const removeNode = useEditorStore((store) => store.removeNode);
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex flex-col gap-2 items-start hover:bg-gray-200">
          {children}
          <Droppable
            droppableId={id}
            className={({ isOver }) =>
              cn('w-full h-9', isOver && 'bg-orange-300')
            }
          >
            <small>drag here</small>
          </Droppable>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Layout - {id}</ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            removeNode(id, parentId);
          }}
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
