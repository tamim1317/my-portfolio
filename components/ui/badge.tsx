import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-medium leading-none rounded-md transition-colors duration-[120ms]",
  {
    variants: {
      variant: {
        default:  "bg-secondary text-secondary-foreground text-xs px-2 py-0.5",
        outline:  "border border-border text-muted-foreground text-xs px-2 py-0.5",
        accent:   "bg-primary/10 text-primary border border-primary/15 text-xs px-2 py-0.5",
        tech:     "bg-muted text-muted-foreground font-mono border border-border text-[0.6875rem] px-1.5 py-0.5",
        success:  "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs px-2 py-0.5",
        warning:  "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs px-2 py-0.5",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends ComponentProps<"span">, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
