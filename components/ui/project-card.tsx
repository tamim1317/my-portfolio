import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

const statusConfig = {
  live: {
    label: "Live",
    dot: "bg-emerald-500",
    pill: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  },
  "in-progress": {
    label: "In Progress",
    dot: "bg-amber-500",
    pill: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/25",
  },
  archived: {
    label: "Archived",
    dot: "bg-border",
    pill: "text-muted-foreground bg-muted border-border",
  },
} satisfies Record<
  Project["status"],
  { label: string; dot: string; pill: string }
>;

interface ProjectCardProps {
  project: Project;
  variant?: "default" | "featured";
  className?: string;
}

const placeholderPalettes = [
  ["oklch(0.55 0.1 195)", "oklch(0.78 0.08 70)"],
  ["oklch(0.5 0.08 250)", "oklch(0.7 0.1 185)"],
  ["oklch(0.48 0.1 145)", "oklch(0.72 0.1 195)"],
  ["oklch(0.52 0.12 70)", "oklch(0.45 0.08 250)"],
  ["oklch(0.46 0.09 310)", "oklch(0.7 0.08 185)"],
] as const;

function paletteFor(slug: string) {
  const index =
    [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    placeholderPalettes.length;
  return placeholderPalettes[index];
}

export function ProjectCard({
  project,
  variant = "default",
  className,
}: ProjectCardProps) {
  const status = statusConfig[project.status];
  const hasCover = !project.coverImage.includes("[PLACEHOLDER");
  const featured = variant === "featured";
  const [from, to] = paletteFor(project.slug);

  return (
    <article
      aria-labelledby={`project-${project.slug}-title`}
      className={cn(
        "group relative flex flex-col overflow-hidden",
        "rounded-2xl border border-border/70 bg-card/80",
        "shadow-sm hover:shadow-lg",
        "transition-all duration-300 ease-out",
        "hover:border-primary/30 hover:-translate-y-1.5",
        "focus-within:border-primary/30",
        featured && "lg:flex-row",
        className
      )}
    >
      {/* Image / Placeholder */}
      <div
        className={cn(
          "relative w-full shrink-0 overflow-hidden bg-muted",
          featured
            ? "aspect-[16/10] lg:aspect-auto lg:w-[52%] lg:min-h-[300px]"
            : "aspect-[16/10]"
        )}
      >
        {hasCover ? (
          <>
            <Image
              src={project.coverImage}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(145deg, ${from} 0%, color-mix(in oklch, ${from} 18%, var(--card)) 48%, ${to} 100%)`,
            }}
          >
            <div className="flex flex-col items-center gap-3 px-6 text-center">
              <span
                className="text-5xl text-white/90 drop-shadow-sm"
                style={{ fontFamily: "var(--font-display, serif)" }}
              >
                {project.title.slice(0, 1)}
              </span>
              <span className="max-w-[12rem] text-[11px] font-medium uppercase tracking-[0.22em] text-white/70">
                {project.category.replace("-", " ")}
              </span>
            </div>
          </div>
        )}

        {/* Status pill */}
        <div className="absolute top-3 left-3">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
              "text-[11px] font-medium backdrop-blur-md bg-background/85",
              "shadow-sm",
              status.pill
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "h-1.5 w-1.5 shrink-0 rounded-full",
                status.dot === "bg-emerald-500" && "animate-pulse",
                status.dot
              )}
            />
            {status.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex flex-1 flex-col gap-4 p-5",
          featured && "lg:justify-center lg:p-8 lg:gap-5"
        )}
      >
        {/* Title + year */}
        <div className="flex items-start justify-between gap-3">
          <h3
            id={`project-${project.slug}-title`}
            className={cn(
              "font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-primary",
              featured ? "text-xl tracking-tight" : "text-[15px]"
            )}
          >
            {project.title}
          </h3>
          <span className="mt-0.5 shrink-0 text-[12px] tabular-nums text-muted-foreground">
            {project.year}
          </span>
        </div>

        {/* Description */}
        <p
          className={cn(
            "flex-1 leading-relaxed text-muted-foreground",
            featured ? "text-[14px] line-clamp-4" : "text-[13px] line-clamp-2"
          )}
        >
          {project.shortDescription}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((t) => (
            <Badge key={t} variant="tech">
              {t}
            </Badge>
          ))}
          {project.technologies.length > 5 && (
            <Badge
              variant="outline"
              className="px-1.5 py-0.5 text-[10px]"
            >
              +{project.technologies.length - 5}
            </Badge>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-3">
          <Link
            href={`/projects/${project.slug}`}
            className={cn(
              "group/link inline-flex items-center gap-1.5 py-1.5 text-[13px] font-semibold text-primary",
              "transition-all duration-200 hover:gap-2",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
            )}
          >
            Case study
            <ArrowUpRight
              size={13}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </Link>

          <div className="flex items-center gap-0.5">
            {project.githubUrl &&
              !project.githubUrl.includes("[PLACEHOLDER") && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source on GitHub (opens in new tab)`}
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-lg",
                    "text-muted-foreground hover:bg-accent hover:text-foreground",
                    "transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                >
                  <GitHubIcon size={14} aria-hidden="true" />
                </a>
              )}
            {project.liveUrl &&
              !project.liveUrl.includes("[PLACEHOLDER") && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo (opens in new tab)`}
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-lg",
                    "text-muted-foreground hover:bg-accent hover:text-foreground",
                    "transition-all duration-200",
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