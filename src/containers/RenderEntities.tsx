import { NoPreviewComponent } from "@/components/NoPreviewComponent";
import { RootDroppable } from "@/components/RootDroppable";
import { previewComponentsMap } from "@/previewComponentsMap";
import { useEditorStore } from "@/stores";
import { genDefaultProps } from "@/utils/genDefaultProps";
import { ComponentWrapper } from "./ComponentWrapper";
import { LayoutWrapper } from "./LayoutWrapper";
import { useChildIds } from "@/hooks/useChildIds";

export interface RenderEntityProps {
  id: string;
  parentId: string | null;
}

export function RenderEntity({ id, parentId }: RenderEntityProps) {
  const entity = useEditorStore((store) => store.entities[id]);
  const preview = entity ? previewComponentsMap[entity.component] : null;

  if (!preview) {
    return <NoPreviewComponent id={id} />;
  }

  const defaultProps = genDefaultProps(preview.props);

  if (entity.type === "layout") {
    return (
      <LayoutWrapper key={id} id={id} parentId={parentId}>
        <preview.component {...defaultProps}>
          <RenderEntities parentId={id} />
        </preview.component>
      </LayoutWrapper>
    );
  }
  return (
    <ComponentWrapper key={id} id={id} parentId={parentId}>
      <preview.component {...defaultProps}>ih</preview.component>
    </ComponentWrapper>
  );
}

export interface RenderEntitiesProps {
  parentId: string | null;
}

export function RenderEntities({ parentId }: RenderEntitiesProps) {
  const childIds = useChildIds(parentId);
  return childIds.map((id) => (
    <RenderEntity key={id} id={id} parentId={parentId} />
  ));
}

export function RenderRoot() {
  return (
    <RootDroppable>
      <RenderEntities parentId={null} />
    </RootDroppable>
  );
}
