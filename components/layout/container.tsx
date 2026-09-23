import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type ContainerWidth = "narrow" | "default" | "wide";

interface ContainerProps extends ComponentProps<"div"> {
  /**
   * narrow  — 672px  — prose, forms, focused content
   * default — 1024px — standard page content
   * wide    — 1280px — full-width layouts
   */
  width?: ContainerWidth;
  as?: "div" | "section" | "article" | "aside" | "nav" | "header" | "footer";
}

const widthMap: Record<ContainerWidth, string> = {
  narrow: "container-narrow",
  default: "container-default",
  wide: "container-wide",
};

export function Container({
  className,
  width = "wide",
  as: Tag = "div",
  ...props
}: ContainerProps) {
  return (
    <Tag className={cn(widthMap[width], className)} {...props} />
  );
}
