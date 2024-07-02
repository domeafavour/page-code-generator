import { cn } from "@/lib/utils";
import React from "react";

type Ref = React.ComponentRef<"div"> | null;

type Props = React.ComponentPropsWithoutRef<"div">;

export type {
  Ref as EditingEntityWrapperRef,
  Props as EditingEntityWrapperProps,
};

export const EditingEntityWrapper = React.forwardRef<Ref, Props>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        className={cn(
          "cursor-pointer hover:outline hover:outline-offset-2 hover:outline-slate-200",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

EditingEntityWrapper.displayName = "EditingEntityWrapper";
