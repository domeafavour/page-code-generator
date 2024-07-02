import {
  generateCode,
  generatePropsCode,
  generateSelfCloseCode,
  resolvePropText,
  resolveValueText,
} from "./generateCode";

describe("resolveValueText", () => {
  it("should be wrapper with double quotes if value is string", () => {
    expect(resolveValueText("hello")).toBe('"hello"');
  });

  it("should be wrapper with curly braces if value is number", () => {
    expect(resolveValueText(1)).toBe("{1}");
  });
});

describe("resolvePropText", () => {
  it("should return prop key if value is true", () => {
    expect(resolvePropText("disabled", true)).toBe("disabled");
  });

  it("should be wrapped with double quotes if value is true", () => {
    expect(resolvePropText("disabled", false)).toBe("disabled={false}");
  });

  it("should be wrapped with curly braces if value is number", () => {
    expect(resolvePropText("value", 1)).toBe("value={1}");
  });
});

describe("generatePropsCode", () => {
  it("should return empty string if props is not provided", () => {
    expect(generatePropsCode()).toBe("");
  });

  it("should return empty string if props is an empty object", () => {
    expect(generatePropsCode({})).toBe("");
  });

  it("should return empty string if value is undefined", () => {
    expect(generatePropsCode({ value: undefined })).toBe("");
  });

  it("should return empty string if props is not provided", () => {
    expect(generatePropsCode()).toBe("");
  });

  it("should return correct props code", () => {
    expect(
      generatePropsCode({
        disabled: true,
        value: 1,
      })
    ).toBe("disabled value={1}");
  });
});

describe("generateSelfCloseCode", () => {
  it("should return a self closing tag with no props", () => {
    expect(generateSelfCloseCode({ type: "div", props: {} })).toBe("<div />");
  });

  it("should return a self closing tag with props", () => {
    expect(
      generateSelfCloseCode({
        type: "input",
        props: { required: true, width: 300, defaultValue: "hi" },
      })
    ).toBe('<input required width={300} defaultValue="hi" />');
  });
});

describe("generateCode", () => {
  it("should return a self closing tag with no children", () => {
    expect(generateCode({ type: "div", props: {} })).toBe("<div />");
  });

  it("should return a tag with children", () => {
    const jsx = [
      '<div className="container">',
      '  <p className="text">hi</p>',
      "</div>",
    ].join("\n");
    expect(
      generateCode({
        type: "div",
        props: {
          className: "container",
          children: [
            { type: "p", props: { className: "text", children: "hi" } },
          ],
        },
      })
    ).toBe(jsx);
  });
});
