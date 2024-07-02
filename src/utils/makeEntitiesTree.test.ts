import {
  makeEntitiesTree,
  type EditingEntityTreeNode,
} from "./makeEntitiesTree";

describe("makeEntitiesTree", () => {
  it("should return null if id provided is not in entities", () => {
    expect(makeEntitiesTree("1", {}, {}, {})).toEqual(null);
  });

  it("should return an array includes one element", () => {
    expect(
      makeEntitiesTree(
        "1",
        { "1": { component: "Text", id: "1", type: "component" } },
        {},
        {}
      )
    ).toEqual({
      component: "Text",
      props: {},
    } satisfies EditingEntityTreeNode);
  });

  it("should return a tree node with children", () => {
    expect(
      makeEntitiesTree(
        "1",
        {
          //
          "1": { component: "Flex", id: "1", type: "layout" },
          "2": { component: "Text", id: "2", type: "component" },
        },
        { "1": ["2"] },
        {
          "1": { gap: 8 },
        }
      )
    ).toEqual({
      component: "Flex",
      props: {
        gap: 8,
      },
      children: [
        {
          component: "Text",
          props: {},
        },
      ],
    } satisfies EditingEntityTreeNode);
  });
});
