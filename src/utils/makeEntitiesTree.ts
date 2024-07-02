import { type EditingPropsValue } from "@/stores";
import { type EditingEntity } from "@/typings";

export interface EditingEntityTreeNode
  extends Omit<EditingEntity, "id" | "type"> {
  children?: EditingEntityTreeNode[];
  props: EditingPropsValue;
}

export function makeEntitiesTree(
  id: string,
  entities: Record<string, EditingEntity>,
  idToChildIds: Record<string, string[]>,
  editingProps: Record<string, EditingPropsValue>
): EditingEntityTreeNode | null {
  const entity = entities[id];
  if (!entity) {
    return null;
  }
  const propsValues = editingProps[id] ?? {};

  const treeNode: EditingEntityTreeNode = {
    component: entity.component,
    props: propsValues,
  };

  const childIds = idToChildIds[id];
  if (childIds?.length) {
    const children: EditingEntityTreeNode[] = [];
    childIds.forEach((childId) => {
      const childNode = makeEntitiesTree(
        childId,
        entities,
        idToChildIds,
        editingProps
      );
      if (childNode) {
        children.push(childNode);
      }
    });
    if (children.length) {
      treeNode.children = children;
    }
  }

  return treeNode;
}
