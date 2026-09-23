import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export interface LabelProps extends ComponentProps<"label"> {
  /** Visually marks the field as required with an asterisk */
  required?: boolean;
}

export function Label({ className, required, children, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(
        "block text-sm font-medium text-foreground leading-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span
          aria-hidden="true"
          className="ml-1 text-destructive"
          title="Required"
        >
          *
        </span>
      )}
    </label>
  );
}
