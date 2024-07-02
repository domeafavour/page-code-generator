import { Droppable } from "@/components/Droppable";
import { EditingEntityWrapper } from "@/components/EditingEntityWrapper";
import { useAddEntity } from "@/hooks/useAddEntity";
import { useChildIds } from "@/hooks/useChildIds";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/stores";
import { EditingEntity } from "@/typings";
import { useEditingPropsValues } from "../hooks/useEditingPropsValues";
import { useEditorConfig } from "./EditorContainer";

export function RenderLayoutEntity({ entity }: { entity: EditingEntity }) {
  const editorConfig = useEditorConfig();
  const config = editorConfig[entity.component];
  const editingPropsValues = useEditingPropsValues(entity.id);
  const childIds = useChildIds(entity.id);
  const [addEntity] = useAddEntity(editorConfig);

  return (
    <>
      <config.component {...editingPropsValues}>
        {childIds.map((id) => (
          <RenderEntity key={id} entityId={id} />
        ))}
      </config.component>
      <Droppable
        onDrop={(e) => {
          addEntity(e, entity.id);
        }}
        className={(p) => cn(p.isOver && "outline-dashed")}
      >
        HERE
      </Droppable>
    </>
  );
}

export function RenderEntity({ entityId }: { entityId: string }) {
  const entity = useEditorStore((store) => store.entities[entityId]);
  const setEditingId = useEditorStore((store) => store.setEditingId);
  const config = useEditorConfig()[entity.component];
  const editingPropsValues = useEditingPropsValues(entity.id);

  return (
    <EditingEntityWrapper
      onClick={(e) => {
        e.stopPropagation();
        setEditingId(entity.id);
      }}
    >
      {entity.type === "component" ? (
        <config.component {...editingPropsValues} />
      ) : (
        <RenderLayoutEntity entity={entity} />
      )}
    </EditingEntityWrapper>
  );
}
