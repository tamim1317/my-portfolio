import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/* ============================================================
   BUTTON VARIANTS
   ============================================================ */
const buttonVariants = cva(
  // Base styles — shared by all variants
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium text-sm leading-none",
    "rounded-xl",
    "border border-transparent",
    "cursor-pointer select-none",
    "whitespace-nowrap",
    "transition-all duration-[150ms] ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        // Solid filled — primary action
        primary: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90",
          "shadow-sm",
        ],
        // Outlined — secondary action
        outline: [
          "border-border bg-transparent text-foreground",
          "hover:bg-accent hover:text-accent-foreground hover:border-accent",
        ],
        // Ghost — tertiary, low-emphasis
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-accent hover:text-accent-foreground",
        ],
        // Secondary — filled but muted
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/80",
        ],
        // Destructive — dangerous actions
        destructive: [
          "bg-destructive text-destructive-foreground",
          "hover:bg-destructive/90",
          "shadow-sm",
        ],
        // Link — looks like a text link
        link: [
          "bg-transparent text-primary underline-offset-4",
          "hover:underline",
          "h-auto! p-0!",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-8 text-base",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/* ============================================================
   BUTTON COMPONENT
   Server-compatible (no 'use client' needed — no hooks).
   For onClick handlers, the parent must be a Client Component.
   ============================================================ */
export interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  /** Render as a child element (for use with <Link> via asChild pattern) */
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
