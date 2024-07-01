import { AddedComponents } from "./containers/AddedComponents";
import { ComponentsSelector } from "./containers/ComponentsSelector";
import { EditorContainer } from "./containers/EditorContainer";
import { PropsEditor } from "./containers/PropsEditor";
import { Toolbar } from "./containers/Toolbar";
import { previewComponentsMap } from "./previewComponentsMap";

function App() {
  return (
    <EditorContainer
      config={previewComponentsMap}
      toolbar={<Toolbar />}
      left={<ComponentsSelector />}
      right={<PropsEditor />}
    >
      <AddedComponents />
    </EditorContainer>
  );
}

export default App;
