import { cn } from "@/lib/utils";

type HeadingAlign = "left" | "center";
type HeadingLevel = "h1" | "h2" | "h3";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  id?: string;
  align?: HeadingAlign;
  as?: HeadingLevel;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  id,
  align = "left",
  as: Tag = "h2",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {label && (
        <span className="inline-flex items-center gap-2.5 text-eyebrow text-primary" aria-hidden="true">
          <span className="h-px w-6 bg-primary/50" />
          {label}
        </span>
      )}

      <Tag
        id={id}
        className={cn(
          "text-display-lg text-foreground",
          align === "center" && "max-w-2xl",
          titleClassName
        )}
      >
        {title}
      </Tag>

      {description && (
        <p
          className={cn(
            "text-body-md text-muted-foreground mt-1",
            align === "center" ? "max-w-xl" : "max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
