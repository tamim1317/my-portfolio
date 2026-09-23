import { cn } from "@/lib/utils";

interface CaseStudySectionProps {
  id?: string;
  /** Small eyebrow label */
  label: string;
  /** Section heading */
  title: string;
  /** Prose content */
  children: React.ReactNode;
  className?: string;
}

/**
 * CaseStudySection — generic labelled prose section.
 * Used for Problem, Solution, Architecture, Lessons Learned, etc.
 */
export function CaseStudySection({
  id,
  label,
  title,
  children,
  className,
}: CaseStudySectionProps) {
  const headingId = id ?? `cs-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <section
      aria-labelledby={headingId}
      className={cn("flex flex-col gap-4", className)}
    >
      <div className="flex flex-col gap-1">
        <span className="text-eyebrow text-primary">{label}</span>
        <h2 id={headingId} className="text-display-lg text-foreground">
          {title}
        </h2>
      </div>
      <div className="text-body-md text-muted-foreground leading-relaxed">
        {children}
      </div>
    </section>
  );
}
