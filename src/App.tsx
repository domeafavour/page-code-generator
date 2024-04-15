import { DndContext } from '@dnd-kit/core';
import { Draggable, DraggableData } from './components/Draggable';
import { Flex } from './components/Flex';
import { ROOT_DROPPABLE_ID } from './components/RootDroppable';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { RenderRoot } from './containers/RenderEntities';
import { useEditorStore } from './stores/useEditorStore';

function App() {
  const addNode = useEditorStore((store) => store.addNode);

  return (
    <DndContext
      onDragEnd={(e) => {
        if (e.over) {
          const draggableData = e.active.data.current as DraggableData;
          addNode({
            parentId: e.over.id === ROOT_DROPPABLE_ID ? null : e.over.id + '',
            type: draggableData.type,
            component: draggableData.name,
          });
        }
      }}
    >
      <Flex flexDirection="row" gap={8}>
        <Flex flexDirection="column" gap={8}>
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <Flex gap={8} flexDirection="column">
                <Draggable
                  data={{ id: 'layout/flex', name: 'flex', type: 'layout' }}
                  className="bg-gray-500"
                >
                  Flex
                </Draggable>
              </Flex>
            </CardContent>
          </Card>

          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Component</CardTitle>
            </CardHeader>
            <CardContent>
              <Flex gap={8} flexDirection="column">
                <Draggable
                  data={{
                    id: 'component/text',
                    name: 'text',
                    type: 'component',
                  }}
                  className="bg-gray-500"
                >
                  Text
                </Draggable>
                <Draggable
                  data={{
                    id: 'component/button',
                    name: 'button',
                    type: 'component',
                  }}
                  className="bg-gray-500"
                >
                  Button
                </Draggable>
              </Flex>
            </CardContent>
          </Card>
        </Flex>
        <RenderRoot />
      </Flex>
    </DndContext>
  );
}

export default App;
