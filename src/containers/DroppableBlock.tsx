import { Droppable } from "@/components/Droppable";
import { useEditorStore } from "@/stores";

interface Props extends React.PropsWithChildren {}

export type { Props as DroppableBlockProps };

export function DroppableBlock({ children }: Props) {
  const addEntity = useEditorStore((store) => store.addEntity);

  return (
    <Droppable
      onDrop={(dragData) => {
        addEntity({
          parentId: null,
          component: dragData.name,
          type: dragData.type,
        });
        console.log("drop", dragData);
      }}
      className={({ isOver }) => (isOver ? "outline outline-2" : "")}
    >
      {children}
    </Droppable>
  );
}
