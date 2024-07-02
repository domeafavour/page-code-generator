import { useRootEntities } from "@/hooks/useRootEntities";
import { useEditorStore } from "@/stores";
import React from "react";
import { AddedDroppable } from "./AddedDroppable";
import { useEditorConfig } from "./EditorContainer";

interface Props {}

export type { Props as AddedComponentsProps };

export function AddedComponents() {
  const rootEntities = useRootEntities();
  const setEditingId = useEditorStore((store) => store.setEditingId);
  const editorConfig = useEditorConfig();

  return (
    <AddedDroppable>
      {rootEntities.map((entity) => {
        const config = editorConfig[entity.component];
        return (
          <div
            key={entity.id}
            className="bg-gray-500 cursor-pointer"
            onClick={() => setEditingId(entity.id)}
          >
            {React.createElement(config.component, {
              children: "hi",
            })}
          </div>
        );
      })}
    </AddedDroppable>
  );
}
