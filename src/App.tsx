import { Draggable } from "./components/Draggable";
import { Droppable } from "./components/Droppable";
import { Flex } from "./components/Flex";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { EditorContainer } from "./containers/EditorContainer";
import { PropsEditor } from "./containers/PropsEditor";
import { previewComponentsMap } from "./previewComponentsMap";

function App() {
  return (
    <EditorContainer
      config={previewComponentsMap}
      toolbar={<div>toolbar</div>}
      left={
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
      }
      right={<PropsEditor />}
    >
      <Card>
        <CardHeader>
          <CardTitle>Component</CardTitle>
        </CardHeader>
        <CardContent>
          <Flex gap={8} flexDirection="column">
            <Droppable
              droppableId="component/text"
              className={(p) => (p.isOver ? "outline outline-2" : "")}
            >
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
            </Droppable>
          </Flex>
        </CardContent>
      </Card>
    </EditorContainer>
  );
}

export default App;
