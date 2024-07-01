import { EditingEntity } from "@/typings";
import { arrayPush, ensureArray } from "@/utils/array";
import { generateId } from "@/utils/generateId";
import { combine } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";

const initialState = {
  editingId: null as string | null,
  entities: {} as Record<string, EditingEntity>,
  childIds: {} as Record<string, string[]>,
  rootIds: [] as string[],
};

export const useEditorStore = createWithEqualityFn(createEditorStore());

interface NewEntityPayload {
  parentId: string | null;
  type: EditingEntity["type"];
  component: string;
}

export function createEditorStore() {
  return combine(initialState, (set, get) => {
    function hasEntity(id: string) {
      return id in get().entities;
    }

    return {
      setEditingId: (editingId: string) => {
        set({ editingId });
      },

      getEditingId: () => get().editingId,

      clearEditingId: () => {
        set({ editingId: null });
      },

      addEntity: <T extends NewEntityPayload>(
        payload: T
      ): T["parentId"] extends null ? string : string | null => {
        const { component, parentId, type } = payload;
        if (parentId && !hasEntity(parentId)) {
          // @ts-ignore
          return null;
        }

        const id = generateId();
        let { rootIds, entities, childIds } = get();
        if (!parentId) {
          rootIds = arrayPush(rootIds, id);
        } else {
          childIds = {
            ...childIds,
            [parentId]: arrayPush(ensureArray(childIds[parentId]), id),
          };
        }
        entities = { ...entities, [id]: { id, component, type } };
        set({
          rootIds,
          entities,
          childIds,
        });
        return id;
      },

      removeEntity: (id: string, parentId: string | null) => {
        const { rootIds, childIds, entities } = get();

        if (!hasEntity(id)) {
          return;
        }

        const newRootIds = new Set(rootIds);
        const newEntities = { ...entities };
        const idToChildIds = { ...childIds };

        function remove(idToRemove: string, upId: string | null) {
          delete newEntities[idToRemove];
          if (!upId) {
            newRootIds.delete(idToRemove);
          } else {
            idToChildIds[upId] = idToChildIds[upId].filter(
              (childId) => childId !== idToRemove
            );
          }
          idToChildIds[idToRemove]?.forEach((childId) => {
            remove(childId, idToRemove);
          });
          delete idToChildIds[idToRemove];
        }

        remove(id, parentId);

        set({
          entities: newEntities,
          childIds: idToChildIds,
          rootIds: [...newRootIds],
        });
      },

      updateEntity: (
        id: string,
        values: Partial<EditingEntity>
      ): EditingEntity | null => {
        if (!hasEntity(id) || !Object.keys(values).length) {
          return null;
        }

        const { entities } = get();
        const newEntities = {
          ...entities,
          [id]: { ...entities[id], ...values },
        };
        set({ entities: newEntities });

        return newEntities[id];
      },
    };
  });
}
