import { Draggable } from "@/components/Draggable";
import { Flex } from "@/components/Flex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DroppableBlock } from "./DroppableBlock";

interface Props {}

export type { Props as AddedComponentsProps };

export function AddedComponents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Component</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex gap={8} flexDirection="column">
          <DroppableBlock>
            <Draggable
              data={{
                id: "component/text",
                name: "text",
                type: "component",
              }}
              className="bg-gray-500"
            >
              Text
            </Draggable>
          </DroppableBlock>
        </Flex>
      </CardContent>
    </Card>
  );
}
