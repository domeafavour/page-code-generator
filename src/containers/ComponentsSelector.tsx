import { Draggable } from "@/components/Draggable";
import { Flex } from "@/components/Flex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {}

export type { Props as ComponentsSelectorProps };

export function ComponentsSelector() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Layout</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex gap={8} flexDirection="column">
          <Draggable
            data={{ id: "layout/flex", name: "flex", type: "layout" }}
            className="bg-gray-500"
          >
            Flex
          </Draggable>
        </Flex>
      </CardContent>
    </Card>
  );
}
