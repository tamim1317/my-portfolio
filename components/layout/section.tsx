import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type SectionSpacing = "default" | "sm" | "none";
type SectionBackground = "default" | "muted" | "card";

interface SectionProps extends ComponentProps<"section"> {
  spacing?: SectionSpacing;
  background?: SectionBackground;
}

const spacingMap: Record<SectionSpacing, string> = {
  default: "section-padding",
  sm: "section-padding-sm",
  none: "",
};

const backgroundMap: Record<SectionBackground, string> = {
  default: "bg-background",
  muted: "bg-muted/40",
  card: "bg-card",
};

/**
 * Section — semantic <section> wrapper with consistent
 * vertical rhythm and optional background treatment.
 *
 * Always pass `id` and `aria-labelledby` when using inside
 * single-page scroll navigation.
 */
export function Section({
  className,
  spacing = "default",
  background = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        spacingMap[spacing],
        backgroundMap[background],
        className
      )}
      {...props}
    />
  );
}
