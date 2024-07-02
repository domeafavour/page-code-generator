import { DraggableData } from "@/components/Draggable";
import { useEditorStore } from "@/stores";
import { PreviewComponentMap } from "@/typings";
import { createEditingProps } from "@/utils/createEditingProps";
import { useEffect, useRef } from "react";

export function useAddEntity(config: PreviewComponentMap) {
  const latestConfigRef = useRef(config);
  useEffect(() => {
    latestConfigRef.current = config;
  });

  const addEntity = useEditorStore((store) => store.addEntity);
  const setEditingId = useEditorStore((store) => store.setEditingId);

  function performAddEntity(
    draggableData: DraggableData,
    parentId: string | null
  ) {
    const { props } = latestConfigRef.current[draggableData.name];
    const initialProps = createEditingProps(props);
    const newEntityId = addEntity({
      component: draggableData.name,
      parentId,
      type: draggableData.type,
      initialProps,
    });
    if (newEntityId) {
      setEditingId(newEntityId);
    }
  }

  return [performAddEntity] as const;
}
