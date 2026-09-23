import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Code2 } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

const statusConfig = {
  live:          { label: "Live",        dot: "bg-emerald-500", pill: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  "in-progress": { label: "In Progress", dot: "bg-amber-500",   pill: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20" },
  archived:      { label: "Archived",    dot: "bg-border",       pill: "text-muted-foreground bg-muted border-border" },
} satisfies Record<Project["status"], { label: string; dot: string; pill: string }>;

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "featured";
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const status   = statusConfig[project.status];
  const hasCover = !project.coverImage.includes("[PLACEHOLDER");

  return (
    <article
      aria-labelledby={`project-${project.slug}-title`}
      className={cn(
        "group relative flex flex-col",
        "rounded-lg border border-border bg-card",
        "overflow-hidden",
        "transition-all duration-[200ms] ease-out",
        "hover:border-primary/25 hover:shadow-card-hover hover:-translate-y-px",
        "focus-within:border-primary/25",
        className
      )}
    >
      {/* Image / placeholder */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted shrink-0">
        {hasCover ? (
          <Image
            src={project.coverImage}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[350ms] group-hover:scale-[1.025]"
          />
        ) : (
          /* Intentional empty-state — not broken-looking */
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-3 opacity-20">
              <Code2 size={28} className="text-foreground" />
              <div className="flex flex-col items-center gap-1">
                <div className="w-16 h-1.5 rounded-full bg-foreground" />
                <div className="w-10 h-1.5 rounded-full bg-foreground" />
              </div>
            </div>
          </div>
        )}

        {/* Status pill */}
        <div className="absolute top-2.5 left-2.5">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-xs font-medium",
              "rounded-full border px-2 py-0.5",
              "backdrop-blur-sm bg-background/80",
              status.pill
            )}
          >
            <span aria-hidden="true" className={cn("w-1.5 h-1.5 rounded-full shrink-0", status.dot)} />
            {status.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4 flex-1">

        {/* Title + year */}
        <div className="flex items-start justify-between gap-2">
          <h3
            id={`project-${project.slug}-title`}
            className="text-sm font-semibold text-foreground leading-snug"
          >
            {project.title}
          </h3>
          <span className="text-xs text-muted-foreground tabular-nums shrink-0 mt-0.5">
            {project.year}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {project.shortDescription}
        </p>

        {/* Tech */}
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 5).map((t) => (
            <Badge key={t} variant="tech">{t}</Badge>
          ))}
          {project.technologies.length > 5 && (
            <Badge variant="outline" className="text-[0.65rem] px-1.5 py-0.5">
              +{project.technologies.length - 5}
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-0.5 border-t border-border mt-auto">
          <Link
            href={`/projects/${project.slug}`}
            className={cn(
              "inline-flex items-center gap-1 text-xs font-semibold",
              "text-primary hover:text-primary/75",
              "transition-colors duration-[120ms]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm",
              "py-2"
            )}
          >
            Case study
            <ArrowUpRight size={12} aria-hidden="true" />
          </Link>

          <div className="flex items-center">
            {project.githubUrl && !project.githubUrl.includes("[PLACEHOLDER") && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source on GitHub (opens in new tab)`}
                className={cn(
                  "inline-flex items-center justify-center h-8 w-8 rounded-md",
                  "text-muted-foreground hover:text-foreground hover:bg-accent",
                  "transition-colors duration-[120ms]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <GitHubIcon size={14} aria-hidden="true" />
              </a>
            )}
            {project.liveUrl && !project.liveUrl.includes("[PLACEHOLDER") && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo (opens in new tab)`}
                className={cn(
                  "inline-flex items-center justify-center h-8 w-8 rounded-md",
                  "text-muted-foreground hover:text-foreground hover:bg-accent",
                  "transition-colors duration-[120ms]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
