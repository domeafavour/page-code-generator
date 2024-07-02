import { EditingPropsValue } from "@/stores";

export function resolveValueText(value: unknown): string {
  return typeof value === "string" ? `"${value}"` : `{${value}}`;
}

export function resolvePropText(propKey: string, value: unknown) {
  return value === true ? propKey : `${propKey}=${resolveValueText(value)}`;
}

function isUndefined(value: unknown): value is undefined {
  return typeof value === "undefined";
}

export function generatePropsCode(props?: EditingPropsValue) {
  if (!props) {
    return "";
  }

  const propKeys = Object.keys(props);

  if (!propKeys.length) {
    return "";
  }

  return propKeys
    .filter((propKey) => !isUndefined(props[propKey]))
    .map((propKey) => resolvePropText(propKey, props[propKey]))
    .join(" ")
    .trim();
}

interface CodeElement {
  type: string;
  props?: EditingPropsValue;
}

export function generateSelfCloseCode({ type, props }: CodeElement) {
  const propsCode = generatePropsCode(props);
  return `<${type} ${propsCode.length ? propsCode + " " : propsCode}/>`;
}

interface CodeElementWithChildren extends Omit<CodeElement, "children"> {
  props: EditingPropsValue & {
    children?: CodeElementWithChildren[] | string | null;
  };
}

function omitChildren(props: EditingPropsValue) {
  const { children, ...rest } = props;
  return rest;
}

export function generateCode(
  element: CodeElementWithChildren,
  indent = 0
): string {
  const prefix = "  ".repeat(indent);
  if (!element.props.children?.length) {
    return prefix + generateSelfCloseCode(element);
  }
  const left = `${prefix}<${element.type} ${generatePropsCode(
    omitChildren(element.props)
  )}>`;
  const right = `${prefix}</${element.type}>`;

  if (Array.isArray(element.props.children)) {
    return (
      left +
      "\n" +
      element.props.children
        .map((child) => generateCode(child, indent + 1))
        .join("\n") +
      "\n" +
      right
    );
  }
  // one line
  return left + element.props.children + right.trim();
}
