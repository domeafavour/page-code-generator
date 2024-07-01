import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { PreviewComponentMap } from "@/typings";
import React, { useContext } from "react";

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

const ConfigContext = React.createContext<PreviewComponentMap>({});

export function useEditorConfig() {
  return useContext(ConfigContext);
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
