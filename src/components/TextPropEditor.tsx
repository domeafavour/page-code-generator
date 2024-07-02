import { PropEditorProps } from "@/typings";
import { Input } from "./ui/input";

export function TextPropEditor({ value, onChange }: PropEditorProps<string>) {
  return <Input value={value} onChange={(e) => onChange?.(e.target.value)} />;
}
