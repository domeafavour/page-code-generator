import { PropEditorProps } from "@/typings";
import { Input } from "./ui/input";

export function NumberPropEditor({ value, onChange }: PropEditorProps<number>) {
  return (
    <Input
      type="number"
      value={value}
      onChange={(e) => onChange?.(+e.target.value)}
    />
  );
}
