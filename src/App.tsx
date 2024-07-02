import { AddedComponents } from "./containers/AddedComponents";
import { ComponentsSelector } from "./containers/ComponentsSelector";
import { EditorContainer } from "./containers/EditorContainer";
import { EditingPropsEditor } from "./containers/EditingPropsEditor";
import { Toolbar } from "./containers/Toolbar";
import { previewComponentsMap } from "./previewComponentsMap";

function App() {
  return (
    <EditorContainer
      config={previewComponentsMap}
      toolbar={<Toolbar />}
      left={<ComponentsSelector />}
      right={<EditingPropsEditor />}
    >
      <AddedComponents />
    </EditorContainer>
  );
}

export default App;
