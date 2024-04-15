# Page Code Generator

Generate code from schema

## Installation

```bash
pnpm install
```

---

## Development

### Demo

schema:

```json
{
  "component": "Flex",
  "type": "layout",
  "props": {
    "direction": "row",
    "justify": "center",
    "align": "center"
  },
  "children": [
    {
      "component": "Text",
      "type": "component",
      "props": {
        "size": "lg",
        "color": "red"
      },
      "children": "Hello, World!"
    },
    {
      "component": "Button",
      "type": "component",
      "props": {
        "type": "primary"
      },
      "children": "Click me!"
    }
  ]
}
```

~~`schema` to `renderer component`~~

```tsx
function Page() {
  const schema = {};
  return <Renderer schema={schema} prop1={...} prop2={...} />;
}
```

`schema` to `code`

```tsx
function Page() {
  return (
    <Flex>
      <Text size="lg" color="red">
        Hello, World!
      </Text>
      <Button
        type="primary"
        onClick={() => {
          // This prop is not in the schema
          console.log('button clicked');
        }}
      >
        Click me!
      </Button>
    </Flex>
  );
}
```
