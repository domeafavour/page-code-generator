import { PropEditorProps } from '@/typings';

export function NumberPropEditor({ value, onChange }: PropEditorProps<number>) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange?.(+e.target.value)}
    />
  );
}
