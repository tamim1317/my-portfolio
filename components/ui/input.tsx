import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export interface InputProps extends ComponentProps<"input"> {
  error?: string;
}

export function Input({ className, error, id, ...props }: InputProps) {
  const errorId = error && id ? `${id}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <input
        id={id}
        data-slot="input"
        aria-invalid={error ? "true" : undefined}
        aria-describedby={errorId}
        className={cn(
          "w-full h-10 rounded-md px-3",
          "text-sm text-foreground placeholder:text-muted-foreground",
          "bg-background border",
          error ? "border-destructive" : "border-input",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-colors duration-[120ms]",
          className
        )}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="text-xs text-destructive leading-snug">
          {error}
        </p>
      )}
    </div>
  );
}
