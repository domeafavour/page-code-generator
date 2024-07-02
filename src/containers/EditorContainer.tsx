import { DraggableData } from "@/components/Draggable";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { PreviewComponentMap } from "@/typings";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import React, { useContext, useEffect } from "react";
import invariant from "tiny-invariant";
import { useAddEntity } from "../hooks/useAddEntity";

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

const ConfigContext = React.createContext<PreviewComponentMap | null>(null);

export function useEditorConfig() {
  const context = useContext(ConfigContext);
  invariant(context);
  return context;
}

export function EditorContainer({
  children,
  className,
  toolbar,
  config,
  left,
  right,
  ...props
}: Props) {
  const [addEntity] = useAddEntity(config);
  useEffect(
    () =>
      monitorForElements({
        onDrop: ({ location, source }) => {
          if (location.current.dropTargets.length === 1) {
            const draggableData = source.data as DraggableData;
            addEntity(draggableData, null);
          }
        },
      }),
    []
  );
  return (
    <ConfigContext.Provider value={config}>
      {toolbar}
      <ResizablePanelGroup direction="horizontal" {...props}>
        <ResizablePanel defaultSize={25}>{left}</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>{children}</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25}>{right}</ResizablePanel>
      </ResizablePanelGroup>
    </ConfigContext.Provider>
  );
}
