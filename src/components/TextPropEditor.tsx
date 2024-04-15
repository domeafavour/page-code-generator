import { PropEditorProps } from '@/typings';

export function TextPropEditor({ value, onChange }: PropEditorProps<string>) {
  return <input value={value} onChange={(e) => onChange?.(e.target.value)} />;
}
