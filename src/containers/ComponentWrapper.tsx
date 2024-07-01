import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/stores';

export function ComponentWrapper({
  children,
  id,
  parentId,
}: React.PropsWithChildren<{ id: string; parentId: string | null }>) {
  const removeNode = useEditorStore((store) => store.removeEntity);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <span
          className={cn(
            'hover:outline-dashed hover:outline-2 hover:outline-orange-500'
          )}
        >
          {children}
        </span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Component - {id}</ContextMenuItem>
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
