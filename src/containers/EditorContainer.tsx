import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { PreviewComponentMap } from "@/typings";
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
  return (
    <>
      {toolbar}
      <ResizablePanelGroup direction="horizontal" {...props}>
        <ResizablePanel defaultSize={25}>{left}</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>{children}</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25}>{right}</ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
