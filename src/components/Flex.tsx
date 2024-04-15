import { cn } from '@/lib/utils';
import { PropEditorProps } from '@/typings';
import React from 'react';
import { TextPropEditor } from './TextPropEditor';
import { Select, SelectItem } from './ui/select';

interface ConfigurableProps {
  flexDirection?: React.CSSProperties['flexDirection'];
  gap?: number;
  alignItems?: React.CSSProperties['alignItems'];
}

type Props = ConfigurableProps & React.ComponentPropsWithoutRef<'div'>;

export type { ConfigurableProps as FlexConfigurableProps, Props as FlexProps };

export const Flex = React.forwardRef<React.ComponentRef<'div'>, Props>(
  (
    {
      gap = 8,
      flexDirection,
      alignItems,
      className,
      style,
      children,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={cn('flex', className)}
        style={{ gap, alignItems, flexDirection, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export function FlexDirectionEditor(
  props: PropEditorProps<ConfigurableProps['flexDirection']>
) {
  return (
    <Select
      value={props.value}
      onValueChange={props.onChange as (value: string) => void}
    >
      <SelectItem value="row">Row</SelectItem>
      <SelectItem value="column">Column</SelectItem>
      <SelectItem value="row-reverse">Row Reverse</SelectItem>
      <SelectItem value="column-reverse">Column Reverse</SelectItem>
    </Select>
  );
}

export const AlignItemsEditor = TextPropEditor;
