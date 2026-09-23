import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

interface CaseStudyNavProps {
  prev?: Project;
  next?: Project;
}

/**
 * CaseStudyNav — bottom navigation between adjacent case studies.
 */
export function CaseStudyNav({ prev, next }: CaseStudyNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Case study navigation"
      className="border-t border-border"
    >
      <div className="container-wide py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Previous */}
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className={cn(
                "group flex flex-col gap-1 p-4 rounded-xl",
                "border border-border bg-card",
                "hover:border-primary/20 hover:bg-accent/30",
                "transition-all duration-[200ms]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <ArrowLeft
                  size={12}
                  aria-hidden="true"
                  className="transition-transform duration-[150ms] group-hover:-translate-x-0.5"
                />
                Previous project
              </span>
              <span className="text-sm font-semibold text-foreground truncate">
                {prev.title}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {prev.shortDescription}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {/* Next */}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className={cn(
                "group flex flex-col gap-1 p-4 rounded-xl",
                "border border-border bg-card",
                "hover:border-primary/20 hover:bg-accent/30",
                "transition-all duration-[200ms]",
                "text-right sm:text-right",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
                Next project
                <ArrowRight
                  size={12}
                  aria-hidden="true"
                  className="transition-transform duration-[150ms] group-hover:translate-x-0.5"
                />
              </span>
              <span className="text-sm font-semibold text-foreground truncate">
                {next.title}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {next.shortDescription}
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
