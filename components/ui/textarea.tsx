import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export interface TextareaProps extends ComponentProps<"textarea"> {
  error?: string;
}

export function Textarea({ className, error, id, ...props }: TextareaProps) {
  const errorId = error && id ? `${id}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <textarea
        id={id}
        data-slot="textarea"
        aria-invalid={error ? "true" : undefined}
        aria-describedby={errorId}
        className={cn(
          "w-full min-h-[120px] rounded-md px-3 py-2.5 resize-y",
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
