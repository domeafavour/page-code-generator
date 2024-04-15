import React from 'react';
import { twMerge } from 'tailwind-merge';

type Ref = React.ComponentRef<'span'> | null;

type Props = React.ComponentPropsWithoutRef<'span'>;

export type { Ref as TextRef, Props as TextProps };

export const Text = React.forwardRef<Ref, Props>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <span
        ref={forwardedRef}
        className={twMerge('text-slate-700 font-sans', className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Text.displayName = 'Text';
