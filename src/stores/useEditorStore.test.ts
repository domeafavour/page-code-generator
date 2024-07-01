import { EditingEntity } from "@/typings";
import { createStore } from "zustand";
import { createEditorStore } from "./useEditorStore";

let store = createStore(createEditorStore());

beforeEach(() => {
  store = createStore(createEditorStore());
});

describe("editorStore.addEntity", () => {
  it("rootIds should include the new entity id when parent id given is null.", () => {
    const id = store
      .getState()
      .addEntity({ parentId: null, component: "Text", type: "component" })!;
    expect(store.getState().rootIds.includes(id));
  });

  it("New entity should be in entities", () => {
    const id = store
      .getState()
      .addEntity({ parentId: null, component: "Text", type: "component" })!;
    expect(store.getState().entities[id]).toEqual({
      id,
      component: "Text",
      type: "component",
    } satisfies EditingEntity);
  });

  it("state should NOT change when parentId given is not in entities", () => {
    const previousState = store.getState();
    const { addEntity } = previousState;

    addEntity({
      parentId: "5" /** non-existed id */,
      component: "Text",
      type: "component",
    });

    expect(store.getState()).toBe(previousState);
  });

  it("rootIds should not change when parentId given is not null", () => {
    const { addEntity } = store.getState();
    const parentId = addEntity({
      parentId: null,
      component: "Flex",
      type: "layout",
    });
    const previousRootIds = store.getState().rootIds;
    addEntity({ parentId, component: "Text", type: "component" });
    expect(store.getState().rootIds).toBe(previousRootIds);
  });

  it("childIds should include the new entity id when parentId given is not null.", () => {
    const { addEntity } = store.getState();
    const parentId = addEntity({
      parentId: null,
      component: "Flex",
      type: "layout",
    });
    const id = addEntity({ parentId, component: "Text", type: "component" })!;
    expect(store.getState().childIds[parentId].includes(id));
  });
});

describe("editorStore.removeEntity", () => {
  it("state should not change when id is not in entities", () => {
    const previousState = store.getState();
    const { removeEntity } = previousState;
    removeEntity("5", null);
    expect(store.getState()).toBe(previousState);
  });

  it("rootIds should not include the removed entity id when parentId is null", () => {
    const { addEntity, removeEntity } = store.getState();
    const id = addEntity({
      parentId: null,
      component: "Text",
      type: "component",
    })!;
    removeEntity(id, null);
    expect(store.getState().rootIds.includes(id)).toBe(false);
  });

  it("entities should not contain the removed entity", () => {
    const { addEntity, removeEntity } = store.getState();
    const id = addEntity({
      parentId: null,
      component: "Text",
      type: "component",
    })!;
    removeEntity(id, null);
    expect(store.getState().entities[id]).toBeUndefined();
  });

  it("childIds should not include the removed entity id when parentId is not null", () => {
    const { addEntity, removeEntity } = store.getState();
    const parentId = addEntity({
      parentId: null,
      component: "Flex",
      type: "layout",
    });
    const id = addEntity({ parentId, component: "Text", type: "component" })!;
    removeEntity(id, parentId);
    expect(store.getState().childIds[parentId].includes(id)).toBe(false);
  });

  it("should remove all references to the removed entity", () => {
    const { addEntity, removeEntity } = store.getState();
    const rootId = addEntity({
      parentId: null,
      component: "Flex",
      type: "layout",
    });
    const flexId = addEntity({
      parentId: rootId,
      component: "Flex",
      type: "layout",
    })!;
    const textId1 = addEntity({
      parentId: flexId,
      component: "Text",
      type: "component",
    })!;
    const textId2 = addEntity({
      parentId: flexId,
      component: "Text",
      type: "component",
    })!;

    removeEntity(rootId, null);

    const { rootIds, childIds, entities } = store.getState();
    expect(rootIds.includes(rootId)).not.toBe(true);
    expect(entities[rootId]).toBeUndefined();
    expect(childIds[rootId]).toBeUndefined();

    expect(entities[flexId]).toBeUndefined();
    expect(childIds[flexId]).toBeUndefined();

    expect(entities[textId1]).toBeUndefined();

    expect(entities[textId2]).toBeUndefined();
  });
});

describe("editorStore.updateEntity", () => {
  it("should return null when id is not in entities", () => {
    const { updateEntity } = store.getState();
    expect(updateEntity("5", { component: "Text" })).toBeNull();
  });

  it("should update the entity with the new values", () => {
    const { addEntity, updateEntity } = store.getState();
    const id = addEntity({
      parentId: null,
      component: "Text",
      type: "component",
    })!;
    updateEntity(id, { component: "Button" });
    expect(store.getState().entities[id].component).toBe("Button");
  });

  it("should not change the entities when no values are provided", () => {
    const { addEntity, updateEntity } = store.getState();
    const id = addEntity({
      parentId: null,
      component: "Text",
      type: "component",
    });
    const { entities: previousEntities } = store.getState();

    updateEntity(id, {});
    expect(store.getState().entities).toBe(previousEntities);
  });
});
