import { Draggable } from "@/components/Draggable";
import { Flex } from "@/components/Flex";
import { Card, CardContent } from "@/components/ui/card";
import { useEditorConfig } from "./EditorContainer";

interface Props {}

export type { Props as ComponentsSelectorProps };

export function ComponentsSelector() {
  const config = useEditorConfig();

  return (
    <Card>
      <CardContent className="pt-6">
        <Flex gap={8} flexDirection="column">
          {Object.keys(config).map((key) => {
            return (
              <Draggable
                key={key}
                data={{
                  id: config[key].type + "/" + key,
                  name: key,
                  type: config[key].type,
                }}
                className="bg-gray-500"
              >
                {config[key].title}
              </Draggable>
            );
          })}
        </Flex>
      </CardContent>
    </Card>
  );
}
