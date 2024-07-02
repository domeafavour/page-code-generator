import { Droppable } from "@/components/Droppable";

interface Props extends React.PropsWithChildren {}

export type { Props as DroppableBlockProps };

export function DroppableBlock({ children }: Props) {
  return (
    <Droppable className={({ isOver }) => (isOver ? "outline outline-2" : "")}>
      {children}
    </Droppable>
  );
}
