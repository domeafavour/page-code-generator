import { Flex } from "@/components/Flex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEditorStore } from "@/stores";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef } from "react";
import invariant from "tiny-invariant";

interface Props {}

export type { Props as AddedComponentsProps };

export function AddedComponents() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const element = ref.current;
    invariant(element);
    return dropTargetForElements({
      element,
    });
  }, []);

  const rootEntities = useEditorStore((store) =>
    store.rootIds.map((id) => store.entities[id]),
  );

  return (
    <Card ref={ref}>
      <CardHeader>
        <CardTitle>Component</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex gap={8} flexDirection="column">
          {rootEntities.map((entity) => {
            return (
              <div key={entity.id} className="bg-gray-500">
                <pre>{JSON.stringify(entity)}</pre>
              </div>
            );
          })}
        </Flex>
      </CardContent>
    </Card>
  );
}
