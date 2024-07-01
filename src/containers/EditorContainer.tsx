import { DraggableData } from "@/components/Draggable";
import { ROOT_DROPPABLE_ID } from "@/components/RootDroppable";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEditorStore } from "@/stores";
import { PreviewComponentMap } from "@/typings";
import { DndContext } from "@dnd-kit/core";
import React from "react";

type ResizablePanelGroupProps = React.ComponentPropsWithoutRef<
  typeof ResizablePanelGroup
>;

interface Props extends Omit<ResizablePanelGroupProps, "direction"> {
  config: PreviewComponentMap;
  toolbar?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export type { Props as EditorContainerProps };

export function EditorContainer({
  children,
  className,
  toolbar,
  config,
  left,
  right,
  ...props
}: Props) {
  const addEntity = useEditorStore((store) => store.addEntity);
  return (
    <DndContext
      onDragEnd={(e) => {
        if (e.over) {
          const draggableData = e.active.data.current as DraggableData;
          addEntity({
            parentId: e.over.id === ROOT_DROPPABLE_ID ? null : e.over.id + "",
            type: draggableData.type,
            component: draggableData.name,
          });
        }
      }}
    >
      {toolbar}
      <ResizablePanelGroup direction="horizontal" {...props}>
        <ResizablePanel defaultSize={25}>{left}</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>{children}</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25}>{right}</ResizablePanel>
      </ResizablePanelGroup>
    </DndContext>
  );
}
