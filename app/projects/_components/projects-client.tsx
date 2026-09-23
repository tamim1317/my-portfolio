"use client";

import { useState, useMemo, useId } from "react";
import { X } from "lucide-react";
import { ProjectCard } from "@/components/ui/project-card";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

interface ProjectsClientProps {
  projects: Project[];
  allTechnologies: string[];
}

/**
 * ProjectsClient — Client Component owning filter state.
 * The parent page (Server Component) passes pre-sorted projects
 * and the unique technology list. No data fetching here.
 */
export function ProjectsClient({
  projects,
  allTechnologies,
}: ProjectsClientProps) {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const filterLabelId = useId();

  const filtered = useMemo(() => {
    if (!activeTech) return projects;
    return projects.filter((p) => p.technologies.includes(activeTech));
  }, [projects, activeTech]);

  return (
    <div className="flex flex-col gap-8">
      {/* ── Filter bar ── */}
      {allTechnologies.length > 0 && (
        <div role="group" aria-labelledby={filterLabelId}>
          <p
            id={filterLabelId}
            className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3"
          >
            Filter by technology
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTech(null)}
              aria-pressed={activeTech === null}
              className={cn(
                "inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium",
                "border transition-colors duration-[150ms]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                activeTech === null
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              )}
            >
              All
            </button>
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() =>
                  setActiveTech((prev) => (prev === tech ? null : tech))
                }
                aria-pressed={activeTech === tech}
                className={cn(
                  "inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-mono font-medium",
                  "border transition-colors duration-[150ms]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeTech === tech
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                )}
              >
                {tech}
              </button>
            ))}
            {activeTech && (
              <button
                type="button"
                onClick={() => setActiveTech(null)}
                className={cn(
                  "inline-flex items-center gap-1 h-8 px-2 rounded-lg text-xs font-medium",
                  "text-muted-foreground hover:text-foreground",
                  "transition-colors duration-[150ms]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
                aria-label="Clear filter"
              >
                <X size={12} aria-hidden="true" />
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Results summary (screen reader) ── */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {activeTech
          ? `Showing ${filtered.length} project${filtered.length !== 1 ? "s" : ""} using ${activeTech}`
          : `Showing all ${filtered.length} project${filtered.length !== 1 ? "s" : ""}`}
      </p>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Projects"
        >
          {filtered.map((project) => (
            <div key={project.slug} role="listitem">
              <ProjectCard project={project} className="h-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <p className="text-foreground font-medium">No projects match this filter</p>
          <p className="text-sm text-muted-foreground">
            Try a different technology or{" "}
            <button
              type="button"
              onClick={() => setActiveTech(null)}
              className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              clear the filter
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
