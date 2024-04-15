import { EditingEntity } from '@/typings';
import { arrayPush, ensureArray } from '@/utils/array';
import { generateId } from '@/utils/generateId';
import { combine } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

export const useEditorStore = createWithEqualityFn(
  combine(
    {
      entities: {} as Record<string, EditingEntity>,
      childIds: {} as Record<string, string[]>,
      rootIds: [] as string[],
    },
    (set, get) => ({
      addNode: (payload: {
        parentId: string | null;
        type: EditingEntity['type'];
        component: string;
      }) => {
        set((state) => {
          const { parentId, component, type } = payload;
          if (parentId && !state.entities[parentId]) {
            return state;
          }
          const id = generateId();
          // rootId: id === null
          return {
            ...state,
            rootIds: parentId ? state.rootIds : arrayPush(state.rootIds, id),
            childIds: {
              ...state.childIds,
              ...(parentId
                ? { [parentId]: [...state.childIds[parentId], id] }
                : {}),
              [id]: [],
            },
            entities: {
              ...state.entities,
              [id]: {
                type,
                component,
              },
            },
          };
        });
      },

      removeNode: (id: string, parentId: string | null) => {
        set((state) => {
          let entity = state.entities[id];
          if (!entity) {
            return state;
          }

          const newEntities = { ...state.entities };
          delete newEntities[id];

          const newChildIds = { ...state.childIds };
          delete newChildIds[id];

          let newRootIds = state.rootIds;

          if (parentId) {
            newChildIds[parentId] = newChildIds[parentId].filter(
              (i) => i !== id
            );
          } else {
            newRootIds = newRootIds.filter((i) => i !== id);
          }

          return {
            ...state,
            entities: newEntities,
            childIds: newChildIds,
            rootIds: newRootIds,
          };
        });
      },
      getChildIds: (parentId: string | null) => {
        const { rootIds, childIds } = get();
        return parentId ? ensureArray(childIds[parentId]) : rootIds;
      },
    })
  )
);
