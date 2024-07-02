import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useEditorStore } from "@/stores";
import { useEditorConfig } from "./EditorContainer";
import { useEditingValues } from "./useEditingValues";

export function EditingPropsEditor() {
  const editingValues = useEditingValues();
  const editorConfig = useEditorConfig();
  const editingPropsValues = useEditorStore((store) =>
    store.editingId ? store.editingProps[store.editingId] : null
  );
  const editingId = useEditorStore((store) => store.editingId);
  const updateEditingProps = useEditorStore(
    (store) => store.updateEditingProps
  );

  if (!editingId || !editingValues || !editingPropsValues) {
    return null;
  }

  const editingPropsDef = editorConfig[editingValues.component].props ?? {};
  return (
    <Card>
      <CardTitle>{editingValues.component}</CardTitle>
      <CardContent>
        <div className="flex flex-col gap-2">
          {Object.keys(editingPropsDef).map((propKey) => {
            const PropValueEditor = editingPropsDef[propKey].editor;
            return (
              <div key={propKey} className="flex flex-row gap-2 items-center">
                <span className="min-w-32">{propKey}</span>
                <PropValueEditor
                  value={editingPropsValues[propKey]}
                  onChange={(newValue) => {
                    updateEditingProps(editingId, { [propKey]: newValue });
                  }}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
