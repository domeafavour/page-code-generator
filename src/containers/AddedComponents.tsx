import { useRootIds } from "@/hooks/useRootIds";
import { AddedDroppable } from "./AddedDroppable";
import { RenderEntity } from "./RenderEntity";

interface Props {}

export type { Props as AddedComponentsProps };

export function AddedComponents() {
  const rootIds = useRootIds();

  return (
    <AddedDroppable>
      {rootIds.map((rootId) => (
        <RenderEntity key={rootId} entityId={rootId} />
      ))}
    </AddedDroppable>
  );
}
