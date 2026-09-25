import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/* ============================================================
   CARD VARIANTS
   Composed from sub-components: Card, CardHeader, CardTitle,
   CardDescription, CardContent, CardFooter.
   ============================================================ */

// Root card shell
export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-2xl border border-border bg-card text-card-foreground",
        "shadow-card",
        className
      )}
      {...props}
    />
  );
}

// Optional header region with bottom separator
export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  );
}

// Card title — rendered as h3 for correct hierarchy
export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "text-base font-semibold leading-snug tracking-tight",
        className
      )}
      {...props}
    />
  );
}

// Muted secondary description
export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
}

// Main content area
export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  );
}

// Footer — typically holds CTAs
export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center gap-3 p-6 pt-0", className)}
      {...props}
    />
  );
}
